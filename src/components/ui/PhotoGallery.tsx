'use client'

import { useRef, useState } from 'react';
import Image from 'next/image';
import { ArchivedPhoto } from '@/lib/types';
import { useTranslations } from 'next-intl';
import Markdown from 'react-markdown';
import { useAccessibleModal } from '../../hooks/useAccessibleModal';

export default function PhotoGallery({ photos }: { photos: ArchivedPhoto[] }) {
  const t = useTranslations('global');
  const [selectedPhoto, setSelectedPhoto] = useState<ArchivedPhoto>();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeModal = () => setSelectedPhoto(undefined);

  useAccessibleModal({
    isOpen: Boolean(selectedPhoto),
    dialogRef,
    initialFocusRef: closeButtonRef,
    onClose: closeModal,
  });

  const thumbnailHoverStyle = 'cursor-pointer block-link-hover-style hover:outline-offset-3';
  const thumbnailFocusStyle = 'reset-focus-block focus:outline-offset-3';

  const closeHoverStyle = 'cursor-pointer hover:underline hover:decoration-dotted hover:underline-offset-4';
  const closeFocusStyle = 'focus:outline-2 focus:outline-offset-2 focus:outline-lightneutral';
  const closeActiveStyle = 'basic-link-active-style active:text-darkneutral';

  return (
    <>
      <ul className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {photos.map(photo => (
          <li key={photo.key}>
            <button aria-label={`${t('openPhoto')} ${photo.title}`} onClick={() => setSelectedPhoto(photo)} className={`relative w-full h-64 overflow-hidden rounded-xl ${thumbnailHoverStyle} ${thumbnailFocusStyle} group`}>
              <Image src={photo.src} alt={photo.alt} title={photo.title} fill className='object-cover group-active:invert' sizes='(max-width: 768px) 50vw, 25vw' />
            </button>
          </li>
        ))}
      </ul>

      {selectedPhoto && (
        <div className='fixed inset-0 z-50 bg-darkneutral/85 flex items-center justify-center p-4' onClick={closeModal}>
          <div ref={dialogRef} className='flex flex-col items-center gap-3' onClick={e => e.stopPropagation()} role='dialog' aria-modal={true} aria-label={selectedPhoto.alt}>
            <Image
              src={selectedPhoto.src}
              alt={selectedPhoto.alt}
              className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain"
              priority
            />
            <div className='text-lightneutral text-lg'>
              <Markdown>{selectedPhoto.title}</Markdown>
            </div>
            <button ref={closeButtonRef} onClick={closeModal} aria-label={t('closePhotoGallery')} className={`p-1 absolute top-4 right-4 text-lightneutral text-2xl ${closeHoverStyle} ${closeFocusStyle} ${closeActiveStyle}`}>
              <span>{t('close')}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
};
