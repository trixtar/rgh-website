'use client';

import { useTranslations } from "next-intl";
import Link from "next/link";
import Markdown from "react-markdown";
import { PlayIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";

import { ArchivedVideo, Platforms } from "@/lib/types";
import NewTab from "./NewTab";
import { useState } from "react";
import Image from "next/image";

const getWatchUrl = (video: ArchivedVideo): string => {
  return video.watchUrl || video.src.replace('/embed/', '/watch?v=');
};

const getAutoplayUrl = (src: string): string => {
  const separator = src.includes('?') ? '&' : '?';
  return `${src}${separator}autoplay=1`;
};

const isInstagram = (platform: Platforms): boolean => platform === Platforms.INSTAGRAM;

export default function VideoGallery ({ videos }: { videos: ArchivedVideo[] }) {
  const t = useTranslations('global');
  const [activeVideo, setActiveVideo] = useState<string>('');
  const isActiveVideo = (key: string): boolean => key === activeVideo;
  const getButtonAriaLabel = (platform: Platforms, title: string): string => isInstagram(platform) ? `${t('openVideo')}: ${title} ${t('newTab')}` : `${t('playVideo')}: ${title}}`;
  
  const handleClick = (video: ArchivedVideo) => {
    if (isActiveVideo(video.key)) {
      return setActiveVideo('');
    }

    if (isInstagram(video.platform)) {
      window.open(video.watchUrl ?? video.src, "_blank", "noopener,noreferrer");
      return;
    }

    setActiveVideo(video.key);
  };
  const thumbnailHoverStyle = 'cursor-pointer block-link-hover-style hover:outline-offset-3';
  const thumbnailFocusStyle = 'reset-focus-block focus:outline-offset-3';

  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {videos.map(video => (
        <li key={video.key}>
          <button onClick={() => handleClick(video)} aria-label={getButtonAriaLabel(video.platform, video.title)} className={`group w-full relative overflow-hidden aspect-video flex items-center justify-center ${thumbnailHoverStyle} ${thumbnailFocusStyle}`}>
            {isActiveVideo(video.key) ? (
              <iframe src={getAutoplayUrl(video.src)} title={video.title} tabIndex={isActiveVideo(video.key) ? 0 : -1} className='w-full h-full' allowFullScreen allow="autoplay; encrypted-media; picture-in-picture; clipboard-write;" loading='lazy'/>
            ) : (
              <>
                <Image src={video.thumbnail} alt='' fill className='object-cover group-active:invert' />
                <div className='w-24 h-24 text-lightneutral/80 z-10'>
                  {isInstagram(video.platform) ? <ArrowTopRightOnSquareIcon /> : <PlayIcon />}
                </div>
              </>
            )}
          </button>
          <div className='pt-2 text-center'>
            <Markdown components={{ p: ({ children }) => <span>{children}</span> }}>
              {video.title}
            </Markdown>
            <span aria-hidden> | </span>
            <Link href={getWatchUrl(video)} target='_blank' rel='noopener noreferrer' className='basic-link-hover-style basic-link-active-style reset-focus'>
              <span>{`${t('watchOn')} ${video.platform}`}</span>
              <NewTab />
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}