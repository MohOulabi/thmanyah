import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button-variants';

export default async function NotFoundPage() {
  const t = await getTranslations('notFound');

  return (
    <div className='relative flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center overflow-hidden px-6 py-20'>
      <div className='relative z-10 mx-auto flex max-w-md flex-col items-center text-center'>
        {/* Large 404 with gradient glow */}
        <span
          className='text-primary mb-4 block font-bold tracking-tighter drop-shadow-[0_0_40px_hsl(var(--primary)/0.4)]'
          style={{ fontSize: 'clamp(6rem, 22vw, 14rem)', lineHeight: 0.85 }}
        >
          {t('title')}
        </span>
        <h1 className='text-foreground mb-3 text-2xl font-semibold'>
          {t('subtitle')}
        </h1>
        <p className='text-muted-foreground mb-10 text-base leading-relaxed'>
          {t('description')}
        </p>
        <Link
          href='/'
          className={cn(
            buttonVariants({ variant: 'default' }),
            'h-10 px-4 capitalize'
          )}
        >
          {t('back_home')}
        </Link>
      </div>
      {/* Ambient glow orbs */}
      <div className='pointer-events-none absolute inset-0' aria-hidden>
        <div className='bg-primary/10 absolute -top-40 -left-40 h-80 w-80 rounded-full blur-[100px]' />
        <div className='bg-primary/8 absolute -right-40 -bottom-40 h-80 w-80 rounded-full blur-[100px]' />
      </div>
    </div>
  );
}
