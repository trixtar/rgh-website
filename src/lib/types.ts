import { StaticImageData } from "next/image";

export enum Platforms {
  YOUTUBE = 'YouTube',
  INSTAGRAM = 'Instagram',
}

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