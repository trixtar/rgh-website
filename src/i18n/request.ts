import { hasLocale } from 'next-intl';
import { getRequestConfig, GetRequestConfigParams } from 'next-intl/server';
import { routing } from './routing';

// https://www.buildwithmatija.com/blog/nextjs-internationalization-guide-next-intl-2025

const requestConfig = async ({ requestLocale }: GetRequestConfigParams) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const messages = (await import(`../../messages/${locale}/messages.json`)).default;

  return { locale, messages };
}

export default getRequestConfig(requestConfig);