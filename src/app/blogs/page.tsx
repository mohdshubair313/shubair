import { ExpandableBlogCards } from '@/components/ExpandableBlogCards'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Metadata } from 'next'

// ✅ Metadata export (Server component mein hi allowed hai)
export const metadata: Metadata = {
  title: "My Blogs",
  description: "This is my Blog Section where I write some useful blogs for techies"
}

// ✅ Default export - Server Component
export default function BlogsPage() {
  // ✅ File reading (Server-side only)
  const contentDir = path.join(process.cwd(), 'src/content/blogs')
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'))

  const blogs = files.map(file => {
    const filePath = path.join(contentDir, file)
    const source = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(source)
    const slug = file.replace('.mdx', '')

    return {
      slug,
      title: data.title || 'Untitled',
      summary: data.summary || 'No summary available',
      publishedAt: data.publishedAt || new Date().toISOString(),
    }
  })

  // Sort by date (newest first)
  blogs.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())

  // ✅ Client component ko data pass karo
  return <ExpandableBlogCards blogs={blogs} />
}
