"use client";

import { Message, useChat } from '@ai-sdk/react';
import { cn } from "../lib/utils";
import { BotIcon, SendHorizonal, Trash2Icon, XCircle } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { TextShine } from './ui/TextShine';
import { motion } from 'framer-motion';
import React from 'react';

interface ChatbotProps {
  open: boolean;
  onClose: () => void;
}

const AIchatbot = ({ open, onClose }: ChatbotProps) => {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    setMessages,
    error,
    status,
    reload,
    stop,
  } = useChat({
    api: '/api/chat',
    initialMessages: [
      { id: "1", role: "assistant", content: "Hey there! I'm Shubair's AI assistant. How can I help you today? You can ask me about his projects, skills, social handles, or anything else on this site!" },
    ],
    streamProtocol: "text",
    fetch: async (url, options) => {
      const response = await fetch(url, options);
      if (!response.ok) {
        if (response.status === 504) {
          throw new Error("The AI assistant took too long to respond. Please try again.");
        }
        if (response.status >= 500) {
          throw new Error("The AI assistant is temporarily unavailable. Please try again shortly.");
        }
        throw new Error("Your message could not be sent. Please try again.");
      }
      return response;
    },
  });

  const lastMessageByUser = messages[messages.length - 1]?.role === "user";
  const isLoading = status === "submitted" || status === "streaming";

  // Auto-scroll to bottom
  const scrollRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "fixed z-[9999]",
        "bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-10 md:right-10",
        "w-[95vw] sm:w-[420px] md:w-[480px]",
        open ? "block" : "hidden"
      )} >
      <div className="flex h-[78vh] sm:h-[620px] flex-col rounded-3xl bg-[#0d0d0f] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#141418] to-[#1a1a22] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30 font-bold shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <BotIcon size={22} className="text-blue-400" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#141418] animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-white font-bold text-base tracking-tight flex items-center gap-2">
                Shubair&apos;s AI
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono">v2.0</span>
              </h3>
              <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-semibold">Online &amp; Ready</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full cursor-pointer"
            aria-label="Close Chat"
          >
            <XCircle size={22} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 custom-scroll"
        >
          {messages.map((msg, index) => (
            <ChatMessage key={msg.id || index} message={msg} />
          ))}

          {isLoading && lastMessageByUser && (
            <div className="flex justify-start">
              <div className="bg-[#18181f] rounded-2xl px-5 py-3 border border-white/10 shadow-sm">
                <TextShine />
              </div>
            </div>
          )}

          {error && (
            <div role="alert" className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center">
              {error.message || "Something went wrong. Please try again."}
              <button type="button" onClick={() => void reload()} disabled={isLoading} className="block mx-auto mt-2 underline cursor-pointer">
                Try again
              </button>
            </div>
          )}

          {messages.length === 0 && !error && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <BotIcon size={48} className="mb-4 text-blue-500" />
              <p className="text-sm text-gray-400">Ask me anything about Shubair!</p>
            </div>
          )}
        </div>

        {/* Input */}
        <form
          onSubmit={handleSubmit}
          className="p-3.5 bg-[#121217] border-t border-white/10"
        >
          <div className="flex items-center gap-2 bg-[#1a1a22] p-1.5 sm:p-2 rounded-2xl border border-white/10 focus-within:border-blue-500/50 transition-all duration-300 shadow-inner">
            <button
              type="button"
              onClick={() => { stop(); setMessages([]); }}
              className="text-gray-400 hover:text-red-400 p-2 hover:bg-red-400/10 rounded-xl transition-all cursor-pointer"
              title="Clear Chat"
              aria-label="Clear Chat"
            >
              <Trash2Icon size={18} />
            </button>
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about projects, skills, social links..."
              aria-label="Chat message"
              maxLength={8000}
              className="flex-grow bg-transparent text-white text-sm py-2 px-1 outline-none placeholder:text-gray-500"
            />
            <button
              type="submit"
              aria-label="Send message"
              disabled={isLoading || !input.trim()}
              className={cn(
                "p-2.5 rounded-xl transition-all duration-300 cursor-pointer",
                input.trim()
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:bg-blue-500"
                  : "bg-gray-800 text-gray-600 cursor-not-allowed"
              )}
            >
              <SendHorizonal size={18} />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

interface ChatMessageProps {
  message: Message;
}

function ChatMessage({ message: { role, content } }: ChatMessageProps) {
  const isAssistant = role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, x: isAssistant ? -10 : 10 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      className={cn("flex w-full", isAssistant ? "justify-start" : "justify-end")}
    >
      <div className={cn(
        "max-w-[92%] sm:max-w-[88%] rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 text-sm shadow-md transition-all duration-300 overflow-hidden",
        isAssistant
          ? "bg-[#181820] text-gray-200 border border-white/10"
          : "bg-blue-600 text-white shadow-[0_4px_15px_rgba(37,99,235,0.25)]"
      )}>
        {isAssistant && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/10">
            <BotIcon className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400/90">AI Assistant</span>
          </div>
        )}
        <div className="prose prose-invert prose-sm max-w-none text-xs sm:text-sm">
          {/* eslint-disable @typescript-eslint/no-unused-vars */}
          {/* eslint-disable @typescript-eslint/no-explicit-any */}
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ node, ...props }) => (
                <div className="my-3 w-full overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] shadow-sm">
                  <table {...props} className="w-full text-left border-collapse text-xs" />
                </div>
              ),
              thead: ({ node, ...props }) => (
                <thead {...props} className="bg-white/[0.07] border-b border-white/10 text-white font-semibold" />
              ),
              tbody: ({ node, ...props }) => (
                <tbody {...props} className="divide-y divide-white/5" />
              ),
              tr: ({ node, ...props }) => (
                <tr {...props} className="hover:bg-white/[0.02] transition-colors" />
              ),
              th: ({ node, ...props }) => (
                <th {...props} className="px-3 py-2 text-xs font-semibold text-blue-300 whitespace-nowrap" />
              ),
              td: ({ node, ...props }) => (
                <td {...props} className="px-3 py-2 text-xs text-gray-300 leading-relaxed" />
              ),
              h1: ({ node, ...props }) => (
                <h1 {...props} className="text-base font-bold text-white mt-4 mb-2 first:mt-0 pb-1 border-b border-white/10" />
              ),
              h2: ({ node, ...props }) => (
                <h2 {...props} className="text-sm font-bold text-white mt-3 mb-1.5 first:mt-0" />
              ),
              h3: ({ node, ...props }) => (
                <h3 {...props} className="text-xs font-semibold text-blue-400 mt-2.5 mb-1" />
              ),
              p: ({ node, ...props }) => (
                <p {...props} className="mb-2.5 last:mb-0 leading-relaxed text-gray-300" />
              ),
              a: ({ node, href, children, ...props }) => {
                const isExternal = href?.startsWith('http') || href?.startsWith('mailto:');
                if (isExternal) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-0.5 text-blue-400 hover:text-blue-300 underline decoration-blue-500/40 underline-offset-4 font-medium transition-colors cursor-pointer"
                      {...props}
                    >
                      {children}
                    </a>
                  );
                }
                return (
                  <Link
                    href={href || "#"}
                    className="inline-flex items-center gap-0.5 text-blue-400 hover:text-blue-300 underline decoration-blue-500/40 underline-offset-4 font-medium transition-colors cursor-pointer"
                    {...props}
                  >
                    {children}
                  </Link>
                );
              },
              ul: ({ node, ...props }) => (
                <ul {...props} className="list-disc list-outside ml-4 space-y-1 mb-2.5 text-gray-300" />
              ),
              ol: ({ node, ...props }) => (
                <ol {...props} className="list-decimal list-outside ml-4 space-y-1 mb-2.5 text-gray-300" />
              ),
              li: ({ node, ...props }) => (
                <li {...props} className="pl-0.5 leading-relaxed" />
              ),
              code: ({ node, className, children, ...props }: any) => {
                const isInline = !className && typeof children === 'string' && !children.includes('\n');
                if (isInline) {
                  return (
                    <code className="bg-white/10 px-1.5 py-0.5 rounded text-[12px] font-mono text-blue-300" {...props}>
                      {children}
                    </code>
                  );
                }
                return (
                  <div className="my-2.5 rounded-xl bg-black/60 border border-white/10 p-3 overflow-x-auto text-[12px] font-mono text-emerald-400">
                    <code {...props}>{children}</code>
                  </div>
                );
              },
              blockquote: ({ node, ...props }) => (
                <blockquote {...props} className="pl-3.5 border-l-2 border-blue-500 bg-blue-500/5 py-1.5 my-2.5 text-gray-300 italic rounded-r-lg text-xs" />
              ),
              hr: ({ node, ...props }) => (
                <hr {...props} className="my-3 border-t border-white/10" />
              ),
              strong: ({ node, ...props }) => (
                <strong {...props} className="font-semibold text-white" />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
          {/* eslint-enable @typescript-eslint/no-unused-vars */}
          {/* eslint-enable @typescript-eslint/no-explicit-any */}
        </div>
      </div>
    </motion.div>
  );
}

export default AIchatbot;
