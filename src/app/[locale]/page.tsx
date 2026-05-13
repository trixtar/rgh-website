import Menu from '@/app/[locale]/Menu';
import { getTranslations, setRequestLocale } from 'next-intl/server';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'homepage' });

  return {
    title: `Rita Gonzalez Hesaynes | ${t('title')}`,
  };
}

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  setRequestLocale(locale);
  return (
    <main className='main-container flex flex-col justify-center'>
      <h1 className='sr-only'>Rita Gonzalez Hesaynes</h1>
      <Menu />
    </main>
  );
}
