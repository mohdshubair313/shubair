import Link from "next/link";
import { MDXImage } from "@/components/ui/mdx-image";
import { ComponentPropsWithoutRef, ReactNode } from "react";
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

function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (node && typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children: ReactNode } }).props.children);
  }
  return "";
}

export const mdxComponents = {
  CodeBlock,
  HarnessDiagram,
  ToolCallFlow,
  FeatureStateMachine,
  VerificationLayers,
  RalphLoop,
  CleanStateChecklist,
  Reveal,
  h1: ({ children, className, id, ...props }: HeadingProps) => {
    const computedId = id || generateId(extractText(children));
    return (
      <h1
        id={computedId}
        className={`mt-2 scroll-mt-24 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 ${className || ""}`}
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, className, id, ...props }: HeadingProps) => {
    const computedId = id || generateId(extractText(children));
    return (
      <h2
        id={computedId}
        className={`mt-10 scroll-mt-24 border-b border-neutral-200 dark:border-neutral-800 pb-2 text-xl sm:text-2xl font-semibold tracking-tight first:mt-0 text-neutral-900 dark:text-neutral-100 ${className || ""}`}
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, className, id, ...props }: HeadingProps) => {
    const computedId = id || generateId(extractText(children));
    return (
      <h3
        id={computedId}
        className={`mt-8 scroll-mt-24 text-lg sm:text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 ${className || ""}`}
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, className, id, ...props }: HeadingProps) => {
    const computedId = id || generateId(extractText(children));
    return (
      <h4
        id={computedId}
        className={`mt-8 scroll-mt-24 text-base sm:text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 ${className || ""}`}
        {...props}
      >
        {children}
      </h4>
    );
  },
  h5: ({ children, className, id, ...props }: HeadingProps) => {
    const computedId = id || generateId(extractText(children));
    return (
      <h5
        id={computedId}
        className={`mt-8 scroll-mt-24 text-sm sm:text-base font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 ${className || ""}`}
        {...props}
      >
        {children}
      </h5>
    );
  },
  h6: ({ children, className, id, ...props }: HeadingProps) => {
    const computedId = id || generateId(extractText(children));
    return (
      <h6
        id={computedId}
        className={`mt-8 scroll-mt-24 text-xs sm:text-sm font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 ${className || ""}`}
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
          className={`font-medium text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-400/50 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors ${className || ""}`}
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
          className={`font-medium text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-400/50 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors ${className || ""}`}
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
        className={`font-medium text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-400/50 hover:decoration-neutral-900 dark:hover:decoration-neutral-100 transition-colors ${className || ""}`}
        {...props}
      >
        {children}
      </a>
    );
  },
  p: ({ className, ...props }: ParagraphProps) => (
    <p
      className={`leading-7 text-neutral-600 dark:text-neutral-400 text-sm sm:text-base [&:not(:first-child)]:mt-5 ${className || ""}`}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ListProps) => (
    <ul
      className={`my-5 ml-5 list-disc [&>li]:mt-1.5 text-neutral-600 dark:text-neutral-400 marker:text-neutral-400 text-sm sm:text-base ${className || ""}`}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ListProps) => (
    <ol
      className={`my-5 ml-5 list-decimal [&>li]:mt-1.5 text-neutral-600 dark:text-neutral-400 marker:text-neutral-400 text-sm sm:text-base ${className || ""}`}
      {...props}
    />
  ),
  li: ({ className, ...props }: ListItemProps) => (
    <li className={`mt-1.5 text-neutral-600 dark:text-neutral-400 pl-1 text-sm sm:text-base ${className || ""}`} {...props} />
  ),
  blockquote: ({ className, ...props }: BlockquoteProps) => (
    <blockquote
      className={`mt-6 border-l-2 border-neutral-300 dark:border-neutral-700 pl-4 sm:pl-5 py-1 italic text-neutral-600 dark:text-neutral-400 ${className || ""}`}
      {...props}
    />
  ),
  img: MDXImage,
  Image: MDXImage,
  pre: ({ children, className }: PreProps) => {
    const lang = className?.replace("language-", "") || undefined;
    const codeChild = Array.isArray(children) ? children[0] : children;
    if (codeChild && typeof codeChild === "object" && "props" in codeChild) {
      const codeProps = (codeChild as { props: CodeProps }).props;
      const extractedCode = extractText(codeProps.children);
      if (extractedCode) {
        return (
          <CodeBlock
            code={extractedCode}
            language={lang || codeProps.className?.replace("language-", "") || "text"}
            showLineNumbers={true}
          />
        );
      }
    }
    return <div className="my-6">{children}</div>;
  },
  code: ({ children, className, ...props }: CodeProps) => {
    const isCodeBlock = className?.includes("language-");
    if (isCodeBlock) {
      return null;
    }
    return (
      <code
        className={`px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-[0.85em] font-mono ${className || ""}`}
        {...props}
      >
        {children}
      </code>
    );
  },
  table: ({ className, ...props }: ComponentPropsWithoutRef<"table">) => (
    <div className="overflow-x-auto my-6 sm:my-8 rounded-xl border border-neutral-200 dark:border-neutral-800">
      <table className={`w-full text-xs sm:text-sm ${className || ""}`} {...props} />
    </div>
  ),
  thead: ({ className, ...props }: ComponentPropsWithoutRef<"thead">) => (
    <thead className={`bg-neutral-50 dark:bg-neutral-900 ${className || ""}`} {...props} />
  ),
  th: ({ className, ...props }: ComponentPropsWithoutRef<"th">) => (
    <th
      className={`p-3 sm:p-4 text-left font-semibold text-neutral-900 dark:text-neutral-100 border-b border-neutral-200 dark:border-neutral-800 first:rounded-tl-lg last:rounded-tr-lg ${className || ""}`}
      {...props}
    />
  ),
  td: ({ className, ...props }: ComponentPropsWithoutRef<"td">) => (
    <td
      className={`p-3 sm:p-4 border-b border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 ${className || ""}`}
      {...props}
    />
  ),
  tr: ({ className, ...props }: ComponentPropsWithoutRef<"tr">) => (
    <tr
      className={`hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-colors ${className || ""}`}
      {...props}
    />
  ),
  hr: ({ className, ...props }: ComponentPropsWithoutRef<"hr">) => (
    <hr
      className={`my-8 sm:my-12 border-neutral-200 dark:border-neutral-800 ${className || ""}`}
      {...props}
    />
  ),
};
