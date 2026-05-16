import { Locale, Pathname } from '@/lib/types';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: [Locale.EN, Locale.ES],
  defaultLocale: Locale.EN,
  pathnames: {
    [Pathname.HOME]: '/',
    [Pathname.BIO]: {
      [Locale.EN]: '/biography',
      [Locale.ES]: '/biografia',
    },
    [Pathname.WORKS]: {
      [Locale.EN]: '/published-works',
      [Locale.ES]: '/obras-publicadas',
    },
    [Pathname.PERFORMANCE]: {
      [Locale.EN]: '/performance',
      [Locale.ES]: '/performance',
    },
    [Pathname.CONTACT]: {
      [Locale.EN]: '/contact',
      [Locale.ES]: '/contacto',
    },
  },
});