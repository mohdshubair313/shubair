import fs from "fs";
import path from "path";
import { serialize } from "next-mdx-remote/serialize";
import matter from "gray-matter";

export async function getMdxContent(slug: string) {
  const filePath = path.join(process.cwd(), "src/blogs", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");

  const { content, data } = matter(source);
  const mdxSource = await serialize(content, { scope: data });

  return {
    mdxSource,
    frontMatter: data,
  };
}
