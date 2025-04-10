"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";
import ZoomBlurCard from "@/components/ui/zoom-blur-card";
import { motion } from "framer-motion";
import Link from "next/link";

const projects = [
  {
    title: "Friends AI",
    description: "AI-based virtual friend that understands emotions.",
    imageUrl: "/pro1.png",
    link: "https://friends-ai-sunf.vercel.app/"
  },
  {
    title: "Next Stripe",
    description: "Purchase your premium subscription with stripe payment gateway",
    imageUrl: "/pro2.png",
    link: "https://next-stripe-smoky.vercel.app/"
  },
  {
    title: "IphoneLandingPage",
    description: "A landing page for iPhone 14 Pro Max",
    imageUrl: "/pro3.png",
    link: "https://apple3-d-page-sepia.vercel.app/"
  },
];

const ProjectsPage = () => {
  return (
    <div className="inset-0 -z-10 w-full flex flex-col items-center justify-center pb-10 antialiased overflow-hidden">
      {/* ✅ Spotlight Background */}
      <div className="absolute inset-0 w-full h-full overflow-hidden bg-gradient-to-br from-pink-100 via-orange-100 to-blue-100 blur-3xl opacity-60 dark:opacity-0">
      <div className="absolute inset-0 bg-gradient-to-br from-[#3a4f81] via-[#1e293b] to-[#334155] blur-2xl opacity-0 dark:opacity-50"></div>
        <Spotlight />
      </div>

      {/* ✅ Section Header */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl mt-24 md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-900 mb-12"
      >
        My Projects !
      </motion.h1>

      {/* ✅ Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 w-full max-w-5xl px-4">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Link href={project.link}>
            <ZoomBlurCard
              title={project.title}
              description={project.description}
              imageUrl={project.imageUrl}
              link={project.link}
            />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;