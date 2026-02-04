'use client';

import { useParams, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import ReactCountryFlag from 'react-country-flag';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

type Locale = (typeof routing.locales)[number];

const LOCALE_CONFIG: Record<
  Locale,
  { countryCode: string; label: string; fontClass?: string }
> = {
  ar: { countryCode: 'sa', label: 'عربي', fontClass: 'font-cairo' },
  en: { countryCode: 'us', label: 'English', fontClass: 'font-inter' },
};

interface LocaleSwitcherProps {
  className?: string;
}

export function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { locale } = useParams<{ locale: Locale }>();

  const currentConfig = LOCALE_CONFIG[locale];

  function handleLocaleChange(newLocale: string | null) {
    if (!newLocale) return;

    const queryString = searchParams.toString();
    const normalizedPath = pathname.endsWith('/')
      ? pathname.slice(0, -1)
      : pathname;
    const fullPath = queryString
      ? `${normalizedPath}?${queryString}`
      : normalizedPath;

    router.push(fullPath, { locale: newLocale as Locale });
  }

  return (
    <Select value={locale} onValueChange={handleLocaleChange}>
      <SelectTrigger
        aria-label='Select language'
        className={cn(
          'border-border/50 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-auto w-full justify-start gap-2 bg-transparent px-2 py-1.5 text-sm font-normal shadow-none transition-colors',
          className
        )}
      >
        <div className='flex w-full items-center gap-2'>
          <Languages className='size-4' />
          <ReactCountryFlag
            svg
            countryCode={currentConfig.countryCode}
            title={currentConfig.label}
            className='size-4 shrink-0'
            style={{ width: 16, height: 16 }}
          />
          <span className={cn('text-sm', currentConfig.fontClass)}>
            {currentConfig.label}
          </span>
        </div>
      </SelectTrigger>

      <SelectContent align='start' className='min-w-[140px]'>
        {routing.locales.map(l => {
          const config = LOCALE_CONFIG[l];
          const isActive = l === locale;

          return (
            <SelectItem
              key={l}
              value={l}
              className={cn('cursor-pointer', isActive && 'bg-sidebar-accent')}
            >
              <div className='flex items-center gap-2.5'>
                <ReactCountryFlag
                  svg
                  countryCode={config.countryCode}
                  title={config.label}
                  className='size-4 shrink-0'
                  style={{ width: 16, height: 16 }}
                />
                <span className={cn('font-medium', config.fontClass)}>
                  {config.label}
                </span>
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
