"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogCard } from "./BlogCard";

interface Blog {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
}

interface BlogGridProps {
  blogs: Blog[];
}

export function BlogGrid({ blogs }: BlogGridProps) {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-0 page-enter">
      {/* Back link */}
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>
      </div>

      <div className="section-card flex flex-col">
        <h1 className="font-serif text-4xl tracking-wide text-neutral-900 dark:text-white mb-2">
          Writing
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed max-w-md">
          Thoughts on development, AI, and building things.
        </p>

        {blogs.length === 0 ? (
          <p className="text-sm text-muted-foreground py-8">
            Thoughts brewing. Check back soon.
          </p>
        ) : (
          <div className="flex flex-col border-b border-dotted border-neutral-200 dark:border-neutral-800">
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
          </div>
        )}
      </div>
    </div>
  );
}
