"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { List, X } from "lucide-react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || items.length === 0) return;

    const elements = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (elements.length === 0) return;

    let rafId: number | null = null;

    const updateActive = () => {
      rafId = null;
      const offset = 140; // approx. top navbar + a little breathing room
      let currentId = elements[0]?.id ?? "";
      for (const el of elements) {
        const top = el.getBoundingClientRect().top;
        if (top - offset <= 0) {
          currentId = el.id;
        } else {
          break;
        }
      }
      setActiveId((prev) => (prev === currentId ? prev : currentId));
    };

    const onScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items, mounted]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  if (items.length === 0) return null;

  const tocContent = (
    <div
      className="w-full
      bg-card border border-border/50
      rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-5">
        {/* Header */}
        <div className="flex items-center gap-2 mb-5 pb-4 border-b border-border/50">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <List className="w-4 h-4 text-primary" />
          </div>
          <h2 className="text-base font-bold font-heading text-foreground tracking-tight">
            Contents
          </h2>
        </div>

        {/* TOC Items */}
        <nav className="space-y-1 max-h-[calc(100vh-16rem)] overflow-y-auto pr-1 -mr-1 scrollbar-thin">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={`group w-full text-left px-3 py-2 rounded-lg text-sm leading-snug
                transition-all duration-200 border-l-2
                ${
                  isActive
                    ? "bg-primary/10 text-primary font-semibold border-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground border-transparent"
                }
                ${item.level === 1 ? "pl-3" : ""}
                ${item.level === 2 ? "pl-3" : ""}
                ${item.level === 3 ? "pl-5" : ""}
                ${item.level === 4 ? "pl-7" : ""}
                `}
              >
                <span className="line-clamp-2 break-words font-heading text-xs tracking-wide uppercase">{item.text}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-26 right-10 z-50 lg:hidden
        w-12 h-12 rounded-full bg-primary hover:bg-primary/90
        text-primary-foreground shadow-lg shadow-primary/20
        flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer"
        aria-label="Toggle table of contents"
      >
        {isOpen ? <X className="w-5 h-5" /> : <List className="w-5 h-5" />}
      </button>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* TOC Container — desktop: sticky sidebar, mobile: slide-in drawer */}
      <div
        className="hidden lg:block"
        style={{ maxHeight: "calc(100vh - 7rem)" }}
      >
        {tocContent}
      </div>

      {/* Mobile TOC Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed lg:hidden right-0 top-[72px] h-[calc(100vh-72px)] w-80 max-w-[85vw] z-50
            bg-card/95 backdrop-blur-xl
            border-l border-border/50 overflow-y-auto
            shadow-2xl"
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-border/50">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
                    <List className="w-4 h-4 text-primary" />
                  </div>
                  <h2 className="text-base font-bold font-heading text-foreground tracking-tight">
                    Contents
                  </h2>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg hover:bg-[#1c1c1e] transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-muted-foreground hover:text-foreground" />
                </button>
              </div>

              {/* TOC Items (mobile) */}
              <nav className="space-y-1">
                {items.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleClick(item.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm leading-snug
                      transition-all duration-200 border-l-2
                      ${
                        isActive
                          ? "bg-primary/10 text-primary font-semibold border-primary"
                          : "text-muted-foreground hover:bg-[#1c1c1e] border-transparent"
                      }
                      ${item.level === 2 ? "pl-3" : ""}
                      ${item.level === 3 ? "pl-5" : ""}
                      ${item.level === 4 ? "pl-7" : ""}
                      `}
                    >
                      <span className="line-clamp-2 break-words font-heading text-xs tracking-wide uppercase">{item.text}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
