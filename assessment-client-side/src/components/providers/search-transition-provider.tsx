'use client';

import {
  createContext,
  useContext,
  useTransition,
  type ReactNode,
  type TransitionStartFunction,
} from 'react';

type SearchTransitionContextValue = {
  isPending: boolean;
  startTransition: TransitionStartFunction;
};

const SearchTransitionContext =
  createContext<SearchTransitionContextValue | null>(null);

export function SearchTransitionProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <SearchTransitionContext.Provider value={{ isPending, startTransition }}>
      {children}
    </SearchTransitionContext.Provider>
  );
}

export function useSearchTransition() {
  const context = useContext(SearchTransitionContext);
  if (!context) {
    throw new Error(
      'useSearchTransition must be used within SearchTransitionProvider'
    );
  }
  return context;
}
