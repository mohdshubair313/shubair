"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Blog {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
}

interface BlogSectionProps {
  blogs: Blog[];
}

export default function BlogSection({ blogs }: BlogSectionProps) {
  const displayedBlogs = blogs.slice(0, 3);

  return (
    <section id="blog" data-section="Blog" className="scroll-mt-24">
      <h3 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white mb-6">
        Writing
      </h3>

      {blogs.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          Thoughts brewing. Check back soon.
        </p>
      ) : (
        <div className="flex flex-col">
          {displayedBlogs.map((blog, index) => (
            <Link
              key={blog.slug}
              href={`/blogs/${blog.slug}`}
              className={`group flex items-start justify-between gap-4 py-4 ${
                index !== displayedBlogs.length - 1
                  ? "border-b border-dotted border-neutral-200 dark:border-neutral-800"
                  : ""
              }`}
            >
              <div className="min-w-0">
                <h4 className="font-medium text-neutral-900 dark:text-white group-hover:underline">
                  {blog.title}
                </h4>
                <p className="mt-1 text-sm text-muted-foreground line-clamp-1">
                  {blog.summary}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2 pt-0.5">
                <time className="text-xs text-muted-foreground whitespace-nowrap">
                  {blog.publishedAt}
                </time>
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </Link>
          ))}
        </div>
      )}

      {blogs.length > 3 && (
        <div className="mt-4">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
          >
            View all posts
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </section>
  );
}
