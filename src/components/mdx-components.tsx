import Link from "next/link";
import { MDXImage } from "@/components/ui/mdx-image";
import { ComponentPropsWithoutRef } from "react";
import { CodeBlock } from "@/components/blog/CodeBlock";

type HeadingProps = ComponentPropsWithoutRef<"h1">;
type ParagraphProps = ComponentPropsWithoutRef<"p">;
type ListProps = ComponentPropsWithoutRef<"ul">;
type ListItemProps = ComponentPropsWithoutRef<"li">;
type AnchorProps = ComponentPropsWithoutRef<"a">;
type BlockquoteProps = ComponentPropsWithoutRef<"blockquote">;
type PreProps = ComponentPropsWithoutRef<"pre">;
type CodeProps = ComponentPropsWithoutRef<"code">;

// Generate ID from text for anchor links
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 50);
}

export const mdxComponents = {
  h1: ({ children, className, ...props }: HeadingProps) => {
    const id = generateId(String(children));
    return (
      <h1
        id={id}
        className={`mt-2 scroll-m-20 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 ${className}`}
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, className, ...props }: HeadingProps) => {
    const id = generateId(String(children));
    return (
      <h2
        id={id}
        className={`mt-10 scroll-m-20 border-b border-slate-200/80 dark:border-white/10 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-cyan-700 dark:text-cyan-400 ${className}`}
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, className, ...props }: HeadingProps) => {
    const id = generateId(String(children));
    return (
      <h3
        id={id}
        className={`mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-slate-800 dark:text-slate-200 ${className}`}
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, className, ...props }: HeadingProps) => {
    const id = generateId(String(children));
    return (
      <h4
        id={id}
        className={`mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-slate-800 dark:text-slate-200 ${className}`}
        {...props}
      >
        {children}
      </h4>
    );
  },
  h5: ({ children, className, ...props }: HeadingProps) => {
    const id = generateId(String(children));
    return (
      <h5
        id={id}
        className={`mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-slate-800 dark:text-slate-200 ${className}`}
        {...props}
      >
        {children}
      </h5>
    );
  },
  h6: ({ children, className, ...props }: HeadingProps) => {
    const id = generateId(String(children));
    return (
      <h6
        id={id}
        className={`mt-8 scroll-m-20 text-base font-semibold tracking-tight text-slate-800 dark:text-slate-200 ${className}`}
        {...props}
      >
        {children}
      </h6>
    );
  },
  a: ({ className, href, children, ...props }: AnchorProps) => {
    if (href?.startsWith("/")) {
      return (
        <Link
          href={href}
          className={`font-medium text-cyan-600 dark:text-cyan-400 hover:underline underline-offset-4 ${className}`}
          {...props}
        >
          {children}
        </Link>
      );
    }
    if (href?.startsWith("#")) {
      return (
        <a
          href={href}
          className={`font-medium text-cyan-600 dark:text-cyan-400 hover:underline underline-offset-4 ${className}`}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`font-medium text-cyan-600 dark:text-cyan-400 hover:underline underline-offset-4 ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  },
  p: ({ className, ...props }: ParagraphProps) => (
    <p
      className={`leading-7 text-slate-600 dark:text-slate-400 [&:not(:first-child)]:mt-6 ${className}`}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ListProps) => (
    <ul
      className={`my-6 ml-6 list-disc [&>li]:mt-2 text-slate-600 dark:text-slate-400 ${className}`}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ListProps) => (
    <ol
      className={`my-6 ml-6 list-decimal [&>li]:mt-2 text-slate-600 dark:text-slate-400 ${className}`}
      {...props}
    />
  ),
  li: ({ className, ...props }: ListItemProps) => (
    <li className={`mt-2 text-slate-600 dark:text-slate-400 ${className}`} {...props} />
  ),
  blockquote: ({ className, ...props }: BlockquoteProps) => (
    <blockquote
      className={`mt-6 border-l-4 border-cyan-500 bg-cyan-50/50 dark:bg-cyan-900/20 pl-6 py-4 pr-4 rounded-r-lg italic text-slate-700 dark:text-slate-300 ${className}`}
      {...props}
    />
  ),
  img: MDXImage,
  Image: MDXImage,
  // Enhanced code block handling
  pre: ({ children }: PreProps) => {
    return (
      <div className="my-6">
        {children}
      </div>
    );
  },
  code: ({ children, className, ...props }: CodeProps) => {
    // Check if this is a code block (has language class) or inline code
    const isCodeBlock = className?.includes("language-");
    const language = className?.replace("language-", "") || "text";

    if (isCodeBlock) {
      return (
        <CodeBlock
          code={String(children)}
          language={language}
          showLineNumbers={true}
        />
      );
    }

    // Inline code
    return (
      <code
        className={`px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-pink-600 dark:text-pink-400 text-sm font-mono ${className}`}
        {...props}
      >
        {children}
      </code>
    );
  },
  // Enhanced table components with better styling
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto my-8 rounded-xl border border-slate-200 dark:border-slate-800">
      <table
        className={`w-full text-sm ${className}`}
        {...props}
      />
    </div>
  ),
  thead: ({ className, ...props }: ComponentPropsWithoutRef<"thead">) => (
    <thead className={`bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/50 dark:to-blue-900/50 ${className}`} {...props} />
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className={`p-4 text-left font-semibold text-slate-900 dark:text-slate-100 border-b border-slate-200 dark:border-slate-700 first:rounded-tl-lg last:rounded-tr-lg ${className}`}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td
      className={`p-4 border-b border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 ${className}`}
      {...props}
    />
  ),
  tr: ({ className, ...props }: ComponentPropsWithoutRef<"tr">) => (
    <tr
      className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${className}`}
      {...props}
    />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr
      className={`my-12 border-slate-200 dark:border-slate-800 ${className}`}
      {...props}
    />
  ),
};
