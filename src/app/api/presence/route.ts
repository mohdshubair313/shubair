import { NextRequest, NextResponse } from "next/server";

// ── Types ──────────────────────────────────────────────────────────────
interface Visitor {
  id: string;
  avatar: string;
  color: string;
  lastSeen: number;
}

// ── In-memory store ────────────────────────────────────────────────────
// Survives across requests in the same serverless instance.
// Stale visitors are cleaned on every request.
const visitors = new Map<string, Visitor>();

const HEARTBEAT_TTL = 15_000; // 15 seconds — visitor considered gone after this
const MAX_VISIBLE_AVATARS = 8;

// Fun avatar emojis for random assignment
const AVATARS = [
  "🧑‍💻", "👩‍💻", "🧑‍🎨", "👨‍🚀", "🦊", "🐱", "🐼", "🦁",
  "🐸", "🦉", "🐙", "🦋", "🌸", "🔥", "⚡", "🚀",
  "💎", "🎯", "🎨", "🧊", "🌙", "✨", "🪐", "🎸",
];

// Curated accent colors (HSL-friendly, vibrant but not garish)
const COLORS = [
  "#6366f1", // indigo
  "#8b5cf6", // violet
  "#ec4899", // pink
  "#f43f5e", // rose
  "#14b8a6", // teal
  "#06b6d4", // cyan
  "#3b82f6", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#a855f7", // purple
  "#22d3ee", // sky
];

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function cleanStale() {
  const now = Date.now();
  for (const [id, visitor] of visitors) {
    if (now - visitor.lastSeen > HEARTBEAT_TTL) {
      visitors.delete(id);
    }
  }
}

// ── POST: Heartbeat / Register ─────────────────────────────────────────
export async function POST(req: NextRequest) {
  cleanStale();

  // Read or generate visitor ID from cookie
  let visitorId = req.cookies.get("vid")?.value;
  const isNew = !visitorId || !visitors.has(visitorId);

  if (!visitorId) {
    visitorId = crypto.randomUUID();
  }

  // Upsert visitor
  const existing = visitors.get(visitorId);
  visitors.set(visitorId, {
    id: visitorId,
    avatar: existing?.avatar ?? randomFrom(AVATARS),
    color: existing?.color ?? randomFrom(COLORS),
    lastSeen: Date.now(),
  });

  // Build response
  const activeViewers = Array.from(visitors.values())
    .sort((a, b) => b.lastSeen - a.lastSeen)
    .slice(0, MAX_VISIBLE_AVATARS);

  const res = NextResponse.json({
    viewerCount: visitors.size,
    viewers: activeViewers.map(({ id, avatar, color }) => ({ id, avatar, color })),
    you: visitorId,
    isNew,
  });

  // Set cookie so same browser tab keeps the same identity
  res.cookies.set("vid", visitorId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return res;
}

// ── GET: Read-only presence data ────────────────────────────────────────
export async function GET() {
  cleanStale();

  const activeViewers = Array.from(visitors.values())
    .sort((a, b) => b.lastSeen - a.lastSeen)
    .slice(0, MAX_VISIBLE_AVATARS);

  return NextResponse.json({
    viewerCount: visitors.size,
    viewers: activeViewers.map(({ id, avatar, color }) => ({ id, avatar, color })),
  });
}
