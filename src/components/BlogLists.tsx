// components/BlogList.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Blog {
  slug: string;
  publishedAt: string;
  title: string;
  summary: string;
}

export default function BlogList({ blogs }: { blogs: Blog[] }) {
  return (
    <motion.div
      className="mt-16 grid gap-8 sm:grid-cols-2 max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
    >
      {blogs.map((blog) => (
        <motion.div
          key={blog.slug}
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 90, damping: 12 }}
          className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
        >
          <div className="text-sm text-zinc-400">{blog.publishedAt}</div>
          <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
          <p className="text-zinc-300 line-clamp-3 mb-4">{blog.summary}</p>
          <Link
            href={`/blogs/${blog.slug}`}
            className="inline-flex items-center text-sm text-blue-400 hover:underline group"
          >
            Read more
            <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
