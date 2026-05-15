import { routing } from '@/i18n/routing';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { getSeoUrls } from '@/lib/seo';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Locale } from '@/lib/types';

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
      type: 'website',
    },

    twitter: {
      title: t('title'),
      description: t('description'),
      card: 'summary_large_image',
    },

    icons: {
      apple: '/apple-touch-icon.png',
      icon: [
        {
          url: '/favicon-32x32.png',
          sizes: '32x32',
          type: 'image/png',
        },
        {
          url: '/favicon-16x16.png',
          sizes: '16x16',
          type: 'image/png',
        },
        {
          url: '/favicon.ico',
        },
      ],
    },

    manifest: '/manifest.webmanifest',
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
