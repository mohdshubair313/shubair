import { NextRequest, NextResponse } from "next/server";

// ── Persistent-like total visitor counter ───────────────────────────────
// Uses in-memory storage per serverless instance.
// In production with Vercel, add Vercel KV or Upstash Redis for true persistence.
//
// Strategy:
//   - Server tracks unique visitors by IP hash within its lifetime
//   - Client sends its locally-stored count so the server can bootstrap
//     from the highest known count after a cold start
//   - This prevents the counter from resetting to 0 on every deploy

let totalVisitors = 0;
let bootstrapped = false;
const seenIPs = new Set<string>();

function hashIP(ip: string): string {
  // Simple hash for privacy — we don't store raw IPs
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32-bit int
  }
  return hash.toString(36);
}

// ── POST: Record a visit ───────────────────────────────────────────────
export async function POST(req: NextRequest) {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  const ipHash = hashIP(ip);

  // Allow client to bootstrap the count after a cold start
  try {
    const body = await req.json();
    if (typeof body.lastKnownCount === "number" && !bootstrapped) {
      totalVisitors = Math.max(totalVisitors, body.lastKnownCount);
      bootstrapped = true;
    }
  } catch {
    // No body or invalid JSON — that's fine
  }

  // Count unique visitors
  if (!seenIPs.has(ipHash)) {
    seenIPs.add(ipHash);
    totalVisitors++;
  }

  return NextResponse.json({ totalVisitors });
}

// ── GET: Read total visitor count ──────────────────────────────────────
export async function GET() {
  return NextResponse.json({ totalVisitors });
}
