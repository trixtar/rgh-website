'use client'

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function CopyToClipboardButton ({ text }: { text: string } ) {
  const t = useTranslations('global');
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <button onClick={copyToClipboard} className='basic-link-active-style reset-focus'>
      {isCopied ? t('copied') : t('copyToClipboard')}
    </button>
  );
};