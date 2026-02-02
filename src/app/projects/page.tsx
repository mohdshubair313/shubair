"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink, Github, Sparkles, Layers } from "lucide-react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/3d-card";

const projects = [
  {
    title: "Friends AI",
    description:
      "AI-based virtual friend that understands emotions and provides meaningful conversations powered by advanced language models. User can interact with voice and live chat mode in premium sectio ",
    imageUrl: "/pro1.png",
    link: "https://friends-ai-sunf.vercel.app/",
    github: "#",
    tags: ["AI", "Next.js", "OpenAI", "Emotion AI"],
    color: "from-pink-500 to-rose-500",
  },
  {
    title: "Next Stripe",
    description:
      "Premium subscription management platform with Stripe payment gateway integration for seamless billing experiences.",
    imageUrl: "/pro2.png",
    link: "https://next-stripe-smoky.vercel.app/",
    github: "#",
    tags: ["Stripe", "Payments", "Next.js", "SaaS"],
    color: "from-violet-500 to-purple-500",
  },
  {
    title: "iPhone Landing Page",
    description:
      "Stunning 3D landing page for iPhone 14 Pro Max featuring smooth animations and interactive product showcase.",
    imageUrl: "/pro3.png",
    link: "https://apple3-d-page-sepia.vercel.app/",
    github: "https://github.com/mohdshubair313/Apple3DPage",
    tags: ["3D", "GSAP", "Three.js", "Animations"],
    color: "from-cyan-500 to-blue-500",
  },
  {
    title: "Chaty AI",
    description:
      "Intelligent research assistant that helps with papers, resume improvements, and even resume roasting with AI humor.",
    imageUrl: "/pro5.png",
    link: "https://chaty-ai.vercel.app/",
    github: "https://github.com/mohdshubair313/ChatyBackend/",
    tags: ["Chatbot", "RAG", "LangChain", "AI"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    title: "Trade AI",
    description: "A FastAPI service that analyzes market data and provides trade opportunity insights for specific sectors in India.",
    imageUrl: "/pro6.png",
    link: "https://trade-opportunity-by-ai.vercel.app/",
    github: "https://github.com/mohdshubair313/Trade_opportunity_ByAI",
    tags: ["FastAPI", "AI", "Market Analysis", "Trading"],
    color: "from-yellow-500 to-amber-500",
  },
  {
    title: "Travelbook",
    description: `Ever noticed how a 'relaxing vacation' starts with weeks of stressful planning? Between the endless scrolling for flights, the hunt for a budget hotel that doesn't look like a basement, and the struggle to find decent veg/non-veg food—your holiday feels like a second job. Stop planning, start tripping. Introducing Travelbook: The only travel partner you’ll ever need. We handle the tickets, the stays, and the meals, all tailored to your budget. And for our Premium Tribe, our AI-powered Chatbot acts as your personal concierge—analyzing thousands of options to handpick the perfect experience for you. You just pack the bags; we’ll handle the rest`,
    imageUrl: "/pro4.png",
    link: "this is under development",
    github: "https://github.com/mohdshubair313/Travelbook",
    tags: ["AI", "Travel", "Next.js", "Chatbot"],
    color: "from-amber-500 to-orange-500",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
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

export default function ProjectsPage() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Light Mode Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-300/30 dark:bg-purple-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-300/30 dark:bg-cyan-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-[150px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
          style={{ opacity: 0.5 }}
        />
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur-sm mb-8"
          >
            <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-slate-300">
              Featured Work
            </span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-slate-200 dark:to-slate-400">
              My Projects
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-gray-600 dark:text-slate-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Explore my latest work in web development, AI integration, and
            creating stunning digital experiences.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-8 mt-10"
          >
            <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
              <Layers className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
              <span className="font-medium">{projects.length} Projects</span>
            </div>
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
              <CardContainer containerClassName="w-full">
                <CardBody className="relative group w-full h-auto">
                  <div
                    className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 backdrop-blur-sm
                    hover:border-cyan-500/30 transition-all duration-500"
                  >
                    {/* Gradient Border Effect */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-2xl`}
                    />

                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                      {project.imageUrl ? (
                        <motion.img
                          src={project.imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.4 }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center">
                          <span className="text-6xl font-bold text-gray-300 dark:text-slate-700">
                            {project.title[0]}
                          </span>
                        </div>
                      )}

                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 via-white/50 dark:via-slate-900/50 to-transparent" />

                      {/* Tags */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-medium rounded-full bg-white/80 dark:bg-black/30 backdrop-blur-sm text-gray-700 dark:text-white/80 border border-gray-200 dark:border-white/10"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <CardItem translateZ={30}>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          {project.title}
                        </h3>
                      </CardItem>

                      <CardItem translateZ={20}>
                        <p className="text-gray-600 dark:text-slate-400 text-sm leading-relaxed mb-6">
                          {project.description}
                        </p>
                      </CardItem>

                      {/* Actions */}
                      <CardItem translateZ={40}>
                        <div className="flex items-center gap-3">
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r ${project.color} text-white font-medium text-sm
                            hover:opacity-90 transition-opacity`}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </Link>

                          {project.github !== "#" && (
                            <Link
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white font-medium text-sm
                              hover:bg-gray-200 dark:hover:bg-white/10 transition-colors border border-gray-200 dark:border-white/10"
                            >
                              <Github className="w-4 h-4" />
                              Code
                            </Link>
                          )}
                        </div>
                      </CardItem>
                    </div>

                    {/* Hover Glow */}
                    <div
                      className={`absolute -inset-0.5 bg-gradient-to-r ${project.color} rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10`}
                    />
                  </div>
                </CardBody>
              </CardContainer>
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
          <p className="text-gray-600 dark:text-slate-400 mb-4">Want to see more?</p>
          <Link
            href="https://github.com/shubair313"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white font-medium
            hover:bg-gray-200 dark:hover:bg-white/10 transition-colors border border-gray-200 dark:border-white/10"
          >
            <Github className="w-5 h-5" />
            View GitHub Profile
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
