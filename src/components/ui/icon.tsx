import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const sizeMap = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-6 h-6',
} as const;

export type IconSize = keyof typeof sizeMap;

type IconProps = {
  icon: LucideIcon;
  size?: IconSize;
  className?: string;
  label?: string;
};

/** Consistent Lucide icons (stroke 2, standard sizes). */
export function Icon({ icon: Lucide, size = 'sm', className, label }: IconProps) {
  return (
    <Lucide
      className={cn(sizeMap[size], 'shrink-0', className)}
      strokeWidth={2}
      aria-hidden={label ? undefined : true}
      aria-label={label}
    />
  );
}
