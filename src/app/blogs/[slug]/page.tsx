// app/blogs/[slug]/page.tsx
export const dynamic = "force-static";

import { MDXRemote } from "next-mdx-remote/rsc";
import { getMdxContent } from "@/lib/getMdxContent";
import fs from "fs";
import path from "path";

type Props = {
  params: {
    slug: string;
  };
};

// ✅ Fix: point to directory, not file
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), "src/blogs"));
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}

export default async function BlogPostPage({ params }: Props) {
  const slug = await params?.slug;

  if (!slug) {
    throw new Error("Slug param is missing.");
  }

  const { mdxSource, frontMatter } = await getMdxContent(slug);

  return (
    <article className="prose dark:prose-invert">
      <h1>{frontMatter.title}</h1>
      <MDXRemote source={mdxSource} />
    </article>
  );
}