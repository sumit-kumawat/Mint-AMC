import type { Metadata } from 'next';
import { CheckCircle2, FileText, Mail, Phone, Scale, ShieldCheck } from 'lucide-react';
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
import { termsContent } from '@/content/legal';
import { siteContent } from '@/content/site';

export const metadata: Metadata = {
  title: 'Terms of Service | Master Annual Maintenance Agreement Terms',
  description:
    'Master Terms of Service for Mint AMC contracts. Contractual obligations, service delivery boundaries, component replacement terms, and liability limits.',
  alternates: {
    canonical: 'https://mintamc.com/terms',
  },
  openGraph: {
    title: 'Terms of Service | Mint AMC',
    description:
      'Contractual governance terms and master maintenance agreements governing enterprise hardware coverage across India.',
    url: 'https://mintamc.com/terms',
    siteName: 'Mint AMC',
    type: 'website',
  },
};

export default function TermsPage() {
  return (
    <MarketingChrome>
      {/* SECTION 1: Light-Themed Title Hero Band */}
      <PageHeroBand
        eyebrow="Master Agreement"
        title={termsContent.title}
        subtitle={termsContent.subtitle}
      />

      {/* SECTION 2: Master Service Agreement Clauses with Sticky Sidebar */}
      <PageSection tone="muted">
        <div className="mb-5">
          <Breadcrumbs
            items={[
              { label: siteContent.nav.home.label, href: '/' },
              { label: 'Governance & Legal' },
              { label: 'Terms of Service' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Sidebar */}
          <div className={STICKY_SIDEBAR_WRAPPER_CLASS}>
            <LegalStickySidebar currentPath="/terms" />
          </div>

          {/* Main Terms Content */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {termsContent.sections.map((s) => (
              <PanelCard key={s.heading} title={s.heading}>
                <p className="type-body whitespace-pre-line text-sm leading-relaxed">{s.body}</p>
              </PanelCard>
            ))}
          </div>
        </div>
      </PageSection>

      {/* SECTION 3: Service Boundaries & Liability Guardrails */}
      <PageSection tone="white" borderTop>
        <div className="max-w-5xl mx-auto space-y-6">
          <SectionHeader
            align="center"
            eyebrow="Operational Boundaries"
            title="Service Scope &amp; Maintenance Boundaries"
            subtitle="Transparent definition of what is covered under standard contract governance and what requires separate project scoping."
          />

          <div className="grid sm:grid-cols-3 gap-5">
            <div className="p-5 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="w-8 h-8 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center mb-3">
                <Icon icon={CheckCircle2} size="sm" />
              </span>
              <h4 className="type-card-title text-sm font-semibold">Scheduled PM Visits</h4>
              <p className="type-body text-xs mt-1.5 leading-relaxed">
                Mandatory quarterly onsite audits are contractually guaranteed to prevent component thermal and electrical stress.
              </p>
            </div>

            <div className="p-5 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="w-8 h-8 rounded-[8px] bg-secondary-subtle text-secondary flex items-center justify-center mb-3">
                <Icon icon={ShieldCheck} size="sm" />
              </span>
              <h4 className="type-card-title text-sm font-semibold">Genuine Spares Guarantee</h4>
              <p className="type-body text-xs mt-1.5 leading-relaxed">
                All components provided under comprehensive contracts are guaranteed OEM compatible, fully tested, and backed by warranty.
              </p>
            </div>

            <div className="p-5 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="w-8 h-8 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center mb-3">
                <Icon icon={Scale} size="sm" />
              </span>
              <h4 className="type-card-title text-sm font-semibold">Contract Termination</h4>
              <p className="type-body text-xs mt-1.5 leading-relaxed">
                Structured 30-day notice period with handover audit reports ensuring zero transition friction or asset hostage risks.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 4: Corporate Governance & Legal Counsel Desk */}
      <PageSection tone="muted">
        <div className="max-w-4xl mx-auto p-8 rounded-[8px] bg-surface border border-line shadow-xs">
          <div className="flex flex-col sm:flex-row items-start justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-brand">
                Legal Desk
              </span>
              <h3 className="type-card-title text-lg mt-1">Corporate Counsel &amp; Contracts Desk</h3>
              <p className="type-body text-sm mt-1 max-w-xl">
                Contracts are formally governed by executed Master Annual Maintenance Contract (AMC) agreements. Jurisdiction: Competent Courts of Pune, Maharashtra, India.
              </p>
            </div>
            <div className="space-y-2 text-xs text-ink shrink-0">
              <div className="flex items-center gap-2">
                <Icon icon={Mail} size="xs" className="text-brand" />
                <a href="mailto:info@mintamc.com" className="font-semibold hover:text-brand underline">
                  info@mintamc.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Icon icon={Phone} size="xs" className="text-secondary" />
                <span>Legal Desk: (+91) 800 7060 308</span>
              </div>
            </div>
          </div>
        </div>
      </PageSection>
    </MarketingChrome>
  );
}
