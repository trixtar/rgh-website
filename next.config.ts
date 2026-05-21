import type { NextConfig } from 'next';
import withNextIntl from 'next-intl/plugin';

const nextConfig: NextConfig = withNextIntl('./src/i18n/request.ts')({
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'substackcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'substack-post-media.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'ficcionnuclear.substack.com',
      },
    ],
  },
  experimental: {
    useCache: true,
  },
});

export default nextConfig;
