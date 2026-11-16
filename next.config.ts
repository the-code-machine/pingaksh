import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "aliceblue-yak-580540.hostingersite.com",
        pathname: "/pingaksh-admin/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Added for your video posters
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
