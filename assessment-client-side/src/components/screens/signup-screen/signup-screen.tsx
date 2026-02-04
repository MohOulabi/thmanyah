'use client';

import { useForm } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { User, Mail, Lock } from 'lucide-react';
import { AppleIcon } from '@/components/icons';
import { Link } from '@/i18n/routing';
import { signupFormSchema, type SignupFormData } from '@/zod/signup';
import { InputGroupController } from '@/components/common/controllers/input-group-controller';
import { Button } from '@/components/ui/button';
import { FieldGroup } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export function SignupScreen() {
  const t = useTranslations('auth.signup');
  const tValidation = useTranslations('validation');
  const schema = signupFormSchema(key => tValidation(key));

  const form = useForm<SignupFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirm_password: '',
    },
  });

  function onSubmit(_data: SignupFormData) {
    // TODO: Implement signup API call
  }

  return (
    <div
      className={cn(
        'border-border bg-card text-card-foreground mx-auto w-full max-w-[500px] rounded-lg border p-6 shadow-sm'
      )}
    >
      <div className='mb-6'>
        <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
          {t('welcome')}
        </p>
        <h1 className='text-foreground mt-1 text-2xl font-bold uppercase'>
          {t('title')}
        </h1>
      </div>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup className='gap-4'>
            <InputGroupController<SignupFormData>
              name='name'
              type='text'
              label={t('name_label')}
              placeholder={t('name_placeholder')}
              prefix={<User className='text-muted-foreground size-4' />}
            />
            <InputGroupController<SignupFormData>
              name='email'
              type='email'
              label={t('email_label')}
              placeholder={t('email_placeholder')}
              prefix={<Mail className='text-muted-foreground size-4' />}
            />
            <InputGroupController<SignupFormData>
              name='password'
              type='password'
              label={t('password_label')}
              placeholder={t('password_placeholder')}
              prefix={<Lock className='text-muted-foreground size-4' />}
            />
            <InputGroupController<SignupFormData>
              name='confirm_password'
              type='password'
              label={t('confirm_password_label')}
              placeholder={t('confirm_password_placeholder')}
              prefix={<Lock className='text-muted-foreground size-4' />}
            />
            <Button type='submit' className='h-10 w-full'>
              {t('submit')}
            </Button>
          </FieldGroup>
        </form>
      </FormProvider>

      <div className='mt-6'>
        <Separator className='mb-4' />
        <p className='text-muted-foreground mb-4 text-center text-sm'>
          {t('or')}
        </p>
        <Button
          type='button'
          variant='secondary'
          className='h-12 w-full bg-black text-white hover:bg-black/90'
          size='default'
        >
          <AppleIcon />
          {t('continue_apple')}
        </Button>
        <p className='text-muted-foreground mt-4 text-center text-sm'>
          {t('privacy_terms')}{' '}
          <Link
            href='/privacy'
            className='text-primary font-medium hover:underline'
          >
            {t('privacy_policy')}
          </Link>
          {' · '}
          <Link
            href='/terms'
            className='text-primary font-medium hover:underline'
          >
            {t('terms_of_use')}
          </Link>
        </p>
        <p className='text-muted-foreground mt-2 text-center text-sm'>
          {t('has_account')}{' '}
          <Link
            href='/login'
            className='text-primary font-medium hover:underline'
          >
            {t('log_in_link')}
          </Link>
        </p>
      </div>
    </div>
  );
}
