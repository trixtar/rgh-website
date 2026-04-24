import { League_Spartan, Fredericka_the_Great, Oswald } from "next/font/google";
import { Locale, routing } from "@/i18n/routing";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { getSeoUrls } from "@/lib/seo";
import Navbar from "@/components/ui/Navbar";
import "../globals.css";
import Footer from "@/components/ui/Footer";

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

export async function generateMetadata({ params }: { params: { locale: Locale } }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: "metadata" });
  const urls = getSeoUrls('/');

  return {
    title: t('title'),
    description: t('description'),

    alternates: {
      canonical: urls[locale],
      languages: urls,
    },

    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      locale,
    },

    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
    }
  };
}

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode,
  params: { locale: string },
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${leagueSpartan.variable} ${frederickaTheGreat.variable} ${oswald.variable} h-full antialiased`}
    >
      <body className='min-h-full flex flex-col'>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Navbar />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
