"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  const recordVisit = useCallback(async () => {
    try {
      const res = await fetch("/api/visitors", { method: "POST" });
      if (res.ok) {
        const json = await res.json();
        setCount(json.totalVisitors);
      }
    } catch {
      // Non-critical — silently fail
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    recordVisit();
  }, [recordVisit]);

  if (!mounted || count === null) return null;

  // Format number with commas for readability
  const formattedCount = count.toLocaleString();

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="inline-flex items-center gap-1.5 text-[11px] text-neutral-400 dark:text-neutral-500"
    >
      <Eye className="w-3 h-3" />
      <AnimatePresence mode="popLayout">
        <motion.span
          key={count}
          initial={{ y: 6, opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -6, opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="tabular-nums font-medium"
        >
          {formattedCount}
        </motion.span>
      </AnimatePresence>
      <span>{count === 1 ? "visitor" : "visitors"}</span>
    </motion.div>
  );
}
