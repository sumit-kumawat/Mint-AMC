import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  Boxes,
  CheckCircle2,
  Clock,
  Layers,
  Send,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageHeroBand from '@/components/layout/page-hero-band';
import PageSection from '@/components/layout/page-section';
import {
  SolutionsStickySidebar,
  STICKY_SIDEBAR_WRAPPER_CLASS,
} from '@/components/layout/sticky-sidebar-nav';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import FaqAccordion from '@/components/ui/faq-accordion';
import { BreadcrumbJsonLd, FaqPageJsonLd, ServiceJsonLd } from '@/components/seo/structured-data';
import { getSolution } from '@/content/solutions';
import { siteContent } from '@/content/site';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const solution = getSolution(params.slug);
  if (!solution) return { title: 'Solution Not Found' };

  const metaTitle = solution.title.toLowerCase().includes('amc')
    ? `${solution.title} - Solution Overview`
    : `${solution.title} AMC - Solution Overview`;

  const metaDesc =
    solution.summary.length > 158
      ? `${solution.summary.slice(0, 155)}...`
      : solution.summary;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: `https://mintamc.com/solutions/${solution.slug}`,
    },
    openGraph: {
      title: `${solution.title} | Mint AMC`,
      description: metaDesc,
      url: `https://mintamc.com/solutions/${solution.slug}`,
      siteName: 'Mint AMC',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${solution.title} | Mint AMC`,
      description: metaDesc,
    },
  };
}

export default function SolutionDetailPage({ params }: Props) {
  const solution = getSolution(params.slug);
  if (!solution) notFound();

  const breadcrumbs = [
    { label: siteContent.nav.home.label, href: '/' },
    { label: 'Solutions', href: '/solutions' },
    { label: solution.title },
  ];

  return (
    <MarketingChrome>
      <ServiceJsonLd
        name={`${solution.title} IT AMC Solution`}
        description={solution.summary}
        url={`https://mintamc.com/solutions/${solution.slug}`}
      />
      {solution.faqs && solution.faqs.length > 0 && (
        <FaqPageJsonLd faqs={solution.faqs} />
      )}
      <BreadcrumbJsonLd
        items={breadcrumbs.map((b) => ({
          name: b.label,
          item: b.href ? `https://mintamc.com${b.href}` : `https://mintamc.com/solutions/${solution.slug}`,
        }))}
      />

      {/* SECTION 1: Pure Light-Themed Title Hero Band */}
      <PageHeroBand
        eyebrow={`Enterprise Solution · ${solution.category}`}
        title={solution.title}
        subtitle={solution.summary}
      />

      {/* SECTION 2: Architecture Scope with Sticky Sidebar */}
      <PageSection tone="muted">
        <div className="mb-5">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Sidebar */}
          <div className={STICKY_SIDEBAR_WRAPPER_CLASS}>
            <SolutionsStickySidebar currentSlug={solution.slug} />
          </div>

          {/* Main Detail Body */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6 items-stretch">
              {/* Deliverables Card */}
              <div className="ui-card p-6 sm:p-7 bg-surface h-full">
                <h2 className="type-card-title mb-4 pb-3 border-b border-line flex items-center gap-2">
                  <Icon icon={Boxes} size="sm" className="text-brand" />
                  Core Solution Deliverables
                </h2>
                <ul className="space-y-3 type-body text-sm">
                  {solution.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5">
                      <Icon
                        icon={CheckCircle2}
                        size="sm"
                        className="text-brand shrink-0 mt-0.5"
                      />
                      <span className="text-ink-muted">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Scope & Challenges Card */}
              <div className="ui-card p-6 sm:p-7 bg-surface h-full">
                <h2 className="type-card-title mb-4 pb-3 border-b border-line flex items-center gap-2">
                  <Icon icon={ShieldCheck} size="sm" className="text-secondary" />
                  Key Operational Highlights
                </h2>
                <ul className="space-y-3 type-body text-sm">
                  {solution.highlights.map((sh) => (
                    <li key={sh} className="flex items-start gap-2.5">
                      <Icon
                        icon={CheckCircle2}
                        size="sm"
                        className="text-secondary shrink-0 mt-0.5"
                      />
                      <span className="text-ink-muted">{sh}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* SLA & Engagement Tier Banner */}
            <div className="ui-card p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-surface shadow-xs">
              <div className="space-y-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-brand">
                  Contractual SLA Commitment
                </span>
                <h3 className="type-card-title text-base sm:text-lg">
                  {solution.slaTier}
                </h3>
                <p className="type-body text-xs sm:text-sm max-w-2xl text-ink-muted">
                  Full SLA enforcement with prioritized ticket dispatch, localized spare parts buffer, and audit-ready digital sign-off reports.
                </p>
              </div>
              <Button href="/contact" variant="primary" size="md" className="shrink-0 w-full md:w-auto font-semibold">
                <Icon icon={Send} size="xs" />
                <span>Request Solution Scope</span>
              </Button>
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 3: Recommended Multi-Vendor Hardware Integration */}
      <PageSection tone="white" borderTop>
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand">
              Stack Architecture
            </span>
            <h3 className="type-section-title">
              Recommended Hardware Integration for {solution.title}
            </h3>
            <p className="type-lead text-sm max-w-2xl mx-auto">
              Heterogeneous OEM equipment consolidated and managed under this specific industry framework.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-3">
            <div className="p-5 rounded-[8px] border border-line bg-surface text-center shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-ink">Core Compute &amp; Virtualization</p>
              <p className="text-sm font-semibold text-brand mt-1">Dell PowerEdge / HPE ProLiant</p>
              <p className="text-xs text-ink-muted mt-1.5">Quarterly thermal checking &amp; RAID battery audits</p>
            </div>

            <div className="p-5 rounded-[8px] border border-line bg-surface text-center shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-ink">Security &amp; Edge Network</p>
              <p className="text-sm font-semibold text-secondary mt-1">Fortinet FortiGate / Cisco Catalyst</p>
              <p className="text-xs text-ink-muted mt-1.5">Firmware vulnerability hygiene &amp; config backup</p>
            </div>

            <div className="p-5 rounded-[8px] border border-line bg-surface text-center shadow-xs">
              <p className="text-xs font-bold uppercase tracking-wider text-ink">Enterprise Endpoints</p>
              <p className="text-sm font-semibold text-brand mt-1">Lenovo ThinkCentre / HP EliteBook</p>
              <p className="text-xs text-ink-muted mt-1.5">Keyboard, panel, OS and motherboard repair coverage</p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 4: Industry Solution FAQs (Full layout width matching other sections) */}
      {solution.faqs && solution.faqs.length > 0 && (
        <PageSection tone="muted" borderTop>
          <div className="w-full space-y-8 sm:space-y-10">
            <div className="text-center space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                Operational Clarifications
              </span>
              <h3 className="type-section-title">
                Frequently Asked Questions for {solution.title}
              </h3>
              <p className="type-lead text-sm max-w-2xl mx-auto">
                Practical details on SLA response times, hardware warranty coordination, and operational coverage.
              </p>
            </div>
            <div className="w-full">
              <FaqAccordion items={solution.faqs} />
            </div>
          </div>
        </PageSection>
      )}
    </MarketingChrome>
  );
}
