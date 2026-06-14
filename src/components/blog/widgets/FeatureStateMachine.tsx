"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, RotateCcw, Lock, CheckCircle2, CircleDot, Ban, Hammer } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "not_started" | "active" | "passing" | "blocked";

interface Node {
  id: Status;
  label: string;
  desc: string;
  color: string;
  ring: string;
  bg: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NODES: Node[] = [
  {
    id: "not_started",
    label: "not_started",
    desc: "Agent hasn't touched this yet. Up for grabs.",
    color: "text-slate-600 dark:text-slate-300",
    ring: "ring-slate-300 dark:ring-slate-600",
    bg: "bg-slate-100 dark:bg-slate-800",
    icon: CircleDot,
  },
  {
    id: "active",
    label: "active",
    desc: "Agent is currently working on this feature.",
    color: "text-cyan-700 dark:text-cyan-300",
    ring: "ring-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-500/10",
    icon: Hammer,
  },
  {
    id: "passing",
    label: "passing",
    desc: "All three verification layers green. ✅ Verified.",
    color: "text-emerald-700 dark:text-emerald-300",
    ring: "ring-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
    icon: CheckCircle2,
  },
  {
    id: "blocked",
    label: "blocked",
    desc: "Cannot proceed. Reason must be written down.",
    color: "text-rose-700 dark:text-rose-300",
    ring: "ring-rose-400",
    bg: "bg-rose-50 dark:bg-rose-500/10",
    icon: Ban,
  },
];

const ALLOWED: Record<Status, Status[]> = {
  not_started: ["active"],
  active: ["passing", "blocked"],
  passing: [],
  blocked: ["active", "not_started"],
};

export function FeatureStateMachine() {
  const [status, setStatus] = useState<Status>("not_started");
  const [history, setHistory] = useState<{ from: Status; to: Status; at: string }[]>([]);

  const transition = (to: Status) => {
    if (!ALLOWED[status].includes(to)) return;
    setHistory((h) => [
      { from: status, to, at: new Date().toLocaleTimeString() },
      ...h,
    ].slice(0, 6));
    setStatus(to);
  };

  const reset = () => {
    setStatus("not_started");
    setHistory([]);
  };

  const current = NODES.find((n) => n.id === status)!;
  const CurrentIcon = current.icon;

  return (
    <div
      className="not-prose my-10 rounded-2xl overflow-hidden
      bg-gradient-to-br from-indigo-50/60 via-white to-cyan-50/60
      dark:from-slate-900 dark:via-slate-900 dark:to-slate-900
      border border-slate-200 dark:border-slate-700/60
      shadow-lg shadow-slate-200/50 dark:shadow-black/30"
    >
      <div className="px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-500/15 text-indigo-600 dark:text-indigo-300">
                <Lock className="w-4 h-4" />
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Feature State Machine
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-9">
              The agent can only move between states via the allowed transitions. Try clicking the buttons.
            </p>
          </div>
          <button
            onClick={reset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
            text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5
            border border-slate-200 dark:border-slate-700 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* State graph */}
        <div className="relative">
          {/* Edges (visible only when in connected states) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 400 200"
            preserveAspectRatio="none"
            style={{ zIndex: 0 }}
          >
            <defs>
              <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
              </marker>
            </defs>
            {/* not_started -> active */}
            <path d="M 90 100 L 200 100" stroke="currentColor" className="text-cyan-400" strokeWidth="2" fill="none" strokeDasharray="4 4" markerEnd="url(#arr)" />
            {/* active -> passing */}
            <path d="M 280 80 C 320 60, 340 60, 350 80" stroke="currentColor" className="text-emerald-400" strokeWidth="2" fill="none" strokeDasharray="4 4" markerEnd="url(#arr)" />
            {/* active -> blocked */}
            <path d="M 280 120 C 320 140, 340 140, 350 120" stroke="currentColor" className="text-rose-400" strokeWidth="2" fill="none" strokeDasharray="4 4" markerEnd="url(#arr)" />
            {/* blocked -> active */}
            <path d="M 350 120 C 340 145, 300 145, 280 120" stroke="currentColor" className="text-cyan-400" strokeWidth="1.5" fill="none" strokeDasharray="2 4" markerEnd="url(#arr)" />
          </svg>

          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-3 mb-2" style={{ minHeight: 180 }}>
            {NODES.map((node) => {
              const Icon = node.icon;
              const isCurrent = node.id === status;
              return (
                <motion.button
                  key={node.id}
                  layout
                  onClick={() => {
                    if (isCurrent) return;
                    if (ALLOWED[status].includes(node.id)) {
                      transition(node.id);
                    }
                  }}
                  disabled={!isCurrent && !ALLOWED[status].includes(node.id)}
                  className={cn(
                    "relative p-3 rounded-xl border-2 transition-all text-left",
                    isCurrent
                      ? `${node.bg} border-transparent ring-4 ${node.ring} shadow-md`
                      : ALLOWED[status].includes(node.id)
                      ? "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-500 cursor-pointer"
                      : "bg-slate-50 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <Icon
                      className={cn(
                        "w-5 h-5",
                        isCurrent ? node.color : "text-slate-400 dark:text-slate-500"
                      )}
                    />
                    <span
                      className={cn(
                        "text-sm font-bold font-mono",
                        isCurrent ? node.color : "text-slate-500 dark:text-slate-400"
                      )}
                    >
                      {node.label}
                    </span>
                  </div>
                  {isCurrent && (
                    <motion.div
                      layoutId="active-pulse"
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-cyan-500 ring-2 ring-white dark:ring-slate-900"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Current state description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className={cn(
              "rounded-xl p-4 border",
              current.bg,
              "border-current/10"
            )}
          >
            <div className="flex items-start gap-3">
              <CurrentIcon className={cn("w-5 h-5 mt-0.5", current.color)} />
              <div className="flex-1">
                <div className={cn("text-sm font-bold font-mono", current.color)}>
                  status = &quot;{current.label}&quot;
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 mt-1">
                  {current.desc}
                </p>

                {/* Allowed transitions */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {ALLOWED[status].length === 0 ? (
                    <span className="text-xs text-slate-500 dark:text-slate-400 italic">
                      No outgoing transitions. Feature is locked in.
                    </span>
                  ) : (
                    ALLOWED[status].map((to) => {
                      const t = NODES.find((n) => n.id === to)!;
                      const TIcon = t.icon;
                      return (
                        <button
                          key={to}
                          onClick={() => transition(to)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg
                          text-xs font-semibold font-mono
                          bg-white dark:bg-slate-800
                          border border-slate-200 dark:border-slate-700
                          hover:border-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10
                          text-slate-700 dark:text-slate-200 transition-colors"
                        >
                          <TIcon className="w-3 h-3" />
                          {to}
                          <ArrowRight className="w-3 h-3 opacity-50" />
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* History */}
        {history.length > 0 && (
          <div className="mt-4">
            <div className="text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 font-semibold">
              Transition log
            </div>
            <div className="space-y-1 font-mono text-xs">
              <AnimatePresence initial={false}>
                {history.map((h, i) => (
                  <motion.div
                    key={`${h.at}-${i}`}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-slate-600 dark:text-slate-400"
                  >
                    <span className="text-slate-400 dark:text-slate-500">{h.at}</span>
                    <span className="text-rose-500">{h.from}</span>
                    <ArrowRight className="w-3 h-3" />
                    <span className="text-emerald-500">{h.to}</span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
