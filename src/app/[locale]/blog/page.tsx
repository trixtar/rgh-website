import { getTranslations, setRequestLocale } from 'next-intl/server';
import Parser from 'rss-parser';

import BlogPosts from '@/components/ui/BlogPosts';
import { getBasicPageMetadata } from '@/lib/helpers';
import { SUBSTACK_RSS_FEED } from '@/lib/constants';
import { BlogPost, Pathname } from '@/lib/types';

const parser = new Parser();

const getSubstackPosts = async (): Promise<BlogPost[]> => {
  const feed = await parser.parseURL(SUBSTACK_RSS_FEED);

  return feed.items.map(item => ({
    title: item.title,
    url: item.link,
    snippet: item.contentSnippet,
    imageUrl: item.enclosure?.url,
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
          <BlogPosts posts={posts} />
        </section>
      )}
    </main>
  );
}
