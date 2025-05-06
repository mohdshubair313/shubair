// lib/getBlogs.ts
import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

type BlogMeta = {
  title: string;
  publishedAt: string;
  summary: string;
  slug: string;
};

export async function getAllBlogs(): Promise<BlogMeta[]> {
  const blogDir = path.join(process.cwd(), "src/blogs");
  const files = await fs.readdir(blogDir);

  const blogs = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const filePath = path.join(blogDir, file);
        const source = await fs.readFile(filePath, "utf-8");
        const { data } = matter(source);

        return {
          title: data.title || "Untitled",
          publishedAt: data.publishedAt || "Unknown Date",
          summary: data.summary || "No summary available.",
          slug: file.replace(/\.mdx$/, ""),
        };
      })
  );

  return blogs;
}
