import { getTranslations, setRequestLocale } from 'next-intl/server';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

import ohmitocondria from '@/assets/images/oh mitocondria.jpg';
import granexistencia from '@/assets/images/en la gran existencia.jpg';
import neuromantra from '@/assets/images/neuromantra.jpg';
import elfocorporativo from '@/assets/images/elfo corporativo.jpg';
import belleepoque from '@/assets/images/la belle epoque.jpg';
import lacajanegra from '@/assets/images/la caja negra.jpg';
import balbucear from '@/assets/images/brabbeln babillage balbucear.webp';
import Link from 'next/link';
import NewTab from '@/components/ui/NewTab';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'works' });

  return {
    title: `Rita Gonzalez Hesaynes | ${t('title')}`,
  };
}

export default async function Works({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('works');
  const titleMitocondria = '¡oh mitocondria!';
  const titleExistencia = 'en la gran existencia';
  const titleNeuromantra = 'neuro:mantra';
  const titleElfo = 'Elfo Corporativo';
  const titleBelleEpoque = 'La Belle Époque';
  const titleIntensaHierba = 'Una Intensa Hierba';
  const titleCajaNegra = 'La Caja Negra #5';
  const titleBalbucear = 'Brabbeln, Babillage, Balbucear';

  return (
    <main className='flex-1 w-full max-w-4xl mx-auto px-6 py-12'> {/* remove max-w mx- y px- py- */}
      <div className='text-lg dash-list-child [&>p]:pb-2'><ReactMarkdown>{t('paragraph1')}</ReactMarkdown></div>
      <div className='pt-3 text-lg dash-list-child [&>p]:pb-2'><ReactMarkdown>{t('paragraph2')}</ReactMarkdown></div>
      <div className="pt-3 grid grid-cols-2 md:grid-cols-3 gap-2">
       <Link className='block block-link-hover-style block-link-active-style reset-focus-block' href='https://promesaeditorial.com.ar/productos/elfo-corporativo-rita-gonzalez-hesaynes/' target='_blank' rel='noopener noreferrer'>
         <figure className='book-container'>
          <Image src={elfocorporativo} alt={`${t('altText1')} ${titleElfo}`} />
          <figcaption className='book-caption'>
            <span>{titleElfo}</span>
            <NewTab />
          </figcaption>
        </figure>
       </Link>
        <figure className='book-container'>
          <Image src={neuromantra} alt={`${t('altText1')} ${titleNeuromantra}`} />
          <figcaption className='book-caption'>
            <span>{titleNeuromantra}</span> 
          </figcaption>
        </figure>
       <Link className='block block-link-hover-style block-link-active-style reset-focus-block' href='https://tienda.lalibre.com.ar/productos/en-la-gran-existencia-rita-gonzalez-hesaynes/' target='_blank' rel='noopener noreferrer'>
         <figure className='book-container'>
          <Image src={granexistencia} alt={`${t('altText1')} ${titleExistencia}`} />
          <figcaption className='book-caption'>
            <span>{titleExistencia}</span>
            <NewTab />
          </figcaption>
        </figure>
       </Link>
        <figure className='book-container'>
        <Image src={ohmitocondria} alt={`${t('altText1')} ${titleMitocondria}`} />
        <figcaption className='book-caption'>
          <span>{titleMitocondria}</span>
        </figcaption>
      </figure>
        <figure className='book-container'>
        <Image src={belleepoque} alt={`${t('altText1')} ${titleBelleEpoque}`} />
        <figcaption className='book-caption'>
          <span>{titleBelleEpoque}</span>
        </figcaption>
      </figure>
        <figure className='book-container'>
        <Image src={lacajanegra} alt={`${t('altText1')} ${titleCajaNegra}`} />
        <figcaption className='book-caption flex flex-col items-center'>
          <span>{titleIntensaHierba}</span><span>{`${t('altText2')} "${titleCajaNegra}"`}</span>
        </figcaption>
      </figure>
       <Link className='block block-link-hover-style block-link-active-style reset-focus-block' href='https://www.isbn.de/buch/9783910561038/brabbeln-babillage-balbucear' target='_blank' rel='noopener noreferrer'>
         <figure className='book-container'>
          <Image src={balbucear} alt={`${t('altText1')} ${titleBalbucear}`} />
          <figcaption className='book-caption'>
            <span>{titleBalbucear}</span>
            <NewTab />
          </figcaption>
        </figure>
       </Link>
      </div>
    </main>
  );
}
