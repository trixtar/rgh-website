import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Menu({ locale }: { locale: string }) {
  setRequestLocale(locale);
  const t = await getTranslations('menu');
  return (
    <ul className='text-center font-catchy font-bold text-4xl md:text-5xl [&>li]:py-3 [&>li]:hover:underline [&>li]:hover:decoration-mystery [&>li]:hover:underline-offset-4 [&>li]:hover:cursor-pointer'>
      <li>{t('intro')}</li>
      <li>{t('publishedWorks')}</li>
      <li>{t('performance')}</li>
      <li>{t('contact')}</li>
    </ul>
  );
}
