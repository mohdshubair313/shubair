import { BlogContent } from "@/components/blog/BlogContent";
import { getMdxContent, getAllBlogSlugs } from "@/lib/getMdxContent";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const { frontMatter } = await getMdxContent(slug);
    return {
      title: `${frontMatter.title} | Mohd Shubair`,
      description: frontMatter.summary,
      openGraph: {
        title: frontMatter.title,
        description: frontMatter.summary,
        type: "article",
        publishedTime: frontMatter.publishedAt,
      },
    };
  } catch {
    return {
      title: "Blog Post | Mohd Shubair",
      description: "Read this blog post",
    };
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  try {
    const { frontMatter, mdxSource, toc } = await getMdxContent(slug);

    return (
      <BlogContent
        title={frontMatter.title}
        summary={frontMatter.summary}
        publishedAt={frontMatter.publishedAt}
        readingTime={frontMatter.readingTime}
        author={frontMatter.author || "Mohd Shubair"}
        tocItems={toc}
      >
        {mdxSource}
      </BlogContent>
    );
  } catch {
    notFound();
  }
}
