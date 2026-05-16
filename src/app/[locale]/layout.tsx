import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { League_Spartan, Fredericka_the_Great, Oswald } from 'next/font/google';

import { routing } from '@/i18n/routing';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import { Locale } from '@/lib/types';
import '../globals.css';

const leagueSpartan = League_Spartan({
  variable: '--font-league-spartan',
  subsets: ['latin'],
});

const frederickaTheGreat = Fredericka_the_Great({
  variable: '--font-fredericka',
  subsets: ['latin'],
  weight: ['400'],
  fallback: ['serif'],
});

const oswald = Oswald({
  variable: '--font-oswald',
  subsets: ['latin'],
});

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const t = await getTranslations('metadata');

  return {
    title: t('title'),
    description: t('description'),

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
    <html
      lang={Locale.EN}
      className={`${leagueSpartan.variable} ${frederickaTheGreat.variable} ${oswald.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className='min-h-screen flex flex-col overflow-x-hidden'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
