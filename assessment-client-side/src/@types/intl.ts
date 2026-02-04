import { routing } from '@/i18n/routing';
// Messages type is inferred from en.json
import messages from '../../messages/en.json';
import type { Messages } from 'next-intl';

// Shared TypeScript types

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    // Formats: typeof formats;
  }
}

type LeafKeys<T> = {
  [K in keyof T]: T[K] extends object
    ? `${string & K}.${LeafKeys<T[K]>}`
    : string & K;
}[keyof T];

type NestedObject<
  T,
  P extends string,
> = P extends `${infer First}.${infer Rest}`
  ? First extends keyof T
    ? T[First] extends object
      ? NestedObject<T[First], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never;

type LeafKeysFromPath<T, P extends string> =
  NestedObject<T, P> extends object ? LeafKeys<NestedObject<T, P>> : never;

// Generic MessageType that supports nested selectors
export type MessageType<T extends string | undefined = undefined> =
  T extends undefined
    ? LeafKeys<Messages>
    : T extends keyof Messages
      ? LeafKeys<Messages[T]>
      : // eslint-disable-next-line @typescript-eslint/no-unused-vars
        T extends `${infer Section}.${infer SubSection}`
        ? LeafKeysFromPath<Messages, T>
        : never;
