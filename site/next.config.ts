import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingIncludes: {
    "/api/montreal/webhook": ["./src/assets/fonts/*.ttf", "./public/images/logo-leal.jpg"],
  },
};

export default nextConfig;
