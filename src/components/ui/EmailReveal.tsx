'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import CopyToClipboard from './CopyToClipboard';

export default function EmailReveal() {
  const t = useTranslations('global');
  const [isRevealed, setRevealed] = useState<boolean>(false);
  const emailParts = ['rita', 'gonzalez', 'hesaynes', '@', 'gmail', '.', 'com'];

  const copyId = 'copy-what-id';

  return (
    <span className='inline-flex gap-x-1 flex-wrap'>
      {isRevealed ? (
        <>
          <span id='copyId' className='break-all'>{emailParts.join('')}</span>
          <CopyToClipboard textToCopy={emailParts.join('')} textToShow={`→ ${t('copyToClipboard')} ←`} ariaDescribedById={copyId} />
        </>
      ) : (
        <button onClick={() => setRevealed(true)} aria-label={t('revealEmail')} className='basic-link-hover-style basic-link-active-style reset-focus text-mystery'>
          <span aria-hidden='true'>{`→ ${t('revealEmail')} ←`}</span>
        </button>
      )}
    </span>
  );
};