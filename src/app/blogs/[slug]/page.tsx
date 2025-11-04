import { getMdxContent } from '@/lib/getMdxContent'

export default async function BlogPage({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const { frontMatter, mdxSource } = await getMdxContent(slug)

  return (
    <article className="prose dark:prose-invert max-w-4xl mx-auto py-10">
      <h1>{frontMatter.title}</h1>
      <p className="text-gray-600">{frontMatter.summary}</p>
      {mdxSource}
    </article>
  )
}
