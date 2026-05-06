import NewTab from '@/components/ui/NewTab';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

enum Platforms {
  YOUTUBE = 'YouTube',
  INSTAGRAM = 'Instagram',
}

interface ArchivedVideo {
  key: string;
  title: string;
  src: string;
  youTube?: boolean;
  platform: Platforms;
  aspect?: string;
  watchUrl?: string;
}

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

  const archive: ArchivedVideo[] = [
    {
      key: 'CromaLit',
      title: 'Poema escrito en post-its - Croma Lit, ep.3 - Color Origen: Rita Gonzalez Hesaynes',
      src: 'https://www.youtube.com/embed/EnBJQTSRV3E',
      platform: Platforms.YOUTUBE,
    },
    {
      key: 'ViolenciaDoméstica',
      title: 'Violencia Doméstica',
      src: 'https://www.youtube.com/embed/qK7SBYzQjts',
      platform: Platforms.YOUTUBE,
    },
    {
      key: 'SonidoGorlak',
      title: 'El Fin - Sonido Gorlak Vol. 4',
      src: 'https://www.youtube.com/embed/72Kxy0BroNg',
      platform: Platforms.YOUTUBE,
    },
    {
      key: 'Terraza',
      title: 'Nacimientos de Venus - Poesía en la terraza - CCM Haroldo Conti',
      src: 'https://www.youtube.com/embed/OYqcfZURvIc',
      platform: Platforms.YOUTUBE,
    },
    {
      key: 'BlinderPassagier',
      title: 'Sísifa - Blinder Passagier & Art Motion Studio',
      src: 'https://www.instagram.com/reel/DUlnBCogjJB/embed/',
      platform: Platforms.INSTAGRAM,
      watchUrl: 'https://www.instagram.com/reel/DUlnBCogjJB/?igsh=NDY2eTBvbTBsdWc1',
    }
  ];

  setRequestLocale(locale);
  const t = await getTranslations('performance');
  return (
    <main className='flex-1 w-full max-w-4xl mx-auto px-6 py-12'> {/* remove max-w mx- y px- py- */}
      <p className='paragraph-text'>{t('paragraph1')}</p>
      <div className="pt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {archive.map(video => (
          <figure key={video.key}>
            <iframe src={video.src} title={video.title} className={`w-full ${getAspectRatio(video)}`} allowFullScreen allow="encrypted-media; picture-in-picture; clipboard-write;" loading='lazy'/>
            <figcaption className='pt-2 text-center'>
              <span>{video.title}</span>
              <span aria-hidden> | </span>
              <Link href={getWatchUrl(video)} target='_blank' rel='noopener noreferrer' className='basic-link-hover-style basic-link-active-style reset-focus'>
                <span>{`${t('watchOn')} ${video.platform}`}</span>
                <NewTab />
              </Link>
            </figcaption>
          </figure>
        ))}
      </div>
    </main>
  );
}
