import { BlogGrid } from "@/components/blog/BlogGrid";
import { getAllBlogs } from "@/lib/getMdxContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Mohd Shubair",
  description:
    "Explore my latest thoughts on web development, AI, and technology through in-depth articles and tutorials.",
  openGraph: {
    title: "Blog | Mohd Shubair",
    description:
      "Explore my latest thoughts on web development, AI, and technology through in-depth articles and tutorials.",
    type: "website",
  },
};

export default function BlogsPage() {
  const blogs = getAllBlogs();

  return <BlogGrid blogs={blogs} />;
}
