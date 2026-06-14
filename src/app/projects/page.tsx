"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, Sparkles, Layers, Volume2, VolumeX } from "lucide-react";


const projects = [
  {
    title: "Friends AI",
    description:
      "AI-based virtual friend that understands emotions and provides meaningful conversations powered by advanced language models. User can interact with voice and live chat mode in premium section.",
    images: ["/pro1.png", "/pro4.png", "/pro5.png"],
    link: "https://friends-ai-sunf.vercel.app/",
    github: "#",
    tags: ["AI", "Next.js", "Groq", "Emotion AI"],
  },
  {
    title: "Next Stripe",
    description:
      "Premium subscription management platform with Stripe payment gateway integration for seamless billing experiences.",
    images: ["/pro2.png", "/pro6.png", "/pro3.png"],
    link: "https://next-stripe-smoky.vercel.app/",
    github: "#",
    tags: ["Stripe", "Payments", "Next.js", "SaaS"],
  },
  {
    title: "iPhone Landing Page",
    description:
      "Stunning 3D landing page for iPhone 14 Pro Max featuring smooth animations and interactive product showcase.",
    images: ["/pro3.png", "/pro2.png", "/pro1.png"],
    link: "https://apple3-d-page-sepia.vercel.app/",
    github: "https://github.com/mohdshubair313/Apple3DPage",
    tags: ["3D", "GSAP", "Three.js", "Animations"],
  },
  {
    title: "Chaty AI",
    description:
      "Intelligent research assistant that helps with papers, resume improvements, and even resume roasting with AI humor.",
    images: ["/pro5.png", "/pro1.png", "/pro6.png"],
    link: "https://chaty-ai.vercel.app/",
    github: "https://github.com/mohdshubair313/ChatyBackend/",
    tags: ["Chatbot", "RAG", "LangChain", "AI"],
  },
  {
    title: "Trade AI",
    description: "A FastAPI service that analyzes market data and provides trade opportunity insights for specific sectors in India.",
    images: ["/pro6.png", "/pro4.png", "/pro5.png"],
    link: "https://trade-opportunity-by-ai.vercel.app/",
    github: "https://github.com/mohdshubair313/Trade_opportunity_ByAI",
    tags: ["FastAPI", "AI", "Market Analysis", "Trading"],
  },
  {
    title: "Travelbook",
    description: "Ever noticed how a 'relaxing vacation' starts with weeks of stressful planning? Travelbook takes the pain out. We handle the tickets, the stays, and the meals, all tailored to your budget. Equipped with an AI-powered Chatbot concierge.",
    images: ["/pro4.png", "/pro6.png", "/pro3.png"],
    link: "this is under development",
    github: "https://github.com/mohdshubair313/Travelbook",
    tags: ["AI", "Travel", "Next.js", "Chatbot"],
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 100,
    },
  },
};

// Web Audio API Synthesizer note player
let audioCtx: AudioContext | null = null;
const playSynthNote = (pitch: number, duration = 0.2) => {
  try {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(pitch, audioCtx.currentTime);

    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.05, audioCtx.currentTime + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (error) {
    console.error("Synthesizer error:", error);
  }
};

const ProjectCard = ({
  project,
  soundEnabled,
}: {
  project: typeof projects[number];
  soundEnabled: boolean;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  useEffect(() => {
    if (!isHovered) {
      setImageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setImageIndex((prev) => {
        const next = (prev + 1) % project.images.length;
        if (soundEnabled) {
          const notes = [523.25, 659.25, 783.99]; // C5, E5, G5 arpeggio
          playSynthNote(notes[next % notes.length], 0.25);
        }
        return next;
      });
    }, 1200);

    if (soundEnabled) {
      playSynthNote(523.25, 0.25); // C5
    }

    return () => clearInterval(interval);
  }, [isHovered, soundEnabled, project.images.length]);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col h-full bg-card border border-border/50 rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:border-primary/40 laser-sweep z-10 shadow-sm hover:shadow-md"
    >
      {/* Project Screenshot Background with Crossfade - Top half */}
      <div className="relative w-full h-48 sm:h-52 md:h-56 overflow-hidden bg-stone-950 border-b border-border/40 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.img
            key={imageIndex}
            src={project.images[imageIndex]}
            alt={project.title}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full h-full object-cover"
          />
        </AnimatePresence>
        {/* Subtle overlay inside image to feel sleek */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Card Content - Bottom half */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title and links row */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col gap-0.5">
            <h3 className="text-lg md:text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            {project.github !== "#" && (
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-300 p-1.5 rounded-lg hover:bg-secondary/80 border border-transparent hover:border-border/40"
                title="View Code"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </Link>
            )}
            {project.link !== "#" && project.link !== "this is under development" && (
              <Link
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-300 p-1.5 rounded-lg hover:bg-secondary/80 border border-transparent hover:border-border/40"
                title="Live Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {project.description}
        </p>

        {/* Footer: tags and status */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t border-border/30 mt-auto">
          <div className="flex flex-wrap gap-1.5 max-w-[70%]">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-[9px] font-semibold font-mono rounded bg-secondary border border-border/40 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Pulse Status Badge */}
          {project.link === "this is under development" ? (
            <div className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] font-semibold border border-amber-500/30 bg-amber-500/10 text-amber-400 select-none">
              <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Under Dev</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[9px] font-semibold border border-green-500/30 bg-green-500/10 text-green-400 select-none">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span>Completed</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover Glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-amber-500 rounded-xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10 pointer-events-none" />
    </div>
  );
};

export default function ProjectsPage() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Sync sound state from local storage
  useEffect(() => {
    const saved = localStorage.getItem("portfolio-sound-enabled");
    if (saved === "true") {
      setSoundEnabled(true);
    }
  }, []);

  const toggleSound = () => {
    const newVal = !soundEnabled;
    setSoundEnabled(newVal);
    localStorage.setItem("portfolio-sound-enabled", String(newVal));

    if (newVal) {
      playSynthNote(523.25, 0.15); // C5
      setTimeout(() => playSynthNote(659.25, 0.15), 100); // E5
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-background">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
          style={{ opacity: 0.6 }}
        />
        {/* Subtle top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      </div>

      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border/50 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">
              Featured Work
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 font-heading tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-foreground">
              My <span className="text-primary font-semibold">Projects</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Explore my latest work in web development, AI integration, and
            creating stunning digital experiences.
          </motion.p>

          {/* Stats & Sound Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-8 mt-10"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <Layers className="w-5 h-5 text-primary" />
              <span className="font-heading font-medium text-sm tracking-wider uppercase">
                {projects.length} Projects
              </span>
            </div>

            {/* Sound Toggle */}
            <motion.button
              onClick={toggleSound}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-heading font-semibold tracking-wider transition-all duration-300 cursor-pointer ${
                soundEnabled
                  ? "bg-primary text-black border-primary shadow-sm shadow-primary/20"
                  : "bg-card text-muted-foreground border-border hover:text-foreground"
              }`}
              animate={!soundEnabled ? { rotate: [0, -1, 1, -1, 1, 0] } : {}}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2.5,
                delay: 1,
              }}
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                  <span>SOUND: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span>SOUND: OFF</span>
                </>
              )}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {projects.map((project) => (
            <motion.div key={project.title} variants={itemVariants}>
              <ProjectCard project={project} soundEnabled={soundEnabled} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-muted-foreground mb-4">Want to see more?</p>
          <Link
            href="https://github.com/mohdshubair313"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card text-foreground font-heading font-semibold text-sm
            hover:bg-secondary hover:border-primary/30 transition-all border border-border/50 shadow-md cursor-pointer"
          >
            <Github className="w-5 h-5 text-primary" />
            View GitHub Profile
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
