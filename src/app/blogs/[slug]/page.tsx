import { getMdxContent } from "@/lib/MdxtoHtml";
import { MDXRemote } from "next-mdx-remote/rsc";

export default async function BlogPostPage({
  params
}: {
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;

  const { frontMatter, mdxSource } = await getMdxContent(slug);

  return (
    <article className="prose dark:prose-invert max-w-4xl mx-auto py-10">
      <h1>{frontMatter.title}</h1>
      <MDXRemote source={mdxSource} />
    </article>
  );
}
// Note: Ensure that `getMdxContent` is correctly implemented to fetch the MDX content based on the slug.
// The `frontMatter` should contain the metadata like title, date, etc., and `mdxSource` should be the actual MDX content ready to be rendered by `MDXRemote`.