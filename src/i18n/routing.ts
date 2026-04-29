import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'es'] as const,
  defaultLocale: 'en',
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

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];