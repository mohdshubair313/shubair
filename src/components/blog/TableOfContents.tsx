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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -80% 0%" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  if (items.length === 0) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 lg:hidden
        w-12 h-12 rounded-full bg-cyan-500 text-white shadow-lg 
        flex items-center justify-center transition-all duration-300 hover:scale-110"
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

      {/* TOC Container */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : "100%",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed lg:sticky lg:top-24 right-0 top-0 h-full lg:h-fit
        w-72 lg:w-64 z-50 lg:z-auto
        bg-white/95 dark:bg-slate-900/95 lg:bg-white/80 lg:dark:bg-slate-900/50
        backdrop-blur-xl
        border-l lg:border border-gray-200 dark:border-white/10
        lg:rounded-2xl
        overflow-y-auto lg:max-h-[calc(100vh-8rem)]
        ${isOpen ? "block" : "hidden lg:block"}`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-2 mb-6">
            <List className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Contents
            </h2>
          </div>

          {/* TOC Items */}
          <nav className="space-y-1">
            {items.map((item, index) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleClick(item.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm
                transition-all duration-200
                ${
                  activeId === item.id
                    ? "bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-400 font-medium"
                    : "text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-slate-200"
                }
                ${item.level === 2 ? "pl-3" : ""}
                ${item.level === 3 ? "pl-6" : ""}
                ${item.level === 4 ? "pl-9" : ""}
                `}
              >
                <span className="line-clamp-2">{item.text}</span>
              </motion.button>
            ))}
          </nav>
        </div>
      </motion.aside>
    </>
  );
}
