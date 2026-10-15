import type { Metadata } from 'next';
import {
  Award,
  CheckCircle2,
  FileCheck,
  Globe,
  ShieldCheck,
  Users,
} from 'lucide-react';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageHeroBand from '@/components/layout/page-hero-band';
import PageSection from '@/components/layout/page-section';
import { Icon } from '@/components/ui/icon';
import { PanelCard } from '@/components/ui/panel-card';
import { SectionHeader } from '@/components/ui/section-header';
import { aboutContent } from '@/content/about';
import { siteContent } from '@/content/site';

export const metadata: Metadata = {
  title: 'About Our Enterprise IT AMC Infrastructure',
  description:
    'Discover Mint AMC, a specialized enterprise IT Annual Maintenance Contract division of CONZEX GLOBAL PRIVATE LIMITED delivering DPIIT-recognized SLA maintenance.',
  keywords: [
    'About Mint AMC',
    'Enterprise IT AMC Company',
    'CONZEX GLOBAL Enterprise IT',
    'Pan India IT AMC Provider',
    'DPIIT Recognised IT AMC',
    'Multi-Vendor OEM Hardware Support',
  ],
  alternates: {
    canonical: 'https://mintamc.com/about',
  },
  openGraph: {
    title: 'About Our Enterprise IT AMC Infrastructure | Mint AMC',
    description:
      'Learn about Mint AMC mission, corporate pedigree, ISO-certified processes, and multi-OEM enterprise maintenance infrastructure across India.',
    url: 'https://mintamc.com/about',
    siteName: 'Mint AMC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Our Enterprise IT AMC Infrastructure | Mint AMC',
    description:
      'Learn about Mint AMC mission, corporate pedigree, and multi-OEM enterprise maintenance infrastructure across India.',
  },
};

export default function AboutPage() {
  return (
    <MarketingChrome>
      {/* SECTION 1: Light-Themed Title Hero Band */}
      <PageHeroBand
        eyebrow="Corporate Pedigree"
        title={aboutContent.heroTitle}
        subtitle={aboutContent.heroSubtitle}
      />

      {/* SECTION 2: Corporate Foundations & Mission */}
      <PageSection tone="white">
        <div className="max-w-5xl mx-auto space-y-8">
          <SectionHeader
            align="center"
            eyebrow="Our Foundation"
            title="Engineered for Predictable Enterprise IT Stability"
            subtitle="Bridging the gap between OEM warranty expirations and multi-location enterprise IT availability."
          />

          <div className="grid sm:grid-cols-2 gap-6 items-stretch">
            <PanelCard title={aboutContent.storyTitle} className="h-full">
              <p className="type-body text-sm leading-relaxed">{aboutContent.storyBody}</p>
            </PanelCard>
            <PanelCard title={aboutContent.missionTitle} className="h-full">
              <p className="type-body text-sm leading-relaxed">{aboutContent.missionBody}</p>
            </PanelCard>
          </div>
        </div>
      </PageSection>

      {/* SECTION 3: Core Operating Values */}
      <PageSection tone="muted">
        <div className="max-w-5xl mx-auto space-y-6">
          <SectionHeader
            align="center"
            eyebrow="Operating Tenets"
            title={aboutContent.valuesTitle}
            subtitle="The core architectural commitments that govern every client agreement and service ticket."
          />

          <div className="grid sm:grid-cols-2 gap-4">
            {aboutContent.values.map((v, idx) => (
              <div
                key={v}
                className="p-5 rounded-[8px] bg-surface border border-line flex items-start gap-3.5 shadow-xs"
              >
                <span className="w-8 h-8 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center shrink-0 mt-0.5">
                  <Icon icon={CheckCircle2} size="sm" />
                </span>
                <div>
                  <h4 className="type-card-title text-sm">Value Commitment 0{idx + 1}</h4>
                  <p className="text-sm font-normal text-ink-muted mt-1 leading-relaxed">
                    {v}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* SECTION 4: Corporate Governance & Leadership Pedigree */}
      <PageSection tone="white" borderTop>
        <div className="max-w-5xl mx-auto space-y-8">
          <SectionHeader
            align="center"
            eyebrow="Executive Governance"
            title={aboutContent.leadershipTitle}
            subtitle="Corporate stewardship and legal accountability backed by CONZEX GLOBAL PRIVATE LIMITED."
          />

          <div className="grid sm:grid-cols-1 gap-6">
            {aboutContent.leadership.map((l) => (
              <div key={l.name} className="ui-card p-6 sm:p-8 bg-surface">
                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-4 mb-4 border-b border-line">
                  <div>
                    <h3 className="type-card-title text-xl">{l.name}</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-brand mt-1">
                      {l.role}
                    </p>
                  </div>
                  <span className="px-3 py-1 rounded-[8px] bg-surface-muted text-xs font-mono text-ink-muted border border-line">
                    CONZEX Group Executive
                  </span>
                </div>

                <p className="type-body text-sm leading-relaxed">{l.bio}</p>

                <div className="mt-6 pt-4 border-t border-line grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-ink-muted">
                  <div>
                    <span className="font-semibold text-ink block">Parent Corporate Entity:</span>
                    <span>{siteContent.parentCompany.name}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-ink block">Corporate Identity (CIN):</span>
                    <span className="font-mono">{siteContent.parentCompany.cin}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-ink block">Registered Office:</span>
                    <span>{siteContent.parentCompany.address}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* SECTION 5: Accreditations & Compliance Framework */}
      <PageSection tone="muted">
        <div className="max-w-5xl mx-auto space-y-8">
          <SectionHeader
            align="center"
            eyebrow="Accreditations &amp; Quality"
            title={aboutContent.certificationsTitle}
            subtitle="Formal statutory recognition and compliance standards ensuring enterprise-grade service delivery."
          />

          <div className="grid sm:grid-cols-3 gap-5">
            {aboutContent.certifications.map((c) => (
              <div
                key={c}
                className="p-5 rounded-[8px] bg-surface border border-line text-sm font-normal text-ink-muted flex flex-col justify-between shadow-xs"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-9 h-9 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center shrink-0">
                    <Icon icon={ShieldCheck} size="sm" />
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand">
                    Accredited
                  </span>
                </div>
                <p className="text-ink font-medium leading-snug">{c}</p>
                <p className="text-xs text-ink-muted mt-2">
                  Compliant with statutory enterprise IT procurement audits.
                </p>
              </div>
            ))}
          </div>
        </div>
      </PageSection>
    </MarketingChrome>
  );
}
