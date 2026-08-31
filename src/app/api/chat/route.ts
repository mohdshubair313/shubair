import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { NextRequest, NextResponse } from "next/server";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { getVectorStore } from "@/lib/astradb";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { Message as VercelChatMessage } from "@ai-sdk/react";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

export async function GET() {
  return NextResponse.json({ status: "ok", message: "AI Chat API is running." });
}

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
      model: process.env.GROQ_MODEL || "openai/gpt-oss-20b",
      temperature: 0.3,
      streaming: true,
    });

    const systemPrompt = `You are the ultimate AI assistant for Mohd Shubair's portfolio. 
Shubair is a talented Software Engineer & AI Engineer, and you are here to showcase his work, skills, projects, and social profiles.

**Shubair's Official Verified Social Handles & Links:**
- GitHub: https://github.com/mohdshubair313
- LinkedIn: https://www.linkedin.com/in/mohd-shubair-b1a454250/
- Twitter / X: https://x.com/shubair313/
- Peerlist: https://peerlist.io/shubair
- LeetCode: https://leetcode.com/mohd_shubair
- Email: hey@shubair.in (or shubair313@gmail.com)
- Portfolio Website: https://shubair.vercel.app/
- Schedule / Book a Call: https://cal.com/mohdshubair313/30min

**Shubair's Published Technical Blogs (3 Total):**
1. [Attention Is All You Need - The Complete Story](https://shubair.vercel.app/blogs/AOYN_PAPER) - Deep dive into Transformer architecture, Self-Attention, and modern LLMs (30 min read).
2. [Harness Engineering: The Secret to Making AI Agents Actually Work](https://shubair.vercel.app/blogs/HarnessEngineering) - The ultimate guide to building reliable production AI agent harnesses (45 min read).
3. [LangChain in Real-World Apps](https://shubair.vercel.app/blogs/langchain-guide) - Practical implementation guide for LangChain, LCEL, and RAG in TypeScript/JavaScript (25 min read).

**Your Personality:**
- Witty, helpful, and highly interactive.
- Professional with a "cool dev" vibe.
- Confident, crisp, and direct.

**Your Instructions:**
- When asked for social media handles, profiles, github, linkedin, twitter, email, or contact, ALWAYS provide clickable Markdown links (e.g., [GitHub](https://github.com/mohdshubair313), [LinkedIn](https://www.linkedin.com/in/mohd-shubair-b1a454250/), [Twitter / X](https://x.com/shubair313/), [Peerlist](https://peerlist.io/shubair), [LeetCode](https://leetcode.com/mohd_shubair), [Email](mailto:hey@shubair.in)).
- When asked about blogs, written articles, or content on the portfolio, list all 3 blogs above with their topics, read times, and clickable markdown links.
- CRITICAL: NEVER invent, hallucinate, or guess other links or usernames. ONLY use the exact URLs listed above.
- Use the provided context from the portfolio vector database to answer questions about projects, experience, blogs, and ML learnings.
- If a specific piece of information is not found in the context, say so gracefully and suggest checking his [LinkedIn](https://www.linkedin.com/in/mohd-shubair-b1a454250/) or [GitHub](https://github.com/mohdshubair313).
- Format responses in clean, structured Markdown (use bullet points, bold highlights, and clean tables with proper row line breaks when appropriate).
- When mentioning projects or blogs, use markdown links.

**Context from Portfolio:**
{context}

**Current Conversation:**`;

    const qaPrompt = ChatPromptTemplate.fromMessages([
      ["system", systemPrompt],
      new MessagesPlaceholder("chat_history"),
      ["human", "{input}"],
    ]);

    let stream;

    try {
      const vectorStore = await getVectorStore();
      const retriever = vectorStore.asRetriever({ k: 10 });

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

      const combineDocsChain = await createStuffDocumentsChain({
        llm: model,
        prompt: qaPrompt,
      });

      const retrievalChain = await createRetrievalChain({
        retriever: historyAwareRetriever,
        combineDocsChain,
      });

      stream = await retrievalChain.stream({
        input: userMessage,
        chat_history: chatHistory,
      });
    } catch (dbError) {
      console.warn("Astra DB retrieval unavailable, falling back to direct LLM response:", dbError);
      // Fallback directly to LLM without vector context if DB is hibernating/resuming
      const fallbackPrompt = ChatPromptTemplate.fromMessages([
        ["system", `You are Mohd Shubair's AI assistant. 
Mohd Shubair is a passionate Software Engineer and AI Engineer who builds modern web applications with Next.js, React, TypeScript, Python, FastAPI, and AI technologies.

Official Verified Links:
- GitHub: https://github.com/mohdshubair313
- LinkedIn: https://www.linkedin.com/in/mohd-shubair-b1a454250/
- Twitter/X: https://x.com/shubair313/
- Peerlist: https://peerlist.io/shubair
- LeetCode: https://leetcode.com/mohd_shubair
- Email: shubair313@gmail.com
- Portfolio: https://shubair.in/
- Book a call: https://cal.com/mohdshubair313/30min

When asked for social links or contact info, ALWAYS use these exact URLs.`],
        new MessagesPlaceholder("chat_history"),
        ["human", "{input}"],
      ]);
      const fallbackChain = fallbackPrompt.pipe(model);
      const fallbackStream = await fallbackChain.stream({
        chat_history: chatHistory,
        input: userMessage,
      });

      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          try {
            for await (const chunk of fallbackStream) {
              if (chunk.content) {
                controller.enqueue(encoder.encode(typeof chunk.content === 'string' ? chunk.content : JSON.stringify(chunk.content)));
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
    }

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
