import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    optimizePackageImports: ["react-icons/fa"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.aygm.gov.tr" },
      { protocol: "https", hostname: "**.uab.gov.tr" },
    ],
  },
};

export default nextConfig;
