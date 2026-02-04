'use client';

import { Suspense } from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import {
  HomeIcon,
  DiscoverIcon,
  QueueIcon,
  PodcastIcon,
  RecentIcon,
} from '../../icons';
import { Logo } from '../../logo';
import { Link } from '@/i18n/routing';
import { useDir } from '@/hooks/use-dir';
import { useTranslations } from 'next-intl';
import { AppHeader } from './app-header';
import { LocaleSwitcher } from '@/components/common/locale-switcher';
import { Skeleton } from '@/components/ui/skeleton';

const SIDEBAR_NAV = [
  {
    labelKey: null,
    items: [
      { href: '/', labelKey: 'home' as const, isActive: true, Icon: HomeIcon },
      {
        href: '/discover',
        labelKey: 'discover' as const,
        isActive: false,
        Icon: DiscoverIcon,
      },
    ],
  },
  {
    labelKey: 'your_stuff' as const,
    items: [
      {
        href: '/queue',
        labelKey: 'my_queue' as const,
        badge: 1,
        Icon: QueueIcon,
      },
      {
        href: '/podcasts',
        labelKey: 'my_podcasts' as const,
        badge: undefined,
        Icon: PodcastIcon,
      },
      {
        href: '/recents',
        labelKey: 'recents' as const,
        badge: undefined,
        Icon: RecentIcon,
      },
    ],
  },
] as const;

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const direction = useDir();
  const t = useTranslations('sidebar');

  return (
    <SidebarProvider>
      <Sidebar side={direction === 'rtl' ? 'right' : 'left'}>
        <SidebarHeader className='p-[18px]'>
          <div>
            <Link href='/' className='inline-flex'>
              <Logo />
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent>
          {SIDEBAR_NAV.map((group, groupIndex) => (
            <SidebarGroup key={groupIndex}>
              {group.labelKey != null && (
                <SidebarGroupLabel className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
                  {t(group.labelKey)}
                </SidebarGroupLabel>
              )}
              <SidebarGroupContent>
                <SidebarMenu className='space-y-1'>
                  {group.items.map(item => (
                    <SidebarMenuItem key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          'text-sidebar-foreground flex h-8 w-full items-center gap-2 overflow-hidden rounded-md border-l-2 border-transparent p-2 text-start text-sm transition-colors duration-150',
                          'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                          'active:bg-sidebar-accent/90 active:text-sidebar-accent-foreground',
                          'focus-visible:ring-sidebar-ring focus-visible:ring-offset-sidebar focus-visible:ring-2 focus-visible:ring-offset-2',
                          'isActive' in item &&
                            item.isActive &&
                            'border-sidebar-primary bg-primary/15 text-sidebar-primary [&_svg]:text-sidebar-primary hover:bg-primary/20 hover:text-sidebar-primary active:bg-primary/25',
                          'badge' in item &&
                            item.badge != null &&
                            'peer/menu-button relative pe-8'
                        )}
                      >
                        <item.Icon />
                        {t(item.labelKey)}
                        {'badge' in item && item.badge != null && (
                          <SidebarMenuBadge
                            className={cn(
                              'bg-muted text-muted-foreground flex h-5 min-w-5 items-center justify-center rounded-md px-1.5 text-xs font-medium'
                            )}
                          >
                            {item.badge}
                          </SidebarMenuBadge>
                        )}
                      </Link>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter className='p-[18px]'>
          <Suspense fallback={<Skeleton className='h-9 w-full rounded-md' />}>
            <LocaleSwitcher />
          </Suspense>
          <p className='text-muted-foreground text-center text-xs'>
            {t('footer_version')}
          </p>
          <p className='text-muted-foreground text-center text-xs'>
            {t('about_all_podcasts')}
          </p>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <AppHeader />
        <main className='flex flex-1 flex-col py-6'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
