
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const dynamic = "force-static";

type BlogMeta = {
  title: string;
  publishedAt: string;
  summary: string;
  slug: string;
};

function getAllBlogs(): BlogMeta[] {
  const blogDir = path.join(process.cwd(), "src/blogs");
  const files = fs.readdirSync(blogDir);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const filePath = path.join(blogDir, file);
      const source = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(source);

      return {
        title: data.title || "Untitled",
        publishedAt: data.publishedAt || "Unknown Date",
        summary: data.summary || "No summary available.",
        slug: file.replace(/\.mdx$/, ""),
      };
    });
}

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-4xl mx-auto"
      >
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">📝 My Blogs</h1>
        <p className="text-zinc-300 text-lg sm:text-xl max-w-2xl mx-auto">
          Explore articles on AI, JavaScript, LangChain, and more — powered by MDX.
        </p>
      </motion.div>

      <motion.div
        className="mt-16 grid gap-8 sm:grid-cols-2 max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
      >
        {blogs.map((blog) => (
          <motion.div
            key={blog.slug}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 90, damping: 12 }}
            className="bg-white/10 border border-white/20 backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="text-sm text-zinc-400">{blog.publishedAt}</div>
            <h2 className="text-2xl font-bold mb-2">{blog.title}</h2>
            <p className="text-zinc-300 line-clamp-3 mb-4">{blog.summary}</p>
            <Link
              href={`/blogs/${blog.slug}`}
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
