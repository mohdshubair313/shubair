"use client";

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

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
  const handleShare = async (platform: "twitter" | "linkedin") => {
    const url = `https://shubair.vercel.app/blogs/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"))}`;
    const text =
      platform === "twitter"
        ? `Found this article by @shubair313: ${title}`
        : `Found an article by Mohd Shubair: ${title}`;

    const shareUrl =
      platform === "twitter"
        ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

    window.open(shareUrl, "_blank");
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-0 page-enter">
      {/* Back button */}
      <div className="mb-4">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to blogs
        </Link>
      </div>

      <article className="section-card flex flex-col">
        {/* Header */}
        <header className="border-b border-dotted border-neutral-200 dark:border-neutral-800 pb-6 mb-6">
          <h1 className="font-serif text-3xl sm:text-4xl tracking-wide text-neutral-900 dark:text-white mb-3 leading-tight">
            {title}
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed mb-4">
            {summary}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500 dark:text-neutral-500 font-mono">
            <span className="flex items-center gap-1.5">
              <User className="w-3 h-3" />
              {author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {formatDate(publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              {readingTime}
            </span>
          </div>
        </header>

        {/* Inline Table of Contents */}
        <TableOfContents items={tocItems} />

        {/* Content */}
        <div>{children}</div>

        {/* Share */}
        <footer className="mt-12 pt-6 border-t border-dotted border-neutral-200 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-900 dark:text-white mb-3">
            Share this article
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
            Found it useful? Sharing helps others discover it too.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => handleShare("twitter")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer"
            >
              <Twitter className="w-3.5 h-3.5" />
              Twitter
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5" />
              LinkedIn
            </button>
          </div>
        </footer>
      </article>
    </div>
  );
}
