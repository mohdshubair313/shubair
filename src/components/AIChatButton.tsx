"use client";
import { useState } from "react";
import AIchatbot from "./AIchatbot";
import { Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AIChatButton = () => {
  const [chatBoxOpen, setboxOpen] = useState(false);

  return (
    <>
      {/* Button Container with aura */}
      <div className="fixed bottom-10 right-10 z-50 group cursor-pointer">
        {/* Glowing pulse behind the button */}
        <motion.div
          animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 blur-xl opacity-60"
        />

        {/* Actual Chat Button */}
        <motion.button
          whileHover={{ scale: 1.15, rotate: 3 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setboxOpen(!chatBoxOpen)}
          className="relative z-10 w-16 h-16 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white shadow-xl transition-all hover:shadow-2xl hover:bg-gradient-to-br from-blue-500 to-purple-600"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            <Bot size={28} className="mx-auto cursor-pointer" />
          </motion.div>
        </motion.button>

        {/* Tooltip on Hover */}
        <div className="absolute -top-10 right-1/2 translate-x-1/2 scale-0 group-hover:scale-100 transition-transform duration-300 text-xs bg-white/20 text-gray bold px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
          Chat with AI
        </div>
      </div>

      {/* Chatbox Component */}
      <AnimatePresence>
        {chatBoxOpen && <AIchatbot open={chatBoxOpen} onClose={() => setboxOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

export default AIChatButton;
