import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { NextRequest, NextResponse } from "next/server";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { getVectorStore } from "@/lib/astradb";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { Message as VercelChatMessage } from "@ai-sdk/react";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content;

    // Caching history
    const cacheHistory = messages.slice(0, -1).map((m: VercelChatMessage) => 
      m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content));

    if (!userMessage) {
      return new Response(JSON.stringify({ error: "No message found" }), { status: 400 });
    }

    const groq = new ChatGroq({
      model: "llama-3.1-8b-instant",
      streaming: true,
    });

    const retriever = (await getVectorStore()).asRetriever({
      k: 4,
    });

    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chatHistory"),
      ["user", "{input}"],
      [
        "user",
        "Given the above conversation, generate a search query to look up in order to get information relevant to the current question. " +
        "Don't leave out any relevant keyword or information from the conversation. ",
      ],
    ]);

    const historyAwareRetriever = await createHistoryAwareRetriever({
      llm: groq,
      retriever,
      rephrasePrompt,
    });

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You're a witty, cool, and helpful AI who runs the portfolio website of Mohd Shubair, a passionate full-stack developer." +
        "Your job is to engage with visitors — whether it's a curious recruiter or a fellow dev — with confidence and friendliness." +
        "Be casual but informative. Don't hesitate to flex a bit if the user's question deserves it." +
        "If you refer to something on the site, always give a markdown-formatted link. " +
        "For example, if talking about projects, use: [View Projects](https://shubair.vercel.app/projects)" +
        "Always answer the question directly without extra information, but in an interactive way." +
        "Whenever anyone asks about what model you are, simply answer that you are Shubair's assistant." +
        "**Here is some relevant context from the website:**\n{context}" +
        "Format all answers in markdown.\n\n" +
        "If you use information from specific sources, include the source URL as a markdown link at the end of the relevant section. " +
        "For example: \"[Read more about LangChain](https://shubair.vercel.app/blogs/langchain-guide)\""
      ],
      new MessagesPlaceholder("chatHistory"),
      ["user", "{input}"]
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: groq,
      prompt,
      documentPrompt: ChatPromptTemplate.fromTemplate(
        'Source: {url}\n\nContent:\n{pageContent}\n\n'
      ),
      documentSeparator: "\n---------------\n"
    });

    const retrieverChain = await createRetrievalChain({
      combineDocsChain,
      retriever: historyAwareRetriever,
    });

    const stream = await retrieverChain.stream({
      input: userMessage,
      chatHistory: cacheHistory,
    });

    const encoder = new TextEncoder();
    const readableStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          if (chunk?.answer) {
            controller.enqueue(encoder.encode(chunk.answer));
          }
        }
        controller.close();
      },
    });

    return new Response(readableStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });

  } catch (error: any) {
    console.error("Chat API error:", error);
    return new Response(JSON.stringify({ error: "Something went wrong. Please try again." }), { status: 500 });
  }
}
