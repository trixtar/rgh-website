'use client';

import Link from 'next/link';
import Image, { StaticImageData } from 'next/image';

import NewTab from './NewTab';
import { CardGalleryItem } from '@/lib/types';
import { useTranslations } from 'next-intl';

interface CardGalleryProps {
  items: CardGalleryItem[];
  gridExtraClasses?: string;
  imageSizes?: string;
  imageAspectStyle: string;
  isTextCentered?: boolean;
}

interface CardProps {
  title?: string;
  subtitle?: string;
  imageSrc?: string | StaticImageData;
  sizes: string;
  altText?: string;
  aspectStyle: string;
  isTextCentered?: boolean;
  hasLink?: boolean;
  imageNotAvailable: string;
}

const Card = ({
  title,
  subtitle,
  imageSrc,
  altText,
  sizes,
  aspectStyle,
  isTextCentered,
  hasLink,
  imageNotAvailable,
}: CardProps): React.ReactNode => (
  <figure className='p-1 h-full flex flex-col'>
    <div className={`relative w-full ${aspectStyle}`}>
      {imageSrc ? (
        <Image src={imageSrc} fill className='object-cover' alt={altText || ''} sizes={sizes} />
      ) : (
        <div className='flex h-full justify-center items-center bg-midneutral/30 font-compact'>{imageNotAvailable}</div>
      )}
    </div>
    {title && (
      <figcaption className={`flex flex-col`}>
        <span className={`pt-1 font-compact text-lg ${isTextCentered ? 'text-center' : ''}`}>
          {title}
          {hasLink && <NewTab />}
        </span>
        {subtitle && <span className='pt-1'>{subtitle}</span>}
      </figcaption>
    )}
  </figure>
);

export default function CardGallery({
  items,
  gridExtraClasses,
  imageSizes,
  imageAspectStyle,
  isTextCentered,
}: CardGalleryProps) {
  const t = useTranslations('global');
  const defaultStyles = {
    responsibleGridColumns: 'grid-cols-2 md:grid-cols-3',
    responsibleImageSizes: '(max-width: 768px) 50vw, 33vw',
  }
  const gridStyle = `grid-container ${gridExtraClasses || defaultStyles.responsibleGridColumns}`;
  return (
    <ul className={gridStyle}>
      {items.map(({ key, title, subtitle, imageSrc, url, imageAltText }) => (
        <li key={key}>
          {url ? (
            <Link
              href={url}
              target='_blank'
              rel='noopener noreferrer'
              className='card card-link-hover-style card-link-active-style card-reset-focus'
            >
              <Card
                title={title}
                subtitle={subtitle}
                imageSrc={imageSrc}
                altText={imageAltText}
                sizes={imageSizes || defaultStyles.responsibleImageSizes}
                aspectStyle={imageAspectStyle}
                isTextCentered={isTextCentered}
                hasLink
                imageNotAvailable={t('imageNotAvailable')}
              />
            </Link>
          ) : (
            <Card
              title={title}
              subtitle={subtitle}
              imageSrc={imageSrc}
              altText={imageAltText}
              sizes={imageSizes || defaultStyles.responsibleImageSizes}
              aspectStyle={imageAspectStyle}
              isTextCentered={isTextCentered}
              imageNotAvailable={t('imageNotAvailable')}
            />
          )}
        </li>
      ))}
    </ul>
  );
}
