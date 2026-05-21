'use client'

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import Modal from './Modal';
import { ArchivedPhoto } from '@/lib/types';
import { sanitizeMarkdownItalics } from '@/lib/helpers';

export default function PhotoGallery({ photos }: { photos: ArchivedPhoto[] }) {
  const t = useTranslations('global');
  const [selectedPhoto, setSelectedPhoto] = useState<ArchivedPhoto>();
  const closeModal = () => setSelectedPhoto(undefined);

  const thumbnailHoverStyle = 'cursor-pointer card-link-hover-style hover:outline-offset-3';
  const thumbnailFocusStyle = 'card-reset-focus focus:outline-offset-3';

  const getButtonAriaLabel = (photo: ArchivedPhoto): string => `${t('openPhoto')}: ${sanitizeMarkdownItalics(photo.title)}`

  const modalLabelledById = 'photo-title';

  return (
    <>
      <ul className='grid-container grid-cols-2 md:grid-cols-4'>
        {photos.map(photo => (
          <li key={photo.key}>
            <button aria-label={getButtonAriaLabel(photo)} onClick={() => setSelectedPhoto(photo)} className={`relative w-full h-64 overflow-hidden rounded-xl ${thumbnailHoverStyle} ${thumbnailFocusStyle} group`}>
              <Image src={photo.src} alt='' fill className='object-cover group-active:invert' sizes='(max-width: 768px) 50vw, 25vw' />
            </button>
          </li>
        ))}
      </ul>

      {selectedPhoto && (
        <Modal isOpen={Boolean(selectedPhoto)} onClose={closeModal} modalAriaLabelledById={modalLabelledById} mediaLabel={selectedPhoto.title}>
          <Image
            src={selectedPhoto.src}
            alt={selectedPhoto.alt}
            className="w-auto h-auto max-w-[90vw] max-h-[85vh] object-contain"
            priority
          />
        </Modal>
      )}
    </>
  );
};
