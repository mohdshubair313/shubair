"use client";

import { useState, useEffect } from "react";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  link: string;
  github: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "TradeInsight",
    subtitle: "AI Market Analysis",
    description:
      "A FastAPI service that analyzes market data and provides trade opportunity insights for specific sectors in India.",
    tags: ["FastAPI", "AI", "Market Analysis", "Trading"],
    link: "https://trade-opportunity-by-ai.vercel.app/",
    github: "https://github.com/mohdshubair313/Trade_opportunity_ByAI",
    image: "/pro6.png",
  },
  {
    title: "Friends AI",
    subtitle: "Emotion-Aware Chatbot",
    description:
      "AI virtual friend that understands emotions and provides meaningful conversations powered by advanced language models.",
    tags: ["Python", "FastAPI", "Transformers", "React"],
    link: "https://friends-ai-sunf.vercel.app",
    github: "#",
    image: "/pro1.png",
  },
  {
    title: "Chaty AI",
    subtitle: "PDF-RAG Chatbot",
    description:
      "Intelligent research assistant that understands documents, answers questions contextually, and extracts insights using vector embeddings and LLMs.",
    tags: ["Next.js", "LangChain", "Pinecone", "OpenAI"],
    link: "https://chaty-ai.vercel.app",
    github: "https://github.com/mohdshubair313/ChatyBackend",
    image: "/pro5.png",
  },
  {
    title: "Bollyscript AI",
    subtitle: "AI Script Writer",
    description:
      "AI-powered Bollywood script generation platform that creates movie scripts with custom scenes, dialogues, and characters.",
    tags: ["Next.js", "OpenAI", "AI", "Creativity"],
    link: "https://bollyscript.vercel.app",
    github: "#",
    image: "/bollyProjectImages/bollyPro1.png",
  },
];

const ProjectCard = ({ project }: { project: Project }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="group flex flex-col gap-3">
      {/* Project Image */}
      <a
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        className="block relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900"
      >
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
          <div className="flex items-center justify-center h-full text-muted-foreground text-sm">
            {project.title}
          </div>
        )}
      </a>

      {/* Project Info */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-neutral-900 dark:text-white hover:underline underline-offset-4 transition-all"
          >
            {project.title}
          </a>
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
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
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

const FeaturedWork = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div id="projects" data-section="Projects" className="flex w-full flex-col scroll-mt-24">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white">
          Projects
        </h3>
        <a
          href="/projects"
          className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          View all →
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </div>
  );
};

export default FeaturedWork;
