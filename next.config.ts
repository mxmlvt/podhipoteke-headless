import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "srv106163.seohost.com.pl",
      },
      {
        protocol: "https",
        hostname: "podhipoteke24.pl",
      },
      {
        protocol: "https",
        hostname: "www.podhipoteke24.pl",
      },
    ],
  },
};

export default nextConfig;
