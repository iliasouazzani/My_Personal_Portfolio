import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [],
  },
  allowedDevOrigins: ["192.168.0.105", "localhost", "*.local"],
};

export default nextConfig;
