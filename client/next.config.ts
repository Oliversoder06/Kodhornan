import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  transpilePackages: ["shared"],

  // This avoids weird edge-case resolution issues
  experimental: {
    externalDir: true
  },

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "shared": path.resolve(__dirname, "../shared"),
      "shared/exercises": path.resolve(__dirname, "../shared/exercises/index.ts"),
      "shared/exercise.schema": path.resolve(__dirname, "../shared/exercise.schema.ts"),
    };
    return config;
  },
};

export default nextConfig;
