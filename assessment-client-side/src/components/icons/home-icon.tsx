import { cn } from '@/lib/utils';

type HomeIconProps = React.SVGProps<SVGSVGElement>;

export function HomeIcon({ className, ...props }: HomeIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 40 40'
      className={cn('size-4 shrink-0', className)}
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeMiterlimit={10}
      {...props}
    >
      <path d='M5.42,26.29C2.29,30.9.64,34.83,1.07,37.06a2.35,2.35,0,0,0,.61,1.26C4.45,41.1,14.91,35.15,25,25S41.1,4.45,38.32,1.67a2.35,2.35,0,0,0-1.26-.61c-2.09-.4-5.7,1-10,3.82' />
      <circle cx='19.99' cy='19.34' r='16.01' />
    </svg>
  );
}
