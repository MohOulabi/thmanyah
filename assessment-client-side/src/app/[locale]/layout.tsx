import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from 'sonner';
import { routing } from '@/i18n/routing';
import { Plus_Jakarta_Sans, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { QueryProvider } from '@/components/providers/query-provider';
import { ErrorBoundary } from '@/components/common/error-boundary';
import type { Metadata } from 'next';
import '../globals.css';
import { dir } from '@/lib/i18n';
import { MainLayout } from '@/components/layouts/main-layout';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: {
      default: t('default_title'),
      template: `%s | ${t('site_name')}`,
    },
    description: t('description'),
    icons: { icon: '/favicon.svg' },
  };
}

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const fontClass =
    locale === 'ar'
      ? `${ibmPlexArabic.variable} ${plusJakarta.variable} font-arabic`
      : `${plusJakarta.variable} ${ibmPlexArabic.variable} font-sans`;

  return (
    <html
      lang={locale}
      dir={dir(locale)}
      suppressHydrationWarning
      translate='no'
      className={fontClass}
    >
      <body className='bg-background text-foreground flex min-h-screen flex-col antialiased'>
        <QueryProvider>
          <NuqsAdapter>
            <NextIntlClientProvider locale={locale}>
              <ErrorBoundary>
                <MainLayout>{children}</MainLayout>
              </ErrorBoundary>
              <Toaster richColors position='top-center' dir={dir(locale)} />
            </NextIntlClientProvider>
          </NuqsAdapter>
        </QueryProvider>
      </body>
    </html>
  );
}
