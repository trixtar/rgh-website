import { routing } from '@/i18n/routing';
import { getSeoUrls } from '@/lib/seo';
import { Locale } from '@/lib/types';

export default function sitemap() {
  const result = [];

  for (const key of Object.keys(routing.pathnames)) {
    const urls = getSeoUrls(key as keyof typeof routing.pathnames);

    result.push({
      url: urls[Locale.EN],
      alternates: {
        languages: urls
      },
    });
  };

  return result;
}