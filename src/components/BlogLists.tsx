import BlogCard from "./BlogCard";

type Blog = {
  slug: string;
  title: string;
  summary: string;
};

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  return (
    <div className="grid gap-6">
      {blogs.map((blog) => (
        <BlogCard key={blog.slug} blog={blog} />
      ))}
    </div>
  );
}
