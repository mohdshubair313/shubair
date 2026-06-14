"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  images: string[];
  size?: "wide" | "tall" | "square";
  featured?: boolean;
}

const projects: Project[] = [
  {
    title: "Chaty AI",
    subtitle: "PDF-RAG Chatbot",
    description:
      "Intelligent research assistant that understands documents, answers questions contextually, and extracts insights using vector embeddings and LLMs. Featured project.",
    tags: ["Next.js", "LangChain", "Pinecone", "OpenAI", "RAG"],
    link: "https://chaty-ai.vercel.app",
    github: "https://github.com/mohdshubair313/ChatyBackend",
    images: ["/pro5.png", "/pro1.png", "/pro6.png"],
    size: "wide",
    featured: true,
  },
  {
    title: "Friends AI",
    subtitle: "Emotion-Aware Chatbot",
    description:
      "AI virtual friend that understands emotions and provides meaningful conversations powered by advanced language models with voice and chat modes.",
    tags: ["Python", "FastAPI", "Transformers", "React", "WebSocket"],
    link: "https://friends-ai-sunf.vercel.app",
    github: "#",
    images: ["/pro1.png", "/pro4.png", "/pro5.png"],
    size: "tall",
    featured: false,
  },
  {
    title: "Next Stripe",
    subtitle: "Payment Platform",
    description:
      "Premium subscription management platform with Stripe payment gateway integration for seamless billing experiences.",
    tags: ["Stripe", "Next.js", "SaaS", "Payments"],
    link: "https://next-stripe-smoky.vercel.app",
    github: "#",
    images: ["/pro2.png", "/pro6.png", "/pro3.png"],
    size: "square",
    featured: false,
  },
  {
    title: "iPhone Landing",
    subtitle: "3D Product Showcase",
    description:
      "Stunning 3D landing page for iPhone featuring smooth animations and interactive product showcase built with Three.js and GSAP.",
    tags: ["3D", "GSAP", "Three.js", "Animations"],
    link: "https://apple3d-page-sepia.vercel.app",
    github: "https://github.com/mohdshubair313/Apple3DPage",
    images: ["/pro3.png", "/pro2.png", "/pro1.png"],
    size: "square",
    featured: false,
  },
];

// Synth audio playing utility
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

    // Envelope configuration: fast attack, organic decay
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.06, audioCtx.currentTime + 0.02);
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
  innerRef,
}: {
  project: Project;
  soundEnabled: boolean;
  innerRef: (el: HTMLDivElement | null) => void;
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
          // Play upward C-major scale note arpeggios depending on index
          const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
          playSynthNote(notes[next % notes.length], 0.25);
        }
        return next;
      });
    }, 1200);

    // Initial note on hover start
    if (soundEnabled) {
      playSynthNote(523.25, 0.25); // C5
    }

    return () => clearInterval(interval);
  }, [isHovered, soundEnabled, project.images.length]);

  return (
    <div
      ref={innerRef}
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
            <span className="text-[10px] font-heading font-bold uppercase tracking-[0.15em] text-primary">
              {project.subtitle}
            </span>
            <h3 className="text-lg md:text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
          </div>

          {/* Action Links */}
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-300 p-1.5 rounded-lg hover:bg-secondary/80 border border-transparent hover:border-border/40"
                title="View Code"
                onClick={(e) => e.stopPropagation()}
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors duration-300 p-1.5 rounded-lg hover:bg-secondary/80 border border-transparent hover:border-border/40"
                title="Live Demo"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
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

const FeaturedWork = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Sync sound setting from local storage
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

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        });
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 87%",
            toggleActions: "play none none reverse",
          },
          y: 30,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative py-16 md:py-20 overflow-hidden bg-background"
    >
      {/* Subtle background light */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-primary/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <div
          ref={headingRef}
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-bold font-heading">Projects</h2>
          </div>

          {/* Sound Toggle Button */}
          <motion.button
            onClick={toggleSound}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2.5 px-4.5 py-2.5 rounded-full border text-xs font-heading font-semibold tracking-wider transition-all duration-300 shadow-sm cursor-pointer ${
              soundEnabled
                ? "bg-primary text-black border-primary shadow-primary/20"
                : "bg-card text-muted-foreground border-border/60 hover:text-foreground"
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
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span>Sound: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span>Sound: OFF</span>
              </>
            )}
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              soundEnabled={soundEnabled}
              innerRef={(el) => {
                cardsRef.current[index] = el;
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
