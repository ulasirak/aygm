import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: __dirname,
  },
  experimental: {
    optimizePackageImports: ["react-icons/fa"],
  },
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    remotePatterns: [
      { protocol: "https", hostname: "**.aygm.gov.tr" },
      { protocol: "https", hostname: "**.uab.gov.tr" },
      { protocol: "https", hostname: "aygm.vercel.app" },
    ],
  },
};

export default nextConfig;
