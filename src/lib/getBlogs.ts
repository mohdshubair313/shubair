import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDir = path.join(process.cwd(), "src/content/blogs");

export async function getAllBlogs() {
  const files = fs.readdirSync(blogsDir);

  return files.map((filename) => {
    const filePath = path.join(blogsDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent); // Extract frontMatter

    return {
      ...data,
      slug: filename.replace(".mdx", ""),
    };
  });
}