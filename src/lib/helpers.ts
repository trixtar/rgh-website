import { RGH_NAME } from './constants';
import { getSeoUrls } from './seo';
import { HrefMap, Locale, Pathname } from './types';

export const sanitizeMarkdownItalics = (title: string): string =>
  title.replace(/\*/g, '');

export const getLocaleFromString = (locale: string): Locale => {
  if (locale === Locale.EN) return Locale.EN;
  if (locale === Locale.ES) return Locale.ES;

  throw new Error('Invalid Locale');
};

export const getIsHomepage = (pathname: Pathname): boolean => pathname === Pathname.HOME;

interface BasicPageMetadata {
  title: string;
  alternates: {
    canonical: string;
    languages: HrefMap;
  };
}

export const getBasicPageMetadata = ({
  locale,
  pathname,
  localizedPageTitle,
}: {
  locale: string | Locale;
  pathname: Pathname;
  localizedPageTitle: string;
}): BasicPageMetadata => {
  const urls = getSeoUrls(pathname);

  return {
    title: `${RGH_NAME} | ${localizedPageTitle}`,
    alternates: {
      canonical: urls[getLocaleFromString(locale)],
      languages: urls,
    },
  };
};
