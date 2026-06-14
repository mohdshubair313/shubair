"use client";
import { useState } from "react";
import AIchatbot from "./AIchatbot";
import { Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AIChatButton = () => {
  const [chatBoxOpen, setboxOpen] = useState(false);

  return (
    <>
      {/* Creative Chatbot Callout Pointer */}
      <AnimatePresence>
        {!chatBoxOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ type: "spring", damping: 15 }}
            className="fixed bottom-26 right-6 md:right-10 z-50 flex flex-col items-end max-w-[280px]"
          >
            {/* Gentle float wrapper */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut",
              }}
              className="flex flex-col items-end"
            >
              <div className="relative bg-card border border-primary/30 dark:border-primary/20 px-4 py-3 rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center text-primary select-none flex flex-col items-center">
                <p className="font-caveat text-xl font-bold leading-tight text-primary">
                  Psst... Shubair&apos;s AI clone is online!
                </p>
                <p className="font-caveat text-lg leading-tight text-foreground/90 mt-1">
                  Ask me anything here!
                </p>
              </div>

              {/* Hand-drawn Curly Arrow SVG */}
              <svg
                width="80"
                height="65"
                viewBox="0 0 80 65"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="mr-8 mt-1 overflow-visible"
              >
                {/* Curly pointer line */}
                <motion.path
                  d="M 65 5 C 50 15, 30 0, 20 20 C 10 40, 35 45, 45 35 C 50 30, 48 22, 35 25 C 20 28, 22 45, 28 52"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  className="text-amber-500/80 dark:text-primary"
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 5,
                    times: [0, 0.3, 0.9, 1],
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
                {/* Arrow head */}
                <motion.path
                  d="M 20 46 L 28 52 L 32 43"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-amber-500/80 dark:text-primary"
                  animate={{ pathLength: [0, 0, 1, 1, 0], opacity: [0, 0, 1, 1, 0] }}
                  transition={{
                    duration: 5,
                    times: [0, 0.25, 0.35, 0.9, 1],
                    repeat: Infinity,
                    ease: "easeOut"
                  }}
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Button */}
      <div className="fixed bottom-10 right-10 z-50">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setboxOpen(!chatBoxOpen)}
          className="relative w-14 h-14 rounded-full bg-card border border-primary/30 dark:border-primary/20 text-primary hover:border-primary/50 shadow-[0_4px_20px_rgba(200,169,96,0.15)] flex items-center justify-center cursor-pointer transition-all duration-300 group"
        >
          {/* Accent Pulse Halo behind the button */}
          <div className="absolute inset-0 rounded-full bg-primary/10 border border-primary/30 animate-ping opacity-75 group-hover:animate-none pointer-events-none" />
          <Bot size={26} className="group-hover:rotate-12 transition-transform duration-300" />
        </motion.button>
      </div>

      {/* Chatbox Component */}
      <AnimatePresence>
        {chatBoxOpen && <AIchatbot open={chatBoxOpen} onClose={() => setboxOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default AIChatButton;
