"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Terminal } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus, vs } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  code,
  language = "text",
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Map common language aliases
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
  };

  const normalizedLanguage = languageMap[language] || language || "text";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative group my-6 rounded-xl overflow-hidden 
      bg-slate-900 dark:bg-slate-950
      border border-slate-800 dark:border-slate-800
      shadow-lg"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-800/50 dark:bg-slate-900/50 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          {/* Window dots */}
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>

          {/* Filename or Language */}
          {filename ? (
            <span className="text-sm text-slate-400 font-medium ml-2">
              {filename}
            </span>
          ) : (
            <div className="flex items-center gap-2 ml-2">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span className="text-sm text-slate-400 font-medium uppercase">
                {language}
              </span>
            </div>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg
          text-slate-400 hover:text-slate-200
          bg-slate-700/50 hover:bg-slate-700
          transition-all duration-200
          border border-slate-600/50 hover:border-slate-600"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-green-400" />
              <span className="text-sm">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              <span className="text-sm">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="relative">
        <SyntaxHighlighter
          language={normalizedLanguage}
          style={isDark ? vscDarkPlus : vs}
          showLineNumbers={showLineNumbers}
          lineNumberStyle={{
            minWidth: "2.5em",
            paddingRight: "1em",
            color: "#64748b",
            fontSize: "0.875rem",
          }}
          customStyle={{
            margin: 0,
            padding: "1.5rem",
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
