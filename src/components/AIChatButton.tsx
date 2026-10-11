"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Bot } from "lucide-react";

const AIchatbot = dynamic(() => import("./AIchatbot"), { ssr: false, loading: () => <p role="status" className="fixed bottom-20 right-6 z-50 rounded-xl bg-neutral-900 p-4 text-sm text-white">Opening chat…</p> });

export default function AIChatButton() {
  const [open, setOpen] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const close = () => { setOpen(false); trigger.current?.focus(); };
  return <>
    <button ref={trigger} type="button" aria-label="Open AI chat" aria-expanded={open} aria-controls="portfolio-chat"
      onMouseEnter={() => void import("./AIchatbot")} onFocus={() => void import("./AIchatbot")}
      onClick={() => { setHasOpened(true); setOpen(true); }}
      className="fixed bottom-6 right-6 z-40 flex min-h-11 items-center gap-2 rounded-full bg-neutral-900 px-3.5 text-white shadow-lg dark:bg-white dark:text-black">
      <Bot className="h-5 w-5" /><span className="hidden text-xs font-medium sm:inline">Ask about my work</span>
    </button>
    {hasOpened && <AIchatbot open={open} onClose={close} />}
  </>;
}
