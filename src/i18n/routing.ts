import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ['en', 'es'] as const,
  defaultLocale: 'en',
  pathnames: {
    '/': '/',
    'about': {
      en: '/about',
      es: '/acerca-de',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];