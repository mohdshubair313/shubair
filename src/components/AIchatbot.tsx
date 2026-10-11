"use client";

import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { Bot, SendHorizontal, Square, Trash2, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { fetchPortfolioChat } from "@/lib/chat-client";
import { QUICK_QUESTIONS } from "@/lib/portfolio-knowledge";

export default function AIchatbot({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { messages, input, handleInputChange, handleSubmit, setMessages, error, status, reload, stop, append } = useChat({
    api: "/api/chat", streamProtocol: "text", fetch: fetchPortfolioChat,
    initialMessages: [{ id: "welcome", role: "assistant", content: "Hi! Explore Shubair's projects, experience and skills. What would you like to know?" }],
  });
  const loading = status === "submitted" || status === "streaming";
  const panel = useRef<HTMLDivElement>(null);
  const scroll = useRef<HTMLDivElement>(null);
  const nearBottom = useRef(true);
  useEffect(() => {
    if (open) panel.current?.querySelector<HTMLButtonElement>("button")?.focus();
  }, [open]);
  useEffect(() => {
    if (nearBottom.current && scroll.current) scroll.current.scrollTop = scroll.current.scrollHeight;
  }, [messages, loading]);
  return <div id="portfolio-chat" ref={panel} role="dialog" aria-labelledby="chat-title" hidden={!open}
    onKeyDown={(event) => { if (event.key === "Escape") { event.preventDefault(); onClose(); } }}
    className="fixed bottom-3 right-3 z-[9999] w-[calc(100vw-1.5rem)] max-w-[460px] sm:bottom-6 sm:right-6">
    <div className="flex h-[min(640px,85dvh)] flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white text-neutral-900 shadow-2xl dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100">
      <div className="flex shrink-0 items-center justify-between border-b border-neutral-200 px-4 py-3 dark:border-neutral-800">
        <div className="flex items-center gap-3"><Bot className="h-5 w-5" /><div>
          <h2 id="chat-title" className="text-sm font-semibold">Ask about Shubair</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">Projects, experience & contact</p>
        </div></div>
        <button type="button" onClick={onClose} aria-label="Close Chat" className="rounded-lg p-3 hover:bg-neutral-100 dark:hover:bg-neutral-800"><X size={18} /></button>
      </div>
      <div ref={scroll} onScroll={() => { if (scroll.current) nearBottom.current = scroll.current.scrollHeight - scroll.current.scrollTop - scroll.current.clientHeight < 90; }}
        role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain p-4">
        {messages.map(message => <div key={message.id} className={message.role === "user" ? "ml-8 rounded-xl bg-neutral-100 p-3 dark:bg-neutral-800" : "mr-2 py-1"}>
          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">{message.role === "user" ? "You" : "Portfolio assistant"}</p>
          <div className="prose prose-sm max-w-none break-words text-[13px] leading-relaxed dark:prose-invert prose-p:my-2 prose-ul:my-2 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-pre:overflow-x-auto">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a>, table: ({ children }) => <div className="overflow-x-auto"><table>{children}</table></div> }}>{message.content}</ReactMarkdown>
          </div>
        </div>)}
        {messages.length <= 1 && <div className="flex flex-wrap gap-2">{QUICK_QUESTIONS.map(item => <button key={item.label} type="button" disabled={loading}
          onClick={() => { nearBottom.current = true; void append({ role: "user", content: item.question }); }}
          className="min-h-10 rounded-full border border-neutral-300 px-3 text-xs hover:bg-neutral-100 disabled:opacity-50 dark:border-neutral-700 dark:hover:bg-neutral-800">{item.label}</button>)}</div>}
        {loading && messages.at(-1)?.role === "user" && <p role="status" className="text-xs text-neutral-500">Finding relevant details…</p>}
        {error && <div role="alert" className="rounded-lg border border-neutral-300 p-3 text-sm dark:border-neutral-700">{error.message}<button type="button" disabled={loading} onClick={() => void reload()} className="ml-2 underline">Try again</button></div>}
      </div>
      <form onSubmit={event => { nearBottom.current = true; handleSubmit(event); }} className="shrink-0 border-t border-neutral-200 p-3 dark:border-neutral-800">
        <div className="flex items-center gap-1 rounded-xl border border-neutral-300 p-1 focus-within:ring-2 focus-within:ring-neutral-400 dark:border-neutral-700">
          <button type="button" aria-label="Clear Chat" onClick={() => { stop(); setMessages([]); }} className="rounded-lg p-2.5 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"><Trash2 size={17} /></button>
          <input aria-label="Chat message" value={input} onChange={handleInputChange} maxLength={8000} placeholder="Ask about my work…" className="min-w-0 flex-1 bg-transparent py-2 text-base outline-none sm:text-sm" />
          {loading ? <button type="button" aria-label="Stop answer" onClick={stop} className="rounded-lg p-2.5"><Square size={18} /></button>
            : <button type="submit" aria-label="Send message" disabled={!input.trim()} className="rounded-lg bg-neutral-900 p-2.5 text-white disabled:opacity-30 dark:bg-white dark:text-black"><SendHorizontal size={18} /></button>}
        </div>
        <p className="mt-2 text-center text-[10px] text-neutral-500 dark:text-neutral-400">Based on published portfolio details. <a href="mailto:hey@shubair.in" className="underline">Contact Shubair</a></p>
      </form>
    </div>
  </div>;
}
