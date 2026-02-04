import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

function SearchCardSkeleton({ delay = 0 }: { delay?: number }) {
  return (
    <article className='flex flex-col overflow-hidden rounded-lg'>
      <div className='relative overflow-hidden rounded-t-lg'>
        <Skeleton className='aspect-16/15 w-full' />
        <div
          className='animate-shimmer absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/5 to-transparent'
          style={{ animationDelay: `${delay}ms` }}
          aria-hidden
        />
      </div>
      <div className='flex items-center justify-between gap-2 p-2'>
        <div className='flex min-w-0 flex-1 flex-col gap-1.5'>
          <Skeleton className='h-4 w-[85%]' />
          <Skeleton className='h-3 w-2/3' />
        </div>
        <Skeleton className='size-8 shrink-0 rounded-md' />
      </div>
    </article>
  );
}

const CARD_COUNT = 12;

export function SearchSkeleton() {
  return (
    <div className='px-4'>
      <section className='animate-in fade-in duration-300'>
        <Skeleton className='mt-6 h-5 w-48' />
        <div className='bg-border my-4 h-px' />
        <div
          className={cn(
            'grid gap-4',
            'grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))]',
            'md:grid-cols-[repeat(auto-fill,minmax(min(180px,100%),1fr))]',
            'lg:grid-cols-[repeat(auto-fill,minmax(min(200px,100%),1fr))]'
          )}
        >
          {Array.from({ length: CARD_COUNT }, (_, i) => (
            <SearchCardSkeleton key={i} delay={i * 30} />
          ))}
        </div>
      </section>
    </div>
  );
}
