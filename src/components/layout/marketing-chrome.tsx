import SiteHeader from './site-header';
import SiteFooter from './site-footer';
import { cn } from '@/lib/utils';

export default function MarketingChrome({
  children,
  mainClassName = '',
}: {
  children: React.ReactNode;
  mainClassName?: string;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-surface">
      <SiteHeader />
      <main className={cn('flex-1', mainClassName)}>{children}</main>
      <SiteFooter />
    </div>
  );
}
