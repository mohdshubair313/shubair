"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, Github, Linkedin, Mail, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
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
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-16 md:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headingRef} className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-2">Contact</h2>
          <p className="text-muted-foreground max-w-lg text-sm leading-relaxed">
            Open to full-time roles, internships, and collaborations.
            Especially excited about opportunities in{" "}
            <span className="font-semibold text-foreground">Japan</span>,{" "}
            <span className="font-semibold text-foreground">Germany</span>,
            and tech-forward hubs worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <div className="bg-card border border-border/50 rounded-2xl p-7 md:p-9">
              <div className="flex items-center gap-2.5 mb-7">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Tell me about your idea</span>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-5">
                    <Send className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold mb-1">Message sent!</h3>
                  <p className="text-sm text-muted-foreground">
                    I&rsquo;ll get back to you within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-muted-foreground">
                      What should I call you?
                    </label>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-muted-foreground">
                      Where can I reach you?
                    </label>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      placeholder="your@email.com"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-muted-foreground">
                      What&rsquo;s on your mind?
                    </label>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Tell me about your project, idea, or just say hi..."
                      rows={4}
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-background border border-border/50 focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-card border border-border/50 rounded-2xl p-7">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">Availability</span>
              </div>
              <div className="space-y-2.5 text-sm">
                {[
                  "Remote-first, globally available",
                  "Open to relocation (Japan, Germany, EU)",
                  "Full-time, internship, or freelance",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                    <span className="text-muted-foreground text-xs">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-2xl p-7">
              <h3 className="text-sm font-medium mb-4">Find me online</h3>
              <div className="space-y-2.5">
                {[
                  { icon: Github, label: "GitHub", href: "https://github.com/mohdshubair313" },
                  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/mohdshubair313" },
                  { icon: Mail, label: "hey@shubair.in", href: "mailto:hey@shubair.in" },
                ].map((link) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors group"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span className="text-xs">{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mt-28 text-center">
        <p className="text-xs text-muted-foreground/60">
          &copy; {new Date().getFullYear()} Mohd Shubair. Built with care.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
