'use client';

import Menu from '@/app/[locale]/Menu';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useEffect, useRef, useState } from 'react';
import { getIsHomepage } from '@/lib/helpers';
import { Pathname } from '@/lib/types';
import { RGH_NAME } from '@/lib/constants';

const NavMenu = ({
  onClick,
  isDropdownShown,
}: {
  onClick: () => void;
  isDropdownShown?: boolean;
}) => {
  const t = useTranslations('menu');
  const hoverStyle = 'cursor-pointer hover:border-mystery hover:border-dotted';
  const activeStyle = 'basic-link-active-style';
  const toggleStyle = isDropdownShown ? 'right-0 visible' : '-right-[160px] invisible';
  const hamburgerButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isDropdownShown) {
      hamburgerButtonRef.current?.focus();
    }
  }, [isDropdownShown]);

  return (
    <nav className='flex relative items-center z-25' aria-label={t('label')}>
      <button
        ref={hamburgerButtonRef}
        className={`md:hidden border-transparent border-3 ${hoverStyle} reset-focus ${activeStyle}`}
        onClick={onClick}
        aria-label={isDropdownShown ? t('close') : t('open')}
        aria-expanded={isDropdownShown}
      >
        {isDropdownShown ? (
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        ) : (
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M4 6h16M4 12h16M4 18h16'
            />
          </svg>
        )}
      </button>
      <Menu isInNavbar />
      <div className={`absolute top-[46px] transition-all duration-300 ease-in-out ${toggleStyle}`} inert={!isDropdownShown}>
        <Menu isDropdown onLinkClick={onClick} />
      </div>
    </nav>
  );
};

export default function Navbar() {
  const [isDropdownShown, setDropdownShown] = useState(false);

  const handleClick = () => {
    setDropdownShown(!isDropdownShown);
  };

  const pathname = usePathname();
  const isHomepage = getIsHomepage(pathname);

  const nameStyle = 'font-semibold text-3xl font-compact';
  const linkStyle = 'basic-link-hover-style reset-focus basic-link-active-style';

  return (
    <header className='p-4 flex justify-between items-end'>
      {isHomepage ? (
        <div className={nameStyle}>{RGH_NAME}</div>
      ) : (
        <>
          <Link className={`${nameStyle} ${linkStyle}`} onClick={() => setDropdownShown(false)} href={Pathname.HOME}>
            {RGH_NAME}
          </Link>
          <NavMenu onClick={handleClick} isDropdownShown={isDropdownShown} />
        </>
      )}
    </header>
  );
}
