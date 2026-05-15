import { Locale } from '@/lib/types';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: [Locale.EN, Locale.ES],
  defaultLocale: Locale.EN,
  pathnames: {
    '/': '/',
    'bio': {
      en: '/biography',
      es: '/biografia',
    },
    'works': {
      en: '/published-works',
      es: '/obras-publicadas',
    },
    'performance': 'performance',
    'contact-details': {
      en: '/contact',
      es: '/contacto',
    },
  },
});