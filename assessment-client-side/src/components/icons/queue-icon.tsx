import { cn } from '@/lib/utils';

type QueueIconProps = React.SVGProps<SVGSVGElement>;

export function QueueIcon({ className, ...props }: QueueIconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 40 37'
      className={cn('size-4 shrink-0', className)}
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      {...props}
    >
      <rect x='1' y='1' width='38' height='7' rx='2.14' />
      <rect x='1' y='15' width='38' height='7' rx='2.14' />
      <rect x='1' y='29' width='38' height='7' rx='2.14' />
    </svg>
  );
}
