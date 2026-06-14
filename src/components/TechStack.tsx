"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  Code2, 
  Cpu, 
  Layers, 
  Database, 
  Play, 
  MousePointer, 
  Terminal, 
  Info,
  Zap
} from "lucide-react";

interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  fileName: string;
  language: string;
  code: string;
}

const skillsData: Skill[] = [
  {
    id: "nextjs",
    name: "Next.js",
    category: "Full-Stack Framework",
    description: "Server Actions, App Router, SSR, and dynamic edge middleware optimization.",
    icon: Globe,
    fileName: "app/api/chat/route.ts",
    language: "typescript",
    code: `// app/api/chat/route.ts
import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const result = await streamText({
    model: openai("gpt-4o"),
    messages,
    system: "You are Shubair's AI representative...",
  });

  return result.toDataStreamResponse();
}`
  },
  {
    id: "typescript",
    name: "TypeScript",
    category: "Type-Safe Development",
    description: "Robust type systems, generic architectures, and strict compiler enforcement.",
    icon: Code2,
    fileName: "types/developer.ts",
    language: "typescript",
    code: `// types/developer.ts
export interface Developer<T extends string[]> {
  name: "Shubair";
  role: "AI & Full-Stack Engineer";
  specialties: T;
  isAvailable: boolean;
  greet(): string;
}

export type SkillStack = Developer<[
  "Next.js", "TypeScript", "Python", "AI"
]>;`
  },
  {
    id: "react",
    name: "React & Motion",
    category: "UI & Fluid Animations",
    description: "High-performance client component models and smooth physics animations.",
    icon: Layers,
    fileName: "components/Sandbox.tsx",
    language: "typescript",
    code: `// components/Sandbox.tsx
import { motion } from "framer-motion";

export function BouncingParticle({ speed }) {
  return (
    <motion.div
      animate={{ y: [0, -30, 0] }}
      transition={{
        repeat: Infinity,
        duration: 2 / speed,
        ease: "easeInOut"
      }}
      className="w-4 h-4 bg-primary rounded-full"
    />
  );
}`
  },
  {
    id: "ai",
    name: "Python / AI",
    category: "Intelligent Systems",
    description: "Neural network implementations, vector embedding pipelines, and RAG architectures.",
    icon: Cpu,
    fileName: "ml/rag_pipeline.py",
    language: "python",
    code: `# ml/rag_pipeline.py
import torch
import torch.nn as nn

class EmbeddingProjector(nn.Module):
    def __init__(self, in_features=1536, out_features=512):
        super().__init__()
        self.network = nn.Sequential(
            nn.Linear(in_features, out_features),
            nn.LayerNorm(out_features),
            nn.ReLU(),
            nn.Linear(out_features, out_features)
        )
        
    def forward(self, embeddings):
        return self.network(embeddings)`
  },
  {
    id: "database",
    name: "Databases",
    category: "Data Performance",
    description: "PostgreSQL optimization, concurrency indexing, and fast in-memory caching.",
    icon: Database,
    fileName: "db/query_optimize.sql",
    language: "sql",
    code: `-- db/query_optimize.sql
CREATE INDEX CONCURRENTLY idx_users_email 
ON users (email) 
INCLUDE (id, name, role);

EXPLAIN ANALYZE 
SELECT id, name, role 
FROM users 
WHERE email = 'hey@shubair.in';`
  }
];

export default function TechStack() {
  const [activeSkillId, setActiveSkillId] = useState("nextjs");
  const [mounted, setMounted] = useState(false);
  
  // Playground specific states
  const [nextJsStatus, setNextJsStatus] = useState<"idle" | "pinging" | "done">("idle");
  const [nextJsLogs, setNextJsLogs] = useState<string[]>([]);
  const [reactSpeed, setReactSpeed] = useState(1);
  const [aiActivation, setAiActivation] = useState(false);
  const [dbIndexed, setDbIndexed] = useState(true);
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeSkill = skillsData.find(s => s.id === activeSkillId) || skillsData[0];

  // Next.js simulation trigger
  const runNextJsSimulation = () => {
    if (nextJsStatus === "pinging") return;
    setNextJsStatus("pinging");
    setNextJsLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] GET /api/chat - Initiating Stream...`]);
    
    setTimeout(() => {
      setNextJsLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] SSR Payload compiled - 4.2KB`]);
    }, 600);

    setTimeout(() => {
      setNextJsLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Edge Middleware matched route. Pinging vector store...`]);
    }, 1200);

    setTimeout(() => {
      setNextJsLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] Stream complete: 200 OK (elapsed: 14ms)`]);
      setNextJsStatus("done");
    }, 1800);
  };

  // AI feedforward trigger
  const runAiSimulation = () => {
    if (aiActivation) return;
    setAiActivation(true);
    setTimeout(() => {
      setAiActivation(false);
    }, 2000);
  };

  if (!mounted) return null;

  return (
    <section id="skills" className="relative py-32 md:py-44 overflow-hidden bg-background border-b border-border/20">
      {/* Dynamic Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.02] dark:opacity-[0.03] blur-[120px] bg-primary" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.01] dark:opacity-[0.02] blur-[100px] bg-primary" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Heading */}
        <div className="mb-16">
          <p className="section-number text-muted-foreground/10 dark:text-muted-foreground/5 select-none">
            02
          </p>
          <div className="mt-[-36px] md:mt-[-60px]">
            <h2 className="heading-lg mb-3 font-heading">Tech Sandbox</h2>
            <p className="text-muted-foreground max-w-xl text-sm md:text-base leading-relaxed">
              Explore the core of my development stack through interactive playground sandboxes. 
              Click any tech card to load its dynamic canvas.
            </p>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Tech Cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {skillsData.map((skill) => {
              const Icon = skill.icon;
              const isActive = skill.id === activeSkillId;
              
              return (
                <button
                  key={skill.id}
                  onClick={() => setActiveSkillId(skill.id)}
                  className={`relative flex items-start text-left gap-4 p-5 rounded-2xl border transition-all duration-300 group cursor-pointer ${
                    isActive 
                      ? "bg-card border-primary/40 shadow-md shadow-primary/5 dark:shadow-none translate-x-1" 
                      : "bg-card/50 border-border/40 hover:border-border/80 hover:bg-card/80 hover:translate-x-1"
                  }`}
                >
                  {/* Decorative Active indicator border */}
                  {isActive && (
                    <motion.div 
                      layoutId="active-bar"
                      className="absolute left-0 top-4 bottom-4 w-1 bg-primary rounded-r-md"
                    />
                  )}
                  
                  {/* Icon Wrapper */}
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-colors ${
                    isActive 
                      ? "bg-primary/10 border-primary/30 text-primary" 
                      : "bg-secondary border-border/40 text-muted-foreground group-hover:text-foreground"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  {/* Info block */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-bold text-sm md:text-base transition-colors ${
                        isActive ? "text-primary" : "text-foreground"
                      }`}>
                        {skill.name}
                      </h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium uppercase tracking-wider">
                        {skill.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {skill.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Code & Sandbox Workspace (7 cols) */}
          <div className="lg:col-span-7 flex flex-col bg-stone-955 rounded-3xl border border-stone-800 shadow-xl overflow-hidden relative min-h-[500px]">
            {/* Window Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-stone-900 border-b border-stone-850">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <span className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="text-stone-400 text-xs font-mono ml-3 flex items-center gap-1.5">
                  <Terminal size={12} className="text-primary/70" />
                  {activeSkill.fileName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-stone-500 font-mono uppercase bg-stone-950 px-2.5 py-1 rounded-md border border-stone-800">
                  {activeSkill.language}
                </span>
              </div>
            </div>

            {/* Content Layout */}
            <div className="flex-1 flex flex-col">
              
              {/* Code Panel */}
              <div className="p-6 bg-stone-950 font-mono text-[11px] md:text-xs text-stone-300 overflow-x-auto leading-relaxed border-b border-stone-900 scrollbar-thin">
                <pre className="select-none text-stone-400">
                  <code>
                    {activeSkill.code.split("\n").map((line, idx) => {
                      // Simple syntax highlighting representation
                      let highlighted = line;
                      if (line.trim().startsWith("//") || line.trim().startsWith("#") || line.trim().startsWith("--")) {
                        highlighted = `<span class="text-stone-500 italic">${line}</span>`;
                      } else {
                        highlighted = line
                          .replace(/(import|export|from|async|function|class|return|type|interface|extends|const|let|def|self)/g, '<span class="text-amber-500 font-semibold">$1</span>')
                          .replace(/(POST|Request|streamText|openai|Developer|SkillStack|EmbeddingProjector|nn\.Module|nn\.Linear|nn\.Sequential|CREATE|INDEX|CONCURRENTLY|EXPLAIN|ANALYZE|SELECT|FROM|WHERE)/g, '<span class="text-yellow-200/90">$1</span>')
                          .replace(/(".*?"|'.*?'|\`.*?\`)/g, '<span class="text-emerald-400">$1</span>');
                      }
                      
                      return (
                        <div key={idx} className="flex hover:bg-stone-900/40 px-2 -mx-2 rounded">
                          <span className="w-6 text-stone-600 select-none mr-4 text-right">{idx + 1}</span>
                          <span dangerouslySetInnerHTML={{ __html: highlighted }} />
                        </div>
                      );
                    })}
                  </code>
                </pre>
              </div>

              {/* Dynamic Interactive Sandbox Widget */}
              <div className="p-6 bg-stone-900/40 flex-1 flex flex-col justify-center min-h-[200px]">
                
                {/* 1. NEXT.JS PLAYGROUND */}
                {activeSkillId === "nextjs" && (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold uppercase text-stone-400 flex items-center gap-1.5">
                        <Zap size={12} className="text-amber-500" />
                        Next.js Router Path Simulation
                      </span>
                      <button
                        onClick={runNextJsSimulation}
                        disabled={nextJsStatus === "pinging"}
                        className="px-4 py-1.5 rounded-full bg-primary text-stone-950 font-semibold text-xs hover:bg-primary/90 transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                      >
                        <Play size={10} fill="currentColor" />
                        {nextJsStatus === "pinging" ? "Simulating..." : "Send Request"}
                      </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2 py-4 relative">
                      {/* Flow Connector Line */}
                      <div className="absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-stone-850 -translate-y-1/2 z-0">
                        {nextJsStatus === "pinging" && (
                          <motion.div 
                            initial={{ left: 0 }}
                            animate={{ left: "100%" }}
                            transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
                            className="absolute top-0 w-8 h-full bg-gradient-to-r from-transparent via-primary to-transparent"
                          />
                        )}
                      </div>

                      {/* Server Element */}
                      <div className="z-10 bg-stone-950 border border-stone-850 rounded-xl p-3 text-center flex flex-col items-center gap-1.5">
                        <span className="text-[10px] text-stone-500 font-bold uppercase">Client</span>
                        <div className="w-7 h-7 rounded-lg bg-stone-900 border border-stone-850 flex items-center justify-center text-primary">
                          <MousePointer size={14} />
                        </div>
                        <span className="text-[10px] text-stone-300 font-mono">browser</span>
                      </div>

                      {/* Edge Element */}
                      <div className="z-10 bg-stone-950 border border-stone-850 rounded-xl p-3 text-center flex flex-col items-center gap-1.5">
                        <span className="text-[10px] text-stone-500 font-bold uppercase">Edge</span>
                        <div className="w-7 h-7 rounded-lg bg-stone-900 border border-stone-850 flex items-center justify-center text-amber-500">
                          <Globe size={14} />
                        </div>
                        <span className="text-[10px] text-stone-300 font-mono">middleware</span>
                      </div>

                      {/* AI API Element */}
                      <div className="z-10 bg-stone-950 border border-stone-850 rounded-xl p-3 text-center flex flex-col items-center gap-1.5">
                        <span className="text-[10px] text-stone-500 font-bold uppercase">Core</span>
                        <div className="w-7 h-7 rounded-lg bg-stone-900 border border-stone-850 flex items-center justify-center text-green-400">
                          <Cpu size={14} />
                        </div>
                        <span className="text-[10px] text-stone-300 font-mono">rsc / api</span>
                      </div>
                    </div>

                    {/* Console Logs */}
                    <div className="bg-stone-955 rounded-xl p-3 border border-stone-800/80 font-mono text-[10px] text-stone-400 space-y-1 max-h-[85px] overflow-y-auto scrollbar-thin">
                      {nextJsLogs.length === 0 ? (
                        <span className="text-stone-600 italic">No request initiated. Click &quot;Send Request&quot;.</span>
                      ) : (
                        nextJsLogs.map((log, idx) => <div key={idx}>{log}</div>)
                      )}
                    </div>
                  </div>
                )}

                {/* 2. TYPESCRIPT PLAYGROUND */}
                {activeSkillId === "typescript" && (
                  <div className="w-full flex flex-col gap-4">
                    <span className="text-xs font-semibold uppercase text-stone-400 flex items-center gap-1.5">
                      <Code2 size={12} className="text-amber-500" />
                      VS Code Type Definition Peek
                    </span>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      Hover over any highlighted keyword below to view type resolution.
                    </p>

                    <div className="bg-stone-950 p-5 rounded-2xl border border-stone-800/60 font-mono text-xs text-stone-300 relative">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                        <span className="text-stone-500">const</span>
                        <span 
                          onMouseEnter={() => setHoveredType("dev")}
                          onMouseLeave={() => setHoveredType(null)}
                          className="text-stone-100 font-semibold underline decoration-dotted decoration-stone-500 cursor-help hover:text-primary transition-colors"
                        >
                          dev
                        </span>
                        <span className="text-stone-500">:</span>
                        <span 
                          onMouseEnter={() => setHoveredType("SkillStack")}
                          onMouseLeave={() => setHoveredType(null)}
                          className="text-yellow-200/90 underline decoration-dotted decoration-stone-500 cursor-help hover:text-primary transition-colors"
                        >
                          SkillStack
                        </span>
                        <span className="text-stone-500">=</span>
                        <span className="text-stone-300">{`{`}</span>
                      </div>
                      <div className="pl-6 flex flex-wrap items-center gap-x-2 mt-1">
                        <span 
                          onMouseEnter={() => setHoveredType("name")}
                          onMouseLeave={() => setHoveredType(null)}
                          className="text-stone-300 underline decoration-dotted decoration-stone-500 cursor-help"
                        >
                          name
                        </span>
                        <span className="text-stone-500">:</span>
                        <span className="text-emerald-400">&quot;Shubair&quot;</span>
                        <span className="text-stone-500">,</span>
                      </div>
                      <div className="pl-6 flex flex-wrap items-center gap-x-2 mt-1">
                        <span 
                          onMouseEnter={() => setHoveredType("role")}
                          onMouseLeave={() => setHoveredType(null)}
                          className="text-stone-300 underline decoration-dotted decoration-stone-500 cursor-help"
                        >
                          role
                        </span>
                        <span className="text-stone-500">:</span>
                        <span className="text-emerald-400">&quot;AI & Full-Stack Engineer&quot;</span>
                        <span className="text-stone-500">,</span>
                      </div>
                      <div className="pl-6 flex flex-wrap items-center gap-x-2 mt-1">
                        <span 
                          onMouseEnter={() => setHoveredType("specialties")}
                          onMouseLeave={() => setHoveredType(null)}
                          className="text-stone-300 underline decoration-dotted decoration-stone-500 cursor-help"
                        >
                          specialties
                        </span>
                        <span className="text-stone-500">:</span>
                        <span className="text-stone-300">[</span>
                        <span className="text-emerald-400">&quot;Next.js&quot;</span>
                        <span className="text-stone-500">,</span>
                        <span className="text-emerald-400">&quot;TypeScript&quot;</span>
                        <span className="text-stone-300">]</span>
                      </div>
                      <div className="mt-1 font-mono text-stone-300">{`};`}</div>

                      {/* Simulated Hover Tooltip */}
                      <AnimatePresence>
                        {hoveredType && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute z-20 bg-stone-900 border border-stone-800 rounded-xl p-3.5 shadow-2xl text-[10px] font-mono text-stone-300 max-w-[280px]"
                            style={{
                              top: hoveredType === "dev" || hoveredType === "SkillStack" ? "45px" : "80px",
                              left: hoveredType === "dev" ? "20px" : hoveredType === "SkillStack" ? "90px" : "40px"
                            }}
                          >
                            {hoveredType === "dev" && (
                              <div>
                                <span className="text-stone-500">const dev:</span> <span className="text-yellow-200/90 font-bold">SkillStack</span>
                              </div>
                            )}
                            {hoveredType === "SkillStack" && (
                              <div className="space-y-1">
                                <div className="text-stone-400 font-semibold border-b border-stone-850 pb-1 mb-1">type SkillStack = Developer&lt;[...]&gt;</div>
                                <div className="text-stone-500 italic">Core stack configured at compile time.</div>
                              </div>
                            )}
                            {hoveredType === "name" && (
                              <div>
                                <span className="text-stone-500">(property) name:</span> <span className="text-emerald-400">&quot;Shubair&quot;</span>
                              </div>
                            )}
                            {hoveredType === "role" && (
                              <div>
                                <span className="text-stone-500">(property) role:</span> <span className="text-emerald-400">&quot;AI & Full-Stack Engineer&quot;</span>
                              </div>
                            )}
                            {hoveredType === "specialties" && (
                              <div>
                                <span className="text-stone-500">(property) specialties:</span> <span className="text-stone-300">[string, string]</span>
                              </div>
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                )}

                {/* 3. REACT / ANIMATION PLAYGROUND */}
                {activeSkillId === "react" && (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold uppercase text-stone-400 flex items-center gap-1.5">
                        <Layers size={12} className="text-amber-500" />
                        Framer Motion Stiffness Sandbox
                      </span>
                      <div className="text-stone-500 text-xs font-mono">
                        Speed: <span className="text-primary font-bold">{reactSpeed}x</span>
                      </div>
                    </div>

                    {/* Canvas simulation */}
                    <div className="bg-stone-950 h-[100px] rounded-2xl border border-stone-800 flex items-center justify-around overflow-hidden relative">
                      {[1, 2, 3].map((val) => (
                        <div key={val} className="flex flex-col items-center gap-1.5">
                          <motion.div
                            animate={{ 
                              y: [0, -32, 0],
                              scale: [1, 0.9, 1.1, 1],
                              boxShadow: ["0 0 0px rgba(200,169,96,0)", "0 0 12px rgba(200,169,96,0.3)", "0 0 0px rgba(200,169,96,0)"]
                            }}
                            transition={{
                              repeat: Infinity,
                              duration: (1.5 / reactSpeed) + (val * 0.1),
                              ease: "easeInOut"
                            }}
                            className="w-5 h-5 bg-primary rounded-full"
                          />
                          <span className="text-[9px] font-mono text-stone-500">
                            {val === 1 ? "Next.js" : val === 2 ? "TS" : "AI"}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Controller Slider */}
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-bold text-stone-500 font-mono">Stiffness</span>
                      <input
                        type="range"
                        min="0.5"
                        max="3"
                        step="0.1"
                        value={reactSpeed}
                        onChange={(e) => setReactSpeed(parseFloat(e.target.value))}
                        className="flex-grow accent-primary cursor-pointer bg-stone-800 h-1 rounded-lg"
                      />
                      <span className="text-[10px] font-bold text-stone-500 font-mono">Bounce</span>
                    </div>
                  </div>
                )}

                {/* 4. PYTHON / AI PLAYGROUND */}
                {activeSkillId === "ai" && (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold uppercase text-stone-400 flex items-center gap-1.5">
                        <Cpu size={12} className="text-amber-500" />
                        Neural Layer Activation Wave
                      </span>
                      <button
                        onClick={runAiSimulation}
                        disabled={aiActivation}
                        className="px-4 py-1.5 rounded-full bg-primary text-stone-950 font-semibold text-xs hover:bg-primary/90 transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
                      >
                        <Play size={10} fill="currentColor" />
                        Activate Model
                      </button>
                    </div>

                    {/* Neural Net Graph */}
                    <div className="bg-stone-950 rounded-2xl border border-stone-800/80 p-5 flex items-center justify-around h-[90px] relative">
                      {/* Neural network visual layout */}
                      <div className="flex flex-col gap-2">
                        {[1, 2].map((i) => (
                          <motion.div
                            key={i}
                            animate={aiActivation ? { scale: [1, 1.2, 1] } : {}}
                            transition={{ duration: 0.4, delay: 0.1 }}
                            className="w-3 h-3 rounded-full bg-stone-800 border border-stone-600"
                          />
                        ))}
                      </div>

                      {/* Wave Line */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
                        <motion.path 
                          d="M 50 25 L 150 15 M 50 25 L 150 45 M 50 65 L 150 45 M 50 65 L 150 75 M 150 15 L 280 45 M 150 45 L 280 45 M 150 75 L 280 45"
                          stroke={aiActivation ? "hsl(40 38% 50%)" : "rgba(120,120,120,0.15)"}
                          strokeWidth="1.5"
                          fill="none"
                          animate={aiActivation ? { strokeDasharray: ["4, 4", "8, 8", "4, 4"] } : {}}
                        />
                      </svg>

                      <div className="flex flex-col gap-2 z-10">
                        {[1, 2, 3, 4].map((i) => (
                          <motion.div
                            key={i}
                            animate={aiActivation ? { 
                              scale: [1, 1.25, 1],
                              backgroundColor: ["#292524", "#C8A960", "#292524"] 
                            } : {}}
                            transition={{ duration: 0.5, delay: i * 0.15 + 0.2 }}
                            className="w-3.5 h-3.5 rounded-full bg-stone-800 border border-stone-650"
                          />
                        ))}
                      </div>

                      <div className="flex flex-col gap-2">
                        <motion.div
                          animate={aiActivation ? { 
                            scale: [1, 1.3, 1],
                            backgroundColor: ["#292524", "#22c55e", "#292524"] 
                          } : {}}
                          transition={{ duration: 0.4, delay: 0.8 }}
                          className="w-4 h-4 rounded-full bg-stone-800 border border-stone-600"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. DATABASE PLAYGROUND */}
                {activeSkillId === "database" && (
                  <div className="w-full flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold uppercase text-stone-400 flex items-center gap-1.5">
                        <Database size={12} className="text-amber-500" />
                        SQL Query Execution Plan Analyzer
                      </span>
                      <div className="flex items-center gap-1.5 bg-stone-950 px-2.5 py-1 rounded-lg border border-stone-800">
                        <span className="text-[10px] text-stone-500 font-mono">Index:</span>
                        <button
                          onClick={() => setDbIndexed(!dbIndexed)}
                          className={`text-[10px] font-mono font-bold uppercase cursor-pointer transition-colors ${
                            dbIndexed ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {dbIndexed ? "On" : "Off"}
                        </button>
                      </div>
                    </div>

                    {/* Chart compare */}
                    <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800/85 flex flex-col gap-3 font-mono text-[10px] text-stone-300">
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Sequential Scan (No Index)</span>
                          <span className="text-red-400">242.0 ms</span>
                        </div>
                        <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
                          <div className="bg-red-500/80 h-full w-[90%]" />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span>Index Scan (Applied Index)</span>
                          <span className="text-green-400">0.05 ms</span>
                        </div>
                        <div className="w-full bg-stone-900 h-2 rounded-full overflow-hidden">
                          <motion.div 
                            animate={{ width: dbIndexed ? "2%" : "0%" }}
                            transition={{ duration: 0.5 }}
                            className="bg-green-500/80 h-full" 
                          />
                        </div>
                      </div>

                      <div className="text-stone-500 italic border-t border-stone-900 pt-2 flex items-center gap-1">
                        <Info size={10} />
                        {dbIndexed 
                          ? "Using B-Tree index scan. O(log N) lookup speed." 
                          : "Scanning entire table. O(N) linear time lookup speed."
                        }
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}