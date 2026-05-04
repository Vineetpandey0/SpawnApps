import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'spawnapps.dev' }],
        destination: 'https://www.spawnapps.dev/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
