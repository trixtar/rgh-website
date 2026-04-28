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

  let containerStyle =
    'flex flex-col text-center font-catchy font-bold text-4xl md:text-5xl';
  let linkStyle = 'py-3 basic-link-hover-style';
  let nonCurrentStyle: string;
  let currentStyle: string;
  let focusStyle = 'basic-link-focus-style';
  let activeStyle = 'bg-hope';

  if (isInNavbar) {
    containerStyle = 'hidden md:flex font-compact gap-6 text-2xl';
    linkStyle = 'basic-link-hover-style';
    currentStyle =
      'underline decoration-midneutral decoration-dotted underline-offset-4';
  }

  if (isDropdown) {
    containerStyle =
      'flex flex-col items-end z-99 font-compact text-2xl space-y-2 md:hidden';
    linkStyle =
      'pt-2 pb-3 px-4 shadow-md/30 rounded-xl text-lightneutral hover:underline hover:decoration-lightneutral hover:decoration-dotted hover:underline-offset-4 focus:bg-midneutral';
    nonCurrentStyle = 'bg-mystery';
    currentStyle = 'bg-midneutral';
    focusStyle = 'focus:underline focus:decoration-lightneutral focus:decoration-dotted focus:underline-offset-4';
  }

  const getLinkStyle = (href: Href): string => {
    if (isCurrent(href)) {
      return `${linkStyle} ${currentStyle}`;
    }
    return `${linkStyle} ${nonCurrentStyle}`;
  };

  return (
    <ul className={containerStyle}>
      {menuItems.map((item) => (
        <li key={item.href} className={getLinkStyle(item.href)}>
          <Link
            className={focusStyle}
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
