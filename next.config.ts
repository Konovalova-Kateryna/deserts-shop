import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {    
    domains: ["images.unsplash.com", "plus.unsplash.com"],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 480, 640, 768, 1024, 1280, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 196, 256, 320],
  },
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },
    compress: true,
  
  experimental: {    
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
