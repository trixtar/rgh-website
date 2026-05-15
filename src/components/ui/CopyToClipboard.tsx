'use client'

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';

interface CopyToClipboardProps {
  textToCopy: string;
  textToShow?: string;
  ariaDescribedById: string;
}

enum Status {
  INITIAL = 'initial',
  COPIED = 'copied',
  ERROR = 'error',
}

export default function CopyToClipboard ({ textToShow, textToCopy, ariaDescribedById }: CopyToClipboardProps ) {
  const t = useTranslations('global');
  const [status, setStatus] = useState<Status>(Status.INITIAL);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  useEffect(() => {
    if (status === Status.INITIAL) return;

    const timeout = setTimeout(() => { setStatus(Status.INITIAL) }, 2000);

    return () => clearTimeout(timeout);
  }, [status])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setStatus(Status.COPIED);
    } catch {
      setStatus(Status.ERROR);
    }
  };

  const getStatusText = (): string => {
    if (status === Status.COPIED) return t('copied');
    if (status === Status.ERROR) return t('copyError');
    return '';
  }

  return (
    <span>
      <button ref={buttonRef} onClick={copyToClipboard} aria-label={t('copyToClipboard')} aria-describedby={ariaDescribedById} className='basic-link-hover-style basic-link-active-style reset-focus text-mystery'>
        <span aria-hidden='true'>{textToShow || t('copyToClipboard')}</span>
      </button>
      <span className='sr-only' aria-live='polite'>{getStatusText()}</span>
    </span>
  );
};