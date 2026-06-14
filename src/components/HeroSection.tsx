"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getCalApi } from "@calcom/embed-react";

const roles = [
  "AI Engineer",
  "Full-Stack Developer",
  "System Architect",
  "Problem Solver",
];

const HeroSection = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [time, setTime] = useState("");

  // Initialize Cal.com Pop-up Scheduler
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ namespace: "meeting" });
      cal("ui", {
        styles: { branding: { brandColor: "#C8A960" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
    })();
  }, []);

  const handleLetsTalk = async () => {
    try {
      const cal = await getCalApi({ namespace: "meeting" });
      cal("modal", {
        calLink: "mohdshubair313/30min",
        config: { layout: "month_view" },
      });
    } catch (error) {
      console.error("Cal.com load error:", error);
      window.open("https://cal.com/mohdshubair313/30min", "_blank");
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      setTime(ist.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative py-12 md:py-16 flex items-center overflow-hidden bg-background"
    >
      {/* Subtle background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.03] blur-[120px] bg-primary" />
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full opacity-[0.02] blur-[100px] bg-primary" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 md:py-12">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap items-center gap-3 mb-6 relative"
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-xs font-medium text-primary border border-primary/20">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Available for work
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary border border-border/50 text-xs font-mono text-muted-foreground">
              <span className="w-0.5 h-3.5 bg-muted-foreground/40 rounded-sm" />
              IST {time}
            </span>

            {/* Fancy Modern Handwriting Cue (Dribbble Inspired) */}
            <motion.div 
              animate={{ y: [0, -4, 0] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut"
              }}
              className="absolute left-full ml-6 top-[-15px] hidden lg:flex items-center gap-2 select-none pointer-events-none w-[260px]"
            >
              <svg width="40" height="35" viewBox="0 0 40 35" fill="none" className="text-primary/70 transform -rotate-12 flex-shrink-0">
                <motion.path 
                  d="M 5 28 C 15 20, 28 15, 35 8 C 32 12, 28 20, 20 23 C 15 25, 12 22, 14 16 C 16 10, 25 6, 30 14" 
                  stroke="currentColor" 
                  strokeWidth="1.5" 
                  strokeLinecap="round" 
                  animate={{ pathLength: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                  transition={{
                    duration: 5,
                    times: [0, 0.25, 0.9, 1],
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </svg>
              <span className="font-reenie text-3xl text-primary font-normal tracking-wider rotate-3 translate-y-1">
                Crafting with speed of light ⚡
              </span>
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="heading-xl mb-3 text-foreground font-heading"
          >
            I build{" "}
            <span className="text-primary">intelligent systems</span>
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>and pixel‑perfect{" "}
            <span className="text-primary">experiences</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="flex items-center gap-2 text-lg md:text-xl text-muted-foreground mb-4"
          >
            <span>I&rsquo;m a</span>
            <span className="relative inline-block w-[180px] md:w-[210px] h-[1.3em] overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="absolute inset-0 font-semibold text-foreground font-heading"
                >
                  {roles[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-8"
          >
            Full-stack engineer and AI specialist building intelligent systems and pixel-perfect developer experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="flex flex-wrap gap-4 items-center mb-8"
          >
            <a
              href="#work"
              className="laser-sweep inline-flex items-center px-7 py-3 rounded-full bg-primary text-[#09090B] font-heading font-semibold hover:bg-primary/95 transition-all duration-200 text-sm shadow-[0_4px_20px_rgba(200,169,96,0.25)] relative overflow-hidden cursor-pointer"
            >
              See my work
            </a>
            
            <button
              onClick={handleLetsTalk}
              className="inline-flex items-center px-7 py-3 rounded-full border border-primary/30 font-heading font-semibold text-foreground hover:bg-secondary hover:border-primary/50 transition-all duration-200 text-sm cursor-pointer"
            >
              Let&rsquo;s talk
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap gap-2"
          >
            {["React", "Next.js", "Python", "AI/ML", "Node.js", "TypeScript"].map(
              (tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 text-[11px] rounded-full bg-secondary border border-border/50 text-muted-foreground font-mono"
                >
                  {tag}
                </span>
              )
            )}
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
