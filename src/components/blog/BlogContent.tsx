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
  updatedAt?: string;
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
    timeZone: "UTC",
  });
}

export function BlogContent({
  title,
  summary,
  publishedAt,
  updatedAt,
  readingTime,
  author = "Mohd Shubair",
  children,
  tocItems,
}: BlogContentProps) {
  const handleShare = (platform: "twitter" | "linkedin") => {
    const url = new URL(window.location.pathname, window.location.origin).href;
    const text =
      platform === "twitter"
        ? `Found this article by @shubair313: ${title}`
        : `Found an article by Mohd Shubair: ${title}`;

    const shareUrl =
      platform === "twitter"
        ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

    window.open(shareUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`mx-auto w-full px-4 pt-4 pb-24 lg:px-6 lg:pb-8 ${tocItems.length ? "max-w-6xl" : "max-w-3xl"}`}>
      <div className="mb-4">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Back to blogs</span>
        </Link>
      </div>

      <div className={tocItems.length ? "grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_250px]" : ""}>
      <article className="flex min-w-0 flex-col rounded-2xl border border-border bg-card p-4 sm:p-8">
        <header className="border-b border-border pb-7 mb-8 sm:pb-8 sm:mb-10">
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-sky-700 dark:text-sky-400">Engineering notes</p>
          <h1 className="mb-4 max-w-[26ch] break-words font-serif text-3xl font-normal leading-[1.12] tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]">
            {title}
          </h1>
          <p className="mb-6 max-w-[65ch] break-words text-[15px] leading-7 text-neutral-600 dark:text-neutral-400 sm:text-base">
            {summary}
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-500 font-mono">
            <span className="flex items-center gap-1.5">
              <User className="w-3 h-3 shrink-0" />
              {author}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 shrink-0" />
              {formatDate(publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 shrink-0" />
              {readingTime}
            </span>
          </div>
          {updatedAt && <p className="mt-3 font-mono text-[11px] text-muted-foreground">Updated <time dateTime={updatedAt}>{formatDate(updatedAt)}</time></p>}
        </header>

        <div className="blog-prose mx-auto w-full min-w-0 max-w-[72ch] break-words">
          {children}
        </div>

        <footer className="mt-10 sm:mt-12 pt-5 sm:pt-6 border-t border-dotted border-neutral-200 dark:border-neutral-800">
          <p className="text-sm font-medium text-neutral-900 dark:text-white mb-2">
            Share this article
          </p>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4 leading-relaxed">
            Found it useful? Sharing helps others discover it too.
          </p>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => handleShare("twitter")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer"
            >
              <Twitter className="w-3.5 h-3.5 shrink-0" />
              Twitter
            </button>
            <button
              onClick={() => handleShare("linkedin")}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer"
            >
              <Linkedin className="w-3.5 h-3.5 shrink-0" />
              LinkedIn
            </button>
          </div>
          <p className="mt-6 text-[11px] text-muted-foreground">Code blocks and navigation by <a href="https://www.rareui.com" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">Rare UI</a>.</p>
        </footer>
      </article>
      <TableOfContents items={tocItems} />
      </div>
    </div>
  );
}
