"use client";

import { Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Full-Stack Developer",
    company: "Stealth Startup",
    date: "Dec 2025 – Present",
    location: "Remote",
    description:
      "Developing and deploying client projects, implementing CI/CD pipelines, and optimizing application performance across the stack.",
    skills: ["Next.js", "TypeScript", "PostgreSQL", "Docker"],
  },
  {
    title: "MERN Stack Intern",
    company: "Bestlatech Solutions",
    date: "Aug 2025 – Oct 2025",
    location: "Remote",
    description:
      "Worked on full-stack projects including social media and e-commerce platforms using Django, React, Node.js, and MongoDB.",
    skills: ["React", "Node.js", "Django", "MongoDB", "AWS"],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" data-section="Experience" className="scroll-mt-24">
      <h3 className="font-serif text-3xl tracking-wide text-neutral-900 dark:text-white mb-6">
        Experience
      </h3>

      <div>
        {experiences.map((item, index) => (
          <div
            key={index}
            className="border-t border-dotted border-muted-foreground/20 py-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <h4 className="font-medium text-foreground">{item.company}</h4>
                  {index === 0 && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-green-600 dark:text-green-400 border border-green-500/30 bg-green-500/10 px-1.5 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      Working
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground/70 mt-2 leading-relaxed max-w-lg">
                  {item.description}
                </p>

                {item.skills && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {item.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-[10px] rounded-full bg-secondary border border-border text-muted-foreground font-mono"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="shrink-0 text-right text-xs text-muted-foreground">
                <p className="flex items-center gap-1 justify-end">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </p>
                <p className="flex items-center gap-1 justify-end mt-0.5">
                  <MapPin className="w-3 h-3" />
                  {item.location}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="border-t border-dotted border-muted-foreground/20" />
      </div>
    </section>
  );
};

export default ExperienceSection;
