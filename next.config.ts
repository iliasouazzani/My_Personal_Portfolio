import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: [],
  },
  allowedDevOrigins: ["192.168.0.105", "localhost", "*.local"],
  outputFileTracingRoot: path.join(__dirname, "../../"),
};

export default nextConfig;
