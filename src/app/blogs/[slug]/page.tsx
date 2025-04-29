// app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import {posts} from '@/blogs/posts'

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const importPost = posts[params.slug as keyof typeof posts];
  if (!importPost) return notFound();

  const { default: MDXContent } = await importPost();

  return (
    <main className="prose prose-invert max-w-3xl mx-auto py-20 px-4">
      <MDXContent />
    </main>
  );
}
