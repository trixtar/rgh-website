'use client';

import { useAccessibleModal } from '@/hooks/useAccessibleModal';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import Markdown from 'react-markdown';

interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean,
  onClose: () => void;
  modalAriaLabelledById: string;
  mediaLabel: string;
}

export default function Modal ({ children, isOpen, onClose, modalAriaLabelledById, mediaLabel }: ModalProps) {
  const t = useTranslations('global');
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useAccessibleModal({
    isOpen,
    dialogRef,
    initialFocusRef: closeButtonRef,
    onClose,
  });

  const closeHoverStyle = 'cursor-pointer hover:underline hover:decoration-dotted hover:underline-offset-4';
  const closeFocusStyle = 'focus:outline-2 focus:outline-offset-2 focus:outline-lightneutral';
  const closeActiveStyle = 'basic-link-active-style active:text-darkneutral';
  return (
    <div className='fixed inset-0 z-50 bg-darkneutral/85 flex items-center justify-center p-4' onClick={onClose}>
      <div ref={dialogRef} className='relative w-full max-w-5xl pt-16 flex flex-col items-center gap-3' onClick={e => e.stopPropagation()} role='dialog' aria-modal={true} aria-labelledby={modalAriaLabelledById}>
        {children}
        <MediaLabel id={modalAriaLabelledById} label={mediaLabel} />
      </div>
      <button ref={closeButtonRef} onClick={onClose} aria-label={t('close')} className={`p-1 absolute top-4 right-4 text-lightneutral text-2xl ${closeHoverStyle} ${closeFocusStyle} ${closeActiveStyle}`}>
        <span>{t('close')}</span>
      </button>
    </div>
  );
}

export function MediaLabel({ id, label }: {id: string, label: string}) {
  return (
    <div id={id} className='text-lightneutral text-lg'>
      <Markdown>{label}</Markdown>
    </div>
  );
}