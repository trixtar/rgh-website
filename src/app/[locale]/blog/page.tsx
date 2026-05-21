import { getTranslations, setRequestLocale } from 'next-intl/server';
import { XMLParser } from 'fast-xml-parser';

import { decodeHtml, getBasicPageMetadata } from '@/lib/helpers';
import { SUBSTACK_RSS_FEED } from '@/lib/constants';
import { CardGalleryItem, Pathname } from '@/lib/types';
import CardGallery from '@/components/ui/CardGallery';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
});

const extractImage = (item: any) => {
  const enclosureImage = item.enclosure?.['@_url'];

  const mediaImage =
    item['media:content']?.['@_url'] ||
    item['media:thumbnail']?.['@_url'];

  // fallback: extracts first <img> from description
  const html = item.description ?? '';
  const match = html.match(/<img[^>]+src="([^">]+)"/);

  return enclosureImage || mediaImage || match?.[1] || null;
}

const getSubstackPosts = async (): Promise<CardGalleryItem[]> => {
  const xml = await fetch(SUBSTACK_RSS_FEED).then(res => res.text());

  const data = parser.parse(xml);

  const items = data.rss?.channel?.item || [];

  return items.map((item: any) => ({
      key: item.link,
      title: item.title,
      url: item.link,
      subtitle: decodeHtml(item.description ?? ''),
      imageSrc: extractImage(item),
    })
  );
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
