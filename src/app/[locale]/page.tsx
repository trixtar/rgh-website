import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'homepage' });

  return {
    title: `Rita Gonzalez Hesaynes | ${t('title')}`,
  };
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('homepage');
  return (
    <main className="flex-1 w-full max-w-2xl mx-auto px-6 py-12"> {/* remove max-w mx- y px- py- */}
      {t('text')}
    </main>
  );
}
