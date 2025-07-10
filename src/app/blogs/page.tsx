import { getAllBlogs } from "@/lib/getBlogs";
import BlogList from "@/components/BlogLists";

export default async function BlogsPage() {
  type Blog = {
    slug: string;
    title: string;
    summary: string;
  };

  const rawBlogs = await getAllBlogs() as Blog[]; // Ensure this is awaited if getAllBlogs is async and returns the correct Blog[] type
  // Map or filter to ensure each blog has slug, title, and summary

  const blogs = rawBlogs.map((blog) => ({
    slug: blog.slug,
    title: blog.title,
    summary: blog.summary,
  }));

  return (
    <main className="...">
      <h1>📝 My Blogs</h1>
      <BlogList blogs={blogs} />
    </main>
  );
}
