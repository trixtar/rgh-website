import { ArrowTopRightOnSquareIcon } from "@heroicons/react/16/solid";
import { useTranslations } from "next-intl";

export default function NewTab() {
  const t = useTranslations('global');
  return (
    <>
      <ArrowTopRightOnSquareIcon aria-hidden='true' className='ml-1 mb-1 inline size-4' />
      <span className='sr-only'>{t('newTab')}</span>
    </>
  );
}