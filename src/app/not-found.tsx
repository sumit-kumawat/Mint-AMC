import { ArrowRight } from 'lucide-react';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageSection from '@/components/layout/page-section';
import { notFoundContent } from '@/content/not-found';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

export default function NotFound() {
  return (
    <MarketingChrome>
      <PageSection tone="muted" className="py-24" containerClassName="text-center max-w-lg">
        <div className="ui-card p-8 sm:p-10">
          <p className="type-eyebrow mb-2">Error 404</p>
          <h1 className="type-page-title">{notFoundContent.title}</h1>
          <p className="type-body mt-3">{notFoundContent.body}</p>
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button href="/" size="md">
              {notFoundContent.cta}
              <Icon icon={ArrowRight} size="xs" />
            </Button>
            <Button href="/services" variant="secondary" size="md">
              Explore Services
            </Button>
          </div>
        </div>
      </PageSection>
    </MarketingChrome>
  );
}
