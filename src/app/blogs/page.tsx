// app/blogs/page.tsx

import { getAllBlogs } from "@/lib/getBlogs";
import BlogList from "@/components/BlogLists";

export const dynamic = "force-static"; // or "force-dynamic" if needed

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-6 py-20">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">📝 My Blogs</h1>
        <p className="text-zinc-300 text-lg sm:text-xl max-w-2xl mx-auto">
          Explore articles on AI, JavaScript, LangChain, and more — powered by MDX.
        </p>
      </div>

      <BlogList blogs={blogs} />
    </main>
  );
}
