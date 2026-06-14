"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Terminal } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

// 🎨 Custom syntax theme — gold & dark warm-neutral inspired.
const prettyDark: { [key: string]: React.CSSProperties } = {
  ...(vscDarkPlus as { [key: string]: React.CSSProperties }),
  comment: { color: "#6b7280", fontStyle: "italic" },
  punctuation: { color: "#a1a1aa" },
  property: { color: "#c8a960" }, // Accent Gold
  tag: { color: "#f59e0b" },
  boolean: { color: "#fbbf24" },
  number: { color: "#f59e0b" },
  constant: { color: "#fbbf24" },
  symbol: { color: "#fbbf24" },
  deleted: { color: "#ef4444" },
  selector: { color: "#f59e0b" },
  "attr-name": { color: "#fbbf24" },
  string: { color: "#e4e4e7" },
  char: { color: "#e4e4e7" },
  builtin: { color: "#c8a960" },
  inserted: { color: "#10b981" },
  operator: { color: "#a1a1aa" },
  entity: { color: "#fbbf24", cursor: "help" },
  url: { color: "#c8a960" },
  atrule: { color: "#a1a1aa" },
  "attr-value": { color: "#e4e4e7" },
  keyword: { color: "#c8a960", fontWeight: "600" },
  function: { color: "#fafafa" },
  "class-name": { color: "#fbbf24" },
  regex: { color: "#f59e0b" },
  important: { color: "#fbbf24", fontWeight: "bold" },
  variable: { color: "#e4e4e7" },
  "code[class*=\"language-\"]": {
    color: "#e4e4e7",
    background: "transparent",
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
    fontSize: "0.875rem",
    lineHeight: "1.7",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    tabSize: 2,
    hyphens: "none",
  },
  'pre[class*="language-"]': {
    color: "#e4e4e7",
    background: "transparent",
    fontFamily:
      'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
    fontSize: "0.875rem",
    lineHeight: "1.7",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    tabSize: 2,
    hyphens: "none",
    padding: "1.25rem 1rem",
    margin: 0,
    overflow: "auto",
  },
};

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  preamble?: string;
}

export function CodeBlock({
  code = "",
  language = "text",
  filename,
  showLineNumbers = true,
  preamble = "",
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const languageMap: Record<string, string> = {
    js: "javascript",
    ts: "typescript",
    jsx: "jsx",
    tsx: "tsx",
    py: "python",
    rb: "ruby",
    sh: "bash",
    shell: "bash",
    yml: "yaml",
    md: "markdown",
    mdx: "markdown",
    json: "json",
    text: "text",
    plaintext: "text",
  };

  const normalizedLanguage = languageMap[language] || language || "text";

  // Hydration safety placeholder: renders code without syntax highlight on server
  const placeholder = (
    <div className="relative group my-6 rounded-2xl overflow-hidden bg-[#111113] border border-border/50 shadow-md">
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#1c1c1e] border-b border-border/50">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{language}</span>
        </div>
      </div>
      <div className="p-5 overflow-auto bg-[#09090b]">
        <pre className="font-mono text-sm leading-relaxed text-muted-foreground whitespace-pre">{code.trim()}</pre>
      </div>
    </div>
  );

  if (!mounted) return placeholder;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative group my-6 rounded-2xl overflow-hidden
      bg-[#111113] border border-border/50
      shadow-xl"
    >
      {/* Preamble area */}
      {preamble && (
        <pre
          className="m-0 px-5 sm:px-6 py-4 whitespace-pre-wrap break-words
          font-mono text-[0.875rem] leading-relaxed
          text-muted-foreground bg-[#1c1c1e]
          border-b border-border/50"
        >
          {preamble.trim()}
        </pre>
      )}

      {/* Header (mac-style dots) */}
      <div
        className="flex items-center justify-between px-4 py-2.5
        bg-[#1c1c1e] border-b border-border/50"
      >
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>

          {filename ? (
            <span
              className="text-sm font-heading font-semibold text-muted-foreground ml-2 truncate max-w-[180px]"
              title={filename}
            >
              {filename}
            </span>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Terminal className="w-4 h-4 text-primary" />
              <span className="text-sm font-heading font-semibold text-muted-foreground uppercase tracking-wider">
                {language}
              </span>
            </div>
          )}
        </div>

        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg
          text-muted-foreground hover:text-foreground
          bg-[#111113] hover:bg-[#27272a]
          transition-all duration-200 border border-border/50 cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-semibold font-heading">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold font-heading">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code surface */}
      <div className="relative bg-[#09090b]">
        <SyntaxHighlighter
          language={normalizedLanguage}
          style={prettyDark}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            color: "#52525b",
            userSelect: "none",
            fontSize: "0.8125rem",
          }}
          customStyle={{
            margin: 0,
            padding: "1.25rem 1rem",
            background: "transparent",
            fontSize: "0.875rem",
            lineHeight: "1.7",
            borderRadius: 0,
          }}
          codeTagProps={{
            style: {
              fontFamily:
                'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
            },
          }}
        >
          {code.trim()}
        </SyntaxHighlighter>
      </div>
    </motion.div>
  );
}
