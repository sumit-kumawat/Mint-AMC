import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  FileCheck,
  FileText,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageHeroBand from '@/components/layout/page-hero-band';
import PageSection from '@/components/layout/page-section';
import {
  ResourcesStickySidebar,
  STICKY_SIDEBAR_WRAPPER_CLASS,
} from '@/components/layout/sticky-sidebar-nav';
import { Icon } from '@/components/ui/icon';
import { SectionHeader } from '@/components/ui/section-header';
import { articles, resourcesPageContent } from '@/content/resources';

export const metadata: Metadata = {
  title: 'IT AMC Knowledge Centre & Enterprise Guides',
  description:
    'Comprehensive guides, pricing frameworks, and RFP checklists for enterprise IT Annual Maintenance Contracts in India. Written by certified infrastructure engineers.',
  keywords: [
    'IT AMC Knowledge Base',
    'IT AMC RFP Checklist',
    'Comprehensive vs Non-Comprehensive AMC',
    'Hardware Maintenance Best Practices',
    'Enterprise IT Support Guides',
  ],
  alternates: {
    canonical: 'https://mintamc.com/resources',
  },
  openGraph: {
    title: 'IT AMC Knowledge Centre & Enterprise Guides | Mint AMC',
    description:
      'In-depth enterprise guides on IT AMC coverage, OEM warranties vs third-party maintenance, cost benchmarking, and RFP evaluation checklists.',
    url: 'https://mintamc.com/resources',
    siteName: 'Mint AMC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IT AMC Knowledge Centre & Enterprise Guides | Mint AMC',
    description:
      'Guides and RFP checklists for enterprise IT Annual Maintenance Contracts in India.',
  },
};

export default function ResourcesPage() {
  return (
    <MarketingChrome>
      {/* SECTION 1: Light-Themed Title Hero Band */}
      <PageHeroBand
        eyebrow="Knowledge Centre"
        title={resourcesPageContent.heroTitle}
        subtitle={resourcesPageContent.heroSubtitle}
      />

      {/* SECTION 2: Comprehensive Knowledge Guides Grid with Sticky Sidebar */}
      <PageSection tone="muted">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Sidebar */}
          <div className={STICKY_SIDEBAR_WRAPPER_CLASS}>
            <ResourcesStickySidebar />
          </div>

          {/* Main Articles Grid */}
          <div className="lg:col-span-8 xl:col-span-9">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              {articles.map((article, idx) => (
                <Link
                  key={article.slug}
                  href={`/resources/${article.slug}`}
                  className="ui-card-interactive p-6 h-full flex flex-col justify-between group bg-surface shadow-xs"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs font-normal text-ink-muted mb-3">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-brand">
                        <Icon icon={BookOpen} size="xs" />
                        {article.category}
                      </span>
                      <span>
                        0{idx + 1} · {article.readTime}
                      </span>
                    </div>

                    <h2 className="type-card-title group-hover:text-brand transition-colors text-base font-semibold">
                      {article.title}
                    </h2>

                    <p className="type-body text-xs sm:text-sm mt-2.5 line-clamp-3">
                      {article.excerpt}
                    </p>

                    <ul className="mt-4 pt-3 border-t border-line space-y-1.5">
                      {article.keyTakeaways.slice(0, 2).map((pt) => (
                        <li
                          key={pt}
                          className="flex items-start gap-2 text-xs font-normal text-ink-muted leading-snug"
                        >
                          <Icon
                            icon={CheckCircle2}
                            size="xs"
                            className="text-brand shrink-0 mt-0.5"
                          />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5 pt-3 border-t border-line flex items-center justify-between text-xs font-semibold text-secondary group-hover:text-brand transition-colors">
                    <span>Read Full Guide</span>
                    <Icon
                      icon={ArrowRight}
                      size="xs"
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 3: Enterprise IT AMC RFP & Procurement Framework */}
      <PageSection tone="white" borderTop>
        <div className="max-w-5xl mx-auto space-y-8">
          <SectionHeader
            align="center"
            eyebrow="Procurement Advisory"
            title="Essential Criteria for Evaluating Enterprise IT AMC Proposals"
            subtitle="Before signing an annual maintenance contract, ensure your organization tests vendor viability against these 4 core pillars."
          />

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="p-6 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Pillar 01</span>
              <h4 className="type-card-title text-base mt-2">Explicit Financial Penalties in SLA</h4>
              <p className="type-body text-xs sm:text-sm mt-2">
                A valid enterprise agreement must define clear service credits if P1 or P2 resolution timeframes are breached, preventing informal vendor excuses.
              </p>
            </div>

            <div className="p-6 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Pillar 02</span>
              <h4 className="type-card-title text-base mt-2">Localised Spare Parts Buffer</h4>
              <p className="type-body text-xs sm:text-sm mt-2">
                Verify whether the provider physically stages replacement drives, motherboards, and power supplies in warehouses located near your branch offices.
              </p>
            </div>

            <div className="p-6 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Pillar 03</span>
              <h4 className="type-card-title text-base mt-2">Contractual Preventive Maintenance</h4>
              <p className="type-body text-xs sm:text-sm mt-2">
                Demand quarterly mandatory physical audits, firmware health logs, and thermal inspections to eliminate surprise hardware failures.
              </p>
            </div>

            <div className="p-6 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Pillar 04</span>
              <h4 className="type-card-title text-base mt-2">Multi-OEM Engineer Certifications</h4>
              <p className="type-body text-xs sm:text-sm mt-2">
                Ensure field personnel are cross-trained on Dell, HP, Lenovo, Cisco, and Fortinet platforms to eliminate finger-pointing during heterogeneous stack failures.
              </p>
            </div>
          </div>
        </div>
      </PageSection>
    </MarketingChrome>
  );
}
