'use client';

import { useTranslations } from 'next-intl';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const SEARCH_INPUT_ID = 'main-search-input';

export function SearchEmptyState() {
  const t = useTranslations('search');

  function focusSearch() {
    document.getElementById(SEARCH_INPUT_ID)?.focus();
  }

  return (
    <div className='flex flex-1 flex-col items-center justify-center px-4 py-16'>
      <div
        className={cn(
          'bg-muted/50 flex size-24 items-center justify-center rounded-full',
          'ring-primary/20 ring-offset-background ring-2 ring-offset-2'
        )}
      >
        <Search className='text-primary size-12' strokeWidth={1.5} />
      </div>
      <h2 className='text-foreground mt-6 text-center text-xl font-semibold'>
        {t('empty_title')}
      </h2>
      <p className='text-muted-foreground mt-2 max-w-sm text-center text-sm'>
        {t('empty_description')}
      </p>
      <Button
        onClick={focusSearch}
        size='lg'
        className='mt-6 h-10 gap-2 capitalize'
      >
        <Search className='size-4' />
        {t('empty_cta')}
      </Button>
    </div>
  );
}
