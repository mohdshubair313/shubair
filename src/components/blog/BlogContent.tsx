"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";
import { TableOfContents } from "./TableOfContents";
import { ReactNode } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface BlogContentProps {
  title: string;
  summary: string;
  publishedAt: string;
  readingTime: string;
  author?: string;
  children: ReactNode;
  tocItems: TOCItem[];
}

export function BlogContent({
  title,
  summary,
  publishedAt,
  readingTime,
  author = "Mohd Shubair",
  children,
  tocItems,
}: BlogContentProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleShare = async (platform: "twitter" | "linkedin") => {
    const url = `https://shubair.vercel.app/blogs/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"))}`;
    const twittertext = `Hey found this amazing article by @shubair313: ${title}`;
    const LinkedinText = `Hey found an amazing article by shubair so please give a shot and lets appreciate shubair hard work and you can offer/buy a coffe also for his great work!!`

    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(twittertext)}`,
        "_blank"
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&text=${encodeURIComponent(LinkedinText)}`,
        "_blank"
      );
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-background">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Light Mode Gradient Orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-300/30 dark:bg-cyan-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-300/30 dark:bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-300/20 dark:bg-blue-500/10 rounded-full blur-[150px]" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
          style={{ opacity: 0.5 }}
        />
      </div>

      <div className="relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed top-24 left-4 sm:left-8 z-30"
        >
          <Link
            href="/blogs"
            className="flex items-center gap-2 px-4 py-2 rounded-full
            bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm
            border border-gray-200 dark:border-white/10
            text-gray-600 dark:text-slate-400
            hover:text-cyan-600 dark:hover:text-cyan-400
            hover:border-cyan-300 dark:hover:border-cyan-700
            transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium hidden sm:inline">Back to Blogs</span>
          </Link>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-[1fr_280px] gap-8 lg:gap-12">
            {/* Main Content */}
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              {/* Header */}
              <header className="mb-12">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight"
                >
                  {title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-lg md:text-xl text-gray-600 dark:text-slate-400 mb-8 leading-relaxed"
                >
                  {summary}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-slate-400
                  pb-8 border-b border-gray-200 dark:border-white/10"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    {author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {readingTime}
                  </span>
                </motion.div>
              </header>

              {/* Blog Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="prose prose-slate dark:prose-invert prose-lg max-w-none
                prose-headings:scroll-mt-24
                prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6 prose-h1:mt-12 prose-h1:text-gray-900 dark:prose-h1:text-white
                prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-h2:mt-10
                prose-h2:text-cyan-600 dark:prose-h2:text-cyan-400
                prose-h3:text-xl prose-h3:font-semibold prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-gray-800 dark:prose-h3:text-slate-200
                prose-p:text-gray-600 dark:prose-p:text-slate-400 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-cyan-600 dark:prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 dark:prose-strong:text-white
                prose-code:text-pink-600 dark:prose-code:text-pink-400 prose-code:bg-gray-100 dark:prose-code:bg-slate-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono
                prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0
                prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-cyan-50 dark:prose-blockquote:bg-cyan-900/20 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-gray-700 dark:prose-blockquote:text-slate-300
                prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-6
                prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-6
                prose-li:text-gray-600 dark:prose-li:text-slate-400 prose-li:mb-2
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                prose-hr:border-gray-200 dark:prose-hr:border-white/10 prose-hr:my-12
                prose-table:w-full prose-table:border-collapse prose-table:my-8
                prose-th:bg-gray-100 dark:prose-th:bg-slate-800 prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-gray-900 dark:prose-th:text-white
                prose-td:p-3 prose-td:border-t prose-td:border-gray-200 dark:prose-td:border-white/10 prose-td:text-gray-600 dark:prose-td:text-slate-400"
              >
                {children}
              </motion.div>

              {/* Share Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-16 pt-8 border-t border-gray-200 dark:border-white/10"
              >
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Share this article
                </h3>
                <p className="text-gray-600 dark:text-slate-400 mb-4 text-sm">
                  Hey if you liked this article by me! Please share it with your friends on social media. I would really appreciate it!
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                    bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-slate-300
                    hover:bg-sky-500 hover:text-white
                    transition-all duration-300 cursor-pointer border border-gray-200 dark:border-white/10"
                  >
                    <Twitter className="w-4 h-4" />
                    <span className="text-sm font-medium">Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                    bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-slate-300
                    hover:bg-blue-600 hover:text-white
                    transition-all duration-300 cursor-pointer border border-gray-200 dark:border-white/10"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </button>
                </div>
              </motion.div>
            </motion.article>

            {/* Sidebar */}
            <aside className="order-1 lg:order-2">
              <TableOfContents items={tocItems} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
