import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'hb.imgix.net' },
      { protocol: 'https', hostname: 'shared.fastly.steamstatic.com' },
    ],
  },
};

export default nextConfig;
