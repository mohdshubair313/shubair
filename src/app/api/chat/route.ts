import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { NextRequest, NextResponse } from "next/server";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { getvectorStore } from "@/lib/astradb";
import { createRetrievalChain } from "langchain/chains/retrieval";
export const runtime = "edge"; // Required for streaming

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content;

    if (!userMessage) {
      return new Response(JSON.stringify({ error: "No message found" }), { status: 400 });
    }

    const groq = new ChatGroq({
      model: "llama-3.3-70b-versatile",
      streaming: true,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `You're a witty, cool, and helpful AI who runs the portfolio website of a passionate full-stack developer. 
        Your job is to engage with visitors — whether it's a curious recruiter or a fellow dev — with confidence and friendliness.

        Be casual but informative. Don't hesitate to flex a bit if the user's question deserves it.
        If you refer to something on the site, try giving a markdown-formatted link.
        Remeber only answer the question what is asked only no extra thing but answer in interactive way
        whenever anyone asked about what model you are?, simply answer that you are shubair's assistant only not any llm model!
        Format all answers in markdown.\n\nContext:\n{context}`
      ],
      ["user", "{input}"]
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: groq,
      prompt,
    });

    const retriever = (await getvectorStore()).asRetriever();
    const retrieverChain = await createRetrievalChain({
      combineDocsChain,
      retriever,
    });

    const stream = await retrieverChain.stream({
      input: userMessage,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (chunk?.answer) {
            controller.enqueue(encoder.encode(chunk.answer));
          }        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive",
      },
    });

  } catch (error) {
    console.error("❌ Chat API Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
