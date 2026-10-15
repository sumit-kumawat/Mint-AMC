import type { Metadata } from 'next';
import {
  CheckCircle2,
  Clock,
  Layers,
  MapPin,
  Send,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageHeroBand from '@/components/layout/page-hero-band';
import PageSection from '@/components/layout/page-section';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { SectionHeader } from '@/components/ui/section-header';
import { whyContent } from '@/content/why';

export const metadata: Metadata = {
  title: 'Why Choose Mint AMC - Enterprise Advantages',
  description:
    'Discover why Indian enterprises choose Mint AMC: structured technical triage, multi-OEM hardware support, predictable SLAs, and audit-ready governance.',
  keywords: [
    'Why Mint AMC',
    'Enterprise IT AMC Advantages',
    'Pan India Field Engineering',
    'Multi Vendor OEM Maintenance',
    'Predictable SLA Governance',
    'Corporate IT Infrastructure Uptime',
  ],
  alternates: {
    canonical: 'https://mintamc.com/why-mint-amc',
  },
  openGraph: {
    title: 'Why Choose Mint AMC - Enterprise Advantages | Mint AMC',
    description:
      'Predictable SLA governance, scheduled quarterly preventive audits, and certified field engineering dispatch across India.',
    url: 'https://mintamc.com/why-mint-amc',
    siteName: 'Mint AMC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Why Choose Mint AMC - Enterprise Advantages | Mint AMC',
    description:
      'Predictable SLA governance, scheduled preventive audits, and certified field engineering dispatch across India.',
  },
};

export default function WhyMintAmcPage() {
  return (
    <MarketingChrome>
      {/* SECTION 1: Light-Themed Title Hero Band */}
      <PageHeroBand
        eyebrow="Enterprise Value Proposition"
        title={whyContent.heroTitle}
        subtitle={whyContent.heroSubtitle}
      />

      {/* SECTION 2: Core Differentiators */}
      <PageSection tone="white">
        <div className="max-w-5xl mx-auto space-y-8">
          <SectionHeader
            align="center"
            eyebrow="Key Differentiators"
            title={whyContent.differentiatorsTitle}
            subtitle="Engineered for CIOs, IT Directors, and Infrastructure Heads who require contractually guaranteed uptime."
          />

          <div className="grid sm:grid-cols-2 gap-5 items-stretch">
            {whyContent.differentiators.map((d, idx) => (
              <div
                key={d}
                className="ui-card p-6 h-full bg-surface flex items-start gap-4 shadow-xs"
              >
                <span className="w-8 h-8 rounded-[8px] bg-brand-subtle text-brand font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  0{idx + 1}
                </span>
                <p className="text-sm sm:text-base text-ink-muted font-normal leading-relaxed">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* SECTION 3: Service Level Agreement Commitments Table */}
      <PageSection tone="muted">
        <div className="max-w-5xl mx-auto space-y-6">
          <SectionHeader
            align="center"
            eyebrow="Contractual SLAs"
            title={whyContent.slaTitle}
            subtitle="Time-bound acknowledgement, onsite engineer dispatch, and preventive governance backed by our dedicated technical support desk."
          />

          <div className="ui-table-wrap">
            <table className="ui-table">
              <thead>
                <tr>
                  <th>{whyContent.slaTableHeaders.tier}</th>
                  <th>{whyContent.slaTableHeaders.response}</th>
                  <th>{whyContent.slaTableHeaders.resolution}</th>
                </tr>
              </thead>
              <tbody>
                {whyContent.slaRows.map((row) => (
                  <tr key={row.tier}>
                    <td className="font-semibold text-ink whitespace-nowrap">{row.tier}</td>
                    <td className="text-brand font-semibold">{row.response}</td>
                    <td className="text-ink-muted">{row.resolution}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </PageSection>

      {/* SECTION 4: 4-Phase Preventative Maintenance Cycle */}
      <PageSection tone="white" borderTop>
        <div className="max-w-5xl mx-auto space-y-8">
          <SectionHeader
            align="center"
            eyebrow="Proactive Engineering"
            title="Scheduled Preventive Maintenance (PM) Lifecycle"
            subtitle="We avoid emergency hardware crashes through rigorous quarterly diagnostic and physical audits."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-5 rounded-[8px] border border-line bg-surface">
              <span className="text-xs font-mono font-bold text-brand">PHASE 01</span>
              <h4 className="type-card-title text-base mt-2">Asset Barcoding</h4>
              <p className="type-body text-xs sm:text-sm mt-2">
                Serial number tracking, hardware revision verification, and critical spare staging identification.
              </p>
            </div>

            <div className="p-5 rounded-[8px] border border-line bg-surface">
              <span className="text-xs font-mono font-bold text-brand">PHASE 02</span>
              <h4 className="type-card-title text-base mt-2">Thermal Inspection</h4>
              <p className="type-body text-xs sm:text-sm mt-2">
                Deep dust extraction, fan motor lubrication, power supply rail load checking, and heatsink inspection.
              </p>
            </div>

            <div className="p-5 rounded-[8px] border border-line bg-surface">
              <span className="text-xs font-mono font-bold text-brand">PHASE 03</span>
              <h4 className="type-card-title text-base mt-2">Firmware Hygiene</h4>
              <p className="type-body text-xs sm:text-sm mt-2">
                BIOS/UEFI microcode patches, RAID parity scans, and critical OEM firmware vulnerability remediation.
              </p>
            </div>

            <div className="p-5 rounded-[8px] border border-line bg-surface">
              <span className="text-xs font-mono font-bold text-brand">PHASE 04</span>
              <h4 className="type-card-title text-base mt-2">Audit Certification</h4>
              <p className="type-body text-xs sm:text-sm mt-2">
                Sign-off documentation with MTBF projections, environmental observations, and compliance certificates.
              </p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 5: Regional Operational Support & Delivery Framework */}
      <PageSection tone="muted">
        <div className="max-w-5xl mx-auto space-y-6">
          <SectionHeader
            align="center"
            eyebrow="Delivery Framework"
            title="Multi-City Operational Support Architecture"
            subtitle="Support presence designed for enterprises operating multi-branch networks, commercial offices, and corporate headquarters."
          />

          <div className="grid sm:grid-cols-3 gap-5">
            <div className="p-6 rounded-[8px] bg-surface border border-line shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Coverage</span>
              <h4 className="type-card-title text-base mt-2">Regional Hub Support</h4>
              <p className="type-body text-xs sm:text-sm mt-2 leading-relaxed">
                Coordinated engineering coverage across commercial metro centers, tier-2 cities, and industrial hubs.
              </p>
            </div>

            <div className="p-6 rounded-[8px] bg-surface border border-line shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-secondary">Ticketing</span>
              <h4 className="type-card-title text-base mt-2">Structured Incident Escalation</h4>
              <p className="type-body text-xs sm:text-sm mt-2 leading-relaxed">
                Single-point ticket logging, remote triage, and prioritized field dispatch following clear escalation paths.
              </p>
            </div>

            <div className="p-6 rounded-[8px] bg-surface border border-line shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-brand">Ecosystem</span>
              <h4 className="type-card-title text-base mt-2">OEM Warranty Coordination</h4>
              <p className="type-body text-xs sm:text-sm mt-2 leading-relaxed">
                Seamless coordination with manufacturer warranty desks for in-warranty components alongside contract care.
              </p>
            </div>
          </div>
        </div>
      </PageSection>
    </MarketingChrome>
  );
}
