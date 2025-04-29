import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const BLOGS_PATH = path.join(process.cwd(), "src/blogs");

export function getAllBlogMetadata() {
  const files = fs.readdirSync(BLOGS_PATH).filter(file => file.endsWith(".mdx"));

  return files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "");
    const filePath = path.join(BLOGS_PATH, filename);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContent);

    return {
      ...(data as {
        title: string;
        date: string;
        tags?: string[];
        description?: string;
      }),
      slug,
    };
  });
}
