import { cn } from '@/lib/utils';

export function PanelCard({
  title,
  children,
  className,
}: {
  title?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('ui-card overflow-hidden', className)}>
      {title && (
        <div className="px-6 py-4 border-b border-line bg-surface-muted/50">
          <h2 className="type-card-title">{title}</h2>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
