import { Locale, routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { getSeoUrls } from '@/lib/seo';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const { locale } = await params;

  const t = await getTranslations('metadata');
  const urls = getSeoUrls('/');

  return {
    title: t('title'),
    description: t('description'),

    alternates: {
      canonical: urls[locale],
      languages: urls,
    },

    openGraph: {
      title: t('title'),
      description: t('description'),
      locale,
    },

    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    }
  };
}

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode,
  params: Promise<{ locale: string }>,
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Navbar />
      {children}
      <Footer />
    </NextIntlClientProvider>
  );
}
