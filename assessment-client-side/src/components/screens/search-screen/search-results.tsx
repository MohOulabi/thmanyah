'use client';

import { useTranslations } from 'next-intl';
import type { SearchResultItem } from '@/lib/search-utils';
import { SearchCard } from './search-card';
import { cn } from '@/lib/utils';

type SearchResultsProps = {
  query: string;
  items: SearchResultItem[];
};

export function SearchResults({ query, items }: SearchResultsProps) {
  const t = useTranslations('search');

  return (
    <div className='px-4'>
      <section>
        <h2 className='text-foreground mt-6 text-base font-semibold'>
          {t('top_podcasts_for', { query })}
        </h2>
        <hr className='-mx-4 my-4' />
        <div
          className={cn(
            'grid gap-4',
            'grid-cols-[repeat(auto-fill,minmax(min(200px,100%),1fr))]',
            'sm:grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))]',
            'md:grid-cols-[repeat(auto-fill,minmax(min(180px,100%),1fr))]',
            'lg:grid-cols-[repeat(auto-fill,minmax(min(200px,100%),1fr))]'
          )}
        >
          {items.map(item => (
            <SearchCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}
