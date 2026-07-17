import { NextRequest, NextResponse } from "next/server";

// ── In-memory total visitor counter ────────────────────────────────────
// In production, use a database or KV store (e.g. Vercel KV, Upstash Redis).
// This in-memory counter resets on cold starts but persists across requests
// within the same serverless instance.
let totalVisitors = 0;
const seenIPs = new Set<string>();

// ── POST: Record a new visit ───────────────────────────────────────────
export async function POST(req: NextRequest) {
  // Determine visitor identity from IP or forwarded header
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";

  // Only count unique visitors per server instance lifetime
  if (!seenIPs.has(ip)) {
    seenIPs.add(ip);
    totalVisitors++;
  }

  return NextResponse.json({
    totalVisitors,
    isNewVisitor: true,
  });
}

// ── GET: Read total visitor count ──────────────────────────────────────
export async function GET() {
  return NextResponse.json({
    totalVisitors,
  });
}
