"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface Blog {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string;
}

interface BlogSectionProps {
  blogs: Blog[];
}

const BlogSection = ({ blogs }: BlogSectionProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        gsap.from(headingRef.current, {
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
        });
      }

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 40,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.15,
          ease: "power3.out",
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section
      ref={sectionRef}
      id="blog"
      className="relative py-16 md:py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div ref={headingRef} className="mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-heading">Blog</h2>
        </div>

        {blogs.length === 0 ? (
          <div className="bg-card border border-border/50 rounded-2xl p-10 text-center">
            <BookOpen className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
            <p className="text-muted-foreground text-sm">
              Thoughts brewing. Check back soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {blogs.slice(0, 2).map((blog, index) => (
              <Link
                key={blog.slug}
                href={`/blogs/${blog.slug}`}
                ref={(el) => { cardsRef.current[index] = el; }}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="bg-card border border-border/50 rounded-2xl p-7 md:p-8 h-full group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 text-xs text-muted-foreground mb-4">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(blog.publishedAt)}
                    </span>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold mb-2.5 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h3>

                  <p className="text-sm text-muted-foreground/80 leading-relaxed mb-5 line-clamp-3">
                    {blog.summary}
                  </p>

                  <div className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    Read more
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}

        {blogs.length > 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-8 text-center"
          >
            <Link
              href="/blogs"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View all posts ({blogs.length})
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
