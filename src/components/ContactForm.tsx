"use client";

import { useId, useRef, useState, useEffect, type FormEvent } from "react";
import { Send } from "lucide-react";

const fieldClass = "w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3.5 py-2 text-base text-neutral-900 outline-none focus:ring-2 focus:ring-neutral-400 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white sm:text-sm";
export default function ContactForm() {
  const id = useId();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const active = useRef<AbortController | null>(null);
  useEffect(() => () => active.current?.abort(), []);
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (active.current) return;
    const controller = new AbortController();
    active.current = controller;
    const deadline = setTimeout(() => controller.abort(), 10000);
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form), signal: controller.signal });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Not confirmed");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch { setStatus("error"); }
    finally { clearTimeout(deadline); active.current = null; }
  }
  const emailDraft = `mailto:hey@shubair.in?subject=${encodeURIComponent(`Portfolio enquiry${form.name ? ` from ${form.name}` : ""}`)}&body=${encodeURIComponent(`${form.message}\n\n${form.name}\n${form.email}`)}`;
  return <form onSubmit={submit} className="space-y-4">
    <div className="grid gap-4 sm:grid-cols-2">
      <div><label htmlFor={`${id}-name`} className="mb-1.5 block text-xs">Name (optional)</label><input id={`${id}-name`} name="name" autoComplete="name" maxLength={100} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className={fieldClass} /></div>
      <div><label htmlFor={`${id}-email`} className="mb-1.5 block text-xs">Email</label><input id={`${id}-email`} name="email" type="email" autoComplete="email" required maxLength={254} value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className={fieldClass} /></div>
    </div>
    <div><label htmlFor={`${id}-message`} className="mb-1.5 block text-xs">Message</label><textarea id={`${id}-message`} name="message" required maxLength={5000} rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me about the opportunity or say hi…" className={`${fieldClass} resize-y`} /></div>
    <div className="flex flex-wrap items-center gap-4">
      <button type="submit" disabled={status === "sending" || !form.email.trim() || !form.message.trim()} className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-50 dark:bg-white dark:text-black"><Send size={14} />{status === "sending" ? "Sending…" : "Send Message"}</button>
      <a href={emailDraft} className="text-xs text-neutral-500 underline dark:text-neutral-400">Or email directly</a>
    </div>
    {status === "success" && <p role="status" className="text-sm">Thanks! Your message has been submitted.</p>}
    {status === "error" && <p role="alert" className="text-sm">I couldn’t confirm the message was sent. Your draft is still here. Try again or <a href={emailDraft} className="underline">open it in your email app</a>.</p>}
  </form>;
}
