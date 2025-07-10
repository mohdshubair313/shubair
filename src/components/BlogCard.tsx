import Link from "next/link";

type Blog = {
  slug: string;
  title: string;
  summary: string;
};

interface BlogCardProps {
  blog: Blog;
}

export default function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blogs/${blog.slug}`}>
      <div className="rounded shadow p-4 bg-white dark:bg-black">
        <h2 className="text-xl font-bold">{blog.title}</h2>
        <p className="text-gray-500">{blog.summary}</p>
      </div>
    </Link>
  );
}
