import { Suspense } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { searchApiServer } from '@/apis/search';
import { mapItunesResultsToItems } from '@/lib/search-utils';
import { SearchScreen } from '@/components/screens/search-screen';
import { SearchSkeleton } from '@/components/screens/search-screen/search-skeleton';

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const { q } = await searchParams;
  const t = await getTranslations({ locale, namespace: 'search' });

  const query = q?.trim();
  const title = query ? `${t('meta_title')} - ${query}` : t('meta_title');

  return { title };
}

async function SearchContent({ query }: { query: string }) {
  if (!query) {
    return <SearchScreen query='' items={[]} />;
  }

  let items: Awaited<ReturnType<typeof mapItunesResultsToItems>> = [];
  try {
    const response = await searchApiServer(query);
    items = mapItunesResultsToItems(response.data.results);
  } catch {
    items = [];
  }

  return <SearchScreen query={query} items={items} />;
}

export default async function SearchPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { q } = await searchParams;

  setRequestLocale(locale);

  const query = (q ?? '').trim();

  return (
    <div className='flex flex-1 flex-col'>
      <Suspense key={query} fallback={<SearchSkeleton />}>
        <SearchContent query={query} />
      </Suspense>
    </div>
  );
}
