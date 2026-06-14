"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ScrollText, Database, ShieldCheck, Target, RotateCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface Subsystem {
  id: string;
  name: string;
  files: string;
  job: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  ring: string;
  bg: string;
}

const SUBSYSTEMS: Subsystem[] = [
  {
    id: "instructions",
    name: "Instructions",
    files: "AGENTS.md / CLAUDE.md / feature_list / docs/",
    job: "What to do, in what order, and what to read first.",
    icon: ScrollText,
    color: "text-violet-700 dark:text-violet-300",
    ring: "ring-violet-400",
    bg: "bg-violet-50 dark:bg-violet-500/10",
  },
  {
    id: "state",
    name: "State",
    files: "progress.md / feature_list / git log / session handoff",
    job: "What has been done, what’s next, what’s blocked.",
    icon: Database,
    color: "text-cyan-700 dark:text-cyan-300",
    ring: "ring-cyan-400",
    bg: "bg-cyan-50 dark:bg-cyan-500/10",
  },
  {
    id: "verification",
    name: "Verification",
    files: "tests + lint + typecheck + smoke runs + e2e",
    job: "Only a passing test suite counts as evidence.",
    icon: ShieldCheck,
    color: "text-emerald-700 dark:text-emerald-300",
    ring: "ring-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-500/10",
  },
  {
    id: "scope",
    name: "Scope",
    files: "one feature at a time / explicit definition of done",
    job: "Constrain the agent to one feature. No overreach.",
    icon: Target,
    color: "text-amber-700 dark:text-amber-300",
    ring: "ring-amber-400",
    bg: "bg-amber-50 dark:bg-amber-500/10",
  },
  {
    id: "lifecycle",
    name: "Session Lifecycle",
    files: "init.sh / clean-state checklist / handoff note",
    job: "Init at start. Clean state at end. Handoff for next session.",
    icon: RotateCw,
    color: "text-rose-700 dark:text-rose-300",
    ring: "ring-rose-400",
    bg: "bg-rose-50 dark:bg-rose-500/10",
  },
];

export function HarnessDiagram() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <div
      className="not-prose my-10 rounded-2xl overflow-hidden
      bg-gradient-to-br from-slate-50 via-white to-slate-100
      dark:from-slate-900 dark:via-slate-900 dark:to-slate-950
      border border-slate-200 dark:border-slate-700/60
      shadow-lg shadow-slate-200/50 dark:shadow-black/30"
    >
      <div className="px-5 sm:px-6 py-4 border-b border-slate-200 dark:border-slate-700/60 bg-white/60 dark:bg-slate-900/60 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="inline-flex w-7 h-7 items-center justify-center rounded-lg bg-slate-800 dark:bg-white text-white dark:text-slate-900 font-bold text-sm">
            ⚙
          </span>
          <h4 className="text-base font-bold text-slate-900 dark:text-white">
            The 5 Subsystems of a Harness
          </h4>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 ml-9">
          Hover any subsystem to see what it owns. Every harness needs all five.
        </p>
      </div>

      <div className="p-5 sm:p-6 grid lg:grid-cols-[1fr_1.1fr] gap-6 items-center">
        {/* SVG map */}
        <div className="relative">
          <svg
            viewBox="0 0 400 400"
            className="w-full h-auto"
            style={{ maxHeight: 420 }}
          >
            <defs>
              <radialGradient id="halo" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgb(34 211 238 / 0.15)" />
                <stop offset="100%" stopColor="rgb(34 211 238 / 0)" />
              </radialGradient>
              <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
              </marker>
            </defs>

            <circle cx="200" cy="200" r="180" fill="url(#halo)" />

            {/* Outer ring */}
            <circle
              cx="200"
              cy="200"
              r="170"
              fill="none"
              stroke="currentColor"
              className="text-slate-300 dark:text-slate-700"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Center: model */}
            <circle cx="200" cy="200" r="55" className="fill-slate-900 dark:fill-slate-800" stroke="rgb(34 211 238)" strokeWidth="2" />
            <text x="200" y="195" textAnchor="middle" className="fill-slate-100 font-bold" style={{ fontSize: 14 }}>
              MODEL
            </text>
            <text x="200" y="213" textAnchor="middle" className="fill-cyan-300 font-mono" style={{ fontSize: 9 }}>
              decides *what*
            </text>
            <text x="200" y="225" textAnchor="middle" className="fill-slate-400" style={{ fontSize: 8 }}>
              to write
            </text>

            {/* 5 nodes around the ring */}
            {SUBSYSTEMS.map((s, i) => {
              const angle = (i / SUBSYSTEMS.length) * Math.PI * 2 - Math.PI / 2;
              const x = 200 + Math.cos(angle) * 170;
              const y = 200 + Math.sin(angle) * 170;
              const colors = [
                { fill: "rgb(139 92 246 / 0.2)", stroke: "rgb(139 92 246)" },   // violet
                { fill: "rgb(34 211 238 / 0.2)", stroke: "rgb(34 211 238)" },   // cyan
                { fill: "rgb(16 185 129 / 0.2)", stroke: "rgb(16 185 129)" },   // emerald
                { fill: "rgb(245 158 11 / 0.2)", stroke: "rgb(245 158 11)" },   // amber
                { fill: "rgb(244 63 94 / 0.2)", stroke: "rgb(244 63 94)" },     // rose
              ][i];
              const isHover = hover === s.id;
              return (
                <g
                  key={s.id}
                  onMouseEnter={() => setHover(s.id)}
                  onMouseLeave={() => setHover(null)}
                  style={{ cursor: "pointer" }}
                >
                  <line
                    x1="200"
                    y1="200"
                    x2={x}
                    y2={y}
                    stroke={colors.stroke}
                    strokeWidth={isHover ? 2.5 : 1.5}
                    strokeDasharray={isHover ? "0" : "3 3"}
                    opacity={isHover ? 1 : 0.6}
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r={isHover ? 32 : 28}
                    fill={colors.fill}
                    stroke={colors.stroke}
                    strokeWidth={isHover ? 2.5 : 1.5}
                    className="transition-all"
                  />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    style={{ fontSize: 10, fontWeight: 700 }}
                    className="fill-slate-800 dark:fill-slate-100"
                  >
                    {s.name}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Detail panel */}
        <div>
          {SUBSYSTEMS.map((s) => {
            const Icon = s.icon;
            const isHover = hover === s.id;
            return (
              <motion.div
                key={s.id}
                animate={{ opacity: hover === null || isHover ? 1 : 0.35 }}
                transition={{ duration: 0.2 }}
                onMouseEnter={() => setHover(s.id)}
                onMouseLeave={() => setHover(null)}
                className={cn(
                  "p-3 rounded-xl border transition-all cursor-pointer",
                  isHover
                    ? `${s.bg} border-transparent shadow-md`
                    : "border-transparent"
                )}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={cn(
                      "w-7 h-7 rounded-lg flex items-center justify-center",
                      isHover ? s.bg : "bg-slate-100 dark:bg-slate-800"
                    )}
                  >
                    <Icon className={cn("w-4 h-4", isHover ? s.color : "text-slate-500")} />
                  </div>
                  <span
                    className={cn(
                      "text-sm font-bold",
                      isHover ? s.color : "text-slate-700 dark:text-slate-200"
                    )}
                  >
                    {s.name}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 ml-9">
                  {s.job}
                </p>
                <code className="block mt-1 ml-9 text-[10px] text-slate-500 dark:text-slate-500 font-mono">
                  {s.files}
                </code>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
