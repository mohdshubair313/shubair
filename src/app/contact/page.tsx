"use client";

import { useState } from "react";
import { Send, ArrowLeft } from "lucide-react";
import Link from "next/link";
import SocialDock from "@/components/SocialDock";
import { toast } from "sonner";

export default function ContactPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email address");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter your message");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, message }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("Message sent! I'll get back to you soon.");
        setEmail("");
        setMessage("");
      } else {
        toast.error(data.error || "Failed to send message.");
      }
    } catch {
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-4 sm:px-0 page-enter">
      <div className="mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back
        </Link>
      </div>

      <div className="section-card flex flex-col">
        <h1 className="font-serif text-4xl tracking-wide text-neutral-900 dark:text-white mb-2">
          Get in Touch
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed max-w-md">
          Open to full-time roles, internships, and collaborations. Especially interested in
          opportunities in <span className="text-neutral-900 dark:text-white font-medium">Japan</span>,{" "}
          <span className="text-neutral-900 dark:text-white font-medium">Germany</span>, and
          tech-forward hubs worldwide.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium mb-1.5 text-neutral-500 dark:text-neutral-400">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
            />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5 text-neutral-500 dark:text-neutral-400">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell me about your project or just say hi..."
              rows={4}
              required
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all text-sm resize-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-2 rounded-xl text-sm font-medium bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-all inline-flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-dotted border-neutral-200 dark:border-neutral-800">
          <SocialDock />
        </div>
      </div>
    </div>
  );
}
