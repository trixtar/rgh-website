'use client';

import { useTranslations } from 'next-intl';
import { Link } from "@/i18n/navigation";

export default function Menu({ isNavbar, isDropdown, onLinkClick }: { isNavbar?: boolean; isDropdown?: boolean; onLinkClick?: () => void; }) {
  const t = useTranslations('menu');

  let divStyle = 'flex flex-col text-center font-catchy font-bold text-4xl md:text-5xl';
  let linkStyle = 'py-3 link-hover-style';

  if (isNavbar) {
    divStyle = 'hidden md:flex font-compact gap-6 text-2xl';
    linkStyle = 'link-hover-style';
  }

  if (isDropdown) {
    divStyle = 'flex flex-col items-end z-99 font-compact text-2xl space-y-2';
    linkStyle = 'pt-2 pb-3 px-4 shadow-md/30 rounded-xl bg-mystery text-lightneutral hover:underline hover:decoration-lightneutral hover:decoration-dotted hover:underline-offset-4 focus:bg-midneutral';
  }

  return (
    <div className={divStyle}>
      <Link onClick={onLinkClick} href='bio' className={linkStyle}>{t('bio')}</Link>
      <Link onClick={onLinkClick} href='works' className={linkStyle}>{t('works')}</Link>
      <Link onClick={onLinkClick} href='performance' className={linkStyle}>{t('performance')}</Link>
      <Link onClick={onLinkClick} href='contact-details' className={linkStyle}>{t('contact')}</Link>
    </div>
  );
}