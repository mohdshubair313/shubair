"use client";

import ContactForm from "./ContactForm";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

const ContactSection = () => {
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

      <ContactForm />

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
        <p className="text-[11px] text-neutral-400 dark:text-neutral-600">
          &copy; {new Date().getFullYear()} Mohd Shubair. Built with care.
        </p>
      </div>
    </div>
  );
};

export default ContactSection;
