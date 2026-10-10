import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { NextResponse } from "next/server";
import { retrievePortfolioDocuments } from "./astradb";

type ChatMessage = { role: "user" | "assistant"; content: string };
const REQUEST_TIMEOUT_MS = 50000;
const RETRIEVAL_TIMEOUT_MS = 8000;

// Race as well as abort: even an upstream client ignoring the signal cannot hang us.
async function abortable<T>(work: Promise<T>, signal: AbortSignal): Promise<T> {
    signal.throwIfAborted();
    let onAbort: () => void = () => {};
    const aborted = new Promise<never>((_, reject) => {
        onAbort = () => reject(signal.reason);
        signal.addEventListener("abort", onAbort, { once: true });
    });
    try {
        return await Promise.race([work, aborted]);
    } finally {
        signal.removeEventListener("abort", onAbort);
    }
}

function isChatMessage(value: unknown): value is ChatMessage {
    if (!value || typeof value !== "object") return false;
    const message = value as Partial<ChatMessage>;
    return (message.role === "user" || message.role === "assistant")
        && typeof message.content === "string" && message.content.length <= 8000;
}

export async function createChatResponse(req: Request, systemPrompt: string) {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return new Response("Please send a valid chat message.", { status: 400 });
    }
    const messages = body && typeof body === "object" && "messages" in body ? body.messages : undefined;
    if (!Array.isArray(messages) || !messages.length || messages.length > 100
        || !messages.every(isChatMessage) || messages.at(-1)?.role !== "user"
        || !messages.at(-1)?.content.trim()) {
        return new Response("Please send a non-empty chat message (up to 8,000 characters).", { status: 400 });
    }
    if (!process.env.GROQ_API_KEY) {
        return new Response("The AI assistant is temporarily unavailable. Please try again later.", { status: 503 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(new DOMException("Chat deadline exceeded", "TimeoutError")), REQUEST_TIMEOUT_MS);
    const onDisconnect = () => controller.abort(req.signal.reason);
    req.signal.addEventListener("abort", onDisconnect, { once: true });
    if (req.signal.aborted) onDisconnect();
    const cleanup = () => {
        clearTimeout(timeout);
        req.signal.removeEventListener("abort", onDisconnect);
    };
    const modelName = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
    const userMessage = messages.at(-1)!.content.trim();
    // The welcome message is not a previous user turn and needs no question rewriting.
    const previousMessages: ChatMessage[] = messages.slice(0, -1).slice(-12);
    const firstUserIndex = previousMessages.findIndex((message) => message.role === "user");
    const chatHistory = (firstUserIndex < 0 ? [] : previousMessages.slice(firstUserIndex))
        .map((message) => message.role === "user" ? new HumanMessage(message.content) : new AIMessage(message.content));
    const started = Date.now();

    try {
        let context = "";
        const retrievalController = new AbortController();
        const retrievalTimeout = setTimeout(() => retrievalController.abort(new DOMException("Retrieval deadline exceeded", "TimeoutError")), RETRIEVAL_TIMEOUT_MS);
        const retrievalSignal = AbortSignal.any([controller.signal, retrievalController.signal]);
        try {
            let query = userMessage;
            if (chatHistory.length) {
                const rewritePrompt = ChatPromptTemplate.fromMessages([
                    ["system", "Given a chat history and the latest user question which might reference context in the chat history, formulate a standalone question which can be understood without the chat history. Do NOT answer the question, just reformulate it if needed and otherwise return it as is."],
                    new MessagesPlaceholder("chat_history"),
                    ["human", "{input}"],
                ]);
                const rewriter = new ChatGroq({ model: modelName, temperature: 0, maxTokens: 256, timeout: 3000, maxRetries: 0 });
                // If only rewriting fails, still search the original question.
                try {
                    const rewritten = await abortable(rewritePrompt.pipe(rewriter).invoke({ input: userMessage, chat_history: chatHistory }, { signal: retrievalSignal }), retrievalSignal);
                    if (typeof rewritten.content === "string" && rewritten.content.trim()) query = rewritten.content;
                } catch {
                    retrievalSignal.throwIfAborted();
                }
            }
            const documents = await abortable(retrievePortfolioDocuments(query, retrievalSignal), retrievalSignal);
            context = documents.map((document) => document.pageContent).join("\n\n").slice(0, 16000);
            console.info("Chat retrieval completed", { ms: Date.now() - started, documents: documents.length });
        } catch (error) {
            controller.signal.throwIfAborted();
            // The same verified portfolio prompt works when the DB or embeddings are unavailable.
            console.warn("Chat retrieval unavailable; using verified portfolio facts", {
                ms: Date.now() - started,
                error: error instanceof Error ? error.name : "UnknownError",
            });
        } finally {
            clearTimeout(retrievalTimeout);
            retrievalController.abort();
        }

        const model = new ChatGroq({ model: modelName, temperature: 0.3, streaming: true, maxTokens: 2048, timeout: 15000, maxRetries: 0 });
        const prompt = ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            new MessagesPlaceholder("chat_history"),
            ["human", "{input}"],
        ]);
        const stream = await abortable(prompt.pipe(model).stream({ input: userMessage, chat_history: chatHistory, context }, { signal: controller.signal }), controller.signal);
        const iterator = stream[Symbol.asyncIterator]();
        // Surface a provider failure as a helpful HTTP error before committing a 200 response.
        let first = await abortable(iterator.next(), controller.signal);
        while (!first.done && (typeof first.value.content !== "string" || !first.value.content)) {
            first = await abortable(iterator.next(), controller.signal);
        }
        if (first.done) throw new Error("The model returned no answer.");
        const firstText = first.value.content as string;
        console.info("Chat answer started", { ms: Date.now() - started });
        const encoder = new TextEncoder();
        let sentFirst = false;
        const readable = new ReadableStream<Uint8Array>({
            async pull(streamController) {
                try {
                    if (!sentFirst) {
                        sentFirst = true;
                        streamController.enqueue(encoder.encode(firstText));
                        return;
                    }
                    let chunk = await abortable(iterator.next(), controller.signal);
                    while (!chunk.done && (typeof chunk.value.content !== "string" || !chunk.value.content)) {
                        chunk = await abortable(iterator.next(), controller.signal);
                    }
                    if (chunk.done) {
                        cleanup();
                        streamController.close();
                    } else if (typeof chunk.value.content === "string" && chunk.value.content) {
                        streamController.enqueue(encoder.encode(chunk.value.content));
                    }
                } catch {
                    if (!req.signal.aborted) {
                        streamController.enqueue(encoder.encode("\n\nThe response was interrupted. Please try again."));
                    }
                    cleanup();
                    controller.abort();
                    streamController.close();
                }
            },
            cancel() {
                cleanup();
                controller.abort();
            },
        });
        return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store" } });
    } catch (error) {
        const timedOut = controller.signal.aborted && !req.signal.aborted;
        cleanup();
        controller.abort();
        console.error("Chat answer unavailable", { ms: Date.now() - started, error: error instanceof Error ? error.name : "UnknownError" });
        return new Response(timedOut
            ? "The AI assistant took too long to respond. Please try again."
            : "The AI assistant is temporarily unavailable. Please try again shortly.", { status: timedOut ? 504 : 503 });
    }
}

export function chatHealthResponse() {
    return NextResponse.json({ status: "ok", message: "AI Chat API is running." });
}
