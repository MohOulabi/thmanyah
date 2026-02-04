'use client';

import type { SearchResultItem } from '@/lib/search-utils';
import { SearchEmptyState } from './search-empty-state';
import { SearchResults } from './search-results';

type SearchScreenProps = {
  query: string;
  items: SearchResultItem[];
};

export function SearchScreen({ query, items }: SearchScreenProps) {
  if (!query.trim()) {
    return (
      <div className='flex min-h-[50vh] flex-1 flex-col'>
        <SearchEmptyState />
      </div>
    );
  }

  return <SearchResults query={query} items={items} />;
}
