import type { NextConfig } from "next";
import withNextIntl from 'next-intl/plugin';

const nextConfig: NextConfig = withNextIntl('./src/i18n/request.ts')({
  experimental: {
    useCache: true,
  },
});

export default nextConfig;
