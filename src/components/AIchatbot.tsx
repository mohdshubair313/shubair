import { Message, useChat } from '@ai-sdk/react';
import { cn } from "../lib/utils"
import { BotIcon, SendHorizonal, Trash2Icon, XCircle } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
// import { TextShine } from './ui/TextShine';
import { motion } from 'framer-motion';

interface ChatbotProps {
    open: boolean;
    onClose: () => void;
}

const AIchatbot = ({open, onClose}: ChatbotProps) => {
    const {
      messages,
      input,
      handleInputChange,
      handleSubmit,
      setMessages,
      error,
    } = useChat({
      api: '/api/chat/',
      initialMessages: [
        { id: "1" , role: "assistant", content: "hello"},
      ],
      streamProtocol: "text",
    })

    const lastMessageByUser = messages[messages.length - 1]?.role === "user";
    const isLoading = false; // Replace with actual loading state if available

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={open ? { opacity: 1, scale: 1, y: 0 } : { opacity: 0, scale: 0.8, y: 50 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className={`fixed bottom-20 right-10 z-[60] w-full max-w-[400px] p-2 ${open ? "block" : "hidden"}  cursor-pointer`}
      >
        <div className="flex h-[500px] flex-col rounded-xl bg-gray-900 shadow-2xl border border-gray-700">
          <div className="flex items-center justify-between bg-gray-800 p-3 rounded-t-xl">
            <h3 className="text-white font-semibold">AI Chatbot</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500 cursor-pointer">
              <XCircle size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-white">
            {messages.map((msg, index) => {
              console.log("Message debug:", msg);
              return <ChatMessage message={msg} key={msg.id || index} />;
            })}
            {isLoading && lastMessageByUser && <p className="text-gray-400"> Texting ... </p>}
            {error && <p className="text-red-500">{error.message}</p>}
            {!error && messages.length === 0 && (
              <p className="text-gray-400 text-center">Start a conversation with the AI assistant.</p>
            )}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center p-2 bg-gray-800 rounded-b-xl">
            <button type="button" onClick={() => setMessages([])} className="text-gray-400 hover:text-red-500 p-2 cursor-pointer">
              <Trash2Icon size={20} />
            </button>
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Type a message..."
              className="flex-1 bg-gray-700 text-white p-2 rounded-lg outline-none mx-2"
            />
            <button type="submit" disabled={isLoading || !input} className="text-gray-400 hover:text-blue-400 p-2 cursor-pointer">
              <SendHorizonal size={20} />
            </button>
          </form>
        </div>
      </motion.div>
    );
}

interface ChatMessageprops {
  message: Message 
}

function ChatMessage({message:{role, content}}: ChatMessageprops) {
  console.log("Rendiering content", content);
  const isMessage = role === "assistant";

  const parsedContent = typeof content === 'string' ? content : JSON.stringify(content);

  return <div className={cn("mb-3 flex items-center", isMessage ? "justify-start" : "justify-end")}>
    {isMessage && <BotIcon className='mr-2 h-6 w-6 text-gray-500' />}
    <div className={cn("rounded-lg p-2", isMessage ? "bg-gray-100 text-amber-900 font-bold opacity-90" : "bg-slate-200 text-zinc-700")}>
      <ReactMarkdown 
        components={{
          a: ({...props}) => (
            <Link {...props} href={props.href ?? ""} className="prose prose-invert max-w-none break-words text-sm text-primary hover:underline" />
          ),
          p: ({...props}) => (
            <p {...props} className="prose prose-invert max-w-none break-words text-sm text-primary" />
          ),
          ul: ({...props}) => (
            <ul {...props} className="prose prose-invert max-w-none break-words text-sm text-primary" />
          ),
          li: ({...props}) => (
            <li {...props} className="prose prose-invert max-w-none break-words text-sm text-primary" />
          ),
          blockquote: ({...props}) => (
            <blockquote {...props} className="prose prose-invert max-w-none break-words text-sm text-primary" />
          ),
        }}            
      >
      {parsedContent}
      </ReactMarkdown>
    </div>
  </div>
}



export default AIchatbot