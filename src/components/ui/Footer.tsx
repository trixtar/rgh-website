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

  return (
    <nav className='p-4 flex justify-center items-center bg-darkneutral text-lightneutral'>
      {showLanguageSwitcher && <LanguageSwitcher />}
    </nav>
  );
}