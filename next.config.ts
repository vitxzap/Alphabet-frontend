import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path",
        destination: `${process.env.NEXT_PUBLIC_API_URL}/api/:path`,
      },
    ];
  },
  experimental: {
    authInterrupts: true,
    typedEnv: true,
  },
  typedRoutes: true,
  reactCompiler: true,
};
export default nextConfig;
