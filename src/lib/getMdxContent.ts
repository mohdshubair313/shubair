import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";

export async function getMdxContent(slug: string) {
  const filePath = path.join(process.cwd(), "src/blogs", `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf-8");

  const { content, data } = matter(raw);

  const compiled = await compile(content, {
    outputFormat: "function-body",
    jsxImportSource: "react",
  });

  return {
    frontMatter: data,
    mdxSource: compiled.toString(), // Pass this to MDXRemote
  };
}
