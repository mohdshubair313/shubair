import { MDXRemote } from "next-mdx-remote/rsc";
import { getMdxContent } from "@/lib/getMdxContent";

type Props = {
  params: {
    slug: string;
  };
};

export default async function BlogPostPage({ params }: Props) {
  const slug = params.slug;

  const { frontMatter, mdxSource } = await getMdxContent(slug);

  return (
    <article className="prose dark:prose-invert mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-6">{frontMatter.title}</h1>
      <MDXRemote source={mdxSource} />
    </article>
  );
}
