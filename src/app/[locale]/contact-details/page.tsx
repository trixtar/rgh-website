import { getTranslations, setRequestLocale } from 'next-intl/server';
import Markdown from 'react-markdown';
import Link from 'next/link';
import { siSubstack, siInstagram, siWordpress, siFacebook, SimpleIcon } from 'simple-icons/icons';
import CopyToClipboardButton from '@/components/ui/CopyToClipboard';

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  const t = await getTranslations({ locale, namespace: 'contact' });

  return {
    title: `Rita Gonzalez Hesaynes | ${t('title')}`,
  };
}

interface SocialsInfo {
  icon: SimpleIcon,
  url: string;
  label: string;
}

const socials: SocialsInfo[] = [
  {
    icon: siSubstack,
    url: 'https://ficcionnuclear.substack.com/',
    label: 'Substack',
  },
  {
    icon: siInstagram,
    url: 'https://www.instagram.com/ficcionnuclear/',
    label: 'Instagram',
  },
  {
    icon: siWordpress,
    url: 'https://ficcionnuclear.wordpress.com/',
    label: 'Wordpress',
  },
  {
    icon: siFacebook,
    url: 'https://www.facebook.com/merov',
    label: 'Facebook',
  },
];

export default async function ContactDetails({ params }: { params: { locale: string } }) {
  const { locale } = await params;

  setRequestLocale(locale);
  const t = await getTranslations('contact');
  return (
    <main className='main-container'>
      <div className='paragraph-text space-y-2'>
        <div className='inline-flex space-x-1'>
          <Markdown components={{ a: ({ href, children }) => (
            <a href={href} className='basic-link-hover-style basic-link-active-style reset-focus text-mystery'>{children}</a>
          )}}>
            {t('paragraph1')}
          </Markdown>
          <CopyToClipboardButton text='ritagonzalezhesaynes@gmail.com' />
        </div>
        <Markdown>{`${t('paragraph2')}:`}</Markdown>
        <ul className='space-y-2'>
          {socials.map(social => (
            <li key={social.label}>
              <Link href={social.url} className='inline-flex items-center text-lg basic-link-hover-style basic-link-active-style reset-focus'>
                <svg role='img' viewBox='0 0 24 24' className='w-5 h-5' fill={`#${social.icon.hex}`}>
                  <path d={social.icon.path} />
                </svg> 
                <span className='pl-2 pt-1'>{social.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
