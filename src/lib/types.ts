import { StaticImageData } from "next/image";

export enum Locale {
  EN = 'en',
  ES = 'es',
}

export enum Pathname {
  HOME = '/',
  BIO = '/bio',
  WORKS = '/works',
  PERFORMANCE = '/performance',
  BLOG = '/blog',
  CONTACT = '/contact',
}

export enum Platforms {
  YOUTUBE = 'YouTube',
  INSTAGRAM = 'Instagram',
}

export type HrefMap = Record<Locale, string>;

export interface ArchivedVideo {
  key: string;
  title: string;
  src: string;
  platform: Platforms;
  thumbnail: StaticImageData;
  aspect?: string;
  watchUrl?: string;
}

export interface ArchivedPhoto {
  key: string;
  title: string;
  src: StaticImageData;
  alt: string;
}

export interface CardGalleryItem {
  key: string;
  title?: string;
  url?: string;
  subtitle?: string;
  imageSrc?: StaticImageData | string;
  imageAltText?: string;
}