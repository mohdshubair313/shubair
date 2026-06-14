"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

interface Experience {
  id: number;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  skills: string[];
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "Bestlatech Solutions",
    position: "MERN Stack Intern",
    startDate: "August 2025",
    endDate: "October 2025",
    location: "Remote",
    description: "Worked on full stack projects like social media, e-commerce with tech stack Django, React, Nodejs, mongodb etc.",
    skills: ["React", "Node.js", "Django", "MongoDB"],
  },
  {
    id: 2,
    company: "Stealth Startup",
    position: "Full Stack Developer",
    startDate: "December 2025",
    endDate: "Current",
    location: "Remote",
    description: "Developed and deployed multiple client projects with different technologies, implemented CI/CD pipelines, and optimized application performance.",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
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

export default function ExperiencePage() {
  const [activeExperience, setActiveExperience] = useState<number | null>(null);

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
            <span className="font-heading text-xs font-semibold tracking-wider text-muted-foreground uppercase">Professional Journey</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 font-heading tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <span className="text-foreground">
              My <span className="text-primary font-semibold">Experience</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            My professional journey through the tech industry, building impactful solutions and growing as a developer.
          </motion.p>
        </motion.div>

        {/* Journey Graph / Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl mx-auto"
        >
          {/* Timeline Line */}
          <div className="relative">
            {/* Central Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 md:-translate-x-1/2" />

            {/* Experience Items */}
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                variants={itemVariants}
                className={`relative flex items-start gap-8 mb-16 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
                onMouseEnter={() => setActiveExperience(exp.id)}
                onMouseLeave={() => setActiveExperience(null)}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-background border-2 border-primary z-10 md:-translate-x-1/2 mt-6">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary opacity-0"
                    animate={{
                      opacity: activeExperience === exp.id ? 1 : 0,
                      scale: activeExperience === exp.id ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                {/* Content Card */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${
                  index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                }`}>
                  <motion.div
                    className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 p-6 hover:border-primary/40 transition-all duration-500 shadow-md"
                    whileHover={{ y: -5 }}
                  >
                    {/* Subtle Overlay on Hover */}
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none" />

                    {/* Header info */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-1">
                        <h3 className="font-heading text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                          {exp.position}
                        </h3>
                        <p className="text-primary font-heading font-semibold text-sm mt-1">{exp.company}</p>
                      </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground mb-4 font-mono">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-primary/70" />
                        {exp.startDate} - {exp.endDate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-primary/70" />
                        {exp.location}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm md:text-base">
                      {exp.description}
                    </p>

                    {/* Skills */}
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-xs font-medium rounded-full bg-[#1c1c1e] text-muted-foreground border border-border/50
                          group-hover:bg-primary/10 group-hover:text-primary group-hover:border-primary/30 transition-all font-mono"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>

                    {/* Hover Glow */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-amber-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10" />
                  </motion.div>
                </div>

                {/* Empty space for alternating layout */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-muted-foreground mb-4">Want to work together?</p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-[#09090B] font-heading font-semibold text-sm
            hover:bg-primary/90 transition-all shadow-md cursor-pointer"
          >
            Get in Touch
            <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
