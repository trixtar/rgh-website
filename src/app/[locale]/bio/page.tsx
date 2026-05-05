import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import photo1 from '@/assets/images/elfo2.jpg';
import photo2 from '@/assets/images/skiba3.jpg';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'bio' });

  return {
    title: `Rita Gonzalez Hesaynes | ${t('title')}`,
  };
}

export default async function Bio({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('bio');
  return (
    <main className='flex-1 w-full max-w-4xl mx-auto px-6 py-12'> {/* remove max-w mx- y px- py- */}
      <div className='flex flex-col items-end gap-6 sm:flex-row-reverse'>
        <div className='paragraph-text space-y-4'>
          <p>{t('paragraph1')}</p>
          <p>{t('paragraph2')}</p>
        </div>
        <Image src={photo1} width={412} quality={100} className='mx-auto' alt={t('altText1')} />
      </div>
      <div className='mt-6 flex flex-col items-start gap-6 sm:flex-row'>
        <div className='paragraph-text space-y-4'>
          <ReactMarkdown>{t('paragraph3')}</ReactMarkdown>
          <p>{t('paragraph4')}</p>
          <ReactMarkdown>{t('paragraph5')}</ReactMarkdown>
          <p>{t('paragraph6')}</p>
        </div>
        <Image src={photo2} width={412} quality={100} className='mx-auto' alt={t('altText2')} />
      </div>
    </main>
  );
}
