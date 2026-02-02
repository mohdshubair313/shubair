import { ChatGroq } from "@langchain/groq";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { NextRequest, NextResponse } from "next/server";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { getvectorStore } from "@/lib/astradb";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { Message as VercelChatMessage } from "@ai-sdk/react";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content;

    // caching -----
    const cacheHistory = messages.slice(0, -1).map((m: VercelChatMessage) => m.role === 'user' ? new HumanMessage(m.content) : new AIMessage(m.content));

    if (!userMessage) {
      return new Response(JSON.stringify({ error: "No message found" }), { status: 400 });
    }

    const groq = new ChatGroq({
      model: "llama-3.1-8b-instant",
      streaming: true,
    });

    const retriever = (await getvectorStore()).asRetriever();


    const rephrasePrompt = ChatPromptTemplate.fromMessages([
      new MessagesPlaceholder("chatHistory"),
      ["user", "{input}"],
      [
        "user",
        "Given the above conversation, generate a search query to look up in order to get information relevant to the current question. "+
        "Don't leave out any relevant keyword or information from the conversation. ",
      ],
    ]);

    const HistoryAwareretrievalChain = await createHistoryAwareRetriever({
      llm: groq,
      retriever,
      rephrasePrompt,
    })

    const prompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        "You're a witty, cool, and helpful AI who runs the portfolio website of a passionate full-stack developer." +
        "Your job is to engage with visitors — whether it's a curious recruiter or a fellow dev — with confidence and friendliness." +
        "Be casual but informative. Don't hesitate to flex a bit if the user's question deserves it." +
        "If you refer to something on the site, try giving a markdown-formatted link." +
        "Remeber only answer the question what is asked only no extra thing but answer in interactive way" +
        "whenever anyone asked about what model you are?, simply answer that you are shubair's assistant only not any llm model!" +
        "**Here is some relevant context:**\n{context}"+
        "Format all answers in markdown.\n\n"
      ],
      new MessagesPlaceholder("chatHistory"),

      ["user", "{input}"]
    ]);

    const combineDocsChain = await createStuffDocumentsChain({
      llm: groq,
      prompt,
      // documentPrompt: PromptTemplate.fromTemplate(
      //   'page URL: {url}\n\nPage content:\n{context}\n\n',
      // ),
      documentSeparator: "\n---------------\n"
    });

    const retrieverChain = await createRetrievalChain({
      combineDocsChain,
      retriever: HistoryAwareretrievalChain,
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
        "Connection": "keep-alive",
      },
    });

  } catch (error) {
    console.error("❌ Chat API Error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
