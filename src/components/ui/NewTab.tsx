import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { getTranslations } from "next-intl/server";

export default async function NewTab() {
  const t = await getTranslations('accessibility');
  return (
    <>
      <ArrowTopRightOnSquareIcon aria-hidden='true' className='ml-1 mb-1 inline size-4' />
      <span className='sr-only'>{t('newTab')}</span>
    </>
  );
}