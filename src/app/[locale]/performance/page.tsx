import Markdown from 'react-markdown';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';
import NewTab from '@/components/ui/NewTab';
import PhotoGallery from '@/components/ui/PhotoGallery';

import photo1 from '@/assets/images/elfo1.jpg';
import photo2 from '@/assets/images/perfo1.jpg';
import photo3 from '@/assets/images/divina encarnacion.png';
import photo4 from '@/assets/images/elfo3.jpg';
import photo5 from '@/assets/images/una habitacion asi.jpg';
import photo6 from '@/assets/images/siesta1.jpg';
import photo7 from '@/assets/images/lectura1.jpg';
import photo8 from '@/assets/images/lectura2.jpg';
import photo9 from '@/assets/images/el encuentro.jpg';
import { ArchivedPhoto, ArchivedVideo, Platforms } from '@/lib/types';

const photos: ArchivedPhoto[] = [
  {
    key: 'ph1',
    title: `Presentación de *Elfo Corporativo* en Buenos Aires`,
    alt: 'La autora leyendo',
    src: photo1,
  },
  {
    key: 'ph2',
    title: `Interpretación de "Samsara"`,
    alt: 'La autora arrodillada recitando su poema Samsara',
    src: photo2,
  },
  {
    key: 'ph3',
    title: 'Videoclip de Divina Encarnación',
    alt: 'La autora con una máscara steampunk',
    src: photo3,
  },
  {
    key: 'ph4',
    title: `Presentación de *Elfo Corporativo* en Berlín`,
    alt: 'La autora leyendo al aire libre',
    src: photo4,
  },
  {
    key: 'ph5',
    title: 'Función de *Una habitación así*',
    alt: 'La autora sentada',
    src: photo5,
  },
  {
    key: 'ph6',
    title: 'Performance en Siesta Festival de Berlín',
    alt: 'La autora con cables',
    src: photo6,
  },
  {
    key: 'ph7',
    title: 'Lectura en *Poesía en la Terraza*',
    alt: 'Primer plano de la autora leyendo',
    src: photo7,
  },
  {
    key: 'ph8',
    title: 'Lectura en Buenos Aires',
    alt: 'Foto en blanco y negro',
    src: photo8,
  },
  {
    key: 'ph9',
    title: 'Performance en *El Encuentro*',
    alt: 'La autora sorprendida',
    src: photo9,
  }
];

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'performance' });

  return {
    title: `Rita Gonzalez Hesaynes | ${t('title')}`,
  };
}

const getWatchUrl = (video: ArchivedVideo): string => {
  return video.watchUrl || video.src.replace('/embed/', '/watch?v=');
}

const getAspectRatio = (video: ArchivedVideo): string => {
  if (video.aspect) return video.aspect;
  if (video.platform === Platforms.INSTAGRAM) return 'aspect-[9/16]';
  return 'aspect-video';
}

export default async function Performance({ params }: { params: { locale: string } }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('performance');
  const on = t('on');
  const by = t('by');

  const videos: ArchivedVideo[] = [
    {
      key: 'vid1',
      title: `"Poema escrito en post-its" ${on} *Croma Lit, ep. 3 - Color Origen: Rita Gonzalez Hesaynes*`,
      src: 'https://www.youtube.com/embed/EnBJQTSRV3E',
      platform: Platforms.YOUTUBE,
    },
    {
      key: 'vid2',
      title: `"Violencia Doméstica"`,
      src: 'https://www.youtube.com/embed/qK7SBYzQjts',
      platform: Platforms.YOUTUBE,
    },
    {
      key: 'vid3',
      title: `"El Fin" ${on} *Sonido Gorlak vol. 4*`,
      src: 'https://www.youtube.com/embed/72Kxy0BroNg',
      platform: Platforms.YOUTUBE,
    },
    {
      key: 'vid4',
      title: `"Nacimientos de Venus" ${on} *Poesía en la terraza - CCM Haroldo Conti*`,
      src: 'https://www.youtube.com/embed/OYqcfZURvIc',
      platform: Platforms.YOUTUBE,
    },
    {
      key: 'vid5',
      title: `"Sísifa", ${by} Blinder Passagier & Art Motion Studio`,
      src: 'https://www.instagram.com/reel/DUlnBCogjJB/embed/',
      platform: Platforms.INSTAGRAM,
      watchUrl: 'https://www.instagram.com/reel/DUlnBCogjJB/?igsh=NDY2eTBvbTBsdWc1',
    }
  ];

  return (
    <main className='flex-1 w-full max-w-4xl mx-auto px-6 py-12'> {/* remove max-w mx- y px- py- */}
      <section>
        <h2 className='subtitle'>{t('subtitleVideos')}</h2>
        <p className='pb-3 paragraph-text'>{t('paragraph1')}</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {videos.map(video => (
            <figure key={video.key}>
              <iframe src={video.src} title={video.title} className={`w-full ${getAspectRatio(video)}`} allowFullScreen allow="encrypted-media; picture-in-picture; clipboard-write;" loading='lazy'/>
              <figcaption className='pt-2 text-center'>
                <Markdown components={{ p: ({ children }) => <span>{children}</span> }}>
                  {video.title}
                </Markdown>
                <span aria-hidden> | </span>
                <Link href={getWatchUrl(video)} target='_blank' rel='noopener noreferrer' className='basic-link-hover-style basic-link-active-style reset-focus'>
                  <span>{`${t('watchOn')} ${video.platform}`}</span>
                  <NewTab />
                </Link>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      <section className='pt-10'>
        <h2 className='subtitle'>{t('subtitlePhotos')}</h2>
        <PhotoGallery photos={photos} />
      </section>
    </main>
  );
}
