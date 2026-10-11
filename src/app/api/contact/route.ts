export const runtime = "nodejs";
export const maxDuration = 15;

export async function POST(request: Request) {
  let body;
  try { body = await request.json(); }
  catch { return Response.json({ error: "Invalid message." }, { status: 400 }); }
  const { name = "", email, message } = body || {};
  if (typeof name !== "string" || name.length > 100 || typeof email !== "string" || email.length > 254
    || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) || typeof message !== "string" || !message.trim() || message.length > 5000) {
    return Response.json({ error: "Please provide a valid email and message (up to 5,000 characters)." }, { status: 400 });
  }
  if (!process.env.RESEND_API_KEY) return Response.json({ error: "Please email hey@shubair.in directly." }, { status: 503 });
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", signal: AbortSignal.timeout(8000),
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>",
        to: ["shubair313@gmail.com"], reply_to: email.trim(),
        subject: "New portfolio enquiry",
        text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
      }),
    });
    const result = await response.json();
    if (!response.ok || !result.id) throw new Error("Email not accepted");
    return Response.json({ success: true });
  } catch {
    return Response.json({ error: "Sending could not be confirmed. Please email hey@shubair.in directly." }, { status: 503 });
  }
}
