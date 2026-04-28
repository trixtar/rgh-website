'use client';

import Menu from '@/app/[locale]/Menu';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { useState } from 'react';

const NavMenu = ({
  onClick,
  isDropdownShown,
}: {
  onClick: () => void;
  isDropdownShown?: boolean;
}) => {
  const t = useTranslations('menu');

  return (
    <nav className='flex relative items-center' aria-label={t('label')}>
      <button
        className='md:hidden border-transparent border-3 hover:cursor-pointer hover:border-mystery hover:border-dotted'
        onClick={onClick}
        aria-label={isDropdownShown ? t('close') : t('open')}
        aria-expanded={isDropdownShown ? true : false}
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
      {isDropdownShown && (
        <div className='absolute top-[46px] right-0'>
          <Menu isDropdown onLinkClick={onClick} />
        </div>
      )}
    </nav>
  );
};

export default function Navbar() {
  const [isDropdownShown, setDropdownShown] = useState(false);

  const handleClick = () => {
    setDropdownShown(!isDropdownShown);
  };

  const pathname = usePathname();
  const title = 'Rita Gonzalez Hesaynes';
  const isHomepage = pathname === '/';

  return (
    <header className='p-4 flex justify-between items-end'>
      <h1
        className={`font-semibold text-3xl font-compact ${isHomepage ? '' : 'basic-link-hover-style'}`}
      >
        {isHomepage ? (
          <span>{title}</span>
        ) : (
          <Link className='focus-hover-style' onClick={() => setDropdownShown(false)} href='/'>
            {title}
          </Link>
        )}
      </h1>
      {!isHomepage && (
        <NavMenu onClick={handleClick} isDropdownShown={isDropdownShown} />
      )}
    </header>
  );
}
