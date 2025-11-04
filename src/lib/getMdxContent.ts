import { compileMDX } from 'next-mdx-remote/rsc'
import matter from 'gray-matter'
import fs from 'fs'
import path from 'path'

export async function getMdxContent(slug: string) {
  const filePath = path.join(
    process.cwd(),
    'src/content/blogs',
    `${slug}.mdx`
  )

  const source = fs.readFileSync(filePath, 'utf-8')
  const { content, data } = matter(source)

  const { content: mdxSource } = await compileMDX({
    source: content,
    options: { parseFrontmatter: false },
  })

  return { frontMatter: data, mdxSource }
}
