import { getTranslations, setRequestLocale } from 'next-intl/server';
import Parser from 'rss-parser';

import { getBasicPageMetadata } from '@/lib/helpers';
import { SUBSTACK_RSS_FEED } from '@/lib/constants';
import { CardGalleryItem, Pathname } from '@/lib/types';
import CardGallery from '@/components/ui/CardGallery';

const parser = new Parser();

const getSubstackPosts = async (): Promise<CardGalleryItem[]> => {
  const feed = await parser.parseURL(SUBSTACK_RSS_FEED);

  return feed.items.map(item => ({
    key: item.isoDate as string,
    title: item.title,
    url: item.link,
    subtitle: item.contentSnippet,
    imageSrc: item.enclosure?.url,
  }));
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('blog');

  return getBasicPageMetadata({locale, pathname: Pathname.BLOG, localizedPageTitle: t('title')})
};

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('blog');
  const posts = await getSubstackPosts();

  return (
    <main className='main-container space-y-3'>
      <h1 className='sr-only'>{t('title')}</h1>
      <p className='paragraphText'>{t('paragraph1')}</p>
      {posts && posts?.length && (
        <section aria-label={t('sectionAriaLabel')}>
          <CardGallery items={posts} gridExtraClasses='grid-cols-1 sm:grid-cols-2 md:grid-cols-3' imageAspectStyle='aspect-[4/3]' imageSizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw' />
        </section>
      )}
    </main>
  );
}
