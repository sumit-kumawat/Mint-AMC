'use client';

import Link from 'next/link';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Send,
  XCircle,
} from 'lucide-react';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageHeroBand from '@/components/layout/page-hero-band';
import PageSection from '@/components/layout/page-section';
import CostSavingsEstimator from '@/components/pricing/cost-savings-estimator';
import { Button } from '@/components/ui/button';
import FaqAccordion from '@/components/ui/faq-accordion';
import { Icon } from '@/components/ui/icon';
import { useQuoteModal } from '@/components/ui/request-quote-modal';
import { SectionHeader } from '@/components/ui/section-header';
import { FaqPageJsonLd } from '@/components/seo/structured-data';
import { pricingContent } from '@/content/pricing';
import { cn } from '@/lib/utils';

export default function PricingPage() {
  const { openQuoteModal } = useQuoteModal();

  return (
    <MarketingChrome>
      <FaqPageJsonLd faqs={pricingContent.faq} />

      {/* SECTION 1: Pure Light-Themed Title Hero Band */}
      <PageHeroBand
        eyebrow="Commercial Architecture"
        title={pricingContent.heroTitle}
        subtitle={pricingContent.heroSubtitle}
      />

      {/* SECTION 2: Service Coverage Options (Tiers) */}
      <PageSection tone="white">
        <SectionHeader
          align="center"
          eyebrow="Service Options"
          title={pricingContent.tiersTitle}
          subtitle={pricingContent.tiersSubtitle}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {pricingContent.tiers.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                'ui-card p-6 sm:p-7 h-full flex flex-col justify-between bg-surface shadow-xs',
                tier.highlighted && 'border-brand ring-1 ring-brand/20',
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-semibold text-secondary">
                    {tier.pricingModel}
                  </span>
                  {tier.badge && (
                    <span className="text-xs font-semibold text-brand">
                      {tier.badge}
                    </span>
                  )}
                </div>

                <h3 className="type-card-title text-lg font-bold">{tier.name}</h3>
                <p className="text-sm font-normal text-ink-muted mt-1">{tier.tagline}</p>

                <div className="mt-4 p-3 rounded-[8px] bg-surface-muted border border-line text-xs font-normal text-ink-muted">
                  <span className="font-semibold text-ink">Best suited for: </span>
                  <span>{tier.bestFor}</span>
                </div>

                <ul className="mt-5 space-y-2.5">
                  {tier.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2.5 text-sm font-normal text-ink-muted"
                    >
                      <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0 mt-1" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-line">
                <Button
                  variant={tier.highlighted ? 'primary' : 'outline'}
                  size="md"
                  className="w-full font-semibold"
                  onClick={() => openQuoteModal(`${tier.name} Proposal`)}
                >
                  <Icon icon={Send} size="xs" />
                  Request Proposal
                </Button>
              </div>
            </div>
          ))}
        </div>
      </PageSection>

      {/* SECTION 3: Interactive AMC vs. Ad-Hoc Cost Savings Estimator */}
      <PageSection tone="muted">
        <SectionHeader
          align="center"
          eyebrow="ROI &amp; Cost Benchmarking"
          title="Estimate Your Annual IT Maintenance Savings"
          subtitle="Compare unpredictable ad-hoc break-fix callouts and emergency L2/L3 repair bills against a structured annual Mint AMC contract with quarterly preventive care."
        />
        <CostSavingsEstimator />
      </PageSection>

      {/* SECTION 4: Cost Influences & Scope Parameters */}
      <PageSection tone="white" borderTop>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Factors Influencing Cost */}
          <div className="lg:col-span-5 ui-card p-6 sm:p-7 bg-surface space-y-4 shadow-xs">
            <div>
              <span className="type-eyebrow">Cost Calculation</span>
              <h3 className="type-card-title text-lg">{pricingContent.factorsTitle}</h3>
              <p className="type-body text-sm mt-1">{pricingContent.factorsSubtitle}</p>
            </div>

            <ul className="space-y-3.5 pt-2 border-t border-line">
              {pricingContent.pricingFactors.map((factor) => (
                <li key={factor.title}>
                  <h4 className="text-sm font-semibold text-ink">{factor.title}</h4>
                  <p className="text-xs sm:text-sm font-normal text-ink-muted mt-0.5 leading-relaxed">
                    {factor.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: Inclusions & Exclusions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="ui-card p-6 sm:p-7 bg-surface shadow-xs">
              <div className="flex items-center gap-2.5 pb-3.5 mb-4 border-b border-line">
                <Icon icon={CheckCircle2} size="sm" className="text-brand shrink-0" />
                <h3 className="type-card-title">{pricingContent.inclusionsTitle}</h3>
              </div>
              <ul className="space-y-2.5">
                {pricingContent.inclusions.map((inc) => (
                  <li
                    key={inc}
                    className="flex items-start gap-2.5 text-sm font-normal text-ink-muted"
                  >
                    <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0 mt-1" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="ui-card p-6 sm:p-7 bg-surface shadow-xs">
              <div className="flex items-center gap-2.5 pb-3.5 mb-4 border-b border-line">
                <Icon icon={XCircle} size="sm" className="text-ink-muted shrink-0" />
                <h3 className="type-card-title">{pricingContent.exclusionsTitle}</h3>
              </div>
              <ul className="space-y-2.5">
                {pricingContent.exclusions.map((exc) => (
                  <li
                    key={exc}
                    className="flex items-start gap-2.5 text-sm font-normal text-ink-muted"
                  >
                    <Icon icon={XCircle} size="xs" className="text-ink-subtle shrink-0 mt-1" />
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-3 border-t border-line">
                <Link
                  href="/resources/it-amc-coverage-and-exclusions"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary hover:underline"
                >
                  <span>Read detailed guide on IT AMC Coverage &amp; Exclusions</span>
                  <Icon icon={ArrowRight} size="xs" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 5: Pricing & Contract FAQs */}
      <PageSection tone="muted">
        <div className="w-full space-y-8 sm:space-y-10">
          <SectionHeader
            align="center"
            eyebrow="Common Questions"
            title="Pricing &amp; Contract Commercial FAQs"
            subtitle="Answers to common procurement questions on payment schedules, inventory changes, and service transition."
          />
          <div className="w-full">
            <FaqAccordion items={pricingContent.faq} />
          </div>
        </div>
      </PageSection>
    </MarketingChrome>
  );
}
