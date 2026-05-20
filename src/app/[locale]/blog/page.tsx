import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getBasicPageMetadata } from '@/lib/helpers';
import { Pathname } from '@/lib/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('blog');

  return getBasicPageMetadata({locale, pathname: Pathname.BLOG, localizedPageTitle: t('title')})
}

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('blog');

  return (
    <main className='main-container'>
      <h1 className='sr-only'>{t('title')}</h1>
      <p className='paragraphText'>{t('paragraph1')}</p>
    </main>
  );
}
