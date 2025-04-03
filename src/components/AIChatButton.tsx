"use client";
import { useState } from "react";
import AIchatbot from "./AIchatbot";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

const AIChatButton = () => {
  const [chatBoxOpen, setboxOpen] = useState(false);

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setboxOpen(!chatBoxOpen)}
        className="fixed bottom-10 right-10 z-50 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition-all"
      >
        <Bot size={24} />
      </motion.button>
      <AIchatbot open={chatBoxOpen} onClose={() => setboxOpen(false)} />
    </>
  );
};

export default AIChatButton;
