import { routing } from '@/i18n/routing';
import { BASE_URL } from './constants';
import { Locale, Pathname, HrefMap } from './types';

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

    urls[locale] = `${BASE_URL}/${locale}${localizedPath}`;
  }

  return urls;
};
