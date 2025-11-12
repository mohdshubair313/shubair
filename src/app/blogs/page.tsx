import Link from 'next/link'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "My Blogs"
}

export default function BlogsPage() {
  const contentDir = path.join(process.cwd(), 'src/content/blogs')
  const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx'))

  const blogs = files.map(file => {
    const filePath = path.join(contentDir, file)
    const source = fs.readFileSync(filePath, 'utf-8')
    const { data } = matter(source)
    const slug = file.replace('.mdx', '')

    return {
      slug,
      title: data.title,
      summary: data.summary,
      publishedAt: data.publishedAt,
    }
  })

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-4xl font-bold mb-10">My Blogs</h1>
      <div className="space-y-4">
        {blogs.map(blog => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="block p-4 border rounded-lg hover:bg-gray-100"
          >
            <h2 className="text-2xl font-bold">{blog.title}</h2>
            <p className="text-gray-600">{blog.summary}</p>
            <p className="text-sm text-gray-500">{blog.publishedAt}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
