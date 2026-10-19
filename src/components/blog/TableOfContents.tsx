"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, List } from "lucide-react";
import { HookSidebar } from "@/components/ui/hook-sidebar";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const baseLevel = Math.min(...items.map((item) => item.level));

  useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id));
    let frame = 0;

    const update = () => {
      frame = 0;
      let current = 0;
      for (let index = 0; index < headings.length; index++) {
        const heading = headings[index];
        if (!heading) continue;
        if (heading.getBoundingClientRect().top <= 132) current = index;
        else break;
      }
      if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 8) {
        current = Math.max(0, items.length - 1);
      }
      setActiveIndex(current);
    };

    const scheduleUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);
    window.addEventListener("hashchange", scheduleUpdate);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
      window.removeEventListener("hashchange", scheduleUpdate);
    };
  }, [items]);

  // Scroll the contents list itself so the highlighted row stays visible.
  useEffect(() => {
    const panel = panelRef.current;
    const active = panel?.querySelector<HTMLElement>('[data-active="true"]');
    if (!panel || !active || panel.clientHeight === 0) return;
    const bounds = panel.getBoundingClientRect();
    const row = active.getBoundingClientRect();
    if (row.top < bounds.top + 12) panel.scrollTop += row.top - bounds.top - 12;
    else if (row.bottom > bounds.bottom - 12) panel.scrollTop += row.bottom - bounds.bottom + 12;
  }, [activeIndex, mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setMobileOpen(false);
      toggleRef.current?.focus({ preventScroll: true });
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  if (items.length === 0) return null;

  return (
    <aside aria-label="Article navigation" className="fixed bottom-4 left-4 right-4 z-40 self-start rounded-2xl border border-border bg-background/95 shadow-xl backdrop-blur-md lg:sticky lg:bottom-auto lg:left-auto lg:right-auto lg:top-6 lg:z-10 lg:bg-card lg:shadow-sm">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        aria-expanded={mobileOpen}
        aria-controls="blog-toc-panel"
        className="flex min-h-14 w-full items-center gap-3 rounded-2xl px-4 py-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500 lg:hidden"
      >
        <List aria-hidden="true" className="h-4 w-4 shrink-0 text-sky-600 dark:text-sky-400" />
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-semibold text-foreground">On this page</span>
          <span className="block truncate text-[11px] text-muted-foreground">{items[activeIndex]?.text}</span>
        </span>
        <ChevronDown aria-hidden="true" className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform motion-reduce:transition-none ${mobileOpen ? "rotate-180" : ""}`} />
      </button>
      <div id="blog-toc-panel" className={`${mobileOpen ? "block" : "hidden"} lg:block`}>
        <div ref={panelRef} className="max-h-[60dvh] overflow-y-auto overscroll-contain p-4 scrollbar-thin lg:max-h-[calc(100dvh-7rem)] lg:p-5">
          <HookSidebar
            label="On this page"
            items={items.map((item) => ({ label: item.text, href: `#${item.id}`, depth: item.level - baseLevel }))}
            value={activeIndex}
            onChange={(index) => {
              setActiveIndex(index);
              setMobileOpen(false);
              if (mobileOpen) {
                window.requestAnimationFrame(() => {
                  const heading = document.getElementById(items[index].id);
                  heading?.setAttribute("tabindex", "-1");
                  heading?.focus({ preventScroll: true });
                });
              }
            }}
            color="#50B1FD"
            dashed
            className="[&_a]:py-2 [&_a]:text-xs [&_a]:leading-5 [&_a]:focus-visible:outline-2 [&_a]:focus-visible:outline-offset-2 [&_a]:focus-visible:outline-sky-500"
          />
        </div>
        <div className="border-t border-border/60 px-5 py-3 text-[10px] text-muted-foreground">
          Hook Sidebar by <a href="https://www.rareui.com/components/hooksidebar" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">Rare UI</a>
        </div>
      </div>
    </aside>
  );
}
