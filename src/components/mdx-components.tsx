import Link from "next/link";
import { MDXImage } from "@/components/ui/mdx-image";
import { ComponentPropsWithoutRef } from "react";
import { CodeBlock } from "@/components/blog/CodeBlock";
import { HarnessDiagram } from "@/components/blog/widgets/HarnessDiagram";
import { ToolCallFlow } from "@/components/blog/widgets/ToolCallFlow";
import { FeatureStateMachine } from "@/components/blog/widgets/FeatureStateMachine";
import { VerificationLayers } from "@/components/blog/widgets/VerificationLayers";
import { RalphLoop } from "@/components/blog/widgets/RalphLoop";
import { CleanStateChecklist } from "@/components/blog/widgets/CleanStateChecklist";
import { Reveal } from "@/components/blog/widgets/Reveal";

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
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export const mdxComponents = {
  // Expose <CodeBlock /> to MDX so we can render "dialogue + code" blocks
  // (e.g. "You: ... / AI: ... / <pre>code</pre>") with a single component.
  CodeBlock,
  // Interactive widgets — drop into any blog post via JSX.
  HarnessDiagram,
  ToolCallFlow,
  FeatureStateMachine,
  VerificationLayers,
  RalphLoop,
  CleanStateChecklist,
  Reveal,
  h1: ({ children, className, id, ...props }: HeadingProps) => {
    const computedId = id || generateId(String(children));
    return (
      <h1
        id={computedId}
        className={`mt-2 scroll-mt-24 text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 ${className}`}
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, className, id, ...props }: HeadingProps) => {
    const computedId = id || generateId(String(children));
    return (
      <h2
        id={computedId}
        className={`mt-10 scroll-mt-24 border-b border-neutral-200 dark:border-neutral-800 pb-2 text-2xl font-semibold tracking-tight first:mt-0 text-neutral-900 dark:text-neutral-100 ${className}`}
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, className, id, ...props }: HeadingProps) => {
    const computedId = id || generateId(String(children));
    return (
      <h3
        id={computedId}
        className={`mt-8 scroll-mt-24 text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 ${className}`}
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, className, id, ...props }: HeadingProps) => {
    const computedId = id || generateId(String(children));
    return (
      <h4
        id={computedId}
        className={`mt-8 scroll-mt-24 text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 ${className}`}
        {...props}
      >
        {children}
      </h4>
    );
  },
  h5: ({ children, className, id, ...props }: HeadingProps) => {
    const computedId = id || generateId(String(children));
    return (
      <h5
        id={computedId}
        className={`mt-8 scroll-mt-24 text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 ${className}`}
        {...props}
      >
        {children}
      </h5>
    );
  },
  h6: ({ children, className, id, ...props }: HeadingProps) => {
    const computedId = id || generateId(String(children));
    return (
      <h6
        id={computedId}
        className={`mt-8 scroll-mt-24 text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 ${className}`}
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
          className={`font-medium text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-400/50 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors ${className}`}
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
          className={`font-medium text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-400/50 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors ${className}`}
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
        className={`font-medium text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-400/50 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors ${className}`}
        {...props}
      >
        {children}
      </a>
    );
  },
  p: ({ className, ...props }: ParagraphProps) => (
    <p
      className={`leading-7 text-neutral-600 dark:text-neutral-400 [&:not(:first-child)]:mt-6 ${className}`}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ListProps) => (
    <ul
      className={`my-6 ml-6 list-disc [&>li]:mt-2 text-neutral-600 dark:text-neutral-400 marker:text-neutral-400 ${className}`}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ListProps) => (
    <ol
      className={`my-6 ml-6 list-decimal [&>li]:mt-2 text-neutral-600 dark:text-neutral-400 marker:text-neutral-400 ${className}`}
      {...props}
    />
  ),
  li: ({ className, ...props }: ListItemProps) => (
    <li className={`mt-2 text-neutral-600 dark:text-neutral-400 pl-1 ${className}`} {...props} />
  ),
  blockquote: ({ className, ...props }: BlockquoteProps) => (
    <blockquote
      className={`mt-6 border-l-2 border-neutral-300 dark:border-neutral-700 pl-5 py-1 italic text-neutral-600 dark:text-neutral-400 ${className}`}
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
        className={`px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[0.85em] font-mono ${className}`}
        {...props}
      >
        {children}
      </code>
    );
  },
  // Enhanced table components with better styling
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto my-8 rounded-xl border border-neutral-200 dark:border-neutral-800">
      <table
        className={`w-full text-sm ${className}`}
        {...props}
      />
    </div>
  ),
  thead: ({ className, ...props }: ComponentPropsWithoutRef<"thead">) => (
    <thead className={`bg-neutral-50 dark:bg-neutral-900 ${className}`} {...props} />
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className={`p-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 first:rounded-tl-lg last:rounded-tr-lg ${className}`}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td
      className={`p-4 border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 ${className}`}
      {...props}
    />
  ),
  tr: ({ className, ...props }: ComponentPropsWithoutRef<"tr">) => (
    <tr
      className={`hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors ${className}`}
      {...props}
    />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr
      className={`my-12 border-neutral-200 dark:border-neutral-800 ${className}`}
      {...props}
    />
  ),
};
