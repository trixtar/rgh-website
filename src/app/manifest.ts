import { RGH_NAME } from '@/lib/constants';
import { Pathname } from '@/lib/types';
import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: RGH_NAME,
    short_name: RGH_NAME,
    description: 'Writer, performer, translator and software developer',
    start_url: Pathname.HOME,
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',

    icons: [
      {
        src: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}