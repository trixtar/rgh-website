'use client'

import { useState } from 'react';
import Image from 'next/image';
import { ArchivedPhoto } from '@/lib/types';
import { useTranslations } from 'next-intl';
import Markdown from 'react-markdown';

export default function PhotoGallery({ photos }: { photos: ArchivedPhoto[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<ArchivedPhoto>();
  const t = useTranslations('global');

  const thumbnailHoverStyle = 'cursor-pointer block-link-hover-style hover:outline-offset-3';
  const thumbnailFocusStyle = 'reset-focus-block focus:outline-offset-3';

  const closeHoverStyle = 'cursor-pointer hover:underline hover:decoration-dotted hover:underline-offset-4';
  const closeFocusStyle = 'focus:outline-2 focus:outline-offset-2 focus:outline-lightneutral';
  const closeActiveStyle = 'basic-link-active-style active:text-darkneutral';

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3'>
        {photos.map(photo => (
          <button key={photo.key} onClick={() => setSelectedPhoto(photo)} className={`rounded-xl ${thumbnailHoverStyle} ${thumbnailFocusStyle} group`}>
            <figure className='relative h-64 overflow-hidden rounded-xl'>
                <Image src={photo.src} alt={photo.alt} title={photo.title} fill className='object-cover group-active:invert' sizes='(max-width: 768px) 50vw, 25vw' />
            </figure>
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <div className='fixed inset-0 z-50 bg-darkneutral/85 flex items-center justify-center p-4' onClick={() => setSelectedPhoto(undefined)}>
          <figure className='flex flex-col items-center gap-3' onClick={e => e.stopPropagation()}>
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain"
              priority
            />
            <figcaption className='text-lightneutral text-lg'>
              <Markdown>{selectedPhoto.title}</Markdown>
            </figcaption>
            <button onClick={() => setSelectedPhoto(undefined)} className={`p-1 absolute top-4 right-4 text-lightneutral text-2xl ${closeHoverStyle} ${closeFocusStyle} ${closeActiveStyle}`}>
              <span>{t('close')}</span>
            </button>
          </figure>
        </div>
      )}
    </>
  );
};
