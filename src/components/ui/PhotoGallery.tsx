'use client'

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ArchivedPhoto } from '@/lib/types';
import { useTranslations } from 'next-intl';
import Markdown from 'react-markdown';

export default function PhotoGallery({ photos }: { photos: ArchivedPhoto[] }) {
  const [selectedPhoto, setSelectedPhoto] = useState<ArchivedPhoto>();
  const closeModal = () => setSelectedPhoto(undefined);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const t = useTranslations('global');

  const trapFocus = (e: KeyboardEvent) => {
    const modal = document.querySelector(`[role='dialog']`) as HTMLElement;
    if (!modal) return;

    const focusableElements = Array.from(
      modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    ).filter(el => el.offsetParent !== null);
    if (!focusableElements.length) return;

    const first = focusableElements[0];
    const last = focusableElements[focusableElements.length - 1];
    const active = document.activeElement as HTMLElement;
    if (!modal.contains(active)) return;

    if (e.shiftKey && active === first) {
      e.preventDefault();
      last.focus();
    }

    if (!e.shiftKey && active === last) {
      e.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    if (!selectedPhoto) return;

    previousFocusRef.current = document.activeElement as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }

      if (e.key === 'Tab') {
        trapFocus(e);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    closeButtonRef.current?.focus();
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previousFocusRef.current && document.contains(previousFocusRef.current)) {
        previousFocusRef.current.focus();
      }
    }
  }, [selectedPhoto]);

  const thumbnailHoverStyle = 'cursor-pointer block-link-hover-style hover:outline-offset-3';
  const thumbnailFocusStyle = 'reset-focus-block focus:outline-offset-3';

  const closeHoverStyle = 'cursor-pointer hover:underline hover:decoration-dotted hover:underline-offset-4';
  const closeFocusStyle = 'focus:outline-2 focus:outline-offset-2 focus:outline-lightneutral';
  const closeActiveStyle = 'basic-link-active-style active:text-darkneutral';

  return (
    <>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
        {photos.map(photo => (
          <button key={photo.key} aria-label={`${t('openPhoto')} ${photo.title}`} onClick={() => setSelectedPhoto(photo)} className={`relative h-64 overflow-hidden rounded-xl ${thumbnailHoverStyle} ${thumbnailFocusStyle} group`}>
            <Image src={photo.src} alt={photo.alt} title={photo.title} fill className='object-cover group-active:invert' sizes='(max-width: 768px) 50vw, 25vw' />
          </button>
        ))}
      </div>

      {selectedPhoto && (
        <div className='fixed inset-0 z-50 bg-darkneutral/85 flex items-center justify-center p-4' onClick={closeModal}>
          <div className='flex flex-col items-center gap-3' onClick={e => e.stopPropagation()} role='dialog' aria-modal={true} aria-label={selectedPhoto.alt}>
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
