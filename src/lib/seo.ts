import { routing } from '@/i18n/routing';
import { site } from '@/lib/site';
import { Locale } from './types';

type HrefMap = Record<Locale, string>;

const locales: Locale[] = [Locale.EN, Locale.ES];

export function getSeoUrls(pathnameKey: keyof typeof routing.pathnames) {
  const value = routing.pathnames[pathnameKey];

  const urls: HrefMap = {} as HrefMap;

  for (const locale of locales) {
    if (pathnameKey === '/') {
      urls[locale] = `${site.baseUrl}/${locale}`;
    } else if (typeof value !== 'string') {
      urls[locale] = `${site.baseUrl}/${locale}${value[locale]}`;
    }
  }

  return urls;
};
