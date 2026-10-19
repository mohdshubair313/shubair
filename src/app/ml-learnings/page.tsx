"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { HookSidebar } from "@/components/ui/hook-sidebar";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Plus,
  Minus,
} from "lucide-react";

interface Post {
  id: number;
  title: string;
  summary: string;
  text: string;
  url: string;
  date: string;
  dateTime: string;
  platform: "linkedin" | "x";
}

// ----------------------------------------------------
// Widget 1: Interactive NASA Meteorite Grid Map
// ----------------------------------------------------
const MeteoriteMap = () => {
  const meteorites = [
    { name: "Chelyabinsk", mass: "10,100 kg", year: 2013, lat: 55.15, lng: 61.41, desc: "Exploded over Russia with a force 30x stronger than Hiroshima." },
    { name: "Allende", mass: "2,000 kg", year: 1969, lat: 26.97, lng: -105.32, desc: "One of the most studied carbonaceous chondrite meteorites in history." },
    { name: "Murchison", mass: "100 kg", year: 1969, lat: -36.63, lng: 145.2, desc: "Fell in Australia, containing pre-solar grains & amino acids." },
    { name: "Sikhote-Alin", mass: "23,000 kg", year: 1947, lat: 46.16, lng: 134.65, desc: "Massive iron meteorite rain falling in Siberian mountains." },
    { name: "Barwell", mass: "44 kg", year: 1965, lat: 52.56, lng: -1.33, desc: "Largest meteorite fall recorded in United Kingdom history." }
  ];
  const [active, setActive] = useState(meteorites[0]);

  // Convert Lat/Lng to map coordinates (x: -180 to 180, y: 90 to -90)
  const getCoords = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 80 + 10;
    const y = ((90 - lat) / 180) * 80 + 10;
    return { x, y };
  };

  return (
    <div className="relative border border-border/40 rounded-xl bg-neutral-900 dark:bg-neutral-950 p-4 font-mono text-xs overflow-hidden select-none">
      <div className="flex flex-wrap justify-between items-center gap-2 mb-3 border-b border-neutral-800 pb-2">
        <span className="text-primary font-bold">📡 NASA Meteorite Impact Mapping</span>
        <span className="text-neutral-500 text-[10px]">Data Coordinates visualization</span>
      </div>
      <div className="relative w-full aspect-[2/1] border border-neutral-800 rounded bg-neutral-900/40 dark:bg-neutral-950/40 flex items-center justify-center">
        {/* Simple grid lines */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 pointer-events-none opacity-20">
          {Array.from({ length: 24 }).map((_, i) => (
            <div key={i} className="border-t border-l border-neutral-700" />
          ))}
        </div>

        {/* Central equator & prime meridian */}
        <div className="absolute inset-y-0 left-1/2 border-l border-dashed border-neutral-700/30 pointer-events-none" />
        <div className="absolute inset-x-0 top-1/2 border-t border-dashed border-neutral-700/30 pointer-events-none" />

        {/* Meteorite dots */}
        {meteorites.map((m) => {
          const { x, y } = getCoords(m.lat, m.lng);
          const isActive = m.name === active.name;
          return (
            <button
              key={m.name}
              onClick={() => setActive(m)}
              className={`absolute w-3.5 h-3.5 -ml-1.75 -mt-1.75 rounded-full transition-all duration-300 ${
                isActive ? "bg-primary scale-125 ring-4 ring-primary/20" : "bg-neutral-500 hover:bg-primary/80"
              }`}
              style={{ left: `${x}%`, top: `${y}%` }}
              title={m.name}
            >
              {isActive && (
                <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
              )}
            </button>
          );
        })}
      </div>

      {/* Selected details */}
      <div className="mt-3 p-3 rounded bg-neutral-800 dark:bg-neutral-900 border border-neutral-700/50">
        <div className="flex flex-wrap justify-between items-center gap-2 font-bold text-neutral-100">
          <span>{active.name} Meteorite</span>
          <span className="text-primary">{active.mass}</span>
        </div>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-neutral-400 mt-1">
          <span>Year: {active.year}</span>
          <span>Lat: {active.lat}°</span>
          <span>Lng: {active.lng}°</span>
        </div>
        <p className="text-[11px] text-neutral-300 mt-2 leading-relaxed">
          {active.desc}
        </p>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// Widget 2: Multithreading Pipeline Benchmarker
// ----------------------------------------------------
const SpeedBenchmark = () => {
  const [running, setRunning] = useState(false);
  const [seqTime, setSeqTime] = useState(0);
  const [threadTime, setThreadTime] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => () => {
    if (timerRef.current !== null) clearInterval(timerRef.current);
  }, []);

  const runSimulation = () => {
    if (running) return;
    setRunning(true);
    setSeqTime(0);
    setThreadTime(0);

    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = (Date.now() - startTime) / 1000;

      if (elapsed <= 1.33) {
        setThreadTime(elapsed);
      } else {
        setThreadTime(1.33);
      }

      if (elapsed <= 6.23) {
        setSeqTime(elapsed);
      } else {
        setSeqTime(6.23);
        setRunning(false);
        if (timerRef.current !== null) clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }, 30);
  };

  const seqProgress = (seqTime / 6.23) * 100;
  const threadProgress = (threadTime / 1.33) * 100;

  return (
    <div className="border border-border/40 rounded-xl bg-neutral-900 dark:bg-neutral-950 p-4 font-mono text-xs overflow-hidden">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-4 border-b border-neutral-800 pb-2">
        <span className="text-primary font-bold">⚡ ML Data Pipeline Speedup</span>
        <button
          onClick={runSimulation}
          disabled={running}
          className={`px-3 py-1 rounded text-[10px] font-semibold transition-all duration-200 cursor-pointer ${
            running
              ? "bg-neutral-800 text-neutral-500 cursor-not-allowed"
              : "bg-primary text-black hover:bg-primary/90"
          }`}
        >
          {running ? "Running..." : "Simulate Speedup"}
        </button>
      </div>

      <div className="space-y-4">
        {/* Sequential */}
        <div>
          <div className="flex flex-wrap justify-between gap-2 text-neutral-400 mb-1 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Sequential Ingestion
            </span>
            <span className="text-neutral-100">{seqTime.toFixed(2)}s / 6.23s</span>
          </div>
          <div className="w-full h-3.5 bg-neutral-950 border border-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500/80 transition-all duration-75"
              style={{ width: `${seqProgress}%` }}
            />
          </div>
        </div>

        {/* Multithreaded */}
        <div>
          <div className="flex flex-wrap justify-between gap-2 text-neutral-400 mb-1 text-[11px]">
            <span className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full bg-emerald-500 ${running && threadTime < 1.33 ? "animate-ping" : ""}`} />
              Multithreaded Pipeline
            </span>
            <span className="text-neutral-100 font-bold">{threadTime.toFixed(2)}s / 1.33s</span>
          </div>
          <div className="w-full h-3.5 bg-neutral-950 border border-neutral-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500/80 transition-all duration-75"
              style={{ width: `${threadProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* speedup stats */}
      <div className="mt-4 pt-3 border-t border-neutral-800/80 flex flex-wrap gap-2 items-center justify-between text-[11px]">
        <span className="text-neutral-500">Pipeline Performance Gain:</span>
        <span className={`px-2.5 py-0.5 rounded-full font-bold ${threadTime >= 1.33 ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-neutral-900 text-neutral-500"}`}>
          🚀 4.7x Speedup (Non-blocking I/O)
        </span>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// Widget 3: Data Science Workflow Checklist
// ----------------------------------------------------
const WorkflowChecklist = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Download Meteorite landings raw dataset from NASA website", checked: true },
    { id: 2, text: "Import dependencies (pandas, numpy, matplotlib, seaborn)", checked: true },
    { id: 3, text: "Verify columns, missing entries, and structural shapes", checked: false },
    { id: 4, text: "Clean dataset using dataset.dropna(subset=['reclat', 'reclong'])", checked: false },
    { id: 5, text: "Plot lat/lng coordinates to map cosmic history 🌍", checked: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, checked: !t.checked } : t));
  };

  const completedCount = tasks.filter(t => t.checked).length;
  const progressPercent = (completedCount / tasks.length) * 100;

  return (
    <div className="border border-border/40 rounded-xl bg-neutral-900 dark:bg-neutral-950 p-4 font-mono text-xs overflow-hidden">
      <div className="flex justify-between items-center mb-3 border-b border-neutral-800 pb-2">
        <span className="text-primary font-bold">📋 Workflow Checklist</span>
        <span className="text-neutral-400 text-[10px]">{completedCount} of {tasks.length} Done</span>
      </div>

      <div className="w-full h-1.5 bg-neutral-950 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="space-y-2.5">
        {tasks.map(t => (
          <label
            key={t.id}
            className="flex items-start gap-2.5 cursor-pointer text-[11px] text-neutral-300 hover:text-foreground select-none"
          >
            <input
              type="checkbox"
              checked={t.checked}
              onChange={() => toggleTask(t.id)}
              className="mt-0.5 accent-primary border-neutral-800 rounded bg-neutral-950 focus:ring-0 cursor-pointer"
            />
            <span className={`min-w-0 [overflow-wrap:anywhere] transition-all duration-200 ${t.checked ? "line-through text-neutral-500" : ""}`}>
              {t.text}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// Widget 4: Notion Block Tree Builder
// ----------------------------------------------------
const NotionNestingDemo = () => {
  const [levels, setLevels] = useState<string[]>([
    "My Timetable",
    "ML Learnings Workspace",
    "Neural Network Architecture Study"
  ]);

  const addLevel = () => {
    if (levels.length >= 7) return;
    const items = [
      "Convolutional Networks (CNN)",
      "Backpropagation Mechanics",
      "Gradient Descent Math",
      "Hardware Accelerator Config"
    ];
    setLevels(prev => [...prev, items[prev.length - 3] || `Nested subpage Lvl ${prev.length - 2}`]);
  };

  const removeLevel = () => {
    if (levels.length <= 1) return;
    setLevels(prev => prev.slice(0, -1));
  };

  return (
    <div className="border border-border/40 rounded-xl bg-neutral-900 dark:bg-neutral-950 p-4 font-mono text-xs overflow-hidden">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-3 border-b border-neutral-800 pb-2">
        <span className="text-primary font-bold">🧱 Notion Nesting Demo</span>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={removeLevel}
            disabled={levels.length <= 1}
            className="min-h-8 whitespace-nowrap px-2.5 py-1 rounded bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-neutral-100 disabled:opacity-30 cursor-pointer text-[10px]"
          >
            <Minus className="w-2.5 h-2.5 inline mr-1" /> Remove
          </button>
          <button
            onClick={addLevel}
            disabled={levels.length >= 7}
            className="min-h-8 whitespace-nowrap px-2.5 py-1 rounded bg-primary text-black font-semibold hover:bg-primary/95 disabled:opacity-30 cursor-pointer text-[10px]"
          >
            <Plus className="w-2.5 h-2.5 inline mr-1" /> Nest /page
          </button>
        </div>
      </div>

      <div className="space-y-1.5 p-3 rounded bg-neutral-950/40 border border-neutral-800 max-h-52 overflow-y-auto scrollbar-thin">
        {levels.map((name, index) => (
          <div
            key={index}
            className="flex flex-col"
            style={{ paddingLeft: `${index * 14}px` }}
          >
            <div className="flex items-center gap-1.5 text-neutral-300 py-0.5 select-none">
              <span className="text-neutral-600 font-bold">
                {index > 0 ? "├─" : "■"}
              </span>
              <span className="text-amber-500/90 text-xs">📄</span>
              <span className="text-[11px] font-sans text-neutral-200 truncate max-w-[170px] sm:max-w-xs">{name}</span>
              {index === levels.length - 1 && (
                <span className="text-[9px] px-1.5 py-0.2 bg-primary/20 text-primary border border-primary/30 rounded-full animate-pulse ml-2 font-sans font-semibold">
                  depth={index}
                </span>
              )}
            </div>
          </div>
        ))}
        {levels.length < 7 ? (
          <div
            className="text-neutral-500 italic text-[10px] mt-2.5 py-1.5 border-t border-neutral-900"
            style={{ paddingLeft: `${levels.length * 14}px` }}
          >
            Type `/page` here to nest further...
          </div>
        ) : (
          <div className="text-primary text-[10px] text-center mt-3 pt-2.5 border-t border-neutral-900/60 leading-relaxed font-sans">
            Maximum demo depth reached. This example uses parent-child links to illustrate the idea.
          </div>
        )}
      </div>

      <div className="mt-3 text-[10px] text-neutral-500 leading-normal border-t border-neutral-800/60 pt-2.5">
        <span className="text-neutral-400 font-bold">PostgreSQL CTE Traversal:</span>
        <pre className="bg-neutral-950 p-2 rounded mt-1.5 border border-neutral-900 overflow-x-auto text-[9.5px] text-neutral-400 scrollbar-thin leading-relaxed">
{`WITH RECURSIVE NotionTree AS (
  SELECT id, parent_id, title FROM blocks WHERE id = :root_id
  UNION ALL
  SELECT child.id, child.parent_id, child.title FROM blocks child
  INNER JOIN NotionTree parent ON child.parent_id = parent.id
) SELECT * FROM NotionTree;`}
        </pre>
      </div>
    </div>
  );
};

// ----------------------------------------------------
// Main ML Learnings Page
// ----------------------------------------------------
export default function MLLearningsPage() {
  const posts: Post[] = [
    {
      id: 1,
      title: "NASA Meteorite Data Science Project",
      summary: "Applied my machine learning coursework to NASA's Meteorite Landings dataset: cleaned missing values, mapped coordinates, and explored meteorite mass distributions and reporting bias.",
      platform: "linkedin",
      date: "Feb 14, 2026",
      dateTime: "2026-02-14",
      text: `I have always wanted to merge space science with data analytics.. and today I did just that! 

After building a strong conceptual foundation from Krish Naik amazing course lectures about Machine learning, so after completing I decided to test my skills on NASA's raw Meteorite Landings dataset.

In this project, I executed the following data engineering & ML steps:
• Cleaned and preprocessed raw NASA data, resolving missing entries.
• Plotted coordinates on interactive scatter maps using Latitude/Longitude.
• Generated distribution plots of meteorite sizes, revealing major density patterns.
• Identified reporting biases in historical logs where massive falls in uninhabited regions go undetected.

It is absolutely fascinating to see how raw coordinate listings transform into visual insights of cosmic impacts.`,
      url: "https://www.linkedin.com/posts/mohd-shubair-b1a454250_datascience-machinelearning-python-ugcPost-7468237360691044353-sMLn/",
    },
    {
      id: 2,
      title: "Multithreading in ML Pipelines",
      summary: "Explored Python multithreading for I/O-bound data preparation, including network downloads and disk operations. The simulation below compares sequential and concurrent workers using the timings from my learning note.",
      platform: "linkedin",
      date: "Mar 3, 2026",
      dateTime: "2026-03-03",
      text: `Next phase of machine learning ---------- Stop running your Python scripts sequentially. You are wasting computing power.

Currently learning Machine Learning, and just realized how crucial *Multithreading* is for building efficient ML Data Pipelines.

Sequential execution forces each network download or disk write operation to block the CPU. In ML, data preparation (fetching from remote APIs, downloading raw images) is heavily I/O bound.

By swapping to multithreaded workers:
• Sequential Preprocessing: 6.23s
• Multithreaded Preprocessing: 1.33s
• Speedup: ~4.7x speed improvement! 🚀

If your data pipeline bottlenecks during fetching or write phases, utilizing Python's concurrent.futures ThreadPoolExecutor will save you tons of idle computing hours.`,
      url: "https://www.linkedin.com/posts/mohd-shubair-b1a454250_machinelearning-multithreading-multiprocessing-share-7471544124979195906-i6aD/",
    },
    {
      id: 3,
      title: "Building NASA Meteorite Project",
      summary: "Documented the workflow behind my NASA meteorite project: load the CSV, inspect its columns, clean missing values, then plot latitude and longitude to explore landing patterns.",
      platform: "x",
      date: "Feb 15, 2026",
      dateTime: "2026-02-15",
      text: `building a fun scientist like project📡 hahaha....

- download the csv file of meteorites_landing on @NASA website
- import pandas, numpy, matplotlib, seaborn
- first see how many and which columns are there
- clean the data wherever null showing by dropna()
- map latitude and longitude coordinates to visually inspect landing distributions! 🌍`,
      url: "https://x.com/Shubair313/status/2062466568244842727?s=20",
    },
    {
      id: 4,
      title: "Infinite Nesting in Notion",
      summary: "Explored how nested pages can be modeled with parent IDs, path enumeration, and nested sets. The demo turns that system design question into an interactive tree and a recursive SQL example.",
      platform: "linkedin",
      date: "Jan 25, 2026",
      dateTime: "2026-01-25",
      text: `I have a crazy engineering question about Notion! 🤯

While setting up my timetable today, a random realization hit me:
When we type /page inside a Notion page, it creates a new nested page.
And inside that new page, we can do /page again... and again... infinitely!

From a database and system design perspective, how does Notion handle this infinite nesting so smoothly?

Here are the primary models for solving this tree traversal at scale:
1. Adjacency List (Parent IDs): Simple to update but requires heavy recursive SQL (using Common Table Expressions or CTEs) to reconstruct deep paths.
2. Path Enumeration: Saving a precomputed path index (e.g. \`1/4/27/89\`) makes subtree reads instant, but makes updating/moving pages very expensive as all children must be updated.
3. Nested Sets: Modeling left/right interval boundaries. Highly optimized for reads, but extremely slow for write-heavy blocks.

Notion uses block-based JSON records with parent-relations stored in highly distributed key-value/document stores, resolving hierarchy paths lazily in client render engines. 

How would you structure this? Let's discuss in the comments!`,
      url: "https://www.linkedin.com/posts/mohd-shubair-b1a454250_systemdesign-softwareengineering-notion-share-7461368273679462400-1Mdd/",
    }
  ];

  const timelinePosts = [...posts].sort(
    (a, b) => a.dateTime.localeCompare(b.dateTime),
  );
  const [activeStep, setActiveStep] = useState(0);
  const reducedMotion = useReducedMotion();
  const activePost = timelinePosts[activeStep];

  return (
    <div className="min-h-screen w-full relative bg-background pt-24 pb-16">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[300px] bg-neutral-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="mx-auto w-full max-w-5xl px-4 py-4 sm:px-6">
        {/* Back Button outside card */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400" />
            Back to Home
          </Link>
        </div>

        {/* Page Content wrapped in elegant section-card */}
        <div className="flex flex-col bg-card border border-border/50 rounded-3xl p-4 sm:p-8 relative">
          
          {/* Header */}
          <div className="mb-8 border-b border-border/30 pb-6 relative">
            {/* Corner ambient Sparkle Badge */}
            <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-[10px] font-semibold text-neutral-500 dark:text-neutral-400 select-none uppercase tracking-wider font-mono">
              Proof of Work
            </div>

            <h1 className="font-serif text-4xl tracking-wide text-neutral-900 dark:text-white mb-2.5">
              My ML Learnings
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Notes, experiments, and small projects as I learn machine learning and the systems behind it.
            </p>
          </div>

          {/* Date-led learning journey */}
          <section aria-label="Machine learning journey">
            <div className="mb-5 flex items-end justify-between gap-3">
              <div>
                <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">2026 · Learning log</p>
                <h2 className="font-serif text-2xl text-foreground sm:text-3xl">The journey so far</h2>
              </div>
              <span className="shrink-0 rounded-full border border-border/60 px-3 py-1 font-mono text-[10px] text-muted-foreground">{timelinePosts.length} milestones</span>
            </div>

            <div className="grid items-start gap-6 md:grid-cols-[230px_minmax(0,1fr)] md:gap-8">
              <div className="self-start rounded-2xl bg-background/60 p-3 sm:p-4 md:sticky md:top-24">
                <HookSidebar
                  label="Choose a date"
                  items={timelinePosts.map((post) => ({ label: post.date + "\n" + post.title }))}
                  value={activeStep}
                  onChange={setActiveStep}
                  color="#50B1FD"
                  dashed
                  className="[&_button]:w-full [&_button]:whitespace-pre-line [&_button]:py-3 [&_button]:leading-5 [&_button]:focus-visible:outline-2 [&_button]:focus-visible:outline-offset-2 [&_button]:focus-visible:outline-sky-500"
                />
                <p className="mt-5 border-t border-border/50 pt-4 text-xs leading-relaxed text-muted-foreground">Each entry opens the work and interactive demo from that date.</p>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.article
                  key={activePost.id}
                  initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reducedMotion ? 0 : -8 }}
                  transition={{ duration: reducedMotion ? 0 : 0.22 }}
                  aria-labelledby="learning-entry-title"
                  className="min-w-0 overflow-hidden rounded-2xl border border-border/50 bg-background/70 shadow-sm"
                >
                  <div className="border-b border-border/50 px-5 py-4 sm:px-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <time dateTime={activePost.dateTime} className="font-mono text-xs font-medium text-sky-600 dark:text-sky-400">{activePost.date}</time>
                      <span aria-hidden="true" className="text-muted-foreground">·</span>
                      <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">{activePost.platform === "linkedin" ? "LinkedIn" : "X / Twitter"}</span>
                      <span className="ml-auto font-mono text-[10px] text-muted-foreground">{String(activeStep + 1).padStart(2, "0")} / {String(timelinePosts.length).padStart(2, "0")}</span>
                    </div>
                    <h3 id="learning-entry-title" className="font-serif text-xl leading-snug text-foreground sm:text-2xl">{activePost.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{activePost.summary}</p>
                    <details className="mt-4 text-sm">
                      <summary className="w-fit cursor-pointer text-foreground underline decoration-border underline-offset-4">Read learning note</summary>
                      <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{activePost.text}</p>
                    </details>
                    <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                      <Link href={activePost.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-sky-600 dark:hover:text-sky-400">
                        Read original post <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="bg-muted/20 p-3 sm:p-5">
                    <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">Interactive concept demo</p>
                    <div className="min-w-0 overflow-hidden rounded-xl bg-neutral-950">
                      {activePost.id === 1 && <MeteoriteMap />}
                      {activePost.id === 2 && <SpeedBenchmark />}
                      {activePost.id === 3 && <WorkflowChecklist />}
                      {activePost.id === 4 && <NotionNestingDemo />}
                    </div>
                  </div>
                </motion.article>
              </AnimatePresence>
            </div>

            <div className="mt-5 flex flex-wrap justify-between gap-2 text-[11px] text-muted-foreground">
              <p>Dates from my learning log. Exact times weren’t recorded.</p>
              <p>Hook Sidebar by <a href="https://www.rareui.com/components/hooksidebar" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-foreground">Rare UI · Swami Malode</a></p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
