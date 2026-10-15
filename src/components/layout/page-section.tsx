import { cn } from '@/lib/utils';
import PageContainer from './page-container';

type PageSectionProps = {
  children: React.ReactNode;
  tone?: 'default' | 'muted' | 'white' | 'dark';
  className?: string;
  containerClassName?: string;
  borderTop?: boolean;
  id?: string;
};

const toneClass = {
  default: 'bg-surface',
  muted: 'bg-surface-muted',
  white: 'bg-surface',
  dark: 'bg-surface-muted border-y border-line',
};

export default function PageSection({
  children,
  tone = 'muted',
  className,
  containerClassName,
  borderTop,
  id,
}: PageSectionProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-12 sm:py-16 lg:py-20',
        toneClass[tone],
        borderTop && 'border-t border-line',
        className,
      )}
    >
      <PageContainer className={containerClassName}>{children}</PageContainer>
    </section>
  );
}
