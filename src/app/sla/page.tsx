import type { Metadata } from 'next';
import { Clock, FileCheck, Mail, Phone, Send, ShieldCheck, Wrench } from 'lucide-react';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageHeroBand from '@/components/layout/page-hero-band';
import PageSection from '@/components/layout/page-section';
import {
  LegalStickySidebar,
  STICKY_SIDEBAR_WRAPPER_CLASS,
} from '@/components/layout/sticky-sidebar-nav';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { PanelCard } from '@/components/ui/panel-card';
import { SectionHeader } from '@/components/ui/section-header';
import { slaContent } from '@/content/legal';
import { siteContent } from '@/content/site';

export const metadata: Metadata = {
  title: 'Service Level Agreement (SLA) Overview | Response & Resolution Matrix',
  description:
    'Comprehensive SLA Framework for Mint AMC contracts. Incident classifications, engineer dispatch windows, and structured technical escalation pathways.',
  alternates: {
    canonical: 'https://mintamc.com/sla',
  },
  openGraph: {
    title: 'Service Level Agreement (SLA) Matrix | Mint AMC',
    description:
      'Contractual incident response timeframes, onsite dispatch guarantees, and escalation procedures for enterprise hardware across India.',
    url: 'https://mintamc.com/sla',
    siteName: 'Mint AMC',
    type: 'website',
  },
};

export default function SlaPage() {
  return (
    <MarketingChrome>
      {/* SECTION 1: Light-Themed Title Hero Band */}
      <PageHeroBand
        eyebrow="Contractual Commitments"
        title={slaContent.title}
        subtitle={slaContent.intro}
      />

      {/* SECTION 2: SLA Classification & Clauses with Sticky Sidebar */}
      <PageSection tone="muted">
        <div className="mb-5">
          <Breadcrumbs
            items={[
              { label: siteContent.nav.home.label, href: '/' },
              { label: 'Governance & Legal' },
              { label: 'SLA Overview' },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Sidebar */}
          <div className={STICKY_SIDEBAR_WRAPPER_CLASS}>
            <LegalStickySidebar currentPath="/sla" />
          </div>

          {/* Main SLA Content */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {slaContent.sections.map((s) => (
              <PanelCard key={s.heading} title={s.heading}>
                <p className="type-body whitespace-pre-line text-sm leading-relaxed">{s.body}</p>
              </PanelCard>
            ))}
          </div>
        </div>
      </PageSection>

      {/* SECTION 3: Multi-Tier Escalation Hierarchy */}
      <PageSection tone="white" borderTop>
        <div className="max-w-5xl mx-auto space-y-6">
          <SectionHeader
            align="center"
            eyebrow="Escalation Matrix"
            title="Multi-Tier Technical Escalation Tree"
            subtitle="Clear, automated escalation pathways ensure unresolved incidents immediately notify senior engineering leads and operations directors."
          />

          <div className="grid sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="text-xs font-mono font-bold text-brand">LEVEL 01</span>
              <h4 className="type-card-title text-sm mt-1.5 font-semibold">Triage & Helpdesk</h4>
              <p className="type-body text-xs mt-1.5 leading-relaxed">
                Initial ticket logging, telemetry check, and remote technical diagnostics by experienced support engineers.
              </p>
            </div>

            <div className="p-5 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="text-xs font-mono font-bold text-secondary">LEVEL 02</span>
              <h4 className="type-card-title text-sm mt-1.5 font-semibold">Certified Field Engineer</h4>
              <p className="type-body text-xs mt-1.5 leading-relaxed">
                Onsite physical inspection, component swapping, and local loop diagnostics per contracted response tier.
              </p>
            </div>

            <div className="p-5 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="text-xs font-mono font-bold text-brand">LEVEL 03</span>
              <h4 className="type-card-title text-sm mt-1.5 font-semibold">Principal Architect</h4>
              <p className="type-body text-xs mt-1.5 leading-relaxed">
                Advanced kernel debugging, firmware dump analysis, and complex routing topology remediation.
              </p>
            </div>

            <div className="p-5 rounded-[8px] border border-line bg-surface shadow-xs">
              <span className="text-xs font-mono font-bold text-secondary">LEVEL 04</span>
              <h4 className="type-card-title text-sm mt-1.5 font-semibold">OEM TAC Liaison</h4>
              <p className="type-body text-xs mt-1.5 leading-relaxed">
                Direct OEM engineering escalation with Cisco, Dell, HP, or Fortinet for microcode or hardware defect escalation.
              </p>
            </div>
          </div>
        </div>
      </PageSection>
    </MarketingChrome>
  );
}
