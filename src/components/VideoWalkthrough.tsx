"use client";

import { useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function VideoWalkthrough() {
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setShowLabel(true), 3500);
    const dismiss = setTimeout(() => setDismissed(true), 14000);
    return () => {
      clearTimeout(timer);
      clearTimeout(dismiss);
    };
  }, []);

  const handleOpen = () => {
    setIsExpanded(true);
    setDismissed(true);
  };

  if (!mounted) return null;

  return (
    <>
      {/* Floating annotation + button group */}
      <div className="fixed bottom-6 left-6 z-40 flex items-center gap-2">
        {/* Video trigger circle */}
        <motion.button
          onClick={handleOpen}
          className="relative group cursor-pointer shrink-0"
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          title="Watch demo"
        >
          <div className="relative w-11 h-11 rounded-full bg-neutral-900 dark:bg-white flex items-center justify-center shadow-lg shadow-neutral-900/20 dark:shadow-white/10 transition-all duration-300 group-hover:shadow-xl">
            <Play className="w-4 h-4 text-white dark:text-black ml-0.5" fill="currentColor" />
            {/* Subtle pulse ring */}
            <span className="absolute inset-0 rounded-full border border-neutral-900/30 dark:border-white/30 animate-ping opacity-20 pointer-events-none" />
          </div>
        </motion.button>

        {/* Animated annotation label with curly arrow */}
        <AnimatePresence>
          {showLabel && !dismissed && !isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -5, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex items-center flex-row-reverse"
            >
              {/* Label pill */}
              <motion.div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-300 text-[11px] font-medium shadow-sm whitespace-nowrap cursor-pointer select-none hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
                onClick={handleOpen}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-3 h-3 text-neutral-500 dark:text-neutral-400" fill="currentColor" />
                Watch a quick demo
              </motion.div>

              {/* Curly arrow pointing left to the button */}
              <svg
                width="36"
                height="20"
                viewBox="0 0 36 20"
                fill="none"
                className="ml-1 mr-1 text-neutral-400 dark:text-neutral-500 pointer-events-none"
              >
                <motion.path
                  d="M34 10 C26 4, 18 4, 12 10 C8 13, 10 18, 16 16 C20 14, 16 6, 6 10"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                />
                <motion.path
                  d="M10 6 L5 10 L10 14"
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
      </div>

      {/* Expanded video overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
            onClick={() => setIsExpanded(false)}
          >
            <motion.div
              initial={{ scale: 0.3, opacity: 0, borderRadius: "50%" }}
              animate={{ scale: 1, opacity: 1, borderRadius: "16px" }}
              exit={{ scale: 0.3, opacity: 0, borderRadius: "50%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl aspect-video bg-neutral-950 rounded-2xl shadow-2xl border border-neutral-800"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button — anchored to outer box corner */}
              <button
                onClick={() => setIsExpanded(false)}
                className="absolute -top-3 -right-3 z-20 w-9 h-9 rounded-full bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-900 dark:text-white shadow-lg border border-neutral-200 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-700 hover:scale-110 transition-all duration-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Inner content with overflow hidden */}
              <div className="w-full h-full rounded-2xl overflow-hidden">
                {/* Browser header */}
                <div className="flex items-center px-4 py-2.5 bg-neutral-900 border-b border-neutral-800">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <span className="text-neutral-500 text-[11px] font-mono ml-3">
                    shubair.dev/showcase
                  </span>
                </div>

                {/* Video iframe */}
                <div className="relative w-full" style={{ paddingBottom: "calc(56.25% - 36px)" }}>
                  <iframe
                    src="https://www.loom.com/embed/02ef3b53bee74c939365b86604573b8d?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true&autoplay=1"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
