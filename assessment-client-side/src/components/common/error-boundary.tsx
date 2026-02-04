'use client';

import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import type { FallbackProps } from 'react-error-boundary';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

function ErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className='flex min-h-[300px] flex-col items-center justify-center gap-4 p-8'>
      <div className='bg-destructive/10 flex size-16 items-center justify-center rounded-full'>
        <AlertTriangle className='text-destructive size-8' />
      </div>
      <div className='text-center'>
        <h2 className='text-foreground text-lg font-semibold'>
          Something went wrong
        </h2>
        <p className='text-muted-foreground mt-1 max-w-sm text-sm'>
          An unexpected error occurred. Please try again.
        </p>
      </div>
      <Button onClick={resetErrorBoundary} variant='outline' size='sm'>
        Try again
      </Button>
    </div>
  );
}

export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}
