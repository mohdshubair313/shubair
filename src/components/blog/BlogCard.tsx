import Link from "next/link";

interface BlogCardProps {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
  readingTime?: string;
  index?: number;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function BlogCard({
  slug,
  title,
  summary,
  publishedAt,
  readingTime = "5 min read",
}: BlogCardProps) {
  return (
    <Link
      href={`/blogs/${slug}`}
      className="group grid grid-cols-1 sm:grid-cols-[8rem_1fr] gap-1 sm:gap-6 py-5 border-t border-dotted border-neutral-200 dark:border-neutral-800 first:border-t-0"
    >
      <time className="font-mono text-[11px] text-neutral-500 dark:text-neutral-500 leading-relaxed pt-0.5">
        {formatDate(publishedAt)}
      </time>
      <div className="min-w-0">
        <h2 className="font-medium text-neutral-900 dark:text-white group-hover:underline underline-offset-4 decoration-1">
          {title}
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
          {summary}
        </p>
        <p className="mt-2 text-[11px] text-neutral-400 dark:text-neutral-600 font-mono">
          {readingTime}
        </p>
      </div>
    </Link>
  );
}
