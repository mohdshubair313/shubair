"use client";

import { motion } from "framer-motion";
import { BlogCard } from "./BlogCard";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

interface Blog {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
}

interface BlogGridProps {
  blogs: Blog[];
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

export function BlogGrid({ blogs }: BlogGridProps) {
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
              Thoughts & Stories
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
              My <span className="text-primary font-semibold">Blog</span>
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Exploring the world of technology, development, and AI through
            in-depth articles and tutorials.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-center gap-8 mt-10"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-heading font-medium text-sm tracking-wider uppercase">{blogs.length} Articles</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto space-y-6"
        >
          {blogs.map((blog, index) => (
            <BlogCard
              key={blog.slug}
              slug={blog.slug}
              title={blog.title}
              summary={blog.summary}
              publishedAt={blog.publishedAt}
              index={index}
            />
          ))}
        </motion.div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              No blog posts yet. Check back soon!
            </p>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-20"
        >
          <p className="text-muted-foreground mb-4">Want to stay updated?</p>
          <Link
            href="https://x.com/Shubair313"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-card text-foreground font-heading font-semibold text-sm
            hover:bg-secondary hover:border-primary/30 transition-all border border-border/50 shadow-md cursor-pointer"
          >
            Follow me on X
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
