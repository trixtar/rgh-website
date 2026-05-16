import { getTranslations, setRequestLocale } from 'next-intl/server';

import Menu from '@/app/[locale]/Menu';
import { RGH_NAME } from '@/lib/constants';
import { getBasicPageMetadata } from '@/lib/helpers';
import { Pathname } from '@/lib/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('homepage');
  
  return getBasicPageMetadata({locale, pathname: Pathname.HOME, localizedPageTitle: t('title')});
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className='main-container flex flex-col justify-center'>
      <h1 className='sr-only'>{RGH_NAME}</h1>
      <Menu />
    </main>
  );
}
