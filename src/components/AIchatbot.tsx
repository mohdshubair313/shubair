"use client";

import { Message, useChat } from '@ai-sdk/react';
import { cn } from "../lib/utils";
import { BotIcon, SendHorizonal, Trash2Icon, XCircle } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { TextShine } from './ui/TextShine';
import { motion } from 'framer-motion';

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
    isLoading,
    error,
  } = useChat({
    api: '/api/chat/',
    initialMessages: [
      { id: "1", role: "assistant", content: "Hello! How can I assist you today?" },
    ],
    streamProtocol: "text",
  });

  const lastMessageByUser = messages[messages.length - 1]?.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 50 }}
      animate={open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`fixed bottom-20 right-10 z-[9999] w-full max-w-[420px] ${open ? "block" : "hidden"}`}
    >
      <div className="flex h-[500px] flex-col rounded-2xl bg-[#0f0f0f] border border-gray-800 shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 bg-[#181818] border-b border-gray-700">
          <h3 className="text-white font-semibold text-lg">AI Chatbot</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-all duration-200">
            <XCircle size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scroll text-white">
          {messages.map((msg, index) => (
            <ChatMessage key={msg.id || index} message={msg} />
          ))}

          {isLoading && lastMessageByUser && (
            <TextShine />
          )}

          {error && <p className="text-red-500 text-sm">{error.message}</p>}

          {!error && messages.length === 0 && (
            <p className="text-gray-400 text-center">Start a conversation with the AI assistant.</p>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-2 p-3 bg-[#181818] border-t border-gray-700"
        >
          <button type="button" onClick={() => setMessages([])} className="text-gray-400 hover:text-red-500 p-2">
            <Trash2Icon size={18} />
          </button>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder="Ask something..."
            className="flex-1 bg-[#1f1f1f] text-white p-2 rounded-lg outline-none border border-transparent focus:border-blue-500 transition-all duration-150"
          />
          <button
            type="submit"
            disabled={isLoading || !input}
            className="text-gray-400 hover:text-blue-400 p-2 disabled:opacity-30"
          >
            <SendHorizonal size={20} />
          </button>
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
  const parsedContent = typeof content === 'string' ? content : JSON.stringify(content);

  return (
    <div className={cn("flex", isAssistant ? "justify-start" : "justify-end")}>
      <div className={cn(
        "max-w-[85%] rounded-xl px-4 py-2 text-sm whitespace-pre-wrap shadow-sm",
        isAssistant
          ? "bg-[#1e1e1e] text-sky-300 flex gap-2 items-start"
          : "bg-blue-600 text-white"
      )}>
        {isAssistant && <BotIcon className="mt-1 w-4 h-4 text-sky-400" />}
        <ReactMarkdown
          components={{
            a: props => (
              <Link {...props} href={props.href as string} className="underline text-blue-400 hover:text-blue-300" />
            ),
            p: props => <p {...props} className="mb-2 leading-relaxed" />,
            ul: props => <ul {...props} className="list-disc list-inside space-y-1" />,
            li: props => <li {...props} />,
            blockquote: props => (
              <blockquote {...props} className="pl-4 border-l-4 border-sky-500 text-sky-300 italic" />
            ),
          }}
        >
          {parsedContent}
        </ReactMarkdown>
      </div>
    </div>
  );
}

export default AIchatbot;
