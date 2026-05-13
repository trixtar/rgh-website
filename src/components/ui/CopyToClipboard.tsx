'use client'

import { useTranslations } from 'next-intl';
import { useState } from 'react';

interface CopyToClipboardButtonProps {
  label: string;
  textToCopy: string;
  isExplicit?: boolean;
}

export default function CopyToClipboardButton ({ label, textToCopy, isExplicit }: CopyToClipboardButtonProps ) {
  const t = useTranslations('global');
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error(t('copyError'), err);
    }
  };

  const statusText = isCopied ? t('copied') : t('clickToCopy');

  return (
    <>
      <button onClick={copyToClipboard} aria-label={`${label} ${t('clickToCopy')}`} className='basic-link-hover-style basic-link-active-style reset-focus text-mystery'>
        {label}
      </button>
      <span className='sr-only' role='status' aria-live='polite'>{statusText}</span>
      {isExplicit && <span aria-hidden='true'>{statusText}</span>}
    </>
  );
};