// Navigation.tsx
'use client';

import { usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { routing } from '@/i18n/routing';

export function isInternationalizedRoute(pathname: string): boolean {
  if (pathname === '/') {
    return true;
  }
  return Object.keys(routing.pathnames).includes(pathname.substring(1));
}

export default function Footer() {
  const pathname = usePathname();
  const showLanguageSwitcher = isInternationalizedRoute(pathname);
  const currentYear = new Date().getFullYear()

  return (
    <footer className='p-4 gap-y-4 sm:gap-y-0 flex flex-col justify-center items-center bg-darkneutral text-lightneutral sm:flex-row-reverse sm:justify-between'>
      {showLanguageSwitcher && <LanguageSwitcher />}
      <p>{`© ${currentYear} - Rita Gonzalez Hesaynes`}</p>
    </footer>
  );
}