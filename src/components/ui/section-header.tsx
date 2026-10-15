import { cn } from '@/lib/utils';

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  lead?: string;
  subtitle?: string;
  className?: string;
  align?: 'left' | 'center';
};

export function SectionHeader({
  eyebrow,
  title,
  lead,
  subtitle,
  className,
  align = 'left',
}: SectionHeaderProps) {
  const description = subtitle ?? lead;
  return (
    <div className={cn('mb-8 sm:mb-10', align === 'center' && 'text-center', className)}>
      {eyebrow ? <span className="type-eyebrow block mb-2">{eyebrow}</span> : null}
      <h2 className="type-section-title text-balance">{title}</h2>
      {description ? (
        <p
          className={cn(
            'mt-2.5 type-body max-w-3xl text-pretty',
            align === 'center' && 'mx-auto',
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
