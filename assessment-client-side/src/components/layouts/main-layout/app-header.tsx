'use client';

import { Fragment, Suspense } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button, buttonVariants } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { SearchForm } from './search-form';
import {
  MoreVertical,
  Settings,
  Info,
  Sparkles,
  HelpCircle,
  Shield,
  FileText,
  ShieldCheck,
  MessageCircle,
  Trash2,
  LogIn,
  UserPlus,
  type LucideIcon,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { Link } from '@/i18n/routing';

const MENU_GROUPS = [
  [
    'settings',
    'about_thamanyah',
    'whats_new',
    'podcaster_faq',
    'privacy',
    'terms',
  ],
  ['privacy_settings', 'contact_and_feedback', 'clear_data'],
] as const;

const MENU_ICONS: Record<(typeof MENU_GROUPS)[number][number], LucideIcon> = {
  settings: Settings,
  about_thamanyah: Info,
  whats_new: Sparkles,
  podcaster_faq: HelpCircle,
  privacy: Shield,
  terms: FileText,
  privacy_settings: ShieldCheck,
  contact_and_feedback: MessageCircle,
  clear_data: Trash2,
};

export function AppHeader() {
  const t = useTranslations('header');

  return (
    <header
      className={cn(
        'border-border bg-background flex h-14 shrink-0 items-center gap-4 border-b px-4'
      )}
    >
      <SidebarTrigger
        className='text-muted-foreground hover:text-foreground'
        aria-label='Toggle sidebar'
      />

      <Suspense
        fallback={
          <div className='bg-input/50 h-9 max-w-xl flex-1 rounded-lg' />
        }
      >
        <SearchForm />
      </Suspense>

      <div className='flex items-center gap-2'>
        {/* Auth buttons - hidden on small screens */}
        <Link
          href='/login'
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'hidden sm:inline-flex'
          )}
        >
          {t('log_in')}
        </Link>
        <Link
          href='/signup'
          className={cn(
            buttonVariants({ variant: 'secondary', size: 'sm' }),
            'hidden sm:inline-flex'
          )}
        >
          {t('sign_up')}
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={({ children, ...props }) => (
              <Button
                variant='ghost'
                size='icon'
                aria-label={t('menu_aria_label')}
                {...props}
              >
                {children}
              </Button>
            )}
          >
            <MoreVertical className='size-5' />
          </DropdownMenuTrigger>
          <DropdownMenuPortal>
            <DropdownMenuContent
              align='end'
              sideOffset={8}
              className='border-border bg-popover min-w-[200px] rounded-lg border p-1.5 shadow-lg'
            >
              {/* Auth items - only visible on small screens */}
              <div className='flex flex-col gap-0.5 py-1 sm:hidden'>
                <DropdownMenuItem
                  className='focus:bg-accent focus:text-accent-foreground gap-2 rounded-md px-2.5 py-2 text-sm'
                  render={props => <Link href='/login' {...props} />}
                >
                  <LogIn className='text-muted-foreground size-4 shrink-0' />
                  {t('log_in')}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className='focus:bg-accent focus:text-accent-foreground gap-2 rounded-md px-2.5 py-2 text-sm'
                  render={props => <Link href='/signup' {...props} />}
                >
                  <UserPlus className='text-muted-foreground size-4 shrink-0' />
                  {t('sign_up')}
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator className='bg-border my-1.5 sm:hidden' />

              {MENU_GROUPS.map((group, groupIndex) => (
                <Fragment key={groupIndex}>
                  {groupIndex > 0 && (
                    <DropdownMenuSeparator className='bg-border my-1.5' />
                  )}
                  <div className='flex flex-col gap-0.5 py-1'>
                    {group.map(key => {
                      const Icon = MENU_ICONS[key];
                      return (
                        <DropdownMenuItem
                          key={key}
                          className='focus:bg-accent focus:text-accent-foreground gap-2 rounded-md px-2.5 py-2 text-sm'
                        >
                          {Icon && (
                            <Icon className='group-focus/dropdown-menu-item:text-accent-foreground text-muted-foreground size-4 shrink-0' />
                          )}
                          {t(key)}
                        </DropdownMenuItem>
                      );
                    })}
                  </div>
                </Fragment>
              ))}
            </DropdownMenuContent>
          </DropdownMenuPortal>
        </DropdownMenu>
      </div>
    </header>
  );
}
