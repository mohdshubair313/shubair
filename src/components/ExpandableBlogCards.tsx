"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import Link from "next/link";

interface Blog {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
}

interface BlogCard {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  ctaText: string;
  ctaLink: string;
}

// ✅ Export name change karo - BlogsPage se ExpandableBlogCards
export function ExpandableBlogCards({ blogs }: { blogs: Blog[] }) {
  const [active, setActive] = useState<BlogCard | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  // Convert blogs to card format
  const cards: BlogCard[] = blogs.map((blog) => ({
    slug: blog.slug,
    title: blog.title,
    description: blog.summary,
    publishedAt: blog.publishedAt,
    ctaText: "Read More",
    ctaLink: `/blogs/${blog.slug}`,
  }));

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(null));

  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* Background Gradient - Same as Projects Page */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-50 via-cyan-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-gradient-to-br from-cyan-200/40 to-blue-300/30 dark:from-cyan-900/30 dark:to-blue-900/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 dark:opacity-40 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-gradient-to-br from-slate-200/40 to-cyan-200/30 dark:from-slate-800/30 dark:to-cyan-800/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 dark:opacity-40 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-br from-blue-200/40 to-slate-200/30 dark:from-indigo-900/30 dark:to-slate-800/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-70 dark:opacity-40 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 py-20 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          className="mb-16 text-center"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-600 via-blue-500 to-slate-600 dark:from-cyan-400 dark:via-blue-400 dark:to-slate-300 mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            My Blogs
          </motion.h1>
          <motion.p
            className="text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Explore my latest thoughts on web development and technology
          </motion.p>
        </motion.div>

        {/* Expanded Card Modal */}
        <AnimatePresence>
          {active && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm h-full w-full z-[100]"
              />
              <div className="fixed inset-0 grid place-items-center z-[110] p-4">
                <motion.button
                  key={`button-${active.title}-${id}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.05 } }}
                  className="flex absolute top-4 right-4 items-center justify-center bg-white dark:bg-slate-800 rounded-full h-8 w-8 shadow-lg hover:scale-110 transition-transform z-[120]"
                  onClick={() => setActive(null)}
                >
                  <CloseIcon />
                </motion.button>
                <motion.div
                  layoutId={`card-${active.slug}-${id}`}
                  ref={ref}
                  className="w-full max-w-2xl h-fit max-h-[90vh] flex flex-col bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border-2 border-cyan-200/60 dark:border-cyan-900/30"
                >
                  <div className="p-8">
                    <div className="flex justify-between items-start gap-4 mb-6">
                      <div className="flex-1">
                        <motion.h3
                          layoutId={`title-${active.slug}-${id}`}
                          className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-2"
                        >
                          {active.title}
                        </motion.h3>
                        <motion.p
                          layoutId={`date-${active.slug}-${id}`}
                          className="text-sm text-slate-500 dark:text-slate-400 mb-4"
                        >
                          {active.publishedAt}
                        </motion.p>
                        <motion.p
                          layoutId={`description-${active.slug}-${id}`}
                          className="text-slate-600 dark:text-slate-300 leading-relaxed"
                        >
                          {active.description}
                        </motion.p>
                      </div>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Link
                        href={active.ctaLink}
                        className="inline-flex items-center px-6 py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        {active.ctaText}
                        <svg
                          className="w-4 h-4 ml-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

        {/* Blog Cards List */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-4xl mx-auto w-full space-y-4"
        >
          {cards.map((card) => (
            <motion.li
              layoutId={`card-${card.slug}-${id}`}
              key={`card-${card.slug}-${id}`}
              onClick={() => setActive(card)}
              className="group relative rounded-2xl overflow-hidden cursor-pointer
                bg-white/80 dark:bg-slate-900/80
                backdrop-blur-sm
                border-2 border-cyan-200/60 dark:border-cyan-900/30
                shadow-[0_0_0_1px_rgba(6,182,212,0.1),0_2px_4px_rgba(0,0,0,0.05),0_12px_24px_rgba(6,182,212,0.15)]
                dark:shadow-cyan-900/20
                hover:shadow-[0_0_0_1px_rgba(6,182,212,0.2),0_4px_8px_rgba(0,0,0,0.1),0_20px_32px_rgba(6,182,212,0.25)]
                dark:hover:shadow-cyan-800/40
                hover:border-cyan-300/80 dark:hover:border-cyan-800/50
                transition-all duration-300
                ring-1 ring-cyan-100/50 dark:ring-cyan-900/20"
            >
              <div className="p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex-1">
                  <motion.h3
                    layoutId={`title-${card.slug}-${id}`}
                    className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`date-${card.slug}-${id}`}
                    className="text-sm text-slate-500 dark:text-slate-400 mb-3"
                  >
                    {card.publishedAt}
                  </motion.p>
                  <motion.p
                    layoutId={`description-${card.slug}-${id}`}
                    className="text-slate-600 dark:text-slate-300 line-clamp-2"
                  >
                    {card.description}
                  </motion.p>
                </div>
                <motion.button
                  layoutId={`button-${card.slug}-${id}`}
                  className="px-5 py-2.5 text-sm font-bold rounded-xl
                    bg-slate-100 dark:bg-slate-800
                    text-slate-700 dark:text-slate-200
                    group-hover:bg-gradient-to-r group-hover:from-cyan-500 group-hover:to-blue-500
                    group-hover:text-white
                    transition-all duration-300
                    shadow-sm group-hover:shadow-lg
                    whitespace-nowrap"
                >
                  {card.ctaText}
                </motion.button>
              </div>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </div>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-slate-700 dark:text-slate-200"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
