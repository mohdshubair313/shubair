"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Github, ArrowLeft } from "lucide-react";

const projects = [
  {
    title: "TradeInsight",
    description:
      "A FastAPI service that analyzes market data and provides trade opportunity insights for specific sectors in India.",
    image: "/pro6.png",
    link: "https://trade-opportunity-by-ai.vercel.app/",
    github: "https://github.com/mohdshubair313/Trade_opportunity_ByAI",
    tags: ["FastAPI", "AI", "Market Analysis", "Trading"],
  },
  {
    title: "Friends AI",
    description:
      "AI-based virtual friend that understands emotions and provides meaningful conversations powered by advanced language models.",
    image: "/pro1.png",
    link: "https://friends-ai-sunf.vercel.app/",
    github: "#",
    tags: ["AI", "Next.js", "Groq", "Emotion AI"],
  },
  {
    title: "Chaty AI",
    description:
      "Intelligent research assistant that helps with papers, resume improvements, and contextual Q&A using vector embeddings and LLMs.",
    image: "/pro5.png",
    link: "https://chaty-ai.vercel.app/",
    github: "https://github.com/mohdshubair313/ChatyBackend/",
    tags: ["Chatbot", "RAG", "LangChain", "AI"],
  },
  {
    title: "Bollyscript AI",
    description:
      "AI-powered Bollywood script generation platform that creates movie scripts with custom scenes, dialogues, and characters.",
    image: "/bollyProjectImages/bollyPro1.png",
    link: "https://bollyscript.vercel.app",
    github: "#",
    tags: ["Next.js", "OpenAI", "AI", "Creativity"],
  },
  {
    title: "Next Stripe",
    description:
      "Premium subscription management platform with Stripe payment gateway integration for seamless billing experiences.",
    image: "/pro2.png",
    link: "https://next-stripe-smoky.vercel.app/",
    github: "#",
    tags: ["Stripe", "Payments", "Next.js", "SaaS"],
  },
  {
    title: "iPhone Landing Page",
    description:
      "Stunning 3D landing page for iPhone featuring smooth animations and interactive product showcase.",
    image: "/pro3.png",
    link: "https://apple3-d-page-sepia.vercel.app/",
    github: "https://github.com/mohdshubair313/Apple3DPage",
    tags: ["3D", "GSAP", "Three.js", "Animations"],
  },
  {
    title: "Travelbook",
    description:
      "Takes the pain out of vacation planning. Handles tickets, stays, and meals — all tailored to your budget with an AI chatbot concierge.",
    image: "/pro4.png",
    link: "#",
    github: "https://github.com/mohdshubair313/Travelbook",
    tags: ["AI", "Travel", "Next.js", "Chatbot"],
    underDev: true,
  },
];

const ProjectCard = ({ project }: { project: (typeof projects)[number] }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group flex flex-col gap-3">
      {/* Project Image */}
      <a
        href={project.underDev ? undefined : project.link}
        target="_blank"
        rel="noopener noreferrer"
        className={project.underDev ? "cursor-default" : "cursor-pointer"}
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900">
          {!imgError ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              onError={() => setImgError(true)}
              sizes="(max-width: 640px) 100vw, 50vw"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-neutral-500 text-sm">
              {project.title}
            </div>
          )}
        </div>
      </a>

      {/* Project Info */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium text-neutral-900 dark:text-white">
              {project.title}
            </h3>
            {project.underDev && (
              <span className="inline-flex items-center gap-1 text-[9px] font-medium text-yellow-600 dark:text-yellow-400 border border-yellow-500/30 bg-yellow-500/10 px-1.5 py-0.5 rounded-full">
                <span className="w-1 h-1 rounded-full bg-yellow-500 animate-pulse" />
                In dev
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            {project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
              </a>
            )}
            {!project.underDev && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 text-[10px] rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 dark:text-neutral-400 font-mono"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-0">
      <div className="section-card flex flex-col">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>

        {/* Header */}
        <h1 className="font-serif text-4xl tracking-wide text-neutral-900 dark:text-white mb-2">
          Projects
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed max-w-md">
          Exploring web development, AI integration, and creating digital experiences.
        </p>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 pt-6 border-t border-dotted border-neutral-200 dark:border-neutral-800 text-center">
          <a
            href="https://github.com/mohdshubair313"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
          >
            <Github className="w-4 h-4" />
            View GitHub Profile
          </a>
        </div>
      </div>
    </div>
  );
}
