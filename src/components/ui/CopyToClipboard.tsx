'use client'

import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

interface CopyToClipboardButtonProps {
  label: string;
  textToCopy: string;
  isExplicit?: boolean;
}

enum Status {
  INITIAL = 'initial',
  COPIED = 'copied',
  ERROR = 'error',
}

export default function CopyToClipboardButton ({ label, textToCopy, isExplicit }: CopyToClipboardButtonProps ) {
  const t = useTranslations('global');
  const [status, setStatus] = useState<Status>(Status.INITIAL);

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
    <>
      <button onClick={copyToClipboard} aria-label={`${label} ${t('clickToCopy')}`} className='basic-link-hover-style basic-link-active-style reset-focus text-mystery'>
        {label}
      </button>
      <span className='sr-only' aria-live='polite'>{getStatusText()}</span>
      {isExplicit && <span aria-hidden='true'>{`(${t('clickToCopy')}).`}</span>}
    </>
  );
};