'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname} from '@/i18n/navigation';
import { Pathname } from '@/lib/types';

export default function Menu({
  isInNavbar,
  isDropdown,
  onLinkClick,
}: {
  isInNavbar?: boolean;
  isDropdown?: boolean;
  onLinkClick?: () => void;
}) {
  const t = useTranslations('menu');
  const pathname = usePathname();

  const menuItems = [
    { href: Pathname.BIO, label: t('bio') },
    { href: Pathname.WORKS, label: t('works') },
    { href: Pathname.PERFORMANCE, label: t('performance') },
    { href: Pathname.BLOG, label: t('blog') },
    { href: Pathname.CONTACT, label: t('contact') },
  ] as const;

  const isCurrent = (href: Pathname): boolean => pathname === href;

  let containerStyle = 'flex flex-col items-center font-catchy font-bold mx-auto';
  let linkStyle = 'inline-flex items-center justify-center py-3 text-4xl md:text-5xl';
  const focusStyle = 'reset-focus';
  let hoverStyle = 'basic-link-hover-style';
  let activeStyle = 'basic-link-active-style';
  let nonCurrentStyle: string;
  let currentStyle: string;

  if (isInNavbar) {
    containerStyle = 'hidden md:flex gap-6 font-compact';
    linkStyle = 'text-2xl';
    hoverStyle = 'basic-link-hover-style';
    activeStyle = 'basic-link-active-style';
    currentStyle = 'underline decoration-midneutral decoration-dotted underline-offset-4';
  }

  if (isDropdown) {
    containerStyle = 'flex flex-col items-end font-compact space-y-2 md:hidden';
    linkStyle = 'block pt-2 pb-3 px-4 shadow-md/30 rounded-xl text-2xl text-lightneutral';
    hoverStyle = 'hover:underline hover:decoration-lightneutral hover:decoration-dotted hover:underline-offset-4';
    activeStyle = 'basic-link-active-style active:text-darkneutral';
    nonCurrentStyle = 'bg-mystery';
    currentStyle = 'bg-midneutral';
  }

  const getLinkStyle = (href: Pathname): string => {
    if (isCurrent(href)) {
      return `${linkStyle} ${hoverStyle} ${focusStyle} ${activeStyle} ${currentStyle}`;
    }
    return `${linkStyle} ${hoverStyle} ${focusStyle} ${activeStyle} ${nonCurrentStyle}`;
  };

  return (
    <ul className={containerStyle}>
      {menuItems.map((item) => (
        <li key={item.href}>
          <Link
            className={getLinkStyle(item.href)}
            onClick={onLinkClick}
            href={item.href}
            aria-current={isCurrent(item.href) ? 'page' : undefined}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
