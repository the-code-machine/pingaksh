import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aliceblue-yak-580540.hostingersite.com",
        pathname: "/**", // <--- Changed from "*" to "/**" to allow deep nested folders
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**", // Added /** here as well for safety
      },
    ],
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
