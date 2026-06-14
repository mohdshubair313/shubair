"use client";
import { useState, useEffect } from "react";
import AIchatbot from "./AIchatbot";
import { Bot, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AIChatButton = () => {
  const [chatBoxOpen, setboxOpen] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Show the annotation after a short delay
    const timer = setTimeout(() => setShowLabel(true), 2500);
    // Auto-dismiss after some time
    const dismiss = setTimeout(() => setDismissed(true), 12000);
    return () => {
      clearTimeout(timer);
      clearTimeout(dismiss);
    };
  }, []);

  const handleOpen = () => {
    setboxOpen(true);
    setDismissed(true);
  };

  return (
    <>
      {/* Floating annotation + button group */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        {/* Animated annotation label with curly arrow */}
        <AnimatePresence>
          {showLabel && !dismissed && !chatBoxOpen && (
            <motion.div
              initial={{ opacity: 0, x: 10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 5, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center"
            >
              {/* Label pill */}
              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 text-[11px] font-medium shadow-sm whitespace-nowrap cursor-pointer select-none hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                onClick={handleOpen}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Sparkles className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
                Know about me — ask AI
              </motion.div>

              {/* Curly arrow SVG pointing right to the button */}
              <svg
                width="36"
                height="20"
                viewBox="0 0 36 20"
                fill="none"
                className="ml-1 mr-1 text-neutral-400 dark:text-neutral-500 pointer-events-none"
              >
                <motion.path
                  d="M2 10 C10 4, 18 4, 24 10 C28 13, 26 18, 20 16 C16 14, 20 6, 30 10"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                />
                <motion.path
                  d="M26 6 L31 10 L26 14"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 1 }}
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Button */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => {
            if (chatBoxOpen) {
              setboxOpen(false);
            } else {
              handleOpen();
            }
          }}
          className="relative w-11 h-11 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center cursor-pointer shadow-lg shadow-neutral-900/20 dark:shadow-white/10 transition-all duration-300 hover:shadow-xl group shrink-0"
          aria-label={chatBoxOpen ? "Close AI chat" : "Open AI chat"}
        >
          <AnimatePresence mode="wait">
            {chatBoxOpen ? (
              <motion.span
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-4 h-4" />
              </motion.span>
            ) : (
              <motion.span
                key="bot"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Bot className="w-5 h-5" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Subtle pulsing ring when closed */}
          {!chatBoxOpen && (
            <span className="absolute inset-0 rounded-full border border-neutral-900/30 dark:border-white/30 animate-ping opacity-20 pointer-events-none" />
          )}
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
