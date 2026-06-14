"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, RotateCcw, FastForward, Cpu, BatteryLow, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Runner {
  id: number;
  task: string;
  outcome: string;
}

const RUNNERS: Runner[] = [
  {
    id: 1,
    task: "Build the TodoList component that renders an array of items from props.",
    outcome: "✅ Tests pass. Session killed. Fresh session starts.",
  },
  {
    id: 2,
    task: "Add the 'Add Todo' form. Current code: [see TodoList.tsx in repo].",
    outcome: "✅ Tests pass. Session killed. Fresh session starts.",
  },
  {
    id: 3,
    task: "Add the 'Delete Todo' button. Uses filter(), not splice().",
    outcome: "✅ Tests pass. Session killed. Fresh session starts.",
  },
  {
    id: 4,
    task: "Add the 'Edit Todo' inline editing. New ID generation via crypto.randomUUID().",
    outcome: "✅ Tests pass. Session killed. Fresh session starts.",
  },
  {
    id: 5,
    task: "Add the 'Filter by status' dropdown. State lifted to App.tsx.",
    outcome: "✅ All 5 micro-features done. Build green. Commit & handoff.",
  },
];

export function RalphLoop() {
  const [index, setIndex] = useState(0);
  const [running, setRunning] = useState(false);

  const next = () => setIndex((i) => Math.min(i + 1, RUNNERS.length));
  const reset = () => {
    setIndex(0);
    setRunning(false);
  };
  const autoPlay = () => {
    if (running) return;
    setRunning(true);
    setIndex(0);
    let i = 0;
    const tick = () => {
      i += 1;
      if (i < RUNNERS.length) {
        setIndex(i);
        setTimeout(tick, 1800);
      } else {
        setRunning(false);
      }
    };
    setTimeout(tick, 1200);
  };

  const current = RUNNERS[index];
  const finished = index >= RUNNERS.length - 1;

  return (
    <div
      className="not-prose my-10 rounded-2xl overflow-hidden
      bg-gradient-to-br from-slate-50 to-cyan-50/50
      dark:from-slate-900 dark:to-slate-900
      border border-slate-200 dark:border-slate-700/60
      shadow-lg shadow-slate-200/50 dark:shadow-black/30"
    >
      {/* Header */}
      <div className="px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-cyan-100 dark:bg-cyan-500/15 text-cyan-600 dark:text-cyan-300">
                <FastForward className="w-4 h-4" />
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Ralph Loop — Relay Race Simulator
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-9">
              Click <em>Next Runner</em> to send a fresh, single-task session into the repo. Each one is killed after it finishes — no fatigue, no context rot.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={autoPlay}
              disabled={running}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium",
                "bg-cyan-500 hover:bg-cyan-600 text-white",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-colors"
              )}
            >
              <Play className="w-3.5 h-3.5" />
              Auto-play
            </button>
            <button
              onClick={next}
              disabled={finished}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium",
                "bg-slate-900 hover:bg-slate-800 text-white",
                "dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100",
                "disabled:opacity-40 disabled:cursor-not-allowed",
                "transition-colors"
              )}
            >
              Next Runner
              <Sparkles className="w-3.5 h-3.5" />
            </button>
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

      {/* Track */}
      <div className="p-5 sm:p-6">
        {/* Progress dots */}
        <div className="flex items-center gap-2 mb-5">
          {RUNNERS.map((r, i) => (
            <div key={r.id} className="flex items-center gap-2">
              <div
                className={cn(
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                  i < index
                    ? "bg-emerald-500 text-white"
                    : i === index
                    ? "bg-cyan-500 text-white ring-4 ring-cyan-500/30"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                )}
              >
                {i < index ? <CheckCircle2 className="w-3.5 h-3.5" /> : r.id}
              </div>
              {i < RUNNERS.length - 1 && (
                <div
                  className={cn(
                    "h-0.5 w-8 sm:w-12 rounded transition-colors",
                    i < index
                      ? "bg-emerald-500"
                      : "bg-slate-200 dark:bg-slate-800"
                  )}
                />
              )}
            </div>
          ))}
        </div>

        {/* Active runner card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="grid sm:grid-cols-[140px_1fr] gap-4"
          >
            <div
              className={cn(
                "rounded-xl p-4 flex flex-col items-center justify-center text-center",
                "border",
                finished
                  ? "bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/30"
                  : "bg-white dark:bg-slate-800/60 border-slate-200 dark:border-slate-700"
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center mb-2",
                  finished
                    ? "bg-emerald-500 text-white"
                    : "bg-gradient-to-br from-cyan-400 to-blue-500 text-white"
                )}
              >
                {finished ? <CheckCircle2 className="w-6 h-6" /> : <Cpu className="w-6 h-6" />}
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white">
                Session #{current.id}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Fresh context
              </div>
              <div
                className={cn(
                  "mt-2 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full",
                  finished
                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
                    : "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"
                )}
              >
                {finished ? "Done" : "Running"}
              </div>
            </div>

            <div className="rounded-xl p-4 bg-slate-900 text-slate-100 font-mono text-sm leading-relaxed border border-slate-800">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2 pb-2 border-b border-slate-800">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                session-{current.id}.log
              </div>
              <div className="space-y-1.5">
                <div className="text-cyan-300">$ harness.load --fresh</div>
                <div className="text-slate-300">→ read progress.md, feature_list.json, repo state</div>
                <div className="text-cyan-300">$ harness.run --task=&quot;{current.task}&quot;</div>
                <div className="text-slate-300">→ working...</div>
                <div className="text-emerald-300">{current.outcome}</div>
                <div className="flex items-center gap-2 text-rose-300 mt-2">
                  <BatteryLow className="w-3.5 h-3.5" />
                  session.kill()
                </div>
                {finished && (
                  <div className="text-emerald-300 mt-2">→ all 5 features passing. ready for handoff.</div>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Caption */}
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 text-center">
          {finished
            ? "🎉 The whole feature shipped across 5 short, focused sessions. No session held more than one task in memory."
            : `Each runner owns ONE micro-task. No cross-contamination. No context rot. (Runner ${index + 1} of ${RUNNERS.length})`}
        </p>
      </div>
    </div>
  );
}
