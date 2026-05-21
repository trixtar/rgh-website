'use client';

import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

import NewTab from "./NewTab";
import { Book } from "@/lib/types";

const FigureNode = ({ title, imageSrc, altTextSegment }: { title: string, imageSrc: StaticImageData, altTextSegment: string }): React.ReactNode => {
  return (
    <figure className='book-container'>
      <div className='relative w-full aspect-[2/3]'>
        <Image src={imageSrc} fill className='object-cover' alt={`${altTextSegment} ${title}`} sizes="(max-width: 640px) 50vw, 33vw" />
      </div>
      <figcaption className='card-caption'>
        <span>{title}<NewTab /></span>
      </figcaption>
    </figure>
  )
};

export default function BookGallery ({ books }: { books: Book[] }) {
  const t = useTranslations('works');
  return (
    <ul className='grid-container grid-cols-2 md:grid-cols-3'>
      {books.map(({ title, imageSrc, url }) => (
        <li key={title}>
          {url ? (
            <Link href={url} target='_blank' rel='noopener noreferrer' className='card card-link-hover-style card-link-active-style card-reset-focus'>
              <FigureNode title={title} imageSrc={imageSrc} altTextSegment={t('altText1')} />
            </Link>
          ) : (
            <FigureNode title={title} imageSrc={imageSrc} altTextSegment={t('altText1')} />
          )}
        </li>
      ))}
    </ul>
  );
}
