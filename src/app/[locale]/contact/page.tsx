import { getTranslations, setRequestLocale } from 'next-intl/server';
import Markdown from 'react-markdown';
import Link from 'next/link';
import { siSubstack, siInstagram, siWordpress, siFacebook, SimpleIcon } from 'simple-icons/icons';
import NewTab from '@/components/ui/NewTab';
import EmailReveal from '@/components/ui/EmailReveal';
import { getBasicPageMetadata } from '@/lib/helpers';
import { Pathname } from '@/lib/types';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations('contact');

  return getBasicPageMetadata({locale, pathname: Pathname.CONTACT, localizedPageTitle: t('title')})
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

export default async function ContactDetails({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');

  return (
    <main className='main-container'>
      <h1 className='sr-only'>{t('title')}</h1>
      <div className='paragraph-text space-y-2'>
        <section aria-label={t('ariaLabelEmail')} className='flex flex-wrap gap-x-1'>
          <Markdown components={{a: ({ href, children }) => (
            <a href={href} className='basic-link-hover-style basic-link-active-style reset-focus text-mystery'>{children}</a>
          )}}>
            {t('paragraph1')}
          </Markdown>
          <EmailReveal />
        </section>
        <section aria-label={t('ariaLabelSocials')} className='space-y-2'>
          <Markdown>{`${t('paragraph2')}:`}</Markdown>
          <ul className='space-y-2'>
            {socials.map(social => (
              <li key={social.label}>
                <Link href={social.url} className='inline-flex items-center text-lg basic-link-hover-style basic-link-active-style reset-focus' target='_blank' rel='noopener noreferrer'>
                  <svg role='img' viewBox='0 0 24 24' className='w-5 h-5' fill={`#${social.icon.hex}`} aria-hidden='true'>
                    <path d={social.icon.path} />
                  </svg> 
                  <span className='pl-2 pt-1'>{social.label}</span>
                  <NewTab />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
