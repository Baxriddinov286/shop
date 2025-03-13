import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["dijgblooocqejrsjbsto.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dijgblooocqejrsjbsto.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
