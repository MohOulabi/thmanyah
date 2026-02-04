'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import debounce from 'lodash.debounce';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { SearchIcon } from '@/components/icons';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';

const DEBOUNCE_MS = 500;

export function SearchForm() {
  const t = useTranslations('header');
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRef = useRef<HTMLInputElement>(null);

  const query = searchParams.get('q') ?? '';

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        const trimmed = value.trim();
        router.push(
          trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search'
        );
      }, DEBOUNCE_MS),
    [router]
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSearch(e.target.value);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    debouncedSearch.cancel();
    const value = inputRef.current?.value ?? '';
    const trimmed = value.trim();
    router.push(
      trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : '/search'
    );
  }

  return (
    <form
      className='flex flex-1 items-center gap-4 pe-2'
      onSubmit={handleSubmit}
    >
      <InputGroup className='bg-input/50 h-9 max-w-xl flex-1 rounded-lg'>
        <InputGroupAddon align='inline-start' className='ps-3'>
          <InputGroupText>
            <SearchIcon className='text-muted-foreground' />
          </InputGroupText>
        </InputGroupAddon>
        <InputGroupInput
          key={query}
          ref={inputRef}
          id='main-search-input'
          name='q'
          type='search'
          defaultValue={query}
          onChange={handleChange}
          placeholder={t('search_placeholder')}
          className='placeholder:text-muted-foreground py-2 ps-0 placeholder:text-sm'
        />
      </InputGroup>
    </form>
  );
}
