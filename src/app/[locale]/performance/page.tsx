import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'performance' });

  return {
    title: `Rita Gonzalez Hesaynes | ${t('title')}`,
  };
}

export default async function Performance({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('performance');
  return (
    <main className='flex flex-1 flex-col justify-center w-full max-w-2xl mx-auto px-6 py-12'> {/* remove max-w mx- y px- py- */}
      <p>{t('text')}</p>
    </main>
  );
}
