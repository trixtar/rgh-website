'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Markdown from 'react-markdown';
import { PlayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

import { ArchivedVideo, Platforms } from '@/lib/types';
import NewTab from './NewTab';
import { useRef, useState } from 'react';
import Image from 'next/image';
import { useAccessibleModal } from '@/hooks/useAccessibleModal';

const getWatchUrl = (video: ArchivedVideo): string => {
  return video.watchUrl || video.src.replace('/embed/', '/watch?v=');
};

const sanitizeTitle = (title: string): string => title.replace(/\*/g, '');

const isInstagram = (platform: Platforms): boolean => platform === Platforms.INSTAGRAM;

const getAspectRatio = (video: ArchivedVideo): string => {
  if (video.aspect) return video.aspect;
  if (isInstagram(video.platform)) return 'aspect-[9/16]';
  return 'aspect-video';
};

const getAutoplayUrl = (video: ArchivedVideo): string => {
  const separator = video.src.includes('?') ? '&' : '?';
  return `${video.src}${separator}autoplay=1`;
};

export default function VideoGallery ({ videos }: { videos: ArchivedVideo[] }) {
  const t = useTranslations('global');
  const [activeVideo, setActiveVideo] = useState<ArchivedVideo>();
  const closeModal = () => setActiveVideo(undefined);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useAccessibleModal({
    isOpen: Boolean(activeVideo),
    dialogRef,
    initialFocusRef: closeButtonRef,
    onClose: closeModal,
  });
  
  const handleClick = (video: ArchivedVideo) => {
    if (isInstagram(video.platform)) {
      window.open(video.watchUrl ?? video.src, '_blank', 'noopener, noreferrer');
      return;
    }

    setActiveVideo(video);
  };

  const getButtonAriaLabel = (video: ArchivedVideo): string => {
    const sanitizedTitle = sanitizeTitle(video.title);
    if (isInstagram(video.platform)) return `${t('openVideo')}: ${sanitizedTitle} ${t('newTab')}`;
    return `${t('playVideo')}: ${sanitizedTitle}`;
  };

  const thumbnailHoverStyle = 'cursor-pointer block-link-hover-style hover:outline-offset-3';
  const thumbnailFocusStyle = 'reset-focus-block focus:outline-offset-3';

  const closeHoverStyle = 'cursor-pointer hover:underline hover:decoration-dotted hover:underline-offset-4';
  const closeFocusStyle = 'focus:outline-2 focus:outline-offset-2 focus:outline-lightneutral';
  const closeActiveStyle = 'basic-link-active-style active:text-darkneutral';

  return (
    <>
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {videos.map(video => (
          <li key={video.key}>
            <button onClick={() => handleClick(video)} aria-label={getButtonAriaLabel(video)} className={`group w-full relative overflow-hidden aspect-video flex items-center justify-center ${thumbnailHoverStyle} ${thumbnailFocusStyle}`}>
              <Image src={video.thumbnail} alt='' fill className='object-cover group-active:invert' />
              <div aria-hidden='true' className='w-24 h-24 text-lightneutral/80 z-10'>
                {isInstagram(video.platform) ? <ArrowTopRightOnSquareIcon /> : <PlayIcon />}
              </div>
            </button>
            <div className='pt-2 text-center'>
              <Markdown components={{ p: ({ children }) => <span>{children}</span> }}>
                {video.title}
              </Markdown>
              <span aria-hidden='true'> | </span>
              <Link href={getWatchUrl(video)} target='_blank' rel='noopener noreferrer' className='basic-link-hover-style basic-link-active-style reset-focus'>
                <span>{`${t('watchOn')} ${video.platform}`}</span>
                <NewTab />
              </Link>
            </div>
          </li>
        ))}
      </ul>

      {activeVideo && (
        <div className='fixed inset-0 z-50 bg-darkneutral/85 flex items-center justify-center p-4' onClick={closeModal}>
          <div ref={dialogRef} className='relative w-full max-w-5xl flex flex-col items-center gap-3' onClick={e => e.stopPropagation()} role='dialog' aria-modal={true} aria-labelledby='video-title'>
            <div className={`relative w-full overflow-hidden ${getAspectRatio(activeVideo)}`}>
              <iframe
                src={getAutoplayUrl(activeVideo)}
                title={t('videoPlayer')}
                className={`absolute inset-0 w-full h-full`}
                allowFullScreen
                allow='autoplay; encrypted-media; picture-in-picture; clipboard-write;'
                loading='lazy'
              />
            </div>
            <div id='video-title' className='text-lightneutral text-lg'>
              <Markdown>{activeVideo.title}</Markdown>
            </div>
            <button ref={closeButtonRef} onClick={closeModal} aria-label={t('closeViewer')} className={`p-1 absolute top-4 right-4 text-lightneutral text-2xl ${closeHoverStyle} ${closeFocusStyle} ${closeActiveStyle}`}>
              <span>{t('close')}</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}