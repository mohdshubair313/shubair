import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import fs from "fs";
import path from "path";
import { mdxComponents } from "@/components/mdx-components";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

// Generate ID from text (same as in mdx-components)
function generateId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 50);
}

// Extract table of contents from MDX content
function extractTOC(content: string): TOCItem[] {
  const toc: TOCItem[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    // Match headings (h1, h2, h3)
    const match = line.match(/^(#{1,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = generateId(text);
      toc.push({ id, text, level });
    }
  }

  return toc;
}

// Calculate reading time
function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

export async function getMdxContent(slug: string) {
  const filePath = path.join(process.cwd(), "src/content/blogs", `${slug}.mdx`);

  const source = fs.readFileSync(filePath, "utf-8");
  const { content, data } = matter(source);

  // Extract TOC
  const toc = extractTOC(content);

  // Calculate reading time
  const readingTime = calculateReadingTime(content);

  const { content: mdxSource } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "wrap",
              properties: {
                className: ["anchor-link"],
              },
            },
          ],
        ],
      },
    },
    components: mdxComponents,
  });

  return {
    frontMatter: {
      title: data.title || "Untitled",
      summary: data.summary || "",
      publishedAt: data.publishedAt || new Date().toISOString(),
      author: data.author,
      readingTime: data.readingTime || readingTime,
    },
    mdxSource,
    toc,
  };
}

// Get all blog slugs for static generation
export function getAllBlogSlugs(): string[] {
  const contentDir = path.join(process.cwd(), "src/content/blogs");
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));
  return files.map((file) => file.replace(".mdx", ""));
}

// Get all blogs for listing
export function getAllBlogs() {
  const contentDir = path.join(process.cwd(), "src/content/blogs");
  const files = fs.readdirSync(contentDir).filter((f) => f.endsWith(".mdx"));

  const blogs = files.map((file) => {
    const filePath = path.join(contentDir, file);
    const source = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(source);
    const slug = file.replace(".mdx", "");

    return {
      slug,
      title: data.title || "Untitled",
      summary: data.summary || "No summary available",
      publishedAt: data.publishedAt || new Date().toISOString(),
    };
  });

  // Sort by date (newest first)
  blogs.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return blogs;
}
