'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';

function Field({
  className,
  orientation = 'vertical',
  'data-invalid': dataInvalid,
  ...props
}: React.ComponentProps<'div'> & {
  'data-invalid'?: boolean;
  orientation?: 'vertical' | 'horizontal' | 'responsive';
}) {
  return (
    <div
      data-slot='field'
      role='group'
      data-invalid={dataInvalid}
      data-orientation={orientation}
      className={cn(
        'flex flex-col gap-1.5 data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:items-center data-[orientation=horizontal]:gap-3 data-[orientation=responsive]:flex-col',
        className
      )}
      {...props}
    />
  );
}

function FieldLabel({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      data-slot='field-label'
      className={cn(
        'text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}

function FieldDescription({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='field-description'
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function FieldError({
  className,
  errors,
  children,
  ...props
}: React.ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>;
}) {
  const messages = errors?.flatMap(e => (e?.message ? [e.message] : [])) ?? [];
  const content = children ?? messages;

  if (!content || (Array.isArray(content) && content.length === 0)) {
    return null;
  }

  return (
    <div
      data-slot='field-error'
      role='alert'
      className={cn('text-destructive text-sm', className)}
      {...props}
    >
      {typeof content === 'object' && Array.isArray(content) ? (
        content.length === 1 ? (
          content[0]
        ) : (
          <ul className='list-inside list-disc space-y-0.5'>
            {content.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        )
      ) : (
        content
      )}
    </div>
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='field-group'
      className={cn('flex flex-col gap-6', className)}
      {...props}
    />
  );
}

export { Field, FieldLabel, FieldDescription, FieldError, FieldGroup };
