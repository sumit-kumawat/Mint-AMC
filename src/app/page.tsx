'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  HardDrive,
  Laptop,
  Network,
  RotateCcw,
  Send,
  Server,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import PartnersSection from '@/components/brand/partners-section';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageContainer from '@/components/layout/page-container';
import PageSection from '@/components/layout/page-section';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useQuoteModal } from '@/components/ui/request-quote-modal';
import { SectionHeader } from '@/components/ui/section-header';
import DynamicHeroTitle from '@/components/ui/dynamic-hero-title';
import FaqAccordion from '@/components/ui/faq-accordion';
import { FaqPageJsonLd } from '@/components/seo/structured-data';

const HOME_FAQS = [
  {
    question: 'How are support requests and critical incidents handled under an AMC?',
    answer:
      'All support requests are logged into our centralized ticketing system. Critical system outages receive prioritized engineering assignment, remote diagnostic triage, and coordinated on-site field dispatch based on your agreed contract service window.',
  },
  {
    question: 'Can Mint AMC support heterogeneous OEM hardware under a single agreement?',
    answer:
      'Yes. One of our primary advantages is consolidating multi-vendor fleets—including Dell, HP, Lenovo, Cisco, Fortinet, and other standard enterprise brands—under one structured contract with centralized ticket tracking.',
  },
  {
    question: 'What is included in quarterly Preventive Maintenance (PM) visits?',
    answer:
      'Quarterly PM visits include physical internal dust clearance, fan and thermal paste inspection, cable reseating, firmware and driver vulnerability checks, OS health diagnosis, and an audit-ready sign-off report for your records.',
  },
  {
    question: 'How are replacement parts and hardware failures handled?',
    answer:
      'Mint AMC operates on a transparent Maintenance & Engineering Support model (Non-Comprehensive AMC). When a component experiences physical failure, our engineers diagnose the fault and coordinate repairs through your active manufacturer warranties or assist with sourcing approved replacement components billed separately.',
  },
  {
    question: 'What types of office locations and facilities do you cover?',
    answer:
      'We support corporate offices, regional branch networks, warehouses, and commercial facilities across major commercial hubs and industrial corridors, tailoring service windows to your business operations.',
  },
];

export default function HomePage() {
  const { openQuoteModal } = useQuoteModal();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playbackRate = 0.7; // Smooth, cinematic pace
      const attemptPlay = () => {
        video.play().catch(() => {});
      };
      attemptPlay();
      const handleLoadedData = () => {
        video.playbackRate = 0.7;
        attemptPlay();
      };
      video.addEventListener('loadeddata', handleLoadedData);
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  return (
    <MarketingChrome>
      <FaqPageJsonLd faqs={HOME_FAQS} />

      {/* SECTION 1: Modern Unboxed Hero Section with Vivid Datacenter Video Backdrop */}
      <section className="relative overflow-hidden bg-slate-950 text-white border-b border-slate-800 py-16 sm:py-24 lg:py-28 flex items-center justify-center">
        {/* Background Datacenter Animation Video — Clearly visible with calibrated atmospheric scrim */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-slate-950">
          {/* Fallback image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: "url('/assets/dc_poster.jpg')" }}
            aria-hidden="true"
          />

          {/* High-visibility video */}
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/assets/dc_poster.jpg"
            className="w-full h-full object-cover object-center pointer-events-none opacity-80 sm:opacity-85 transition-opacity duration-700"
          >
            <source src="/assets/dc_animation.webm" type="video/webm" />
            <source src="/assets/dc_animation.mp4" type="video/mp4" />
          </video>

          {/* Mint AMC ambient brand gradient: primary emerald (#2FA878) + secondary azure (#0076CE) */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(47,168,120,0.18)_0%,rgba(0,118,206,0.12)_45%,transparent_85%)] pointer-events-none" />

          {/* Calibrated dark atmospheric scrim: lets video shine through while keeping typography crystal clear */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/75 via-slate-950/45 to-slate-950/80 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(2,6,23,0.65)_100%)] pointer-events-none" />
        </div>

        <PageContainer className="relative z-10 w-full">
          {/* Unboxed, modern, professional hero content with high-contrast visible typography */}
          <div className="max-w-4xl mx-auto text-center">
            {/* Authentic category indicator — high visibility on dark bg */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-700/80 text-xs font-semibold mb-5 tracking-wide shadow-sm backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
              <span className="text-slate-100">Enterprise IT Annual Maintenance &amp; Infrastructure Support</span>
            </div>

            {/* Dynamic Headline with fixed height and inverted white/emerald contrast */}
            <DynamicHeroTitle
              prefix="Structured IT Annual Maintenance for "
              defaultHighlight="Enterprise Server Infrastructure"
              inverted={true}
            />

            {/* High-visibility value proposition description */}
            <p className="mt-6 font-sans text-base sm:text-lg lg:text-xl text-slate-200 leading-relaxed font-normal max-w-2xl mx-auto text-pretty">
              Preventive maintenance, multi-vendor hardware coordination, and responsive technical troubleshooting across corporate desktops, servers, and network infrastructure.
            </p>

            {/* Essential Action Group — Clear hierarchy with high contrast */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button
                size="lg"
                variant="primary"
                href="/services"
                className="rounded-[8px] px-7 py-3.5 text-sm sm:text-base font-semibold shadow-md bg-emerald-500 hover:bg-emerald-600 text-white border-0"
              >
                <span>Explore Maintenance Services</span>
                <Icon icon={ArrowRight} size="xs" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-[8px] px-6 py-3.5 text-sm sm:text-base font-semibold bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-100 hover:text-white hover:border-emerald-500/60 shadow-sm backdrop-blur-sm"
                onClick={() => openQuoteModal('Enterprise IT AMC Scoping')}
              >
                <Icon icon={Send} size="xs" className="text-emerald-400" />
                <span>Enquire About AMC Scope</span>
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* SECTION 2: Multi-Vendor OEM Technology Partners Section */}
      <PageSection tone="white" className="py-10 sm:py-14 border-b border-line">
        <PartnersSection />
      </PageSection>

      {/* SECTION 3 (REBUILT): Hardware & Infrastructure Coverage Scope */}
      <PageSection tone="muted">
        <SectionHeader
          align="center"
          eyebrow="Coverage Scope"
          title="Core Hardware Environments Maintained by Mint AMC"
          subtitle="We deliver structured maintenance, proactive inspections, and troubleshooting across your essential business IT assets."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Workstations Card */}
          <div className="ui-card p-6 bg-surface flex flex-col justify-between rounded-[8px] border-line shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center mb-4">
                <Icon icon={Laptop} size="md" />
              </div>
              <h3 className="type-card-title text-base font-semibold">End-User Workstations</h3>
              <p className="type-body text-xs sm:text-sm mt-2 leading-relaxed">
                Desktops, laptops, monitors, and peripherals across corporate and branch workplaces.
              </p>
              <ul className="mt-4 pt-3 border-t border-line space-y-2 text-xs text-ink-muted">
                <li className="flex items-start gap-2">
                  <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0 mt-0.5" />
                  <span>OS stability, driver checks &amp; patch assistance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0 mt-0.5" />
                  <span>Internal dust cleaning &amp; thermal diagnostics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0 mt-0.5" />
                  <span>Hardware fault isolation &amp; warranty logging</span>
                </li>
              </ul>
            </div>
            <div className="mt-5 pt-3 border-t border-line">
              <Link
                href="/services/desktop-laptop-amc"
                className="text-xs font-semibold text-secondary hover:text-brand transition-colors inline-flex items-center gap-1"
              >
                <span>View Workstation Scope</span>
                <Icon icon={ArrowRight} size="xs" />
              </Link>
            </div>
          </div>

          {/* Servers Card */}
          <div className="ui-card p-6 bg-surface flex flex-col justify-between rounded-[8px] border-line shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-[8px] bg-secondary-subtle text-secondary flex items-center justify-center mb-4">
                <Icon icon={Server} size="md" />
              </div>
              <h3 className="type-card-title text-base font-semibold">Servers &amp; Local Storage</h3>
              <p className="type-body text-xs sm:text-sm mt-2 leading-relaxed">
                Rack and tower servers, NAS appliances, and local backup arrays across office server rooms.
              </p>
              <ul className="mt-4 pt-3 border-t border-line space-y-2 text-xs text-ink-muted">
                <li className="flex items-start gap-2">
                  <Icon icon={CheckCircle2} size="xs" className="text-secondary shrink-0 mt-0.5" />
                  <span>RAID integrity and SMART drive diagnostics</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon={CheckCircle2} size="xs" className="text-secondary shrink-0 mt-0.5" />
                  <span>Out-of-band management &amp; event log audit</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon={CheckCircle2} size="xs" className="text-secondary shrink-0 mt-0.5" />
                  <span>Redundant PSU and thermal fan verification</span>
                </li>
              </ul>
            </div>
            <div className="mt-5 pt-3 border-t border-line">
              <Link
                href="/services/server-amc"
                className="text-xs font-semibold text-secondary hover:text-brand transition-colors inline-flex items-center gap-1"
              >
                <span>View Server Scope</span>
                <Icon icon={ArrowRight} size="xs" />
              </Link>
            </div>
          </div>

          {/* Network Hardware Card */}
          <div className="ui-card p-6 bg-surface flex flex-col justify-between rounded-[8px] border-line shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center mb-4">
                <Icon icon={Network} size="md" />
              </div>
              <h3 className="type-card-title text-base font-semibold">Network &amp; Connectivity</h3>
              <p className="type-body text-xs sm:text-sm mt-2 leading-relaxed">
                Core and access switches, branch routers, wireless controllers, and rack patch panels.
              </p>
              <ul className="mt-4 pt-3 border-t border-line space-y-2 text-xs text-ink-muted">
                <li className="flex items-start gap-2">
                  <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0 mt-0.5" />
                  <span>Switch port status &amp; uplink link verification</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0 mt-0.5" />
                  <span>Wi-Fi access point coverage &amp; controller health</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0 mt-0.5" />
                  <span>VLAN configuration backup &amp; cabling checks</span>
                </li>
              </ul>
            </div>
            <div className="mt-5 pt-3 border-t border-line">
              <Link
                href="/services/network-infrastructure-amc"
                className="text-xs font-semibold text-secondary hover:text-brand transition-colors inline-flex items-center gap-1"
              >
                <span>View Network Scope</span>
                <Icon icon={ArrowRight} size="xs" />
              </Link>
            </div>
          </div>

          {/* Security Appliances Card */}
          <div className="ui-card p-6 bg-surface flex flex-col justify-between rounded-[8px] border-line shadow-xs">
            <div>
              <div className="w-10 h-10 rounded-[8px] bg-secondary-subtle text-secondary flex items-center justify-center mb-4">
                <Icon icon={ShieldCheck} size="md" />
              </div>
              <h3 className="type-card-title text-base font-semibold">Firewalls &amp; Gateways</h3>
              <p className="type-body text-xs sm:text-sm mt-2 leading-relaxed">
                Edge firewalls, UTM security appliances, site-to-site tunnels, and secure remote gateways.
              </p>
              <ul className="mt-4 pt-3 border-t border-line space-y-2 text-xs text-ink-muted">
                <li className="flex items-start gap-2">
                  <Icon icon={CheckCircle2} size="xs" className="text-secondary shrink-0 mt-0.5" />
                  <span>HA failover checks &amp; configuration backups</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon={CheckCircle2} size="xs" className="text-secondary shrink-0 mt-0.5" />
                  <span>VPN tunnel connectivity &amp; stability review</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon icon={CheckCircle2} size="xs" className="text-secondary shrink-0 mt-0.5" />
                  <span>Firmware security tracking &amp; advisory checks</span>
                </li>
              </ul>
            </div>
            <div className="mt-5 pt-3 border-t border-line">
              <Link
                href="/services/firewall-utm-amc"
                className="text-xs font-semibold text-secondary hover:text-brand transition-colors inline-flex items-center gap-1"
              >
                <span>View Firewall Scope</span>
                <Icon icon={ArrowRight} size="xs" />
              </Link>
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 4 (REBUILT): The Maintenance Advantage: Structured AMC vs. Ad-Hoc Break-Fix */}
      <PageSection tone="white" borderTop>
        <SectionHeader
          align="center"
          eyebrow="The AMC Advantage"
          title="Why Structured Maintenance Outperforms Ad-Hoc Repairs"
          subtitle="Unscheduled technician visits lead to unpredictable invoices and prolonged downtime. An annual contract brings discipline, documentation, and accountability."
        />

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left Column: Ad-Hoc Break-Fix Model */}
          <div className="ui-card p-6 sm:p-8 bg-surface rounded-[8px] border-line">
            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-line">
              <span className="w-7 h-7 rounded-[8px] bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                <Icon icon={XCircle} size="xs" />
              </span>
              <div>
                <h3 className="type-card-title text-base font-semibold text-ink">Ad-Hoc / Reactive Model</h3>
                <p className="text-xs text-ink-muted">Without a structured annual agreement</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-ink-muted">
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span>
                  <strong className="text-ink">Unpredictable Costs:</strong> Every breakdown generates emergency per-incident callout invoices and variable hourly labor fees.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span>
                  <strong className="text-ink">Delayed Response:</strong> Scrambling to locate available third-party technicians during sudden outages extends business downtime.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span>
                  <strong className="text-ink">Zero Preventive Care:</strong> Hardware operates without routine thermal or dust inspections until a critical component physically burns out.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-red-500 font-bold shrink-0 mt-0.5">✕</span>
                <span>
                  <strong className="text-ink">Fragmented Records:</strong> No central log of machine serial numbers, configuration changes, or recurring hardware vulnerabilities.
                </span>
              </li>
            </ul>
          </div>

          {/* Right Column: Structured Mint AMC Model */}
          <div className="ui-card p-6 sm:p-8 bg-surface rounded-[8px] border-brand/50 shadow-xs relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-brand to-secondary" />

            <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-line">
              <span className="w-7 h-7 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center shrink-0">
                <Icon icon={CheckCircle2} size="xs" />
              </span>
              <div>
                <h3 className="type-card-title text-base font-semibold text-ink">Structured Mint AMC Agreement</h3>
                <p className="text-xs text-brand font-medium">Contractually governed IT maintenance</p>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-ink-muted">
              <li className="flex items-start gap-2.5">
                <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0 mt-0.5" />
                <span>
                  <strong className="text-ink">Predictable Budgeting:</strong> Transparent annual or quarterly maintenance schedule covering remote triage and qualifying onsite visits.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0 mt-0.5" />
                <span>
                  <strong className="text-ink">Single Point of Contact:</strong> One direct ticketing desk and defined escalation path instead of managing multiple disparate vendors.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0 mt-0.5" />
                <span>
                  <strong className="text-ink">Disciplined Preventive Care:</strong> Scheduled quarterly physical and system diagnostics that catch early warnings before outages occur.
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0 mt-0.5" />
                <span>
                  <strong className="text-ink">Documented Service History:</strong> Detailed digital sign-off reports and asset baseline logs kept up to date for audit readiness.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </PageSection>

      {/* SECTION 5 (REBUILT): Disciplined Preventive Maintenance Lifecycle */}
      <PageSection tone="muted">
        <SectionHeader
          align="center"
          eyebrow="Preventive Routine"
          title="Practical Quarterly Maintenance Cycle"
          subtitle="Rather than waiting for hardware to fail, our scheduled quarterly service routine targets the primary causes of workplace hardware degradation."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Phase 1 */}
          <div className="ui-card p-6 bg-surface flex flex-col justify-between rounded-[8px] border-line shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-brand bg-brand-subtle px-2 py-0.5 rounded-[6px]">
                  PHASE 01
                </span>
                <span className="text-xs text-ink-muted">Physical Care</span>
              </div>
              <h4 className="type-card-title text-base font-semibold text-ink">
                Physical &amp; Thermal Servicing
              </h4>
              <p className="type-body text-xs sm:text-sm mt-2 leading-relaxed">
                Internal chassis dust removal, cooling fan RPM diagnostics, power supply rail load testing, and heatsink inspection to eliminate heat-related slowdowns.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-line text-xs text-ink-muted flex items-center gap-1.5">
              <Icon icon={CheckCircle2} size="xs" className="text-brand" />
              <span>Extends component lifespan</span>
            </div>
          </div>

          {/* Phase 2 */}
          <div className="ui-card p-6 bg-surface flex flex-col justify-between rounded-[8px] border-line shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-secondary bg-secondary-subtle px-2 py-0.5 rounded-[6px]">
                  PHASE 02
                </span>
                <span className="text-xs text-ink-muted">System Health</span>
              </div>
              <h4 className="type-card-title text-base font-semibold text-ink">
                Diagnostics &amp; Log Auditing
              </h4>
              <p className="type-body text-xs sm:text-sm mt-2 leading-relaxed">
                Reviewing critical OS event logs, SMART hard drive telemetry, RAID parity status, driver stability, and scheduled backup job completion logs.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-line text-xs text-ink-muted flex items-center gap-1.5">
              <Icon icon={CheckCircle2} size="xs" className="text-secondary" />
              <span>Early warning detection</span>
            </div>
          </div>

          {/* Phase 3 */}
          <div className="ui-card p-6 bg-surface flex flex-col justify-between rounded-[8px] border-line shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-mono font-bold text-brand bg-brand-subtle px-2 py-0.5 rounded-[6px]">
                  PHASE 03
                </span>
                <span className="text-xs text-ink-muted">Governance</span>
              </div>
              <h4 className="type-card-title text-base font-semibold text-ink">
                Documented Sign-Off &amp; Review
              </h4>
              <p className="type-body text-xs sm:text-sm mt-2 leading-relaxed">
                Providing IT coordinators with a clear digital maintenance report detailing inspected machines, remediated vulnerabilities, and recommended hardware updates.
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-line text-xs text-ink-muted flex items-center gap-1.5">
              <Icon icon={CheckCircle2} size="xs" className="text-brand" />
              <span>Audit-ready service records</span>
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 6: Frequently Asked Questions (Full layout width matching other sections) */}
      <PageSection tone="white" borderTop>
        <div className="w-full space-y-8 sm:space-y-10">
          <SectionHeader
            align="center"
            eyebrow="Operational Transparency"
            title="Frequently Asked Questions About Mint AMC"
            subtitle="Straightforward answers regarding our maintenance scope, hardware fault handling, and contract governance."
          />

          <div className="w-full">
            <FaqAccordion items={HOME_FAQS} />
          </div>
        </div>
      </PageSection>
    </MarketingChrome>
  );
}
