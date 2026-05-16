import { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getSeoUrls } from '@/lib/seo';
import { Pathname } from '@/lib/types';

export default function sitemap(): MetadataRoute.Sitemap {
  const result: MetadataRoute.Sitemap = [];

  const pathnameKeys = Object.keys(
    routing.pathnames
  ) as Pathname[];

  for (const pathname of pathnameKeys) {
    const urls = getSeoUrls(pathname);

    for (const locale of routing.locales) {
      result.push({
        url: urls[locale],
        alternates: {
          languages: urls,
        },
      });
    }
  }

  return result;
}