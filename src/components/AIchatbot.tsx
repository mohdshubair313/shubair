"use client";

import { Message, useChat } from '@ai-sdk/react';
import { cn } from "../lib/utils";
import { BotIcon, SendHorizonal, Trash2Icon, XCircle } from "lucide-react";
import ReactMarkdown from 'react-markdown';
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
  } = useChat({
    api: '/api/chat',
    initialMessages: [
      { id: "1", role: "assistant", content: "Hey there! I'm Shubair's AI assistant. How can I help you today? You can ask me about his projects, skills, or anything else on this site!" },
    ],
    streamProtocol: "text",
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
        "w-[95vw] sm:w-[400px] md:w-[450px]",
        open ? "block" : "hidden"
      )} >
      <div className="flex h-[75vh] sm:h-[600px] flex-col rounded-3xl bg-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#111] to-[#1a1a1a] border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/30 font-bold">
                <BotIcon size={22} className="text-blue-400" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111]"></div>
            </div>
            <div>
              <h3 className="text-white font-bold text-base tracking-tight">Shubair&apos;s AI</h3>
              <p className="text-[10px] text-blue-400 uppercase tracking-widest font-semibold">Online</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-full"
          >
            <XCircle size={22} />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-6 space-y-6 custom-scroll"
        >
          {messages.map((msg, index) => (
            <ChatMessage key={msg.id || index} message={msg} />
          ))}

          {isLoading && lastMessageByUser && (
            <div className="flex justify-start">
              <div className="bg-[#1a1a1a] rounded-2xl px-5 py-3 border border-white/5">
                <TextShine />
              </div>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs text-center">
              {error.message || "Something went wrong. Please try again."}
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
          className="p-4 bg-[#111] border-t border-white/5"
        >
          <div className="flex items-center gap-2 bg-[#1a1a1a] p-2 rounded-2xl border border-white/5 focus-within:border-blue-500/50 transition-all duration-300">
            <button
              type="button"
              onClick={() => setMessages([])}
              className="text-gray-500 hover:text-red-400 p-2 hover:bg-red-400/10 rounded-xl transition-all"
              title="Clear Chat"
            >
              <Trash2Icon size={18} />
            </button>
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about Shubair..."
              className="flex-grow bg-transparent text-white text-sm py-2 px-1 outline-none placeholder:text-gray-600"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={cn(
                "p-2.5 rounded-xl transition-all duration-300",
                input.trim()
                  ? "bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]"
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
      className={cn("flex", isAssistant ? "justify-start" : "justify-end")}
    >
      <div className={cn(
        "max-w-[85%] rounded-2xl px-5 py-3 text-sm shadow-md transition-all duration-300",
        isAssistant
          ? "bg-[#1a1a1a] text-gray-200 border border-white/5"
          : "bg-blue-600 text-white shadow-[0_4px_15px_rgba(37,99,235,0.2)]"
      )}>
        {isAssistant && (
          <div className="flex items-center gap-2 mb-2 pb-2 border-b border-white/5">
            <BotIcon className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400/80">AI Assistant</span>
          </div>
        )}
        <div className="prose prose-invert prose-sm max-w-none">
          <ReactMarkdown
            components={{
              a: props => (
                <Link {...props} href={props.href as string} className="text-blue-400 hover:text-blue-300 underline decoration-blue-500/30 underline-offset-4 font-medium transition-colors" />
              ),
              p: props => <p {...props} className="mb-3 last:mb-0 leading-relaxed" />,
              ul: props => <ul {...props} className="list-disc list-outside ml-4 space-y-1 mb-3" />,
              ol: props => <ol {...props} className="list-decimal list-outside ml-4 space-y-1 mb-3" />,
              li: props => <li {...props} className="pl-1" />,
              code: props => (
                <code {...props} className="bg-white/10 px-1.5 py-0.5 rounded text-[13px] font-mono text-blue-300" />
              ),
              blockquote: props => (
                <blockquote {...props} className="pl-4 border-l-3 border-blue-500 bg-blue-500/5 py-1 my-2 text-gray-400 italic rounded-r-lg" />
              ),
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </motion.div>
  );
}

export default AIchatbot;
