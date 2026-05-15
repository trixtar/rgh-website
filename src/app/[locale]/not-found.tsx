import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('errors');

  return (
    <main className='main-container flex flex-col justify-center items-center'>
      <div aria-hidden className='-mt-10 mb-2 w-24 h-24 text-midneutral'>
        <ExclamationTriangleIcon />
      </div>
      <h1 className='mb-1 font-bold text-3xl'>{t('404label')}</h1>
      <p className=' text-2xl'>{t('404message')}</p>
    </main>
  );
}
