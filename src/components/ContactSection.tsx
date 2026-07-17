"use client";

import { useState } from "react";
import { Send, Github, Linkedin, Mail, Twitter } from "lucide-react";
import VisitorCounter from "./VisitorCounter";

const ContactSection = () => {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    window.location.href = `mailto:hey@shubair.in?subject=Let's build something — ${formState.name}&body=${encodeURIComponent(
      `Hi Shubair,\n\n${formState.message}\n\n— ${formState.name} (${formState.email})`
    )}`;
    setSubmitted(true);
  };

  return (
    <div id="contact" data-section="Contact" className="flex w-full flex-col scroll-mt-24">
      <h3 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white mb-2">
        Get in Touch
      </h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8 leading-relaxed max-w-md">
        Open to full-time roles, internships, and collaborations.
        Especially interested in opportunities in{" "}
        <span className="text-neutral-900 dark:text-white font-medium">Japan</span>,{" "}
        <span className="text-neutral-900 dark:text-white font-medium">Germany</span>,
        and tech-forward hubs worldwide.
      </p>

      {submitted ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
            <Send className="w-5 h-5 text-neutral-900 dark:text-white" />
          </div>
          <h4 className="text-base font-medium mb-1 text-neutral-900 dark:text-white">Message sent!</h4>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            I&rsquo;ll get back to you within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium mb-1.5 text-neutral-500 dark:text-neutral-400">
                Name
              </label>
              <input
                type="text"
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="Your name"
                required
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
              />
            </div>
            <div>
              <label className="block text-xs font-medium mb-1.5 text-neutral-500 dark:text-neutral-400">
                Email
              </label>
              <input
                type="email"
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="your@email.com"
                required
                className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all text-sm text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1.5 text-neutral-500 dark:text-neutral-400">
              Message
            </label>
            <textarea
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              placeholder="Tell me about your project or just say hi..."
              rows={4}
              required
              className="w-full px-3.5 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400 dark:focus:ring-neutral-600 transition-all text-sm resize-none text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-600"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-sm font-medium bg-neutral-900 text-white dark:bg-white dark:text-black hover:opacity-90 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            Send Message
          </button>
        </form>
      )}

      {/* Social links */}
      <div className="mt-10 pt-6 border-t border-dotted border-neutral-200 dark:border-neutral-800">
        <div className="flex flex-wrap gap-4">
          {[
            { icon: Github, label: "GitHub", href: "https://github.com/mohdshubair313" },
            { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/mohd-shubair-b1a454250/" },
            { icon: Twitter, label: "Twitter", href: "https://x.com/shubair313" },
            { icon: Mail, label: "hey@shubair.in", href: "mailto:hey@shubair.in" },
          ].map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors text-xs"
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer with copyright + visitor counter */}
      <div className="mt-12 flex flex-col items-center gap-2">
        <VisitorCounter />
        <p className="text-[11px] text-neutral-400 dark:text-neutral-600">
          &copy; {new Date().getFullYear()} Mohd Shubair. Built with care.
        </p>
      </div>
    </div>
  );
};

export default ContactSection;

