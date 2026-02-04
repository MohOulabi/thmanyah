'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type ImageWithLoaderProps = Omit<ImageProps, 'onLoad'> & {
  /** Container className for the wrapper div */
  containerClassName?: string;
  /** Loader size in Tailwind format (e.g., 'size-6') */
  loaderSize?: string;
};

export function ImageWithLoader({
  containerClassName,
  loaderSize = 'size-6',
  className,
  alt,
  ...props
}: ImageWithLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn('relative', containerClassName)}>
      {isLoading && (
        <div className='bg-muted absolute inset-0 flex items-center justify-center'>
          <Loader2
            className={cn('text-muted-foreground animate-spin', loaderSize)}
          />
        </div>
      )}
      <Image
        alt={alt}
        className={cn(
          'transition-opacity duration-300',
          isLoading ? 'opacity-0' : 'opacity-100',
          className
        )}
        onLoad={() => setIsLoading(false)}
        {...props}
      />
    </div>
  );
}
