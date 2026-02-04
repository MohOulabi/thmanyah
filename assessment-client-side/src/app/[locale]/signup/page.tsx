import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { SignupScreen } from '@/components/screens/signup-screen';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth.signup' });
  return {
    title: t('title'),
    description: t('privacy_terms'),
  };
}

export default async function SignupPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className='flex flex-1 flex-col items-center justify-center'>
      <SignupScreen />
    </div>
  );
}
