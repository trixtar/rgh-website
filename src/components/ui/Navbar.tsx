// Navigation.tsx
'use client';

import { usePathname } from '@/i18n/navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import { routing } from '@/i18n/routing';

export function isInternationalizedRoute(pathname: string) {
  return Object.keys(routing.pathnames).includes(pathname);
}

export default function Navbar() {
  const pathname = usePathname();
  const showLanguageSwitcher = isInternationalizedRoute(pathname);

  return (
    <nav>
      {showLanguageSwitcher && <LanguageSwitcher />}
    </nav>
  );
}