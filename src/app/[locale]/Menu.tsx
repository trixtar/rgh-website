import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function Menu({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const t = await getTranslations('menu');
  return (
    <div className='flex flex-col text-center font-catchy font-bold text-4xl md:text-5xl [&>a]:py-3 [&>a]:hover:underline [&>a]:hover:decoration-mystery [&>a]:hover:underline-offset-4 [&>a]:hover:cursor-pointer'>
      <Link href='bio'>{t('bio')}</Link>
      <Link href='works'>{t('publishedWorks')}</Link>
      <Link href='performance'>{t('performance')}</Link>
      <Link href='contact-details'>{t('contact')}</Link>
    </div>
  );
}
