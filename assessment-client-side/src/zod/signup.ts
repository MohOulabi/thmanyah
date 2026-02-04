import { z } from 'zod';

import type { MessageType } from '@/@types/intl';

export const signupFormSchema = (
  t: (key: MessageType<'validation'>) => string
) =>
  z
    .object({
      name: z.string().min(1, t('errors.name_required')),
      email: z.email(t('errors.invalid_email_format')),
      password: z.string().min(8, t('errors.password_min_length')),
      confirm_password: z
        .string()
        .min(1, t('errors.confirm_password_required')),
    })
    .refine(data => data.password === data.confirm_password, {
      message: t('errors.passwords_must_match'),
      path: ['confirm_password'],
    });

export type SignupFormData = z.infer<ReturnType<typeof signupFormSchema>>;
