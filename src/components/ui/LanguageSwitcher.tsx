'use client';

import { useRouter, usePathname } from "@/i18n/navigation";
import { useParams } from "next/navigation";

const languages = [
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();
  const currentLocale = params.locale as string;
  // const currentLanguage = languages.find(lang => lang.code === currentLocale);

  const handleLanguageChange = (locale: string) => {
    router.replace(pathname, { locale });
  };

  return (
    <div className="flex gap-2">
      {languages.map(lang => (
        <button key={lang.code} onClick={() => handleLanguageChange(lang.code)}>
          {lang.flag} {lang.name}
        </button>
      ))}
    </div>
  );
}