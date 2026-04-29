'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function LanguageSwitcher() {
  const t = useTranslations('language-selector');
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = params.locale as string;

  const handleLanguageChange = (locale: string) => {
    router.replace(pathname, { locale });
  };

  const getIsCurrent = (locale: string): boolean => locale === currentLocale;
  const getUnderlineStyle = (locale: string): string => getIsCurrent(locale) ? 'underline underline-offset-3' : '';

  const hoverStyle = 'hover:cursor-pointer hover:underline hover:underline-offset-3';
  const focusStyle = 'focus:outline-2 focus:outline-offset-2 focus:outline-lightneutral';
  const activeStyle = 'basic-link-active-style active:text-darkneutral';


  return (
    <nav aria-label={t('label')}>
      <ul className='flex gap-6'>
        {languages.map(lang => (
          <li key={lang.code}>
            <button className={`px-1 font-compact ${hoverStyle} ${focusStyle} ${activeStyle} ${getUnderlineStyle(lang.code)}`} onClick={() => handleLanguageChange(lang.code)} aria-current={getIsCurrent(lang.code)}>
              {lang.flag}<span> {lang.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}