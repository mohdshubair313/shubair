"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ──────────────────────────────────────────────────────────────
interface Viewer {
  id: string;
  avatar: string;
  color: string;
}

interface PresenceData {
  viewerCount: number;
  viewers: Viewer[];
  you?: string;
  isNew?: boolean;
}

// ── Constants ──────────────────────────────────────────────────────────
const HEARTBEAT_INTERVAL = 5_000; // 5 seconds

export default function LiveViewers() {
  const [data, setData] = useState<PresenceData | null>(null);
  const [prevCount, setPrevCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const heartbeat = useCallback(async () => {
    try {
      const res = await fetch("/api/presence", { method: "POST" });
      if (res.ok) {
        const json: PresenceData = await res.json();
        setData((prev) => {
          if (prev) setPrevCount(prev.viewerCount);
          return json;
        });
      }
    } catch {
      // Silently fail — presence is non-critical
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    // Initial heartbeat
    heartbeat();

    // Set up interval
    intervalRef.current = setInterval(heartbeat, HEARTBEAT_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [heartbeat]);

  // Don't render until mounted and we have data
  if (!mounted || !data) return null;

  const count = data.viewerCount;
  const countChanged = count !== prevCount;
  const viewers = data.viewers;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25, delay: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="live-viewers-pill"
      role="status"
      aria-label={`${count} ${count === 1 ? "person" : "people"} viewing this portfolio right now`}
    >
      {/* Pulsing live dot */}
      <div className="relative flex items-center justify-center">
        <span className="live-dot" />
        <span className="live-dot-ring" />
      </div>

      {/* Viewer count with animated number */}
      <AnimatePresence mode="popLayout">
        <motion.span
          key={count}
          initial={countChanged ? { y: 8, opacity: 0, filter: "blur(4px)" } : false}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -8, opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="text-xs font-semibold tabular-nums text-neutral-900 dark:text-white"
        >
          {count}
        </motion.span>
      </AnimatePresence>

      {/* Stacked avatar bubbles */}
      <div className="flex items-center -space-x-1.5 ml-0.5">
        <AnimatePresence mode="popLayout">
          {viewers.slice(0, 5).map((viewer, idx) => (
            <motion.div
              key={viewer.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 25,
                delay: idx * 0.05,
              }}
              className="viewer-avatar"
              style={{
                borderColor: viewer.color,
                boxShadow: `0 0 6px ${viewer.color}40`,
                zIndex: 10 - idx,
              }}
              title={viewer.id === data.you ? "You" : "Viewer"}
            >
              <span className="text-[9px] leading-none select-none">
                {viewer.avatar}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Overflow indicator */}
        {count > 5 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="viewer-avatar overflow-count"
            style={{ zIndex: 4 }}
          >
            <span className="text-[8px] font-bold text-neutral-500 dark:text-neutral-400 select-none">
              +{count - 5}
            </span>
          </motion.div>
        )}
      </div>

      {/* Expanded label on hover */}
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="overflow-hidden whitespace-nowrap text-[10px] text-neutral-500 dark:text-neutral-400 font-medium"
          >
            watching now
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
