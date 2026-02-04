import { cn } from '@/lib/utils';

type PodcastIconProps = React.SVGProps<SVGSVGElement>;

export function PodcastIcon({ className, ...props }: PodcastIconProps) {
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
      <rect x='1' y='1' width='16.81' height='16.81' rx='3.28' ry='3.28' />
      <rect x='22.19' y='1' width='16.81' height='16.81' rx='3.28' ry='3.28' />
      <rect x='1' y='22.19' width='16.81' height='16.81' rx='3.28' ry='3.28' />
      <rect
        x='22.19'
        y='22.19'
        width='16.81'
        height='16.81'
        rx='3.28'
        ry='3.28'
      />
    </svg>
  );
}
