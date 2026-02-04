'use client';

import * as React from 'react';
import {
  Controller,
  useFormContext,
  type Control,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { Field, FieldError, FieldLabel } from '@/components/ui/field';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export interface InputGroupControllerProps<
  TFormValues extends FieldValues,
> extends Omit<
  React.ComponentProps<typeof InputGroupInput>,
  'name' | 'value' | 'onChange' | 'onBlur' | 'ref' | 'prefix' | 'suffix'
> {
  name: FieldPath<TFormValues>;
  control?: Control<TFormValues>;
  label?: React.ReactNode;
  className?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  prefixAlign?: 'inline-start' | 'block-start';
  suffixAlign?: 'inline-end' | 'block-end';
  optional?: boolean;
}

export function InputGroupController<TFormValues extends FieldValues>({
  name,
  control: controlProp,
  label,
  className,
  prefix,
  suffix,
  prefixAlign = 'inline-start',
  suffixAlign = 'inline-end',
  optional,
  id,
  ...inputProps
}: InputGroupControllerProps<TFormValues>) {
  const formContext = useFormContext<TFormValues>();
  const control = controlProp ?? formContext.control;
  const t = useTranslations('common');

  if (!control) {
    throw new Error(
      'InputGroupController must be used within FormProvider or receive a control prop.'
    );
  }

  const inputId = id ?? name;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field
          className={cn('w-full', className)}
          data-invalid={fieldState.invalid}
        >
          {label != null && (
            <FieldLabel htmlFor={inputId}>
              {label}
              {optional && (
                <span className='text-muted-foreground ms-1 font-normal'>
                  ({t('optional')})
                </span>
              )}
            </FieldLabel>
          )}
          <InputGroup
            className={cn(
              'h-9',
              fieldState.invalid && 'border-destructive ring-destructive/20'
            )}
          >
            {prefix != null && (
              <InputGroupAddon align={prefixAlign}>
                {typeof prefix === 'string' ? (
                  <InputGroupText>{prefix}</InputGroupText>
                ) : (
                  prefix
                )}
              </InputGroupAddon>
            )}
            <InputGroupInput
              id={inputId}
              aria-invalid={fieldState.invalid}
              {...field}
              {...inputProps}
              value={field.value ?? ''}
            />
            {suffix != null && (
              <InputGroupAddon align={suffixAlign}>
                {typeof suffix === 'string' ? (
                  <InputGroupText>{suffix}</InputGroupText>
                ) : (
                  suffix
                )}
              </InputGroupAddon>
            )}
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
