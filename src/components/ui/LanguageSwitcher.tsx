'use client';

import { useRouter, usePathname } from '@/i18n/navigation';
import { Locale } from '@/lib/types';
import { useTranslations, useLocale } from 'next-intl';

const languages = [
  { code: Locale.EN, name: 'English', flag: '🇬🇧' },
  { code: Locale.ES, name: 'Español', flag: '🇪🇸' },
];

export function LanguageSwitcher() {
  const t = useTranslations('language-selector');
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const handleLanguageChange = (locale: Locale) => {
    router.replace(pathname, { locale });
  };

  const getIsCurrent = (locale: Locale): boolean => locale === currentLocale;
  const getUnderlineStyle = (locale: Locale): string => getIsCurrent(locale) ? 'underline underline-offset-3' : '';

  const hoverStyle = 'cursor-pointer hover:underline hover:underline-offset-3';
  const focusStyle = 'focus:outline-2 focus:outline-offset-2 focus:outline-lightneutral';
  const activeStyle = 'basic-link-active-style active:text-darkneutral';


  return (
    <nav aria-label={t('label')}>
      <ul className='flex gap-6'>
        {languages.map(lang => (
          <li key={lang.code}>
            <button className={`px-1 font-compact ${hoverStyle} ${focusStyle} ${activeStyle} ${getUnderlineStyle(lang.code)}`} onClick={() => handleLanguageChange(lang.code)} aria-current={getIsCurrent(lang.code)}>
              {lang.flag}<span lang={!getIsCurrent(lang.code) ? lang.code : undefined}> {lang.name}</span>
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}