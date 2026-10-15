import type { Metadata } from 'next';
import { Mail, Phone, Scale, ShieldCheck } from 'lucide-react';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageHeroBand from '@/components/layout/page-hero-band';
import PageSection from '@/components/layout/page-section';
import {
  LegalStickySidebar,
  STICKY_SIDEBAR_WRAPPER_CLASS,
} from '@/components/layout/sticky-sidebar-nav';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { Icon } from '@/components/ui/icon';
import { PanelCard } from '@/components/ui/panel-card';
import { SectionHeader } from '@/components/ui/section-header';
import { privacyContent } from '@/content/legal';
import { siteContent } from '@/content/site';

export const metadata: Metadata = {
  title: 'Privacy Policy | Corporate Data Governance & Telemetry Standards',
  description:
    'Official Privacy Policy for Mint AMC. Information handling, hardware telemetry storage, and statutory DPDP Act compliance.',
  alternates: {
    canonical: 'https://mintamc.com/privacy',
  },
  openGraph: {
    title: 'Privacy Policy | Mint AMC',
    description:
      'Information governance, hardware diagnostic telemetry security, and data protection terms for Mint AMC clients.',
    url: 'https://mintamc.com/privacy',
    siteName: 'Mint AMC',
    type: 'website',
  },
};

export default function PrivacyPage() {
  return (
    <MarketingChrome>
      {/* SECTION 1: Light-Themed Title Hero Band */}
      <PageHeroBand
        eyebrow="Statutory Compliance"
        title={privacyContent.title}
        subtitle={privacyContent.subtitle}
      />

      {/* SECTION 2: Policy Clauses with Sticky Sidebar */}
      <PageSection tone="muted">
        <div className="mb-5">
          <Breadcrumbs
            items={[
              { label: siteContent.nav.home.label, href: '/' },
              { label: 'Governance & Legal' },
              { label: 'Privacy Policy' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Sidebar */}
          <div className={STICKY_SIDEBAR_WRAPPER_CLASS}>
            <LegalStickySidebar currentPath="/privacy" />
          </div>

          {/* Main Legal Content */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {privacyContent.sections.map((s) => (
              <PanelCard key={s.heading} title={s.heading}>
                <p className="type-body whitespace-pre-line text-sm leading-relaxed">{s.body}</p>
              </PanelCard>
            ))}
          </div>
        </div>
      </PageSection>

      {/* SECTION 3: Technical Telemetry & Enterprise Safeguards */}
      <PageSection tone="white" borderTop>
        <div className="max-w-5xl mx-auto space-y-6">
          <SectionHeader
            align="center"
            eyebrow="Technical Standards"
            title="Hardware Telemetry &amp; Access Controls"
            subtitle="How our remote NOC diagnostic tools and onsite engineering teams protect sensitive infrastructure configurations."
          />

          <div className="grid sm:grid-cols-3 gap-5">
            <div className="p-5 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="w-8 h-8 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center mb-3">
                <Icon icon={ShieldCheck} size="sm" />
              </span>
              <h4 className="type-card-title text-sm font-semibold">Zero Data Exfiltration</h4>
              <p className="type-body text-xs mt-1.5 leading-relaxed">
                NOC diagnostics record hardware metrics only (fan RPM, CPU temperature, disk SMART data). We never inspect or store proprietary business data.
              </p>
            </div>

            <div className="p-5 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="w-8 h-8 rounded-[8px] bg-secondary-subtle text-secondary flex items-center justify-center mb-3">
                <Icon icon={Scale} size="sm" />
              </span>
              <h4 className="type-card-title text-sm font-semibold">DPDP Act Compliance</h4>
              <p className="type-body text-xs mt-1.5 leading-relaxed">
                Operating strictly under India’s Digital Personal Data Protection Act 2023 with defined retention schedules and consent governance.
              </p>
            </div>

            <div className="p-5 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="w-8 h-8 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center mb-3">
                <Icon icon={ShieldCheck} size="sm" />
              </span>
              <h4 className="type-card-title text-sm font-semibold">Encrypted Storage</h4>
              <p className="type-body text-xs mt-1.5 leading-relaxed">
                All ticketing logs, serial inventories, and maintenance reports are stored in ISO 27001-certified Tier IV data facilities in India.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 4: Data Protection Officer (DPO) & Compliance Desk */}
      <PageSection tone="muted">
        <div className="max-w-4xl mx-auto p-8 rounded-[8px] bg-surface border border-line shadow-xs">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                Compliance Officer
              </span>
              <h3 className="type-card-title text-lg mt-1">Data Privacy &amp; Legal Desk</h3>
              <p className="type-body text-sm mt-1 max-w-xl">
                For statutory audit queries, confidentiality undertakings, or data access requests, contact our designated privacy officer.
              </p>
            </div>
            <div className="space-y-2 text-xs text-ink shrink-0">
              <div className="flex items-center gap-2">
                <Icon icon={Mail} size="xs" className="text-brand" />
                <a href="mailto:support@mintamc.com" className="font-semibold hover:text-brand underline">
                  support@mintamc.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon={Phone} size="xs" className="text-secondary" />
                <span>Desk: (+91) 800 7060 308</span>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </MarketingChrome>
  );
}
