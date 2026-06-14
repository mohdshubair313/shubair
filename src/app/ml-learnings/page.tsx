"use client";

/* eslint-disable @next/next/no-img-element */

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  MessageCircle,
  Repeat,
  Globe,
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";

// Platform Custom SVG Icons
const LinkedInIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Interface for ML Post
interface Post {
  id: number;
  title: string;
  text: string;
  image?: string;
  images?: string[];
  url: string;
  date: string;
  platform: "linkedin" | "x";
  likes: number;
  reposts: number;
  comments: number;
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
      <div className="flex justify-between items-center mb-3 border-b border-neutral-800 pb-2">
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
        <div className="flex justify-between items-center font-bold text-neutral-100">
          <span>{active.name} Meteorite</span>
          <span className="text-primary">{active.mass}</span>
        </div>
        <div className="flex gap-4 text-[10px] text-neutral-400 mt-1">
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

  const runSimulation = () => {
    if (running) return;
    setRunning(true);
    setSeqTime(0);
    setThreadTime(0);

    const startTime = Date.now();
    const interval = setInterval(() => {
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
        clearInterval(interval);
      }
    }, 30);
  };

  const seqProgress = (seqTime / 6.23) * 100;
  const threadProgress = (threadTime / 1.33) * 100;

  return (
    <div className="border border-border/40 rounded-xl bg-neutral-900 dark:bg-neutral-950 p-4 font-mono text-xs overflow-hidden">
      <div className="flex justify-between items-center mb-4 border-b border-neutral-800 pb-2">
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
          <div className="flex justify-between text-neutral-400 mb-1 text-[11px]">
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
          <div className="flex justify-between text-neutral-400 mb-1 text-[11px]">
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
      <div className="mt-4 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-[11px]">
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
            <span className={t.checked ? "line-through text-neutral-500 transition-all duration-200" : "transition-all duration-200"}>
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
      <div className="flex justify-between items-center mb-3 border-b border-neutral-800 pb-2">
        <span className="text-primary font-bold">🧱 Notion Infinite Nesting Demo</span>
        <div className="flex gap-2">
          <button
            onClick={removeLevel}
            disabled={levels.length <= 1}
            className="px-2.5 py-0.5 rounded bg-neutral-800 border border-neutral-700 text-neutral-400 hover:text-neutral-100 disabled:opacity-30 cursor-pointer text-[9px]"
          >
            <Minus className="w-2.5 h-2.5 inline mr-1" /> Remove
          </button>
          <button
            onClick={addLevel}
            disabled={levels.length >= 7}
            className="px-2.5 py-0.5 rounded bg-primary text-black font-semibold hover:bg-primary/95 disabled:opacity-30 cursor-pointer text-[9px]"
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
            🎉 Maximum demo depth reached! Adjacency List + Path Indices allow Notion to resolve queries in O(1) fetch time.
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
// Post Card Component
// ----------------------------------------------------
const PostCard = ({ post }: { post: Post }) => {
  const [liked, setLiked] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  const [repostCount, setRepostCount] = useState(post.reposts);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDemo, setShowDemo] = useState(true);

  const handleLike = () => {
    if (liked) {
      setLiked(false);
      setLikeCount(prev => prev - 1);
    } else {
      setLiked(true);
      setLikeCount(prev => prev + 1);
    }
  };

  const handleRepost = () => {
    if (reposted) {
      setReposted(false);
      setRepostCount(prev => prev - 1);
    } else {
      setReposted(true);
      setRepostCount(prev => prev + 1);
    }
  };

  // Truncation limit for long text
  const limit = 220;
  const shouldTruncate = post.text.length > limit;
  const displayText = shouldTruncate && !isExpanded
    ? post.text.slice(0, limit) + "..."
    : post.text;

  return (
    <div className="flex flex-col border border-border/40 dark:border-border/20 rounded-2xl bg-neutral-100/50 dark:bg-[#0c0c0e]/30 p-5 shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 relative group">
      {/* Profile Info */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          {/* Circular profile avatar */}
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-primary to-amber-500/80 flex items-center justify-center font-heading text-neutral-950 font-bold text-sm shadow-md flex-shrink-0 select-none">
            MS
          </div>
          <div>
            <div className="font-heading font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base leading-snug">
              Mohd Shubair
            </div>
            <div className="text-[11px] sm:text-xs text-muted-foreground leading-normal">
              {post.platform === "linkedin" ? "AI/ML Learner & Full-Stack Developer" : "@Shubair313"}
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground mt-0.5">
              <span>{post.date}</span>
              <span>•</span>
              <span className="flex items-center gap-0.5">
                {post.platform === "linkedin" ? <Globe className="w-3 h-3 text-neutral-400" /> : null}
              </span>
            </div>
          </div>
        </div>

        {/* Brand Icon */}
        <div className="text-muted-foreground/60 group-hover:text-primary transition-colors duration-300">
          {post.platform === "linkedin" ? (
            <LinkedInIcon className="w-5 h-5" />
          ) : (
            <XIcon className="w-4 h-4" />
          )}
        </div>
      </div>

      {/* Post Text */}
      <div className="text-neutral-800 dark:text-neutral-200 text-sm leading-relaxed mb-4 whitespace-pre-line font-sans">
        {displayText}
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-primary font-semibold ml-1.5 hover:underline focus:outline-none text-xs inline-block"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>

      {/* Media & Interactive Attachments Container */}
      <div className="mb-4">
        <div className="flex justify-end gap-1.5 mb-2.5">
          <button
            onClick={() => setShowDemo(true)}
            className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
              showDemo
                ? "bg-primary text-black shadow-sm font-bold"
                : "bg-neutral-200 dark:bg-neutral-800 text-muted-foreground hover:text-foreground"
            }`}
          >
            Interactive Demo
          </button>
          <button
            onClick={() => setShowDemo(false)}
            className={`px-3 py-1 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
              !showDemo
                ? "bg-primary text-black shadow-sm font-bold"
                : "bg-neutral-200 dark:bg-neutral-800 text-muted-foreground hover:text-foreground"
            }`}
          >
            Original Post Media
          </button>
        </div>

        <div className="rounded-xl overflow-hidden border border-border/40 dark:border-border/20 bg-neutral-200/50 dark:bg-neutral-950/20">
          {showDemo ? (
            <div className="p-3 sm:p-4">
              {post.id === 1 && <MeteoriteMap />}
              {post.id === 2 && <SpeedBenchmark />}
              {post.id === 3 && <WorkflowChecklist />}
              {post.id === 4 && <NotionNestingDemo />}
            </div>
          ) : (
            <div className="relative w-full overflow-hidden bg-neutral-900/40">
              {post.id === 3 && post.images ? (
                <div className="grid grid-cols-2 gap-1.5 p-1.5 bg-neutral-900/60">
                  <img
                    src={post.images[0]}
                    alt="NASA Meteorite Landings Map Visual"
                    className="w-full aspect-[4/3] object-cover hover:scale-[1.015] transition-transform duration-300"
                    loading="lazy"
                  />
                  <img
                    src={post.images[1]}
                    alt="NASA Meteorite Landings Statistics"
                    className="w-full aspect-[4/3] object-cover hover:scale-[1.015] transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ) : (
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full max-h-[380px] object-cover hover:scale-[1.01] transition-transform duration-300 mx-auto block"
                  loading="lazy"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer / Engagement Bar */}
      <div className="flex justify-between items-center pt-3.5 border-t border-border/20 mt-auto text-xs text-muted-foreground select-none">
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            onClick={handleLike}
            className={`flex items-center gap-1.5 transition-colors p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer ${
              liked ? "text-red-500 font-semibold" : "hover:text-foreground"
            }`}
          >
            <Heart className={`w-4 h-4 ${liked ? "fill-red-500 stroke-red-500" : ""}`} />
            <span>{likeCount}</span>
          </button>

          <div className="flex items-center gap-1.5 p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <MessageCircle className="w-4 h-4" />
            <span>{post.comments}</span>
          </div>

          <button
            onClick={handleRepost}
            className={`flex items-center gap-1.5 transition-colors p-1.5 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-800 cursor-pointer ${
              reposted ? "text-green-500 font-semibold" : "hover:text-foreground"
            }`}
          >
            <Repeat className="w-4 h-4" />
            <span>{repostCount}</span>
          </button>
        </div>

        <Link
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/50 bg-neutral-200/60 dark:bg-neutral-800/80 text-[11px] font-semibold text-neutral-700 dark:text-neutral-300 hover:text-primary dark:hover:text-primary hover:border-primary/30 transition-all cursor-pointer"
        >
          <span>View on {post.platform === "linkedin" ? "LinkedIn" : "X"}</span>
          <ExternalLink className="w-3.5 h-3.5 text-primary" />
        </Link>
      </div>

      {/* Subtle hover outline blur glow */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-amber-500/10 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10 pointer-events-none" />
    </div>
  );
};

// ----------------------------------------------------
// Main ML Learnings Page
// ----------------------------------------------------
export default function MLLearningsPage() {
  const [filter, setFilter] = useState<"all" | "linkedin" | "x">("all");

  const posts: Post[] = [
    {
      id: 1,
      title: "NASA Meteorite Data Science Project",
      platform: "linkedin",
      date: "Feb 14, 2026",
      text: `I have always wanted to merge space science with data analytics.. and today I did just that! 

After building a strong conceptual foundation from Krish Naik amazing course lectures about Machine learning, so after completing I decided to test my skills on NASA's raw Meteorite Landings dataset.

In this project, I executed the following data engineering & ML steps:
• Cleaned and preprocessed raw NASA data, resolving missing entries.
• Plotted coordinates on interactive scatter maps using Latitude/Longitude.
• Generated distribution plots of meteorite sizes, revealing major density patterns.
• Identified reporting biases in historical logs where massive falls in uninhabited regions go undetected.

It is absolutely fascinating to see how raw coordinate listings transform into visual insights of cosmic impacts.`,
      image: "https://media.licdn.com/dms/image/v2/D5622AQERd3p4Md6HVw/feedshare-shrink_800/B56Z6SCTXuJoAc-/0/1780566537972?e=2147483647&v=beta&t=q2etPaxYDkI4a0_MpAncJzpaiKylHLjsKh-lU5afcWc",
      url: "https://www.linkedin.com/posts/mohd-shubair-b1a454250_datascience-machinelearning-python-ugcPost-7468237360691044353-sMLn/",
      likes: 42,
      reposts: 5,
      comments: 8,
    },
    {
      id: 2,
      title: "Multithreading in ML Pipelines",
      platform: "linkedin",
      date: "Mar 3, 2026",
      text: `Next phase of machine learning ---------- Stop running your Python scripts sequentially. You are wasting computing power.

Currently learning Machine Learning, and just realized how crucial *Multithreading* is for building efficient ML Data Pipelines.

Sequential execution forces each network download or disk write operation to block the CPU. In ML, data preparation (fetching from remote APIs, downloading raw images) is heavily I/O bound.

By swapping to multithreaded workers:
• Sequential Preprocessing: 6.23s
• Multithreaded Preprocessing: 1.33s
• Speedup: ~4.7x speed improvement! 🚀

If your data pipeline bottlenecks during fetching or write phases, utilizing Python's concurrent.futures ThreadPoolExecutor will save you tons of idle computing hours.`,
      image: "https://media.licdn.com/dms/image/sync/v2/D5627AQE0Bk_0_8biRg/articleshare-shrink_800/B56Z7BBaeiHEAc-/0/1781354834342?e=2147483647&v=beta&t=Y4flOAiX52rLTbNwopVcQ2jQlxTLu-feSEjlf1dZEDE",
      url: "https://www.linkedin.com/posts/mohd-shubair-b1a454250_machinelearning-multithreading-multiprocessing-share-7471544124979195906-i6aD/",
      likes: 88,
      reposts: 14,
      comments: 12,
    },
    {
      id: 3,
      title: "Building NASA Meteorite Project",
      platform: "x",
      date: "Feb 15, 2026",
      text: `building a fun scientist like project📡 hahaha....

- download the csv file of meteorites_landing on @NASA website
- import pandas, numpy, matplotlib, seaborn
- first see how many and which columns are there
- clean the data wherever null showing by dropna()
- map latitude and longitude coordinates to visually inspect landing distributions! 🌍`,
      images: [
        "https://pbs.twimg.com/media/HJ9GC-oa0AE_jWp.jpg",
        "https://pbs.twimg.com/media/HJ9GELpbYAAdhY5.jpg"
      ],
      url: "https://x.com/Shubair313/status/2062466568244842727?s=20",
      likes: 24,
      reposts: 7,
      comments: 4,
    },
    {
      id: 4,
      title: "Infinite Nesting in Notion",
      platform: "linkedin",
      date: "Jan 25, 2026",
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
      image: "https://media.licdn.com/dms/image/v2/D5622AQGW_woTzJmYmQ/feedshare-shrink_800/B56Z4wa6LiIsAc-/0/1778928821324?e=2147483647&v=beta&t=ibquEPs3n_WUWPRXsIrsodbER89nA70u1bTLxI2vdOY",
      url: "https://www.linkedin.com/posts/mohd-shubair-b1a454250_systemdesign-softwareengineering-notion-share-7461368273679462400-1Mdd/",
      likes: 112,
      reposts: 23,
      comments: 19,
    }
  ];

  const filteredPosts = posts.filter(post => {
    if (filter === "all") return true;
    return post.platform === filter;
  });

  return (
    <div className="min-h-screen w-full relative bg-background pt-24 pb-16">
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"
          style={{ opacity: 0.6 }}
        />
        {/* Subtle top ambient gold glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-0">
        {/* Back Button outside card */}
        <div className="mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-muted-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-primary" />
            Back to Home
          </Link>
        </div>

        {/* Page Content wrapped in elegant section-card */}
        <div className="section-card flex flex-col bg-card border border-border/50 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
          
          {/* Header */}
          <div className="mb-8 border-b border-border/30 pb-6 relative">
            {/* Corner ambient Sparkle Badge */}
            <div className="absolute top-0 right-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-semibold text-primary select-none uppercase tracking-wider font-mono">
              <Sparkles className="w-3 h-3 text-primary animate-pulse" />
              Proof of Work
            </div>

            <h1 className="font-serif text-4xl tracking-wide text-neutral-900 dark:text-white mb-2.5">
              My ML Learnings
            </h1>
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              A repository of machine learning foundations, deep learning concepts, and distributed systems engineering proof of works built during my learning journey.
            </p>
          </div>

          {/* Social Feed Filter Tabs */}
          <div className="flex gap-1.5 mb-8 bg-neutral-200/50 dark:bg-neutral-900/50 p-1.5 rounded-xl border border-border/40 w-fit select-none">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-heading transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-primary text-black shadow-sm font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Posts
            </button>
            <button
              onClick={() => setFilter("linkedin")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-heading transition-all cursor-pointer ${
                filter === "linkedin"
                  ? "bg-primary text-black shadow-sm font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              LinkedIn
            </button>
            <button
              onClick={() => setFilter("x")}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold font-heading transition-all cursor-pointer ${
                filter === "x"
                  ? "bg-primary text-black shadow-sm font-bold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              X / Twitter
            </button>
          </div>

          {/* Feed List */}
          {filteredPosts.length > 0 ? (
            <div className="flex flex-col gap-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground text-sm font-mono border border-dashed border-border/40 rounded-2xl">
              No posts found for the selected category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
