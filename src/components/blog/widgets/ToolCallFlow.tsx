"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Brain, Cog, Database } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  speaker: "brain" | "harness";
  text: string;
  payload?: string;
  duration: number;
}

const SCRIPT: Step[] = [
  {
    id: "s1",
    speaker: "brain",
    text: "I need to create a file called app.js with the Express server.",
    payload: `{
  "tool": "create_file",
  "arguments": {
    "path": "src/app.js",
    "content": "..."
  }
}`,
    duration: 2200,
  },
  {
    id: "s2",
    speaker: "harness",
    text: "Got it. I'll create that file using the file system.",
    duration: 1600,
  },
  {
    id: "s3",
    speaker: "harness",
    text: "File created. 142 bytes written.",
    payload: `{
  "result": "success",
  "path": "src/app.js",
  "bytes": 142
}`,
    duration: 1800,
  },
  {
    id: "s4",
    speaker: "brain",
    text: "Now I'll run it and verify the server starts.",
    payload: `{
  "tool": "run_command",
  "arguments": {
    "command": "node src/app.js"
  }
}`,
    duration: 2200,
  },
  {
    id: "s5",
    speaker: "harness",
    text: "Server started. Listening on port 3000.",
    duration: 1600,
  },
  {
    id: "s6",
    speaker: "harness",
    text: "Verified: GET http://localhost:3000 → 200 OK \"Hello World!\"",
    duration: 2200,
  },
];

export function ToolCallFlow() {
  const [stepIdx, setStepIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const current = SCRIPT[stepIdx];
    if (!current) return;
    const t = setTimeout(() => {
      if (stepIdx + 1 >= SCRIPT.length) {
        setPlaying(false);
        return;
      }
      setStepIdx((i) => i + 1);
    }, current.duration);
    return () => clearTimeout(t);
  }, [playing, stepIdx]);

  const step = SCRIPT[stepIdx];

  const play = () => {
    if (stepIdx >= SCRIPT.length - 1 && !playing) {
      setStepIdx(0);
      setTimeout(() => setPlaying(true), 50);
    } else {
      setPlaying(true);
    }
  };
  const reset = () => {
    setStepIdx(0);
    setPlaying(false);
  };

  return (
    <div
      className="not-prose my-10 rounded-2xl overflow-hidden
      bg-gradient-to-br from-fuchsia-50/40 via-white to-cyan-50/40
      dark:from-slate-900 dark:via-slate-900 dark:to-slate-900
      border border-slate-200 dark:border-slate-700/60
      shadow-lg shadow-slate-200/50 dark:shadow-black/30"
    >
      <div className="px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-fuchsia-100 dark:bg-fuchsia-500/15 text-fuchsia-600 dark:text-fuchsia-300">
                <Cog className="w-4 h-4" />
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                Tool-Call Flow
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-9">
              Watch the loop. The brain only <em>writes</em> JSON. The harness only <em>does</em> the work.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={play}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold
              bg-fuchsia-500 hover:bg-fuchsia-600 text-white transition-colors"
            >
              {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {playing ? "Pause" : stepIdx >= SCRIPT.length - 1 ? "Replay" : "Play"}
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

      <div className="p-5 sm:p-6">
        {/* Two-lane timeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* AI Brain lane */}
          <div
            className={cn(
              "rounded-xl p-4 border-2 transition-all",
              step?.speaker === "brain"
                ? "bg-fuchsia-50 dark:bg-fuchsia-500/10 border-fuchsia-300 dark:border-fuchsia-500/50 shadow-md"
                : "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/50"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  step?.speaker === "brain"
                    ? "bg-fuchsia-500 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                )}
              >
                <Brain className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">AI Brain</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Narrator — text generator
                </div>
              </div>
            </div>
            <AnimatePresence mode="wait">
              {step?.speaker === "brain" && (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    &quot;{step.text}&quot;
                  </p>
                  {step.payload && (
                    <pre className="mt-2 px-3 py-2 rounded-md bg-slate-900 text-fuchsia-200 font-mono text-[11px] overflow-x-auto">
                      {step.payload}
                    </pre>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Harness lane */}
          <div
            className={cn(
              "rounded-xl p-4 border-2 transition-all",
              step?.speaker === "harness"
                ? "bg-cyan-50 dark:bg-cyan-500/10 border-cyan-300 dark:border-cyan-500/50 shadow-md"
                : "bg-slate-50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800/50"
            )}
          >
            <div className="flex items-center gap-2 mb-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center",
                  step?.speaker === "harness"
                    ? "bg-cyan-500 text-white"
                    : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                )}
              >
                <Database className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900 dark:text-white">Harness</div>
                <div className="text-[10px] uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Executor — real side effects
                </div>
              </div>
            </div>
            <AnimatePresence mode="wait">
              {step?.speaker === "harness" && (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                >
                  <p className="text-sm text-slate-700 dark:text-slate-200">
                    &quot;{step.text}&quot;
                  </p>
                  {step.payload && (
                    <pre className="mt-2 px-3 py-2 rounded-md bg-slate-900 text-cyan-200 font-mono text-[11px] overflow-x-auto">
                      {step.payload}
                    </pre>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-1.5">
          {SCRIPT.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                setStepIdx(i);
                setPlaying(false);
              }}
              className={cn(
                "flex-1 h-1.5 rounded-full transition-all",
                i < stepIdx
                  ? s.speaker === "brain"
                    ? "bg-fuchsia-500"
                    : "bg-cyan-500"
                  : i === stepIdx
                  ? s.speaker === "brain"
                    ? "bg-fuchsia-400 animate-pulse"
                    : "bg-cyan-400 animate-pulse"
                  : "bg-slate-200 dark:bg-slate-800"
              )}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>

        <p className="text-xs text-slate-500 dark:text-slate-400 mt-3 text-center">
          Step {stepIdx + 1} of {SCRIPT.length} ·{" "}
          {step?.speaker === "brain" ? "Brain is thinking" : "Harness is executing"}
        </p>
      </div>
    </div>
  );
}
