const nextConfig = {
  experimental: {
    mdxRs: true,
  },
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  webpack(config: import('webpack').Configuration): import('webpack').Configuration {
    config.module?.rules?.push({
      test: /\.mdx$/,
      use: [
        {
          loader: "@mdx-js/loader",
          options: {} as import('@mdx-js/loader').Options,
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
