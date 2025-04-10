/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true, // enable the built-in Rust MDX support
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

export default nextConfig;
