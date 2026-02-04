import { z } from 'zod';

import type { MessageType } from '@/@types/intl';

export const loginFormSchema = (
  t: (key: MessageType<'validation'>) => string
) =>
  z.object({
    email: z.email(t('errors.invalid_email_format')),
    password: z.string().min(1, t('errors.password_required')),
    remember_me: z.boolean().default(false).optional(),
  });

export type LoginFormData = z.infer<ReturnType<typeof loginFormSchema>>;
