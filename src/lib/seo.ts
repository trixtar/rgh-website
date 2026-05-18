import { routing } from '@/i18n/routing';
import { Locale, Pathname, HrefMap } from './types';
import { site } from './site';

const locales: Locale[] = [Locale.EN, Locale.ES];

export const getSeoUrls = (pathname: Pathname):HrefMap => {
  const slugValues = routing.pathnames[pathname];

  const urls = {} as HrefMap;

  for (const locale of locales) {
    let localizedPath: string;

    if (typeof slugValues === 'string') {
      localizedPath = slugValues;
    } else {
      localizedPath = slugValues[locale];
    }

    urls[locale] = `${site.baseUrl}/${locale}${localizedPath}`;
  }

  return urls;
};
