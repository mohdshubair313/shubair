import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";

export async function getMdxContent(slug: string) {
  const filePath = path.join(process.cwd(), "src/content/blogs", `${slug}.mdx`);
  const source = fs.readFileSync(filePath, "utf-8");

  const { content, data } = matter(source);

  const mdxSource = await compile(content, { outputFormat: "function-body" });

  return { frontMatter: data, mdxSource };
}
