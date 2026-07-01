"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Terminal } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const prettyDark: { [key: string]: React.CSSProperties } = {
  ...(vscDarkPlus as { [key: string]: React.CSSProperties }),
  comment: { color: "#6b7280", fontStyle: "italic" },
  punctuation: { color: "#a1a1aa" },
  property: { color: "#c8a960" },
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
    fontSize: "0.8125rem",
    lineHeight: "1.6",
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
    fontSize: "0.8125rem",
    lineHeight: "1.6",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    tabSize: 2,
    hyphens: "none",
    padding: "1rem 0.75rem",
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
  yaml: "yaml",
  md: "markdown",
  mdx: "markdown",
  json: "json",
  text: "text",
  plaintext: "text",
  bash: "bash",
  python: "python",
  javascript: "javascript",
  typescript: "typescript",
};

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
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const normalizedLanguage = languageMap[language] || language || "text";
  const codeText = code.trim();

  const placeholder = (
    <div className="relative my-5 sm:my-6 rounded-xl overflow-hidden bg-[#111113] border border-neutral-800 shadow-md">
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#1c1c1e] border-b border-neutral-800">
        <div className="flex items-center gap-2 min-w-0">
          <Terminal className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
          <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider truncate">
            {filename || language}
          </span>
        </div>
      </div>
      <div className="p-3 sm:p-4 overflow-x-auto bg-[#09090b]">
        <pre className="font-mono text-xs sm:text-sm leading-relaxed text-neutral-400 whitespace-pre">{codeText || " "}</pre>
      </div>
    </div>
  );

  if (!mounted) return placeholder;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="relative my-5 sm:my-6 rounded-xl overflow-hidden bg-[#111113] border border-neutral-800 shadow-xl"
    >
      {preamble && (
        <pre className="m-0 px-3 sm:px-5 py-3 sm:py-4 whitespace-pre-wrap break-words font-mono text-xs sm:text-[0.8125rem] leading-relaxed text-neutral-500 bg-[#1c1c1e] border-b border-neutral-800">
          {preamble.trim()}
        </pre>
      )}

      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#1c1c1e] border-b border-neutral-800">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex items-center gap-1 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
          </div>
          {filename ? (
            <span className="text-xs sm:text-sm font-medium text-neutral-500 truncate max-w-[120px] sm:max-w-[200px]" title={filename}>
              {filename}
            </span>
          ) : (
            <div className="flex items-center gap-2 min-w-0">
              <Terminal className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-neutral-500 uppercase tracking-wider truncate">
                {language}
              </span>
            </div>
          )}
        </div>
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="flex items-center gap-1.5 px-2 sm:px-3 py-1 rounded-lg text-neutral-500 hover:text-neutral-200 bg-[#111113] hover:bg-[#27272a] transition-all duration-200 border border-neutral-800 cursor-pointer shrink-0"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[10px] sm:text-xs font-medium hidden sm:inline">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[10px] sm:text-xs font-medium hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      <div className="relative bg-[#09090b] overflow-x-auto">
        {codeText ? (
          <SyntaxHighlighter
            language={normalizedLanguage}
            style={prettyDark}
            showLineNumbers={showLineNumbers}
            lineNumberStyle={{
              minWidth: "2em",
              paddingRight: "0.75em",
              color: "#52525b",
              userSelect: "none",
              fontSize: "0.75rem",
            }}
            customStyle={{
              margin: 0,
              padding: "0.75rem 0.5rem",
              background: "transparent",
              fontSize: "0.8125rem",
              lineHeight: "1.6",
              borderRadius: 0,
            }}
            codeTagProps={{
              style: {
                fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, monospace',
              },
            }}
          >
            {codeText}
          </SyntaxHighlighter>
        ) : (
          <div className="p-4 sm:p-5 text-neutral-500 text-xs sm:text-sm font-mono text-center">
            No code content
          </div>
        )}
      </div>
    </motion.div>
  );
}
