import type { NextConfig } from 'next';
import withNextIntl from 'next-intl/plugin';

const nextConfig: NextConfig = withNextIntl('./src/i18n/request.ts')({
  images: {
    qualities: [75, 100],
  },
  experimental: {
    useCache: true,
  },
});

export default nextConfig;
