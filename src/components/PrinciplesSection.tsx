"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Zap, Target, Heart, RefreshCw } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const principles = [
  {
    title: "Growth Mode",
    description:
      "Currently immersed in mastering Machine Learning, Deep Learning, and System Design. I believe in learning in public — sharing knowledge accelerates growth for everyone.",
    icon: Zap,
  },
  {
    title: "Quality First",
    description:
      "Every line of code should be intentional. I prioritize clean architecture, type safety, and maintainable patterns — because good code is a craft, not an accident.",
    icon: Target,
  },
  {
    title: "Build with Heart",
    description:
      "Technology serves people. I build with empathy, focusing on experiences that feel intuitive, delightful, and inclusive — not just functional.",
    icon: Heart,
  },
  {
    title: "Continuous Evolution",
    description:
      "The tech landscape shifts constantly. I stay ahead by building things that push my boundaries, embrace discomfort, and force me to level up.",
    icon: RefreshCw,
  },
];

const PrinciplesSection = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 87%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="principles"
      className="relative py-32 md:py-44 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headingRef} className="mb-16">
          <p className="section-number text-muted-foreground/10 dark:text-muted-foreground/5 select-none">
            05
          </p>
          <div className="mt-[-36px] md:mt-[-60px]">
            <h2 className="heading-lg mb-3">How I Work</h2>
            <p className="text-muted-foreground max-w-xl text-sm md:text-base leading-relaxed">
              The principles that guide every project I touch and every
              decision I make.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {principles.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <div
                key={principle.title}
                ref={(el) => { cardsRef.current[index] = el; }}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-card border border-border/50 rounded-2xl p-7 md:p-8 h-full group cursor-default"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-card border border-border/50 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold mb-2">{principle.title}</h3>
                      <p className="text-sm text-muted-foreground/80 leading-relaxed">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PrinciplesSection;
