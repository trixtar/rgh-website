'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Markdown from 'react-markdown';
import { PlayIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid';

import Modal from './Modal';
import NewTab from './NewTab';
import { ArchivedVideo, Platforms } from '@/lib/types';
import { sanitizeMarkdownItalics } from '@/lib/helpers';

const getWatchUrl = (video: ArchivedVideo): string => {
  return video.watchUrl || video.src.replace('/embed/', '/watch?v=');
};

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
  const [selectedVideo, setSelectedVideo] = useState<ArchivedVideo>();
  const closeModal = () => setSelectedVideo(undefined);
  
  const handleClick = (video: ArchivedVideo) => {
    if (isInstagram(video.platform)) {
      window.open(video.watchUrl ?? video.src, '_blank', 'noopener, noreferrer');
      return;
    }

    setSelectedVideo(video);
  };

  const getButtonAriaLabel = (video: ArchivedVideo): string => {
    const sanitizedTitle = sanitizeMarkdownItalics(video.title);
    if (isInstagram(video.platform)) return `${t('openVideo')}: ${sanitizedTitle} ${t('newTab')}`;
    return `${t('playVideo')}: ${sanitizedTitle}`;
  };

  const thumbnailHoverStyle = 'cursor-pointer block-link-hover-style hover:outline-offset-3';
  const thumbnailFocusStyle = 'reset-focus-block focus:outline-offset-3';

  const modalLabelledById = 'video-title';

  return (
    <>
      <ul className='grid grid-cols-1 md:grid-cols-2 gap-3'>
        {videos.map(video => (
          <li key={video.key}>
            <button onClick={() => handleClick(video)} aria-label={getButtonAriaLabel(video)} className={`group w-full relative overflow-hidden aspect-video flex items-center justify-center ${thumbnailHoverStyle} ${thumbnailFocusStyle}`}>
              <Image src={video.thumbnail} alt='' fill sizes="(max-width: 768px) 100vw, 50vw" className='object-cover group-active:invert' />
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

      {selectedVideo && (
        <Modal isOpen={Boolean(selectedVideo)} onClose={closeModal} modalAriaLabelledById={modalLabelledById} mediaLabel={selectedVideo.title}>
          <div className={`relative w-full overflow-hidden ${getAspectRatio(selectedVideo)}`}>
            <iframe
              src={getAutoplayUrl(selectedVideo)}
              title={sanitizeMarkdownItalics(selectedVideo.title)}
              className={`absolute inset-0 w-full h-full`}
              allowFullScreen
              allow='autoplay; encrypted-media; picture-in-picture; clipboard-write;'
              loading='lazy'
            />
          </div>
        </Modal>
      )}
    </>
  );
}