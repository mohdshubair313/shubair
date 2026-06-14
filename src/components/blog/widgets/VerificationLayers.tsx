"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, FileCode2, Play, TestTube2, ShieldCheck, RotateCcw, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

interface Layer {
  id: number;
  number: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  command: string;
  checks: string[];
  passMessage: string;
  color: string;
  ring: string;
  bg: string;
}

const LAYERS: Layer[] = [
  {
    id: 1,
    number: "L1",
    title: "Static Analysis",
    icon: FileCode2,
    command: "pnpm lint && pnpm typecheck",
    checks: ["ESLint passes", "TypeScript compiles", "No unused imports"],
    passMessage: "✅ Code parses. Types check. No lint warnings.",
    color: "text-violet-700 dark:text-violet-300",
    ring: "ring-violet-400",
    bg: "bg-violet-50 dark:bg-violet-500/10",
  },
  {
    id: 2,
    number: "L2",
    title: "Execution / Unit Tests",
    icon: TestTube2,
    command: "pnpm test",
    checks: ["All unit tests green", "No regressions", "Coverage on new code"],
    passMessage: "✅ All unit tests passing. Code runs.",
    color: "text-amber-700 dark:text-amber-300",
    ring: "ring-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    id: 3,
    number: "L3",
    title: "End-to-End Flow",
    icon: ShieldCheck,
    command: "pnpm test:e2e",
    checks: ["User flow works", "DB round-trips succeed", "Real HTTP response 200"],
    passMessage: "✅ Full pipeline runs. Real user flow verified.",
    color: "text-emerald-700 dark:text-emerald-300",
    ring: "ring-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
];

export function VerificationLayers() {
  const [passed, setPassed] = useState<number>(0);
  const [running, setRunning] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>([]);

  const runLayer = (id: number) => {
    if (id !== passed + 1 || running !== null) return;
    setRunning(id);
    const layer = LAYERS[id - 1];
    setLogs(() => [`$ ${layer.command}`, `▸ running ${layer.title}...`]);
    setTimeout(() => {
      setLogs((l) => [
        ...l,
        ...layer.checks.map((c) => `  ✓ ${c}`),
        layer.passMessage,
      ]);
      setPassed(id);
      setRunning(null);
    }, 900);
  };

  const reset = () => {
    setPassed(0);
    setRunning(null);
    setLogs([]);
  };

  const allPassed = passed === LAYERS.length;

  return (
    <div
      className="not-prose my-10 rounded-2xl overflow-hidden
      bg-gradient-to-br from-emerald-50/60 via-white to-cyan-50/60
      dark:from-slate-900 dark:via-slate-900 dark:to-slate-900
      border border-slate-200 dark:border-slate-700/60
      shadow-lg shadow-slate-200/50 dark:shadow-black/30"
    >
      <div className="px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-500/15 text-emerald-600 dark:text-emerald-300">
                <ShieldCheck className="w-4 h-4" />
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white">
                3-Layer Termination Check
              </h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-9">
              Run each layer in order. The agent is <em>not</em> done until all three are green.
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
        {/* Layer cards */}
        <div className="space-y-3">
          {LAYERS.map((layer) => {
            const Icon = layer.icon;
            const isPassed = passed >= layer.id;
            const isCurrent = passed + 1 === layer.id;
            const isRunning = running === layer.id;

            return (
              <motion.div
                key={layer.id}
                layout
                className={cn(
                  "rounded-xl border-2 p-4 transition-all",
                  isPassed
                    ? `${layer.bg} border-transparent`
                    : isCurrent
                    ? "bg-white dark:bg-slate-800/60 border-cyan-300 dark:border-cyan-500/50 shadow-md"
                    : "bg-slate-50/60 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50"
                )}
              >
                <div className="flex flex-wrap items-start gap-3">
                  <div
                    className={cn(
                      "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center",
                      isPassed
                        ? "bg-emerald-500 text-white"
                        : isCurrent
                        ? "bg-cyan-500 text-white"
                        : "bg-slate-200 dark:bg-slate-800 text-slate-500"
                    )}
                  >
                    {isPassed ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : isCurrent ? (
                      isRunning ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <Play className="w-5 h-5" />
                        </motion.div>
                      ) : (
                        <Icon className="w-5 h-5" />
                      )
                    ) : (
                      <Circle className="w-5 h-5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={cn(
                          "text-[10px] font-bold px-1.5 py-0.5 rounded font-mono",
                          isPassed
                            ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300"
                            : isCurrent
                            ? "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300"
                            : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        )}
                      >
                        {layer.number}
                      </span>
                      <h5
                        className={cn(
                          "font-bold text-sm",
                          isPassed || isCurrent
                            ? "text-slate-900 dark:text-white"
                            : "text-slate-500 dark:text-slate-400"
                        )}
                      >
                        {layer.title}
                      </h5>
                    </div>

                    {/* Command */}
                    <code
                      className={cn(
                        "block mt-2 px-3 py-2 rounded-md font-mono text-xs",
                        "bg-slate-900 text-slate-200"
                      )}
                    >
                      $ {layer.command}
                    </code>

                    {/* Checks */}
                    <ul className="mt-2 space-y-1">
                      {layer.checks.map((check, i) => (
                        <li
                          key={i}
                          className={cn(
                            "text-xs flex items-center gap-1.5",
                            isPassed
                              ? "text-emerald-700 dark:text-emerald-300"
                              : "text-slate-600 dark:text-slate-400"
                          )}
                        >
                          {isPassed ? (
                            <CheckCircle2 className="w-3 h-3" />
                          ) : (
                            <Circle className="w-3 h-3" />
                          )}
                          {check}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {isCurrent && !isRunning && (
                    <button
                      onClick={() => runLayer(layer.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold
                      bg-cyan-500 hover:bg-cyan-600 text-white transition-colors"
                    >
                      <Play className="w-3.5 h-3.5" />
                      Run
                    </button>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Console / final state */}
        <AnimatePresence mode="wait">
          {allPassed ? (
            <motion.div
              key="done"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 rounded-xl p-4 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white flex items-center gap-3"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-white/20 flex items-center justify-center"
              >
                <Sparkles className="w-5 h-5" />
              </motion.div>
              <div>
                <div className="font-bold text-sm">Verified. Task complete.</div>
                <div className="text-xs opacity-90">
                  The agent earned the right to say &quot;done.&quot; Every claim is backed by runnable proof.
                </div>
              </div>
            </motion.div>
          ) : logs.length > 0 ? (
            <motion.div
              key="logs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 rounded-xl p-4 bg-slate-900 text-slate-100 font-mono text-xs space-y-1"
            >
              {logs.map((l, i) => (
                <div
                  key={i}
                  className={cn(
                    l.startsWith("$")
                      ? "text-cyan-300"
                      : l.startsWith("✅")
                      ? "text-emerald-300"
                      : l.startsWith("  ✓")
                      ? "text-emerald-200/80"
                      : "text-slate-300"
                  )}
                >
                  {l}
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-4 text-xs text-slate-500 dark:text-slate-400 text-center italic"
            >
              Click <strong>Run</strong> on the highlighted layer to begin.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
