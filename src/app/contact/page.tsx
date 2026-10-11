"use client";

import ContactForm from "@/components/ContactForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import SocialDock from "@/components/SocialDock";


export default function ContactPage() {
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

        <ContactForm />

        <div className="mt-8 pt-6 border-t border-dotted border-neutral-200 dark:border-neutral-800">
          <SocialDock />
        </div>
      </div>
    </div>
  );
}
