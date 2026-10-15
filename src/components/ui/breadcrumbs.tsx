import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Icon } from '@/components/ui/icon';

export type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="type-caption mb-4 flex flex-wrap items-center gap-1" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={`${item.label}-${i}`} className="inline-flex items-center gap-1">
          {i > 0 && <Icon icon={ChevronRight} size="xs" className="text-ink-muted/70" />}
          {item.href ? (
            <Link href={item.href} className="text-secondary font-normal hover:underline">
              {item.label}
            </Link>
          ) : (
            <span className="text-ink font-normal">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
