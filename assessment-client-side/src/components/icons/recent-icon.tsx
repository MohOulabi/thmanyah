import { cn } from '@/lib/utils';

type RecentIconProps = React.SVGProps<SVGSVGElement>;

export function RecentIcon({ className, ...props }: RecentIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 40 40'
      className={cn('size-4 shrink-0', className)}
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeMiterlimit={10}
      strokeLinecap='round'
      strokeLinejoin='round'
      {...props}
    >
      <rect x='1' y='1' width='38' height='38' rx='19' ry='19' />
      <polyline points='20 6 20 21 27 28' />
    </svg>
  );
}
