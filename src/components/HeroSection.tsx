"use client";

import { useEffect } from "react";
import { getCalApi } from "@calcom/embed-react";
import Image from "next/image";

export default function HeroSection() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi();
      cal("ui", {
        theme: "auto",
        styles: { branding: { brandColor: "#171717" } },
      });
    })();
  }, []);

  return (
    <section id="hero" data-section="Home" className="section-card">
      {/* Profile Row */}
      <div className="flex items-end gap-3">
        <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
          <Image
            src="/profile.png"
            alt="Mohd Shubair"
            width={56}
            height={56}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h2 className="text-lg leading-tight font-medium text-neutral-900 dark:text-white">
            Mohd Shubair
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Software Engineer &amp; AI Engineer Intern (learning ML/DL)
          </p>
        </div>
      </div>

      {/* Large Serif Heading */}
      <h1 className="mt-10 mb-8 font-serif text-4xl tracking-wide text-neutral-900 dark:text-white">
        Building AI-powered Systems &amp; Full Stack Applications
      </h1>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-3">
        <button
          data-cal-link="mohdshubair313/30min"
          className="px-4 py-1.5 rounded-xl text-sm font-medium bg-neutral-900 text-white dark:bg-white dark:text-black shadow-lg dark:shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:opacity-90 cursor-pointer inline-flex items-center justify-center transition-all"
        >
          Get in touch
        </button>
        <a
          href="https://cal.com/mohdshubair313/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-1.5 rounded-xl text-sm font-medium bg-transparent border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900 cursor-pointer inline-flex items-center justify-center transition-all"
        >
          Book a call
        </a>
      </div>
    </section>
  );
}
