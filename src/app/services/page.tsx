import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageHeroBand from '@/components/layout/page-hero-band';
import PageSection from '@/components/layout/page-section';
import {
  ServicesStickySidebar,
  STICKY_SIDEBAR_WRAPPER_CLASS,
} from '@/components/layout/sticky-sidebar-nav';
import { Icon } from '@/components/ui/icon';
import { SectionHeader } from '@/components/ui/section-header';
import { ServiceJsonLd } from '@/components/seo/structured-data';
import { megaMenuColumns } from '@/content/mega-menu';
import { servicesBySlug, servicesPageContent } from '@/content/services';

export const metadata: Metadata = {
  title: 'Enterprise IT Infrastructure AMC Services',
  description:
    'Explore Mint AMC service catalog: Comprehensive & Non-Comprehensive Annual Maintenance Contracts for enterprise servers, networks, storage, and workstations.',
  keywords: [
    'IT AMC Services',
    'Enterprise Server AMC',
    'Corporate Desktop Maintenance',
    'Network Switch Router Support',
    'Firewall AMC',
    'Storage Array Maintenance',
  ],
  alternates: {
    canonical: 'https://mintamc.com/services',
  },
  openGraph: {
    title: 'Enterprise IT Infrastructure AMC Services | Mint AMC',
    description:
      'Contractual SLA support, quarterly preventive maintenance, and PAN-India onsite engineer dispatch across multi-vendor IT infrastructure.',
    url: 'https://mintamc.com/services',
    siteName: 'Mint AMC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise IT Infrastructure AMC Services | Mint AMC',
    description:
      'Comprehensive & Non-Comprehensive Annual Maintenance Contracts for corporate servers, networks, and workstations.',
  },
};

export default function ServicesPage() {
  return (
    <MarketingChrome>
      <ServiceJsonLd
        name="Enterprise IT AMC Service Portfolio"
        description="Structured annual maintenance contracts covering desktops, servers, storage arrays, networking hardware, and firewalls across India."
        url="https://mintamc.com/services"
      />

      {/* SECTION 1: Light-Themed Title Hero Band */}
      <PageHeroBand
        eyebrow="Service Catalog"
        title={servicesPageContent.heroTitle}
        subtitle={servicesPageContent.heroSubtitle}
      />

      {/* SECTION 2: Core Service Catalog with Sticky Sidebar */}
      <PageSection tone="muted">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Sidebar */}
          <div className={STICKY_SIDEBAR_WRAPPER_CLASS}>
            <ServicesStickySidebar />
          </div>

          {/* Main Catalog Content */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {megaMenuColumns.map((col) => (
              <div key={col.id} className="ui-card p-6 sm:p-7 bg-surface">
                <div className="flex items-center gap-3.5 mb-5 pb-4 border-b border-line">
                  <div className="w-10 h-10 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center shrink-0">
                    <Icon icon={col.icon} size="md" />
                  </div>
                  <div>
                    <h2 className="type-card-title text-lg">{col.heading}</h2>
                    <p className="text-xs sm:text-sm font-normal text-ink-muted">
                      {col.description}
                    </p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 items-stretch">
                  {col.links.map((link) => {
                    const detail = servicesBySlug[link.slug];
                    return (
                      <Link
                        key={link.slug}
                        href={`/services/${link.slug}`}
                        className="group p-4 sm:p-5 h-full rounded-[8px] bg-surface-muted/60 hover:bg-surface border border-line hover:border-brand/50 hover:shadow-card-hover transition-colors flex flex-col justify-between"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-sm sm:text-base font-semibold text-ink group-hover:text-brand transition-colors flex items-center gap-2">
                              <Icon
                                icon={link.icon}
                                size="sm"
                                className="text-secondary group-hover:text-brand shrink-0"
                              />
                              <span>{link.label}</span>
                            </h3>
                            <Icon
                              icon={ArrowRight}
                              size="xs"
                              className="text-secondary group-hover:text-brand group-hover:translate-x-0.5 transition-all shrink-0"
                            />
                          </div>
                          {detail && (
                            <p className="text-xs sm:text-sm font-normal text-ink-muted mt-2 leading-relaxed">
                              {detail.shortDescription}
                            </p>
                          )}
                        </div>
                        <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs font-normal">
                          <span className="text-ink-muted flex items-center gap-1.5">
                            <Icon icon={ShieldCheck} size="xs" className="text-brand" />
                            Quarterly PM + SLA
                          </span>
                          <span className="font-medium text-secondary group-hover:text-brand">
                            View Scope →
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* SECTION 3: Service Level Framework & Response Tiers */}
      <PageSection tone="white" borderTop>
        <SectionHeader
          align="center"
          eyebrow="SLA Commitments"
          title="Guaranteed Resolution Windows Across All Services"
          subtitle="Every hardware category in our portfolio is protected by legally binding triage, onsite dispatch, and spare parts replacement timeframes."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="ui-card p-6 bg-surface flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center mb-3">
                <Icon icon={Clock} size="sm" />
              </div>
              <h4 className="type-card-title text-base">Tier 1 Incident Triage</h4>
              <p className="text-xs text-brand font-semibold mt-1">Structured Incident Acknowledgement</p>
              <p className="type-body text-xs sm:text-sm mt-3">
                Immediate assignment of a designated incident manager, telemetry review, and rapid severity escalation across our dedicated technical support desk.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-line text-xs text-ink-muted">
              Live ticket tracking in client portal
            </div>
          </div>

          <div className="ui-card p-6 bg-surface flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-[8px] bg-secondary-subtle text-secondary flex items-center justify-center mb-3">
                <Icon icon={Wrench} size="sm" />
              </div>
              <h4 className="type-card-title text-base">Tier 2 Onsite Dispatch</h4>
              <p className="text-xs text-secondary font-semibold mt-1">Scheduled Field Arrival</p>
              <p className="type-body text-xs sm:text-sm mt-3">
                Certified OEM-trained field engineers deployed directly to your server room, branch office, or data center facility with diagnostic kits.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-line text-xs text-ink-muted">
              Coordinated across commercial and regional hubs
            </div>
          </div>

          <div className="ui-card p-6 bg-surface flex flex-col justify-between">
            <div>
              <div className="w-9 h-9 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center mb-3">
                <Icon icon={ShieldCheck} size="sm" />
              </div>
              <h4 className="type-card-title text-base">Component Staging</h4>
              <p className="text-xs text-brand font-semibold mt-1">Verified OEM Component Sourcing</p>
              <p className="type-body text-xs sm:text-sm mt-3">
                Localized stocking of power supplies, motherboards, RAID controllers, SFP modules, and drives for immediate cold-spare swapping.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-line text-xs text-ink-muted">
              Coordination with manufacturer supply chains
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 4: Service Delivery Methodology & Lifecycle */}
      <PageSection tone="muted">
        <SectionHeader
          align="center"
          eyebrow="Operational Process"
          title="How We Deliver Consistent Enterprise Maintenance"
          subtitle="From initial discovery to continuous preventive governance, our structured onboarding ensures seamless transition without downtime."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="p-6 rounded-[8px] bg-surface border border-line shadow-xs">
            <span className="text-xs font-mono font-bold text-brand">PHASE 01</span>
            <h4 className="type-card-title text-base mt-2">Inventory Audit</h4>
            <p className="type-body text-xs sm:text-sm mt-2">
              Comprehensive serial number logging, firmware baselining, and physical health inspection of all enrolled assets.
            </p>
          </div>

          <div className="p-6 rounded-[8px] bg-surface border border-line shadow-xs">
            <span className="text-xs font-mono font-bold text-brand">PHASE 02</span>
            <h4 className="type-card-title text-base mt-2">Spares Staging</h4>
            <p className="type-body text-xs sm:text-sm mt-2">
              Locating and warehousing critical replacement components near your facility to satisfy contract SLA response times.
            </p>
          </div>

          <div className="p-6 rounded-[8px] bg-surface border border-line shadow-xs">
            <span className="text-xs font-mono font-bold text-brand">PHASE 03</span>
            <h4 className="type-card-title text-base mt-2">Preventive Care</h4>
            <p className="type-body text-xs sm:text-sm mt-2">
              Quarterly scheduled engineer visits conducting deep dust clearance, thermal inspection, and microcode patch validation.
            </p>
          </div>

          <div className="p-6 rounded-[8px] bg-surface border border-line shadow-xs">
            <span className="text-xs font-mono font-bold text-brand">PHASE 04</span>
            <h4 className="type-card-title text-base mt-2">Quarterly Review</h4>
            <p className="type-body text-xs sm:text-sm mt-2">
              Executive reporting on ticket MTTR, asset health indices, end-of-life advisories, and capacity planning suggestions.
            </p>
          </div>
        </div>
      </PageSection>
    </MarketingChrome>
  );
}
