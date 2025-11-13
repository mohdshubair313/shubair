"use client";
import React from "react";
import ZoomBlurCard from "@/components/ui/zoom-blur-card";
import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "Friends AI",
    description: "AI-based virtual friend that understands emotions.",
    imageUrl: "/pro1.png",
    link: "https://friends-ai-sunf.vercel.app/",
  },
  {
    title: "Next Stripe",
    description: "Purchase your premium subscription with stripe payment gateway",
    imageUrl: "/pro2.png",
    link: "https://next-stripe-smoky.vercel.app/",
  },
  {
    title: "IphoneLandingPage",
    description: "A landing page for iPhone 14 Pro Max",
    imageUrl: "/pro3.png",
    link: "https://apple3-d-page-sepia.vercel.app/",
  },
];

// Animation variants for staggered effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      damping: 20,
      stiffness: 100,
    },
  },
};

const ProjectsPage = () => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* ✅ LIGHT MODE - Stunning Background Gradient - UNCHANGED */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:from-slate-950 dark:via-slate-800 dark:to-slate-550">
        {/* Light Mode Animated gradient orbs - UNCHANGED */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-br from-cyan-200/40 to-blue-300/30 dark:from-cyan-900/30 dark:to-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 dark:opacity-40 animate-blob"></div>
        
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br from-slate-200/40 to-cyan-200/30 dark:from-slate-800/30 dark:to-cyan-800/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 dark:opacity-40 animate-blob animation-delay-2000"></div>
        
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-blue-200/40 to-slate-200/30 dark:from-indigo-900/30 dark:to-slate-800/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 dark:opacity-40 animate-blob animation-delay-4000"></div>

        {/* ✅ DARK MODE - Additional stunning gradient overlays - UNCHANGED */}
        <div className="absolute inset-0 dark:bg-gradient-to-t dark:from-cyan-950/20 dark:via-transparent dark:to-slate-950/20 opacity-0 dark:opacity-100 transition-opacity duration-500"></div>
        
        {/* Animated gradient mesh for dark mode - UNCHANGED */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-indigo-500/10 dark:from-cyan-600/5 dark:via-blue-600/5 dark:to-indigo-600/5 rounded-full filter blur-3xl opacity-0 dark:opacity-60 animate-pulse"></div>
      </div>

      <div className="flex flex-col items-center justify-center py-20 px-4 antialiased relative z-10">
        {/* ✅ Enhanced Section Header with Theme-Aware Gradient Text - UNCHANGED */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            bounce: 0.3,
          }}
          className="mb-16 text-center"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-500 to-slate-600 dark:from-cyan-400 dark:via-blue-400 dark:to-slate-300 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            My Projects !
          </motion.h1>

          <motion.p
            className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore my latest work in web development and AI integration
          </motion.p>
        </motion.div>

        {/* ✅ Staggered Project Cards Grid with ENHANCED BORDERS & SHADOWS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 w-full max-w-5xl"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              variants={cardVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              className="group"
            >
              <Link href={project.link} target="_blank" rel="noopener noreferrer">
                <div className="relative rounded-2xl overflow-hidden 
                  transition-all duration-300 
                  
                  bg-gradient-to-br from-white/80 to-cyan-50/50 dark:from-slate-900/80 dark:to-slate-800/50 
                  backdrop-blur-sm 
                  
                  border-2 border-cyan-200/60 dark:border-cyan-900/30
                  
                  shadow-[0_0_0_1px_rgba(6,182,212,0.1),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(6,182,212,0.15)]
                  dark:shadow-cyan-900/20
                  
                  hover:shadow-[0_0_0_1px_rgba(6,182,212,0.2),0_4px_8px_rgba(0,0,0,0.1),0_20px_32px_rgba(6,182,212,0.25)]
                  dark:hover:shadow-cyan-800/40
                  
                  ring-1 ring-cyan-100/50 dark:ring-cyan-900/20
                  
                  hover:border-cyan-300/80 dark:hover:border-cyan-800/50
                ">
                  <ZoomBlurCard
                    title={project.title}
                    description={project.description}
                    imageUrl={project.imageUrl}
                    link={project.link}
                  />

                  {/* Theme-Aware Gradient Overlay on Hover - UNCHANGED */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 via-transparent to-transparent dark:from-cyan-600/20 dark:via-transparent dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                  {/* Subtle glow effect for dark mode - UNCHANGED */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-500 dark:via-blue-500 dark:to-indigo-500 rounded-2xl opacity-0 dark:group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* ✅ Floating Elements with Dark Mode Support - UNCHANGED */}
        <motion.div
          className="absolute top-1/4 right-10 w-20 h-20 border-2 border-cyan-300/30 dark:border-cyan-700/30 rounded-full"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-10 w-16 h-16 border-2 border-slate-300/30 dark:border-slate-700/30 rounded-lg"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -180, -360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </div>
  );
};

export default ProjectsPage;
