import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Boxes, CheckSquare, ShieldCheck } from 'lucide-react';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageHeroBand from '@/components/layout/page-hero-band';
import PageSection from '@/components/layout/page-section';
import {
  SolutionsStickySidebar,
  STICKY_SIDEBAR_WRAPPER_CLASS,
} from '@/components/layout/sticky-sidebar-nav';
import { Icon } from '@/components/ui/icon';
import { SectionHeader } from '@/components/ui/section-header';
import { ServiceJsonLd } from '@/components/seo/structured-data';
import { solutionsContent, solutionDetailsMap } from '@/content/solutions';

export const metadata: Metadata = {
  title: 'Enterprise IT Solutions by Industry & Delivery Model',
  description:
    'Tailored IT Annual Maintenance Contracts for Banking, Manufacturing, Retail, and IT/ITeS enterprises. Resident engineer placement with structured SLA tiers.',
  keywords: [
    'Industry IT AMC',
    'BFSI IT Maintenance',
    'Manufacturing IT AMC',
    'Retail Branch Support',
    'Resident Engineer AMC',
    'Multi-Site IT Governance',
  ],
  alternates: {
    canonical: 'https://mintamc.com/solutions',
  },
  openGraph: {
    title: 'Enterprise IT Solutions by Industry & Delivery Model | Mint AMC',
    description:
      'Explore sector-tailored maintenance agreements designed for high-compliance banking, zero-downtime manufacturing, and distributed branch networks.',
    url: 'https://mintamc.com/solutions',
    siteName: 'Mint AMC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise IT Solutions by Industry & Delivery Model | Mint AMC',
    description:
      'Tailored IT Annual Maintenance Contracts for Banking, Manufacturing, Retail, and Multi-Site enterprises.',
  },
};

export default function SolutionsPage() {
  return (
    <MarketingChrome>
      <ServiceJsonLd
        name="Enterprise IT AMC Industry Solutions"
        description="Sector-specific IT Annual Maintenance Contract frameworks mapped to regulatory compliance and branch network density."
        url="https://mintamc.com/solutions"
      />

      {/* SECTION 1: Light-Themed Title Hero Band */}
      <PageHeroBand
        eyebrow="Industry Architecture"
        title={solutionsContent.heroTitle}
        subtitle={solutionsContent.heroSubtitle}
      />

      {/* SECTION 2: Industry Verticals and Delivery Models with Sticky Sidebar */}
      <PageSection tone="muted">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Sidebar */}
          <div className={STICKY_SIDEBAR_WRAPPER_CLASS}>
            <SolutionsStickySidebar />
          </div>

          {/* Main Solutions Content */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-12">
            <div>
              <SectionHeader
                eyebrow="Sector Solutions"
                title={solutionsContent.byIndustryTitle}
                subtitle="Tailored AMC governance, compliance documentation, and onsite response tiers mapped to your regulatory sector."
              />
              <div className="grid sm:grid-cols-2 gap-5 items-stretch">
                {solutionsContent.industries.map((item) => {
                  const detail = solutionDetailsMap[item.id];
                  return (
                    <Link
                      key={item.id}
                      href={`/solutions/${item.id}`}
                      className="ui-card-interactive p-6 h-full flex flex-col justify-between group bg-surface shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="w-9 h-9 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center shrink-0">
                            <Icon icon={Boxes} size="sm" />
                          </div>
                          {detail && (
                            <span className="text-xs font-semibold text-brand">
                              {detail.slaTier.split('+')[0].trim()}
                            </span>
                          )}
                        </div>
                        <h3 className="type-card-title group-hover:text-brand transition-colors text-base font-semibold">
                          {item.title}
                        </h3>
                        <p className="type-body mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                      <div className="mt-5 pt-3.5 border-t border-line flex items-center justify-between text-xs font-semibold text-secondary group-hover:text-brand">
                        <span>View Solution Scope</span>
                        <Icon icon={ArrowRight} size="xs" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>

            <div>
              <SectionHeader
                eyebrow="Delivery Frameworks"
                title={solutionsContent.byNeedTitle}
                subtitle="Choose the operational structure that matches your internal IT team capacity and budget allocation."
              />
              <div className="grid sm:grid-cols-2 gap-5 items-stretch">
                {solutionsContent.needs.map((item) => {
                  const detail = solutionDetailsMap[item.id];
                  return (
                    <Link
                      key={item.id}
                      href={`/solutions/${item.id}`}
                      className="ui-card-interactive p-6 h-full flex flex-col justify-between group bg-surface shadow-xs"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <div className="w-9 h-9 rounded-[8px] bg-secondary-subtle text-secondary flex items-center justify-center shrink-0">
                            <Icon icon={CheckSquare} size="sm" />
                          </div>
                          {detail && (
                            <span className="text-xs font-semibold text-secondary">
                              {detail.slaTier.split('+')[0].trim()}
                            </span>
                          )}
                        </div>
                        <h3 className="type-card-title group-hover:text-brand transition-colors text-base font-semibold">
                          {item.title}
                        </h3>
                        <p className="type-body mt-2 text-xs sm:text-sm text-ink-muted leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                      <div className="mt-5 pt-3.5 border-t border-line flex items-center justify-between text-xs font-semibold text-secondary group-hover:text-brand">
                        <span>View Delivery Model</span>
                        <Icon icon={ArrowRight} size="xs" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 3: Multi-Location Transition Architecture */}
      <PageSection tone="white" borderTop>
        <div className="max-w-5xl mx-auto space-y-8">
          <SectionHeader
            align="center"
            eyebrow="Transition Protocol"
            title="Standardised Onboarding for Distributed Networks"
            subtitle="How we transition enterprise infrastructure across 50+ to 500+ locations without operational disruption."
          />

          <div className="grid sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="text-xs font-mono font-bold text-brand">STEP 01</span>
              <h4 className="type-card-title text-base mt-2">Unified Inventory Discovery</h4>
              <p className="type-body text-xs sm:text-sm mt-2">
                Centralized aggregation of hardware models, serial numbers, warranties, and branch contact coordinators.
              </p>
            </div>

            <div className="p-6 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="text-xs font-mono font-bold text-brand">STEP 02</span>
              <h4 className="type-card-title text-base mt-2">Regional Spares Distribution</h4>
              <p className="type-body text-xs sm:text-sm mt-2">
                Staging critical motherboards, drives, and network power modules in our regional hub warehouses.
              </p>
            </div>

            <div className="p-6 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="text-xs font-mono font-bold text-brand">STEP 03</span>
              <h4 className="type-card-title text-base mt-2">Single-Pane Governance</h4>
              <p className="type-body text-xs sm:text-sm mt-2">
                One centralized portal for branch managers to log tickets, track engineer ETA, and view PM reports.
              </p>
            </div>
          </div>
        </div>
      </PageSection>
    </MarketingChrome>
  );
}
