import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const userMessage = messages[messages.length - 1]?.content; // Get last user message

    if (!userMessage) {
      return NextResponse.json({ error: "No message found" }, { status: 400 });
    }

    // Generate streaming AI response
    const result = await streamText({
      model: groq("gemma2-9b-it"),
      prompt: userMessage,
    });

    // Convert to AIStream (Fixing the stream error)
    const stream = result.toDataStreamResponse();

    return new Response(stream.body, {
      headers: {
        "Content-Type": "text/plain",
        "Cache-Control": "no-cache",
      },
    });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
