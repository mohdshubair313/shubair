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
          className="relative overflow-hidden rounded-2xl bg-card border border-border/50
          hover:border-primary/40 transition-all duration-500 shadow-md"
        >
          {/* Gradient Border Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/0 to-transparent group-hover:from-primary/10 group-hover:via-primary/5 group-hover:to-transparent transition-all duration-500 rounded-2xl" />

          <div className="relative p-6 md:p-8">
            {/* Top Row - Date & Reading Time */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formattedDate}
              </span>
              <span className="w-1 h-1 rounded-full bg-border" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readingTime}
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-primary
              transition-colors duration-300 line-clamp-2"
            >
              {title}
            </h2>

            {/* Summary */}
            <p className="text-muted-foreground leading-relaxed mb-6 line-clamp-2 text-sm md:text-base">
              {summary}
            </p>

            {/* Read More Link */}
            <div className="flex items-center text-primary font-medium">
              <span className="relative text-sm font-heading font-semibold">
                Read Article
                <span
                  className="absolute bottom-0 left-0 w-0 h-px bg-primary 
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
          <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-amber-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500 -z-10" />
        </div>
      </Link>
    </motion.article>
  );
}
