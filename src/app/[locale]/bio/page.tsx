import { getTranslations, setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Markdown from 'react-markdown';
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
    <main className='main-container'>
      <div className='flex flex-col items-end gap-6 sm:flex-row-reverse'>
        <div className='paragraph-text space-y-4'>
          <Markdown>{t('paragraph1')}</Markdown>
          <Markdown>{t('paragraph2')}</Markdown>
        </div>
        <Image src={photo1} width={412} quality={100} className='mx-auto' alt='' aria-hidden='true' />
      </div>
      <div className='mt-6 flex flex-col items-start gap-6 sm:flex-row'>
        <div className='paragraph-text space-y-4'>
          <Markdown>{t('paragraph3')}</Markdown>
          <Markdown>{t('paragraph4')}</Markdown>
          <Markdown>{t('paragraph5')}</Markdown>
          <Markdown>{t('paragraph6')}</Markdown>
        </div>
        <Image src={photo2} width={412} quality={100} className='mx-auto' alt='' aria-hidden='true' />
      </div>
    </main>
  );
}
