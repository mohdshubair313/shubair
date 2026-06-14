"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Circle, Hammer, Sparkles, ListChecks, ShieldCheck, Eraser, KeyRound, RotateCcw, DoorOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface Condition {
  id: number;
  title: string;
  command: string;
  icon: React.ComponentType<{ className?: string }>;
  hint: string;
}

const CONDITIONS: Condition[] = [
  {
    id: 1,
    title: "Build passes",
    command: "pnpm build",
    icon: Hammer,
    hint: "Production build exits 0 with no errors.",
  },
  {
    id: 2,
    title: "Tests pass",
    command: "pnpm test",
    icon: ShieldCheck,
    hint: "All unit + integration tests green. New tests cover the work.",
  },
  {
    id: 3,
    title: "Progress is recorded",
    command: "edit progress.md & feature_list.json",
    icon: ListChecks,
    hint: "progress.md updated, feature_list.json status flipped to passing.",
  },
  {
    id: 4,
    title: "No stale artifacts",
    command: "git diff --stat + manual grep",
    icon: Eraser,
    hint: "No debug console.logs, no scratch files, no half-removed imports.",
  },
  {
    id: 5,
    title: "Startup path is available",
    command: "./init.sh from a cold checkout",
    icon: DoorOpen,
    hint: "A new session can pick up the next task without human help.",
  },
];

export function CleanStateChecklist() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setChecked((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const reset = () => setChecked(new Set());

  const allDone = checked.size === CONDITIONS.length;
  const progress = (checked.size / CONDITIONS.length) * 100;

  return (
    <div
      className="not-prose my-10 rounded-2xl overflow-hidden
      bg-gradient-to-br from-rose-50/40 via-white to-violet-50/40
      dark:from-slate-900 dark:via-slate-900 dark:to-slate-900
      border border-slate-200 dark:border-slate-700/60
      shadow-lg shadow-slate-200/50 dark:shadow-black/30"
    >
      <div className="px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-rose-100 dark:bg-rose-500/15 text-rose-600 dark:text-rose-300">
                <KeyRound className="w-4 h-4" />
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                5 Conditions of a Clean State
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-9">
              The session is allowed to end only when every box is checked.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <div className="w-32 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
              <span className="text-xs font-mono font-semibold text-slate-700 dark:text-slate-200 tabular-nums">
                {checked.size}/{CONDITIONS.length}
              </span>
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
      </div>

      <div className="p-5 sm:p-6">
        <div className="space-y-2">
          {CONDITIONS.map((c) => {
            const Icon = c.icon;
            const isChecked = checked.has(c.id);
            return (
              <motion.button
                key={c.id}
                onClick={() => toggle(c.id)}
                layout
                className={cn(
                  "w-full text-left p-3 rounded-xl border-2 transition-all flex items-start gap-3",
                  isChecked
                    ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/40"
                    : "bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-500/50"
                )}
              >
                <div
                  className={cn(
                    "flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center transition-all",
                    isChecked
                      ? "bg-emerald-500 text-white"
                      : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                  )}
                >
                  {isChecked ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span
                      className={cn(
                        "text-[10px] font-bold px-1.5 py-0.5 rounded font-mono",
                        isChecked
                          ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                          : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                      )}
                    >
                      C{c.id}
                    </span>
                    <h5
                      className={cn(
                        "text-sm font-bold",
                        isChecked
                          ? "text-emerald-900 dark:text-emerald-200 line-through decoration-2"
                          : "text-slate-900 dark:text-white"
                      )}
                    >
                      {c.title}
                    </h5>
                  </div>
                  <code className="block mt-1 px-2 py-1 rounded bg-slate-900 text-slate-200 font-mono text-[11px] overflow-x-auto">
                    $ {c.command}
                  </code>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                    {c.hint}
                  </p>
                </div>
                <div className="flex-shrink-0 mt-1">
                  {isChecked ? (
                    <Check className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 dark:text-slate-600" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>

        <AnimatePresence>
          {allDone && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="mt-4 rounded-xl p-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 text-white
              flex items-center gap-3 shadow-lg shadow-emerald-500/30"
            >
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 1.5 }}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              <div>
                <div className="font-bold text-sm">Clean state. Session may end.</div>
                <div className="text-xs opacity-90">
                  The next session can resume from a known-good state. Commit & handoff.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
