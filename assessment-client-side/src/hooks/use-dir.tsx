import { dir } from '@/lib/i18n';
import { useLocale } from 'next-intl';
import { useMemo } from 'react';

export const useDir = () => {
  const locale = useLocale();
  return useMemo(() => dir(locale), [locale]);
};
