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
    <div className="min-h-screen w-full relative bg-background">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
          style={{ opacity: 0.6 }}
        />
        {/* Subtle top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
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
            bg-card border border-border/50
            text-muted-foreground hover:text-primary
            hover:border-primary/30
            transition-all duration-300 shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-primary" />
            <span className="text-sm font-heading font-semibold hidden sm:inline">Back to Blogs</span>
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
                  className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-foreground mb-6 leading-tight tracking-tight"
                >
                  {title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
                >
                  {summary}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground
                  pb-8 border-b border-border/50"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    {author}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    {formattedDate}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
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
                prose-h1:text-3xl prose-h1:font-bold prose-h1:font-heading prose-h1:mb-6 prose-h1:mt-12 prose-h1:text-foreground
                prose-h2:text-2xl prose-h2:font-bold prose-h2:font-heading prose-h2:mb-4 prose-h2:mt-10
                prose-h2:text-primary
                prose-h3:text-xl prose-h3:font-semibold prose-h3:font-heading prose-h3:mb-3 prose-h3:mt-8 prose-h3:text-foreground
                prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-foreground
                prose-code:text-primary dark:prose-code:text-primary/95 prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:font-semibold prose-code:before:content-none prose-code:after:content-none
                prose-pre:bg-transparent prose-pre:p-0 prose-pre:m-0
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:pr-4 prose-blockquote:rounded-r-lg prose-blockquote:italic prose-blockquote:text-muted-foreground
                prose-ul:list-disc prose-ul:ml-6 prose-ul:mb-6
                prose-ol:list-decimal prose-ol:ml-6 prose-ol:mb-6
                prose-li:text-muted-foreground prose-li:mb-2 prose-li:marker:text-primary
                prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
                prose-hr:border-border/50 prose-hr:my-12
                prose-table:w-full prose-table:border-collapse prose-table:my-8
                prose-th:bg-muted prose-th:p-3 prose-th:text-left prose-th:font-semibold prose-th:text-foreground
                prose-td:p-3 prose-td:border-t prose-td:border-border/50 prose-td:text-muted-foreground"
              >
                {children}
              </motion.div>

              {/* Share Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-16 pt-8 border-t border-border/50"
              >
                <h3 className="text-lg font-bold font-heading text-foreground mb-4">
                  Share this article
                </h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  If you found this article helpful, please consider sharing it on your social channels. It helps support my work!
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={() => handleShare("twitter")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                    bg-card text-muted-foreground hover:text-foreground
                    hover:border-primary/50 transition-all duration-300 cursor-pointer border border-border/50"
                  >
                    <Twitter className="w-4 h-4 text-primary" />
                    <span className="text-sm font-heading font-semibold">Twitter</span>
                  </button>
                  <button
                    onClick={() => handleShare("linkedin")}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg
                    bg-card text-muted-foreground hover:text-foreground
                    hover:border-primary/50 transition-all duration-300 cursor-pointer border border-border/50"
                  >
                    <Linkedin className="w-4 h-4 text-primary" />
                    <span className="text-sm font-heading font-semibold">LinkedIn</span>
                  </button>
                </div>
              </motion.div>
            </motion.article>

            {/* Sidebar */}
            <aside className="order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start h-fit">
              <TableOfContents items={tocItems} />
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
}
