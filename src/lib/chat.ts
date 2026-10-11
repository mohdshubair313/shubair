import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { NextResponse } from "next/server";
import { getDirectPortfolioAnswer } from "./portfolio-knowledge";
import { retrieveLocalPortfolio } from "./local-retrieval";

type ChatMessage = { role: "user" | "assistant"; content: string };
const REQUEST_TIMEOUT_MS = 20000;
const FIRST_ANSWER_TIMEOUT_MS = 5000;
let providerUnavailableUntil = 0;

function savedResponse(answer: string) {
    return new Response(answer, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Chat-Source": "portfolio" } });
}

// Race as well as abort: even an upstream client ignoring the signal cannot hang us.
async function abortable<T>(work: Promise<T>, signal: AbortSignal): Promise<T> {
    if (signal.aborted) {
        void work.catch(() => {});
        throw signal.reason;
    }
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
    const userMessage = messages.at(-1)!.content.trim();
    const previousMessages: ChatMessage[] = messages.slice(0, -1).slice(-12);
    const directAnswer = getDirectPortfolioAnswer(userMessage, previousMessages);
    if (directAnswer) return savedResponse(directAnswer);
    const knowledge = retrieveLocalPortfolio(userMessage, previousMessages);
    if (!knowledge.found || !process.env.GROQ_API_KEY || Date.now() < providerUnavailableUntil) return savedResponse(knowledge.fallback);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(new DOMException("Chat deadline exceeded", "TimeoutError")), REQUEST_TIMEOUT_MS);
    const firstAnswerTimeout = setTimeout(() => controller.abort(new DOMException("First answer deadline exceeded", "TimeoutError")), FIRST_ANSWER_TIMEOUT_MS);
    const onDisconnect = () => controller.abort(req.signal.reason);
    req.signal.addEventListener("abort", onDisconnect, { once: true });
    if (req.signal.aborted) onDisconnect();
    const cleanup = () => {
        clearTimeout(timeout);
        clearTimeout(firstAnswerTimeout);
        req.signal.removeEventListener("abort", onDisconnect);
    };
    const modelName = process.env.GROQ_MODEL || "openai/gpt-oss-20b";
    // The welcome message is not a previous user turn and needs no question rewriting.
    const firstUserIndex = previousMessages.findIndex((message) => message.role === "user");
    const chatHistory = (firstUserIndex < 0 ? [] : previousMessages.slice(firstUserIndex))
        .map((message) => message.role === "user" ? new HumanMessage(message.content) : new AIMessage(message.content));
    const started = Date.now();

    try {
        const context = knowledge.context;
        const model = new ChatGroq({ model: modelName, temperature: 0.3, streaming: true, maxTokens: 2048, timeout: 4500, maxRetries: 0 });
        const prompt = ChatPromptTemplate.fromMessages([
            ["system", systemPrompt],
            new MessagesPlaceholder("chat_history"),
            ["human", "{input}"],
        ]);
        const stream = await abortable(prompt.pipe(model).stream({ input: userMessage, chat_history: chatHistory, context }, { signal: controller.signal }), controller.signal);
        const iterator = stream[Symbol.asyncIterator]();
        // Wait for actual text so an unavailable provider can still use saved details.
        let first = await abortable(iterator.next(), controller.signal);
        while (!first.done && (typeof first.value.content !== "string" || !first.value.content)) {
            first = await abortable(iterator.next(), controller.signal);
        }
        if (first.done) throw new Error("The model returned no answer.");
        clearTimeout(firstAnswerTimeout);
        const firstText = first.value.content as string;
        console.info("Chat answer started", { ms: Date.now() - started });
        const encoder = new TextEncoder();
        let sentFirst = false;
        let cancelled = false;
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
                    if (cancelled) return;
                    if (chunk.done) {
                        cleanup();
                        streamController.close();
                    } else if (typeof chunk.value.content === "string" && chunk.value.content) {
                        streamController.enqueue(encoder.encode(chunk.value.content));
                    }
                } catch {
                    if (cancelled) return;
                    if (!req.signal.aborted) {
                        providerUnavailableUntil = Date.now() + 60000;
                        streamController.enqueue(encoder.encode(`\n\n---\n\n${knowledge.fallback}`));
                    }
                    cleanup();
                    controller.abort();
                    streamController.close();
                }
            },
            cancel() {
                cancelled = true;
                cleanup();
                controller.abort();
            },
        });
        return new Response(readable, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "X-Chat-Source": "ai" } });
    } catch (error) {
        cleanup();
        controller.abort();
        if (req.signal.aborted) return new Response(null, { status: 499 });
        providerUnavailableUntil = Date.now() + 60000;
        console.warn("Chat used published details", { ms: Date.now() - started, error: error instanceof Error ? error.name : "UnknownError" });
        return savedResponse(knowledge.fallback);
    }
}

export function chatHealthResponse() {
    return NextResponse.json({ status: "ok", message: "AI Chat API is running." });
}
