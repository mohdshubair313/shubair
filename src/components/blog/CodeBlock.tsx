import { CodeBlock as RareCodeBlock } from "@/components/ui/code-block";

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
  preamble?: string;
}

const aliases: Record<string, string> = {
  js: "javascript", ts: "typescript", py: "python", sh: "bash",
  shell: "bash", yml: "yaml", md: "markdown", mdx: "markdown", plaintext: "text",
};

export function CodeBlock({ code = "", language = "text", filename, showLineNumbers = true, preamble }: CodeBlockProps) {
  if (!code.trim()) return null;

  return (
    <figure className="my-7 min-w-0 sm:my-8">
      {preamble && <figcaption className="mb-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{preamble}</figcaption>}
      <RareCodeBlock
        code={code}
        language={aliases[language] || language}
        filename={filename}
        accent="#50B1FD"
        mode="auto"
        showLineNumbers={showLineNumbers}
        className="min-w-0 [&_[data-slot=code-block-viewport]]:max-h-[32rem] [&_[data-slot=code-block-pre]]:text-[12px] sm:[&_[data-slot=code-block-pre]]:text-[13px]"
      />
    </figure>
  );
}
