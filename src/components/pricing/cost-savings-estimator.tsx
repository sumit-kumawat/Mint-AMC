'use client';

import { useState, useMemo } from 'react';
import {
  Calculator,
  CheckCircle2,
  RotateCcw,
  Send,
  ShieldCheck,
  TrendingDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { useQuoteModal } from '@/components/ui/request-quote-modal';
import { cn } from '@/lib/utils';

type SlaTierId = 'essential' | 'professional' | 'enterprise';

type PresetId = 'smb' | 'midmarket' | 'enterprise';

interface EstimatorState {
  endpoints: number;
  servers: number;
  networkGear: number;
  locations: number;
  slaTier: SlaTierId;
  includeDowntimeCost: boolean;
}

const PRESETS: Record<
  PresetId,
  {
    label: string;
    subtitle: string;
    state: EstimatorState;
  }
> = {
  smb: {
    label: 'Single-Site Corporate (40 Nodes)',
    subtitle: '35 Endpoints · 2 Servers · 3 Network',
    state: {
      endpoints: 35,
      servers: 2,
      networkGear: 3,
      locations: 1,
      slaTier: 'essential',
      includeDowntimeCost: true,
    },
  },
  midmarket: {
    label: 'Multi-Branch Enterprise (120 Nodes)',
    subtitle: '100 Endpoints · 8 Servers · 12 Network',
    state: {
      endpoints: 100,
      servers: 8,
      networkGear: 12,
      locations: 3,
      slaTier: 'professional',
      includeDowntimeCost: true,
    },
  },
  enterprise: {
    label: 'National Distributed Fleet (350 Nodes)',
    subtitle: '280 Endpoints · 25 Servers · 45 Network',
    state: {
      endpoints: 280,
      servers: 25,
      networkGear: 45,
      locations: 8,
      slaTier: 'enterprise',
      includeDowntimeCost: true,
    },
  },
};

const SLA_TIERS: {
  id: SlaTierId;
  name: string;
  window: string;
  response: string;
  multiplier: number;
}[] = [
  {
    id: 'essential',
    name: 'Essential AMC',
    window: '8×5 Business Hours',
    response: 'Next-Business-Day Onsite',
    multiplier: 1.0,
  },
  {
    id: 'professional',
    name: 'Professional AMC',
    window: '12×6 Extended Hours',
    response: '4-Hour Metro Onsite SLA',
    multiplier: 1.22,
  },
  {
    id: 'enterprise',
    name: 'Enterprise Extended AMC',
    window: 'Extended & Priority Coverage',
    response: 'Priority P1 Triage · Rapid Dispatch',
    multiplier: 1.48,
  },
];

function formatInr(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

export default function CostSavingsEstimator() {
  const { openQuoteModal } = useQuoteModal();
  const [activePreset, setActivePreset] = useState<PresetId | 'custom'>('midmarket');
  const [state, setState] = useState<EstimatorState>(PRESETS.midmarket.state);

  const updateField = <K extends keyof EstimatorState>(
    key: K,
    value: EstimatorState[K],
  ) => {
    setActivePreset('custom');
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (presetId: PresetId) => {
    setActivePreset(presetId);
    setState(PRESETS[presetId].state);
  };

  const handleReset = () => {
    setActivePreset('midmarket');
    setState(PRESETS.midmarket.state);
  };

  const metrics = useMemo(() => {
    const { endpoints, servers, networkGear, locations, slaTier, includeDowntimeCost } =
      state;

    const selectedSla = SLA_TIERS.find((t) => t.id === slaTier) ?? SLA_TIERS[1];
    const totalAssets = endpoints + servers + networkGear;

    // Volume discount factor for Mint AMC (larger fleets lower per-unit overhead)
    const volumeFactor =
      totalAssets >= 250 ? 0.84 : totalAssets >= 100 ? 0.9 : totalAssets >= 50 ? 0.95 : 1.0;

    // Multi-location dispersion factor
    const locationOverheadAmc = 1 + Math.max(0, locations - 1) * 0.025;
    const locationOverheadAdHoc = 1 + Math.max(0, locations - 1) * 0.06;

    // 1. Mint AMC Annual Contract Calculation (INR / year)
    // Base annual rates for Non-Comprehensive Maintenance + Quarterly PM + Helpdesk
    const amcEndpointBase = endpoints * 2400;
    const amcServerBase = servers * 14500;
    const amcNetworkBase = networkGear * 5200;

    const amcCoreEngineering =
      (amcEndpointBase + amcServerBase + amcNetworkBase) *
      selectedSla.multiplier *
      volumeFactor *
      locationOverheadAmc;

    // Quarterly Preventive Maintenance & NOC Governance (included in Mint AMC)
    const amcTotalAnnual = Math.round(amcCoreEngineering / 500) * 500;

    // 2. Ad-Hoc Break-Fix Repair & Unscheduled Callout Calculation (INR / year)
    // Without quarterly PM, thermal/dust/firmware incidents occur ~38% more frequently.
    // Emergency L1/L2 endpoint visits + OS restoration average ₹1,850–₹2,800 per incident
    // Emergency L3 server/SAN/firewall callouts average ₹12,500–₹22,000 per incident
    const adHocEndpointCallouts = endpoints * 1.45 * 2200 * locationOverheadAdHoc;
    const adHocServerCallouts = servers * 2.4 * 11500 * locationOverheadAdHoc;
    const adHocNetworkCallouts = networkGear * 1.6 * 5800 * locationOverheadAdHoc;

    // Emergency SLA expedite surcharges for urgent same-day / 24x7 callouts
    const emergencyExpediteMultiplier =
      slaTier === 'enterprise' ? 1.42 : slaTier === 'professional' ? 1.2 : 1.0;

    const adHocDirectBreakFix =
      (adHocEndpointCallouts + adHocServerCallouts + adHocNetworkCallouts) *
      emergencyExpediteMultiplier;

    // Standalone one-off health audits / firmware patching billed separately
    const adHocAuditAndPatching =
      (endpoints * 750 + servers * 4200 + networkGear * 1900) * locationOverheadAdHoc;

    // Unplanned downtime & multi-vendor procurement coordination overhead
    // Ad-hoc vendor discovery, PO approval per incident, and longer MTTR hours
    const adHocDowntimeOverhead = includeDowntimeCost
      ? (endpoints * 950 + servers * 9800 + networkGear * 3400) *
        (slaTier === 'enterprise' ? 1.35 : 1.1)
      : 0;

    const adHocTotalAnnual =
      Math.round(
        (adHocDirectBreakFix + adHocAuditAndPatching + adHocDowntimeOverhead) / 500,
      ) * 500;

    const annualSavings = Math.max(0, adHocTotalAnnual - amcTotalAnnual);
    const savingsPercent =
      adHocTotalAnnual > 0
        ? Math.min(65, Math.max(15, Math.round((annualSavings / adHocTotalAnnual) * 100)))
        : 0;

    // Estimated annual break-fix dispatches & preventable incidents avoided via 4x Quarterly PM
    const estimatedAnnualIncidents = Math.max(
      4,
      Math.round(endpoints * 0.42 + servers * 1.8 + networkGear * 0.9),
    );
    const preventableFailuresAvoided = Math.max(
      2,
      Math.round(estimatedAnnualIncidents * 0.44),
    );

    const amcBarRatio =
      adHocTotalAnnual > 0
        ? Math.min(92, Math.max(25, Math.round((amcTotalAnnual / adHocTotalAnnual) * 100)))
        : 60;

    return {
      totalAssets,
      selectedSla,
      amcTotalAnnual,
      adHocTotalAnnual,
      adHocDirectBreakFix: Math.round(adHocDirectBreakFix / 500) * 500,
      adHocAuditAndPatching: Math.round(adHocAuditAndPatching / 500) * 500,
      adHocDowntimeOverhead: Math.round(adHocDowntimeOverhead / 500) * 500,
      annualSavings,
      savingsPercent,
      estimatedAnnualIncidents,
      preventableFailuresAvoided,
      amcBarRatio,
    };
  }, [state]);

  const quoteScopeSummary = `${metrics.selectedSla.name} (${state.endpoints} Endpoints, ${state.servers} Servers, ${state.networkGear} Network Gear across ${state.locations} ${state.locations === 1 ? 'Site' : 'Sites'})`;

  return (
    <div className="space-y-6">
      {/* Top Preset Selector Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-line">
        <div className="space-y-1">
          <span className="text-xs font-semibold text-ink">
            Quick Infrastructure Profiles
          </span>
          <p className="text-xs text-ink-muted">
            Select a baseline enterprise profile or adjust individual asset sliders below.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {(Object.keys(PRESETS) as PresetId[]).map((key) => {
            const preset = PRESETS[key];
            const isActive = activePreset === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => applyPreset(key)}
                className={cn(
                  'px-3.5 py-2 rounded-[8px] text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 border',
                  isActive
                    ? 'bg-brand text-white border-brand shadow-xs'
                    : 'bg-surface text-ink border-line hover:border-brand/50 hover:text-brand',
                )}
              >
                {preset.label}
              </button>
            );
          })}
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[8px] text-xs font-medium text-ink-muted hover:text-ink hover:bg-surface-muted border border-transparent transition-colors cursor-pointer whitespace-nowrap shrink-0"
            title="Reset estimator to default values"
          >
            <Icon icon={RotateCcw} size="xs" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Main Split Grid: Configuration Controls (Left 7 cols) + Live Savings Breakdown (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* LEFT COLUMN: Fleet & SLA Configuration Controls */}
        <div className="lg:col-span-7 ui-card p-6 sm:p-7 bg-surface flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-line">
              <div className="flex items-center gap-2.5">
                <Icon icon={Calculator} size="sm" className="text-brand shrink-0" />
                <div>
                  <h3 className="type-card-title text-base">
                    1. Configure Your IT Asset Inventory
                  </h3>
                  <p className="text-xs text-ink-muted mt-0.5">
                    Adjust hardware counts and site distribution to model annual servicing costs.
                  </p>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs text-ink-muted block">Total Monitored Assets</span>
                <span className="text-base font-bold text-ink tabular-nums">
                  {metrics.totalAssets} Nodes · {state.locations}{' '}
                  {state.locations === 1 ? 'Site' : 'Sites'}
                </span>
              </div>
            </div>

            {/* Sliders Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Control 1: Endpoints */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="estimator-endpoints"
                    className="text-xs sm:text-sm font-semibold text-ink"
                  >
                    Desktops, Laptops &amp; Workstations
                  </label>
                  <span className="text-sm font-bold text-brand tabular-nums">
                    {state.endpoints} units
                  </span>
                </div>
                <input
                  id="estimator-endpoints"
                  type="range"
                  min={5}
                  max={500}
                  step={5}
                  value={state.endpoints}
                  onChange={(e) => updateField('endpoints', Number(e.target.value))}
                  className="w-full h-2 bg-surface-muted rounded-[8px] appearance-none cursor-pointer accent-brand"
                />
                <div className="flex justify-between text-[11px] text-ink-muted tabular-nums">
                  <span>5 units</span>
                  <span>250 units</span>
                  <span>500 units</span>
                </div>
              </div>

              {/* Control 2: Physical Servers & SAN/NAS */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="estimator-servers"
                    className="text-xs sm:text-sm font-semibold text-ink"
                  >
                    Rack Servers &amp; Storage (SAN/NAS)
                  </label>
                  <span className="text-sm font-bold text-brand tabular-nums">
                    {state.servers} racks/nodes
                  </span>
                </div>
                <input
                  id="estimator-servers"
                  type="range"
                  min={0}
                  max={60}
                  step={1}
                  value={state.servers}
                  onChange={(e) => updateField('servers', Number(e.target.value))}
                  className="w-full h-2 bg-surface-muted rounded-[8px] appearance-none cursor-pointer accent-brand"
                />
                <div className="flex justify-between text-[11px] text-ink-muted tabular-nums">
                  <span>0 nodes</span>
                  <span>30 nodes</span>
                  <span>60 nodes</span>
                </div>
              </div>

              {/* Control 3: Network Switches & Firewalls */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="estimator-network"
                    className="text-xs sm:text-sm font-semibold text-ink"
                  >
                    Core Switches, Routers &amp; Firewalls
                  </label>
                  <span className="text-sm font-bold text-secondary tabular-nums">
                    {state.networkGear} appliances
                  </span>
                </div>
                <input
                  id="estimator-network"
                  type="range"
                  min={1}
                  max={80}
                  step={1}
                  value={state.networkGear}
                  onChange={(e) => updateField('networkGear', Number(e.target.value))}
                  className="w-full h-2 bg-surface-muted rounded-[8px] appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-[11px] text-ink-muted tabular-nums">
                  <span>1 appliance</span>
                  <span>40 appliances</span>
                  <span>80 appliances</span>
                </div>
              </div>

              {/* Control 4: Office / Branch Locations */}
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <label
                    htmlFor="estimator-locations"
                    className="text-xs sm:text-sm font-semibold text-ink"
                  >
                    Covered Office / Branch Locations
                  </label>
                  <span className="text-sm font-bold text-secondary tabular-nums">
                    {state.locations} {state.locations === 1 ? 'location' : 'locations'}
                  </span>
                </div>
                <input
                  id="estimator-locations"
                  type="range"
                  min={1}
                  max={25}
                  step={1}
                  value={state.locations}
                  onChange={(e) => updateField('locations', Number(e.target.value))}
                  className="w-full h-2 bg-surface-muted rounded-[8px] appearance-none cursor-pointer accent-secondary"
                />
                <div className="flex justify-between text-[11px] text-ink-muted tabular-nums">
                  <span>1 HQ</span>
                  <span>12 branches</span>
                  <span>25+ branches</span>
                </div>
              </div>
            </div>

            {/* SLA Coverage Level Selection */}
            <div className="pt-5 border-t border-line space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs sm:text-sm font-semibold text-ink">
                  2. Select Target Response &amp; Coverage SLA Tier
                </span>
                <span className="text-xs text-ink-muted">
                  {metrics.selectedSla.response}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {SLA_TIERS.map((tier) => {
                  const active = state.slaTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      type="button"
                      onClick={() => updateField('slaTier', tier.id)}
                      className={cn(
                        'p-3.5 rounded-[8px] border text-left transition-colors cursor-pointer flex flex-col justify-between',
                        active
                          ? 'border-brand bg-brand-subtle/50 text-ink'
                          : 'border-line bg-surface hover:border-brand/40 text-ink-muted',
                      )}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-bold text-ink">{tier.name}</span>
                        {active && (
                          <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0" />
                        )}
                      </div>
                      <span className="text-[11px] text-ink-muted mt-1 block">
                        {tier.window}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Downtime & Procurement Overhead Toggle */}
          <div className="pt-4 border-t border-line flex items-center justify-between gap-4">
            <div>
              <span className="text-xs sm:text-sm font-semibold text-ink block">
                Factor Unplanned Downtime &amp; Multi-Vendor Sourcing Delay
              </span>
              <span className="text-xs text-ink-muted">
                Includes engineering productivity loss during uncontracted vendor quote approvals (48–72 hr ad-hoc delay vs. contracted SLA triage).
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={state.includeDowntimeCost}
              onClick={() => updateField('includeDowntimeCost', !state.includeDowntimeCost)}
              className={cn(
                'relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-150',
                state.includeDowntimeCost ? 'bg-brand' : 'bg-line-strong',
              )}
            >
              <span
                className={cn(
                  'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-xs transition-transform duration-150',
                  state.includeDowntimeCost ? 'translate-x-5' : 'translate-x-0',
                )}
              />
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: Comparative Savings Output & Itemised Breakdown */}
        <div className="lg:col-span-5 ui-card p-6 sm:p-7 bg-surface border-brand/50 flex flex-col justify-between space-y-6">
          <div className="space-y-5">
            {/* Primary Savings Callout Header */}
            <div className="pb-5 border-b border-line">
              <div className="flex items-center justify-between gap-2 text-xs text-ink-muted mb-1.5">
                <span className="font-semibold uppercase tracking-wider text-brand">
                  Estimated Annual Net Savings
                </span>
                <span className="font-semibold text-secondary tabular-nums">
                  ~{metrics.savingsPercent}% Lower Total IT Maintenance Spend
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-3 mt-1">
                <p className="text-3xl sm:text-4xl font-bold text-ink tabular-nums tracking-tight">
                  {formatInr(metrics.annualSavings)}
                  <span className="text-sm font-normal text-ink-muted ml-1.5">/ year</span>
                </p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand whitespace-nowrap shrink-0">
                  <Icon icon={TrendingDown} size="xs" />
                  <span>{metrics.preventableFailuresAvoided} outages prevented/yr</span>
                </span>
              </div>
            </div>

            {/* Visual Cost Bar Comparison */}
            <div className="space-y-4">
              {/* Bar 1: Ad-Hoc Repair Spend */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink-muted">
                    Ad-Hoc Per-Incident Repairs &amp; Unscheduled Visits
                  </span>
                  <span className="font-bold text-ink tabular-nums">
                    {formatInr(metrics.adHocTotalAnnual)} / yr
                  </span>
                </div>
                <div className="w-full h-3 rounded-[8px] bg-surface-muted overflow-hidden border border-line">
                  <div className="h-full bg-ink-subtle/70 w-full rounded-[8px]" />
                </div>
              </div>

              {/* Bar 2: Structured Mint AMC Contract */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink flex items-center gap-1.5">
                    <Icon icon={ShieldCheck} size="xs" className="text-brand" />
                    <span>Annual Mint AMC ({metrics.selectedSla.name})</span>
                  </span>
                  <span className="font-bold text-brand tabular-nums">
                    {formatInr(metrics.amcTotalAnnual)} / yr
                  </span>
                </div>
                <div className="w-full h-3 rounded-[8px] bg-surface-muted overflow-hidden border border-line">
                  <div
                    className="h-full bg-brand rounded-[8px] transition-all duration-150"
                    style={{ width: `${metrics.amcBarRatio}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Itemised Cost Comparison Breakdown Table */}
            <div className="pt-4 border-t border-line space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-ink-muted font-semibold uppercase tracking-wider text-[11px] pb-1">
                <span>Cost Component Breakdown</span>
                <span>Ad-Hoc vs. Mint AMC</span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-line/60">
                <span className="text-ink-muted">
                  Emergency Onsite L2/L3 Callouts (~{metrics.estimatedAnnualIncidents} visits/yr)
                </span>
                <span className="tabular-nums font-medium text-ink whitespace-nowrap">
                  {formatInr(metrics.adHocDirectBreakFix)} →{' '}
                  <strong className="text-brand">Included</strong>
                </span>
              </div>

              <div className="flex items-center justify-between py-1.5 border-b border-line/60">
                <span className="text-ink-muted">
                  4× Quarterly Preventive Maintenance &amp; Firmware Care
                </span>
                <span className="tabular-nums font-medium text-ink whitespace-nowrap">
                  {formatInr(metrics.adHocAuditAndPatching)} →{' '}
                  <strong className="text-brand">Included</strong>
                </span>
              </div>

              {state.includeDowntimeCost && (
                <div className="flex items-center justify-between py-1.5 border-b border-line/60">
                  <span className="text-ink-muted">
                    Unplanned Downtime &amp; Multi-Vendor Delay Exposure
                  </span>
                  <span className="tabular-nums font-medium text-ink whitespace-nowrap">
                    {formatInr(metrics.adHocDowntimeOverhead)} →{' '}
                    <strong className="text-brand">SLA Mitigated</strong>
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between pt-1 text-ink">
                <span className="font-semibold">Effective Monthly AMC Investment</span>
                <span className="font-bold text-secondary tabular-nums">
                  {formatInr(metrics.amcTotalAnnual / 12)} / month
                </span>
              </div>
            </div>
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-line space-y-2.5">
            <Button
              variant="primary"
              size="md"
              className="w-full font-semibold"
              onClick={() => openQuoteModal(quoteScopeSummary)}
            >
              <Icon icon={Send} size="xs" />
              <span>Request Exact Proposal for This Scope</span>
            </Button>
            <p className="text-[11px] text-ink-muted text-center leading-normal">
              Indicative benchmark for non-comprehensive maintenance, preventive care &amp; SLA engineering support. Final commercial schedule is itemised post asset discovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
