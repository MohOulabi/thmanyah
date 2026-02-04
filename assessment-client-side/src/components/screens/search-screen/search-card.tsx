'use client';

import { useTranslations } from 'next-intl';
import {
  MoreVertical,
  BookmarkPlus,
  ExternalLink,
  Share2,
  EyeOff,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { ImageWithLoader } from '@/components/common/image-with-loader';
import { cn } from '@/lib/utils';

const GENRE_COLORS: Record<string, string> = {
  // Pink - Marketing & Society
  Marketing: '#FF78C9',
  'Society & Culture': '#FF78C9',

  // Rose - Books & Personal
  Books: '#E86491',
  'Personal Journals': '#E86491',

  // Blue - Education & Food
  Education: '#4DAEE8',
  Food: '#4DAEE8',

  // Orange - Drama
  Drama: '#CF8163',

  // Gold - Self-Improvement
  'Self-Improvement': '#E3BD71',
};

const FALLBACK_COLOR = '#E3BD71';

function getGenreColor(genre: string): string {
  return GENRE_COLORS[genre] ?? FALLBACK_COLOR;
}

type SearchCardProps = {
  title: string;
  artist: string;
  image: string;
  genre: string;
};

export function SearchCard({ title, artist, image, genre }: SearchCardProps) {
  const t = useTranslations('search.podcast_menu');

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-lg',
        'focus-within:ring-ring hover:ring-border ring-transparent focus-within:ring-2 hover:ring-1'
      )}
    >
      <ImageWithLoader
        src={image}
        alt={title}
        fill
        containerClassName='aspect-16/15'
        className='object-cover'
        quality={100}
        sizes='(max-width: 640px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw'
      />
      <div className='flex min-h-0 shrink-0 items-center justify-between gap-2 p-2'>
        <div className='flex min-w-0 flex-1 flex-col gap-0.5'>
          <h3 className='text-foreground truncate font-medium'>{title}</h3>
          <span
            className='truncate text-xs font-medium'
            style={{ color: getGenreColor(genre) }}
          >
            {artist}
          </span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={({ children, ...props }) => (
              <Button
                variant='ghost'
                size='icon'
                className='text-muted-foreground hover:text-foreground size-8 shrink-0'
                aria-label={t('aria_label')}
                {...props}
              >
                {children}
              </Button>
            )}
          >
            <MoreVertical className='size-4' />
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent
              align='end'
              side='top'
              sideOffset={4}
              className='border-border bg-popover min-w-[180px] rounded-lg border p-1.5 shadow-lg'
            >
              <DropdownMenuItem className='focus:bg-accent focus:text-accent-foreground gap-2 rounded-md px-2.5 py-2 text-xs'>
                <BookmarkPlus className='group-focus/dropdown-menu-item:text-accent-foreground text-muted-foreground size-4 shrink-0' />
                {t('add_to_my_podcasts')}
              </DropdownMenuItem>
              <DropdownMenuItem className='focus:bg-accent focus:text-accent-foreground gap-2 rounded-md px-2.5 py-2 text-xs'>
                <ExternalLink className='group-focus/dropdown-menu-item:text-accent-foreground text-muted-foreground size-4 shrink-0' />
                {t('go_to_podcast')}
              </DropdownMenuItem>
              <DropdownMenuItem className='focus:bg-accent focus:text-accent-foreground gap-2 rounded-md px-2.5 py-2 text-xs'>
                <Share2 className='group-focus/dropdown-menu-item:text-accent-foreground text-muted-foreground size-4 shrink-0' />
                {t('share_podcast')}
              </DropdownMenuItem>
              <DropdownMenuItem className='focus:bg-accent focus:text-accent-foreground gap-2 rounded-md px-2.5 py-2 text-xs'>
                <EyeOff className='group-focus/dropdown-menu-item:text-accent-foreground text-muted-foreground size-4 shrink-0' />
                {t('hide_podcast')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
    </article>
  );
}
