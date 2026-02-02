import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { NextRequest, NextResponse } from "next/server";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { getVectorStore } from "@/lib/astradb";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { Message as VercelChatMessage } from "@ai-sdk/react";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content;

    if (!userMessage) {
      return NextResponse.json({ error: "No message found" }, { status: 400 });
    }

    const chatHistory = messages.slice(0, -1).map((m: VercelChatMessage) =>
      m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content));

    const model = new ChatGroq({
      model: "llama-3.1-8b-instant",
      temperature: 0.7,
      streaming: true,
    });

    const vectorStore = await getVectorStore();
    const retriever = vectorStore.asRetriever({ k: 4 });

    // 1. Contextualize Question: Rephrase the user question based on history
    const contextualizeQSystemPrompt = `Given a chat history and the latest user question which might reference context in the chat history, formulate a standalone question which can be understood without the chat history. Do NOT answer the question, just reformulate it if needed and otherwise return it as is.`;

    const contextualizeQPrompt = ChatPromptTemplate.fromMessages([
      ["system", contextualizeQSystemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    const historyAwareRetriever = await createHistoryAwareRetriever({
      llm: model,
      retriever,
      rephrasePrompt: contextualizeQPrompt,
    });

    // 2. Answer question based on context
    const systemPrompt = `You are the ultimate AI assistant for Mohd Shubair's portfolio. 
Shubair is a talented developer, and you are here to showcase his work, skills, and personality.

**Your Personality:**
- Witty, helpful, and highly interactive.
- Professional but with a "cool dev" vibe.
- Confident but never arrogant.

**Your Instructions:**
- Use the provided context to answer questions accurately.
- If you don't know the answer from the context, say so gracefully and suggest checking his [LinkedIn](https://www.linkedin.com/in/mohdshubair/) or [GitHub](https://github.com/mohdshubair313).
- Always format your responses in beautiful Markdown.
- When mentioning projects or blogs, use markdown links.
- Keep answers concise but engaging.

**Context from Portfolio:**
{context}

**Current Conversation:**`;

    const qaPrompt = ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: model,
      prompt: qaPrompt,
    });

    const retrievalChain = await createRetrievalChain({
      retriever: historyAwareRetriever,
      combineDocsChain,
    });

    // Use retrievalChain.stream to get the streaming response
    const stream = await retrievalChain.stream({
      input: userMessage,
      chat_history: chatHistory,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.answer) {
              controller.enqueue(encoder.encode(chunk.answer));
            }
          }
          controller.close();
        } catch (e) {
          controller.error(e);
        }
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
      },
    });

  } catch (error) {
    const message = error instanceof Error ? error.message : "Internal Server Error";
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: message },
      { status: 500 }
    );
  }
}
