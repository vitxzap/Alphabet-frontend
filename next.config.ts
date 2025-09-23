import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
      return [{
        source: '/api/:path',
        destination: `${process.env.API_DESTINATION}/api/:path`,
      }]
  },
};

export default nextConfig;
