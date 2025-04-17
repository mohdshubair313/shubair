'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const blogs = [
  {
    title: 'Building a Modern Portfolio with Next.js',
    date: 'April 5, 2025',
    description: 'A behind-the-scenes look into designing and coding a portfolio that stands out using Next.js and Tailwind CSS.',
    tags: ['Next.js', 'Tailwind', 'Design'],
    slug: 'modern-portfolio-nextjs',
  },
  {
    title: 'LangChain in Real-World Apps',
    date: 'March 22, 2025',
    description: 'How to practically implement LangChain to build intelligent, agent-powered applications.',
    tags: ['LangChain', 'AI', 'OpenAI'],
    slug: 'langchain-realworld',
  },
];

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-black text-white px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 mt-8">📝 My Blog</h1>
        <p className="text-zinc-400 text-lg sm:text-xl max-w-2xl mx-auto">
          A space where I write about web dev, AI, and everything I’m building. Stay inspired 🚀
        </p>
      </motion.div>

      <motion.div
        className="mt-16 grid gap-8 sm:grid-cols-2 max-w-5xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {blogs.map((blog) => (
          <motion.div
            key={blog.slug}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 100, damping: 10 }}
            className="bg-white/10 border border-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all"
          >
            <div className="text-sm text-zinc-400 mb-2">{blog.date}</div>
            <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-zinc-300 mb-4 line-clamp-3">{blog.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {blog.tags.map(tag => (
                <span
                  key={tag}
                  className="text-xs bg-white/20 text-white px-2 py-1 rounded-full"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <Link
              href={`/blog/${blog.slug}`}
              className="inline-flex items-center text-sm text-blue-400 hover:underline group"
            >
              Read more
              <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </main>
  );
}
