import { getTranslations, setRequestLocale } from 'next-intl/server';
import Markdown from 'react-markdown';
import { StaticImageData } from 'next/image';

import CardGallery from '@/components/ui/CardGallery';
import { getBasicPageMetadata } from '@/lib/helpers';
import { Pathname } from '@/lib/types';

import ohmitocondria from '@/assets/images/oh mitocondria.jpg';
import granexistencia from '@/assets/images/en la gran existencia.jpg';
import neuromantra from '@/assets/images/neuromantra.jpg';
import elfocorporativo from '@/assets/images/elfo corporativo.jpg';
import belleepoque from '@/assets/images/la belle epoque.jpg';
import lacajanegra from '@/assets/images/la caja negra.jpg';
import balbucear from '@/assets/images/brabbeln babillage balbucear.webp';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('works');

  return getBasicPageMetadata({
    locale,
    pathname: Pathname.WORKS,
    localizedPageTitle: t('title'),
  });
}

interface Book {
  title: string;
  imageSrc: StaticImageData;
  url?: string;
}

const books: Book[] = [
  {
    title: 'Elfo Corporativo',
    url: 'https://promesaeditorial.com.ar/productos/elfo-corporativo-rita-gonzalez-hesaynes/',
    imageSrc: elfocorporativo,
  },
  {
    title: 'neuro:mantra',
    imageSrc: neuromantra,
  },
  {
    title: 'en la gran existencia',
    url: 'https://tienda.lalibre.com.ar/productos/en-la-gran-existencia-rita-gonzalez-hesaynes/',
    imageSrc: granexistencia
  },
  {
    title: '¡oh mitocondria!',
    imageSrc: ohmitocondria,
  },
  {
    title: 'La Belle Époque',
    imageSrc: belleepoque,
  },
  {
    title: 'La Caja Negra #5',
    imageSrc: lacajanegra,
  },
  {
    title: 'Brabbeln, Babillage, Balbucear',
    url: 'https://www.isbn.de/buch/9783910561038/brabbeln-babillage-balbucear',
    imageSrc: balbucear,
  }
];

export default async function Works({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('works');
  const items = books.map(({ title, url, imageSrc }) => {
    return {
      key: title,
      title,
      url,
      imageSrc,
      imageAltText: `${t('altText1')} ${title}`,
    };
  });

  return (
    <main className='main-container space-y-3'>
      <h1 className='sr-only'>{t('title')}</h1>
      <div className='text-lg dash-list-child [&>p]:pb-2'>
        <Markdown>{t('paragraph1')}</Markdown>
      </div>
      <div className='text-lg dash-list-child [&>p]:pb-2'>
        <Markdown>{t('paragraph2')}</Markdown>
      </div>
      <section aria-label={t('sectionAriaLabel')}>
        <CardGallery items={items} imageAspectStyle='aspect-[2/3]' isTextCentered />
      </section>
    </main>
  );
}
