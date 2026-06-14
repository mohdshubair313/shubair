"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Terminal, Tv, Sparkles, Play } from "lucide-react";

export default function VideoWalkthrough() {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section id="walkthrough" className="relative py-8 md:py-12 overflow-hidden bg-background">
      <div className="max-w-4xl mx-auto px-6">
        {/* Video Mockup Container */}
        <div className="relative">
          
          {/* Animated Handwriting Cue */}
          {!isPlaying && (
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{
                repeat: Infinity,
                duration: 4,
                ease: "easeInOut"
              }}
              className="absolute -top-14 right-4 hidden md:flex items-center gap-3 select-none pointer-events-none z-20 max-w-[280px]"
            >
              <span className="font-caveat text-2xl text-amber-500 font-bold rotate-[-3deg] tracking-wider text-center leading-snug drop-shadow-sm">
                Bored of reading only text? <br /> Let&apos;s talk in video! 🎬
              </span>
              <svg width="50" height="45" viewBox="0 0 50 45" fill="none" className="text-amber-500/80 transform scale-x-[-1] rotate-[10deg] mt-6 flex-shrink-0">
                <motion.path
                  d="M 10 10 C 25 5, 42 12, 38 32 M 38 32 L 28 30 M 38 32 L 42 22"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 5,
                    times: [0, 0.3, 0.9, 1],
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative bg-stone-950 rounded-2xl border border-stone-800/80 shadow-2xl overflow-hidden group"
          >
            {/* Browser Window Header */}
            <div className="flex items-center justify-between px-5 py-3 bg-stone-900/80 border-b border-stone-800/60">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="text-stone-500 text-[11px] font-mono ml-2.5 flex items-center gap-1.5">
                  <Terminal size={10} className="text-primary/60" />
                  shubair.dev/showcase
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-stone-600 font-mono">
                <Tv size={10} className="text-primary/60" />
                <span>HD</span>
              </div>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video w-full bg-black">
              {!isPlaying ? (
                <div 
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-stone-950/90 cursor-pointer group/overlay transition-all duration-300"
                >
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-stone-950 shadow-2xl shadow-primary/25 border border-primary/40 group-hover/overlay:bg-primary/90 transition-colors z-10"
                  >
                    <Play size={22} fill="currentColor" className="ml-0.5" />
                  </motion.div>
                  
                  <div className="text-center mt-4 z-10 space-y-0.5">
                    <p className="text-xs font-semibold text-stone-300 tracking-wide font-heading uppercase flex items-center justify-center gap-1.5">
                      <Sparkles size={12} className="text-primary animate-pulse" />
                      Play Demo
                    </p>
                    <p className="text-[10px] text-stone-600 font-mono">5 min walkthrough</p>
                  </div>

                  <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                </div>
              ) : (
                <iframe
                  src="https://www.loom.com/embed/02ef3b53bee74c939365b86604573b8d?hide_owner=true&hide_share=true&hide_title=true&hideEmbedTopBar=true&autoplay=1"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
