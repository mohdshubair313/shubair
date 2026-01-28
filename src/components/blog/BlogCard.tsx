"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Clock, ArrowUpRight } from "lucide-react";

interface BlogCardProps {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime?: string;
  index: number;
}

export function BlogCard({
  slug,
  title,
  summary,
  publishedAt,
  readingTime = "5 min read",
  index,
}: BlogCardProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <motion.article
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            type: "spring",
            damping: 25,
            stiffness: 100,
            delay: index * 0.1,
          },
        },
      }}
      className="group relative"
    >
      <Link href={`/blogs/${slug}`} className="block">
        <div
          className="relative overflow-hidden rounded-2xl bg-white/80 dark:bg-slate-900/50 border border-gray-200 dark:border-white/10 backdrop-blur-sm
          hover:border-cyan-500/30 transition-all duration-500"
        >
          {/* Gradient Border Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/10 group-hover:via-cyan-500/5 group-hover:to-purple-500/10 transition-all duration-500 rounded-2xl" />

          <div className="relative p-6 md:p-8">
            {/* Top Row - Date & Reading Time */}
            <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-slate-400 mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-slate-600" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readingTime}
              </span>
            </div>

            {/* Title */}
            <h2
              className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400
              transition-colors duration-300 line-clamp-2"
            >
              {title}
            </h2>

            {/* Summary */}
            <p className="text-gray-600 dark:text-slate-400 leading-relaxed mb-6 line-clamp-2">
              {summary}
            </p>

            {/* Read More Link */}
            <div className="flex items-center text-cyan-600 dark:text-cyan-400 font-medium">
              <span className="relative text-sm">
                Read Article
                <span
                  className="absolute bottom-0 left-0 w-0 h-px bg-cyan-600 dark:bg-cyan-400 
                  group-hover:w-full transition-all duration-300"
                />
              </span>
              <ArrowUpRight
                className="w-4 h-4 ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1
                transition-transform duration-300"
              />
            </div>
          </div>

          {/* Hover Glow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
        </div>
      </Link>
    </motion.article>
  );
}
