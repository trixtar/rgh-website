'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

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
    { href: 'bio', label: t('bio') },
    { href: 'works', label: t('works') },
    { href: 'performance', label: t('performance') },
    { href: 'contact-details', label: t('contact') },
  ] as const;

  type MenuItem = (typeof menuItems)[number];
  type Href = MenuItem['href'];

  const isCurrent = (href: Href): boolean => pathname === `/${href}`;

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
    containerStyle = 'flex flex-col items-end z-99 font-compact space-y-2 md:hidden';
    linkStyle = 'block pt-2 pb-3 px-4 shadow-md/30 rounded-xl text-2xl text-lightneutral';
    hoverStyle = 'hover:underline hover:decoration-lightneutral hover:decoration-dotted hover:underline-offset-4';
    activeStyle = 'basic-link-active-style active:text-darkneutral';
    nonCurrentStyle = 'bg-mystery';
    currentStyle = 'bg-midneutral';
  }

  const getLinkStyle = (href: Href): string => {
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
