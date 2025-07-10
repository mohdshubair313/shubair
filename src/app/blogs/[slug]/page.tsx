import { getMdxContent } from "@/lib/MdxtoHtml";
import { MDXRemote } from "next-mdx-remote/rsc";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage(props: { params: BlogPostPageProps["params"] }) {
  const slug = props.params.slug;
  const { frontMatter, mdxSource } = await getMdxContent(slug);

  return (
    <article className="prose dark:prose-invert max-w-4xl mx-auto py-10">
      <h1>{frontMatter.title}</h1>
      <MDXRemote source={mdxSource} />
    </article>
  );
}
