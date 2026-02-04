import { SearchEmptyState } from '@/components/screens/search-screen/search-empty-state';

export default function HomePage() {
  return (
    <div className='flex flex-1 flex-col'>
      <SearchEmptyState />
    </div>
  );
}
