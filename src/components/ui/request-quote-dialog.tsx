'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  CheckCircle2,
  ShieldCheck,
  Building,
  Mail,
  Phone,
  User,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  MapPin,
  Server,
  Wrench,
  FileCheck,
} from 'lucide-react';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { siteContent } from '@/content/site';
import { cn } from '@/lib/utils';

export type RequestQuoteDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
};

const WIZARD_STEPS = [
  { id: 1, title: 'Business Details', icon: Building },
  { id: 2, title: 'Location & Coverage', icon: MapPin },
  { id: 3, title: 'IT Infrastructure', icon: Server },
  { id: 4, title: 'Service Scope', icon: Wrench },
  { id: 5, title: 'Review & Submit', icon: FileCheck },
] as const;

const DEVICE_TYPE_OPTIONS = [
  'Desktops & Workstations',
  'Corporate Laptops',
  'Physical Servers (Rack / Tower / Blade)',
  'Storage Arrays (SAN / NAS)',
  'Network Switches, Routers & Wi-Fi',
  'Firewalls & UTM Appliances',
  'Printers, MFPs & Scanners',
  'Data Centre Racks & Power (PDU/UPS)',
];

const SERVICE_OPTIONS = [
  'Preventive Maintenance & Health Audits',
  'Remote Helpdesk & Troubleshooting',
  'On-Site Field Engineering Dispatch',
  'Infrastructure Telemetry & Link Monitoring',
  'Server, OS & Virtualisation Support',
  'Data Centre Smart Hands & Remote Hands',
];

const LOCATION_COUNT_OPTIONS = [
  '1 Single Location',
  '2 – 5 Locations',
  '6 – 15 Locations',
  '16 – 50 Locations',
  '50+ PAN-India Locations',
];

const COVERAGE_TYPE_OPTIONS = [
  'Single-Site Business Hours (8×5)',
  'Multi-Site Extended Coverage (12×6)',
  'PAN-India Extended & Priority Coverage',
];

const QUANTITY_BAND_OPTIONS = [
  '10 – 25 Devices / Nodes',
  '26 – 100 Devices / Nodes',
  '101 – 250 Devices / Nodes',
  '251 – 500 Devices / Nodes',
  '500+ Enterprise Estate',
];

const SLA_TIER_OPTIONS = [
  'Essential — 8×5 Remote + Next-Business-Day (NBD) Onsite',
  'Professional — Extended Hours + Priority Metro Onsite SLA',
  'Enterprise — Extended Priority Support + Onsite SLA',
];

type WizardState = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  locationCount: string;
  coverageType: string;
  deviceTypes: string[];
  approximateQuantity: string;
  infrastructureDetails: string;
  requiredServices: string[];
  preferredSla: string;
  currentIssues: string;
  exclusionsAcknowledged: boolean;
  consentConfirmed: boolean;
};

const INITIAL_WIZARD_STATE: WizardState = {
  companyName: '',
  contactName: '',
  email: '',
  phone: '',
  city: '',
  state: '',
  locationCount: LOCATION_COUNT_OPTIONS[0],
  coverageType: COVERAGE_TYPE_OPTIONS[0],
  deviceTypes: ['Desktops & Workstations', 'Network Switches, Routers & Wi-Fi'],
  approximateQuantity: QUANTITY_BAND_OPTIONS[1],
  infrastructureDetails: '',
  requiredServices: [
    'Preventive Maintenance & Health Audits',
    'Remote Helpdesk & Troubleshooting',
    'On-Site Field Engineering Dispatch',
  ],
  preferredSla: SLA_TIER_OPTIONS[1],
  currentIssues: '',
  exclusionsAcknowledged: true,
  consentConfirmed: true,
};

/**
 * Guided 5-Step Request a Proposal Wizard Dialog.
 * Preserves the exact popup/lightbox container dimensions (`w-full max-w-xl` and `max-h-[82vh]`).
 */
export default function RequestQuoteDialog({
  isOpen,
  onClose,
  defaultService = '',
}: RequestQuoteDialogProps) {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<WizardState>(INITIAL_WIZARD_STATE);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [referenceId, setReferenceId] = useState('');

  useEffect(() => {
    if (isOpen) {
      setError(null);
      if (defaultService) {
        const lower = defaultService.toLowerCase();
        setForm((prev) => {
          const nextDevices = new Set(prev.deviceTypes);
          const nextServices = new Set(prev.requiredServices);
          if (lower.includes('server') || lower.includes('storage') || lower.includes('data')) {
            nextDevices.add('Physical Servers (Rack / Tower / Blade)');
            nextServices.add('Server, OS & Virtualisation Support');
          }
          if (lower.includes('noc') || lower.includes('monitor')) {
            nextServices.add('Infrastructure Telemetry & Link Monitoring');
          }
          if (lower.includes('laptop')) {
            nextDevices.add('Corporate Laptops');
          }
          if (lower.includes('printer') || lower.includes('scanner')) {
            nextDevices.add('Printers, MFPs & Scanners');
          }
          return {
            ...prev,
            deviceTypes: Array.from(nextDevices),
            requiredServices: Array.from(nextServices),
          };
        });
      }
    }
  }, [isOpen, defaultService]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !submitting) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose, submitting]);

  if (!isOpen) return null;

  const validateStep = (targetStep: number): string | null => {
    if (targetStep === 1) {
      if (!form.companyName.trim() || form.companyName.trim().length < 2) {
        return 'Please enter your company or organisation name.';
      }
      if (!form.contactName.trim() || form.contactName.trim().length < 2) {
        return 'Please enter the contact person’s full name.';
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
        return 'Please enter a valid business email address.';
      }
      if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone.trim())) {
        return 'Please enter a valid contact phone number.';
      }
    }
    if (targetStep === 2) {
      if (!form.city.trim() || form.city.trim().length < 2) {
        return 'Please enter your primary city.';
      }
      if (!form.state.trim() || form.state.trim().length < 2) {
        return 'Please enter your state or region.';
      }
      if (!form.locationCount) {
        return 'Please select the number of locations.';
      }
      if (!form.coverageType) {
        return 'Please select your required coverage model.';
      }
    }
    if (targetStep === 3) {
      if (form.deviceTypes.length === 0) {
        return 'Please select at least one IT hardware / device group.';
      }
      if (!form.approximateQuantity) {
        return 'Please select the approximate total asset quantity.';
      }
    }
    if (targetStep === 4) {
      if (form.requiredServices.length === 0) {
        return 'Please select at least one required AMC service.';
      }
      if (!form.preferredSla) {
        return 'Please select a preferred SLA coverage tier.';
      }
      if (!form.exclusionsAcknowledged) {
        return 'Please acknowledge that Mint AMC covers maintenance and engineering support (hardware replacement is excluded).';
      }
    }
    if (targetStep === 5) {
      if (!form.consentConfirmed) {
        return 'Please confirm consent to submit your AMC proposal request.';
      }
    }
    return null;
  };

  const handleNext = () => {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError(null);
    setStep((s) => Math.min(5, s + 1));
  };

  const handleBack = () => {
    setError(null);
    setStep((s) => Math.max(1, s - 1));
  };

  const toggleArrayItem = (list: string[], item: string): string[] =>
    list.includes(item) ? list.filter((i) => i !== item) : [...list, item];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;

    for (let s = 1; s <= 5; s++) {
      const err = validateStep(s);
      if (err) {
        setStep(s);
        setError(err);
        return;
      }
    }

    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch('/api/proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok || !data?.ok) {
        setError(
          data?.error ||
            'Could not submit your proposal request. Please verify your details and try again.',
        );
        setSubmitting(false);
        return;
      }

      setReferenceId(data.referenceId);
      setSubmitting(false);
      setSubmitted(true);
    } catch {
      setError(
        'Network error while submitting your proposal request. Please check your connection and try again.',
      );
      setSubmitting(false);
    }
  };

  const handleCancelAndClose = () => {
    if (submitting) return;
    setError(null);
    onClose();
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setSubmitting(false);
    setError(null);
    setStep(1);
    setForm(INITIAL_WIZARD_STATE);
    onClose();
  };

  const mailtoHref = `mailto:${siteContent.contact.businessEmail}?subject=${encodeURIComponent(
    `[${referenceId || 'AMC Proposal'}] ${form.companyName} — ${form.city}, ${form.state}`,
  )}&body=${encodeURIComponent(
    `Proposal Reference: ${referenceId}\nCompany: ${form.companyName}\nContact: ${form.contactName} (${form.email} | ${form.phone})\nLocations: ${form.city}, ${form.state} (${form.locationCount})\nCoverage: ${form.coverageType}\nDevices (${form.approximateQuantity}): ${form.deviceTypes.join(', ')}\nServices: ${form.requiredServices.join(', ')}\nPreferred SLA: ${form.preferredSla}\nNotes: ${form.infrastructureDetails || form.currentIssues || 'N/A'}`,
  )}`;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-ink/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      onClick={handleCancelAndClose}
    >
      {/* Preserved exact popup dimensions: w-full max-w-xl with consistent 8px radius */}
      <div
        className="relative w-full max-w-xl bg-surface border border-line rounded-[8px] shadow-2xl overflow-hidden text-ink"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-surface-muted px-6 py-4 border-b border-line flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center shrink-0">
              <Icon icon={ShieldCheck} size="sm" />
            </div>
            <div className="min-w-0">
              <h2
                id="quote-modal-title"
                className="text-base font-semibold text-ink leading-tight truncate"
              >
                Request an IT AMC Proposal
              </h2>
              <p className="text-xs font-normal text-ink-muted truncate">
                {submitted
                  ? 'Proposal Request Confirmed'
                  : `Step ${step} of 5 · ${WIZARD_STEPS[step - 1].title}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={submitted ? handleResetAndClose : handleCancelAndClose}
            className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-line/50 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <Icon icon={X} size="sm" />
          </button>
        </div>

        {/* Step Progress Bar (hidden on confirmation screen) */}
        {!submitted && (
          <div className="bg-surface px-6 pt-3 pb-2.5 border-b border-line">
            <div className="grid grid-cols-5 gap-1.5" role="list" aria-label="Proposal steps">
              {WIZARD_STEPS.map((s) => {
                const isCurrent = s.id === step;
                const isDone = s.id < step;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      if (s.id < step) {
                        setError(null);
                        setStep(s.id);
                      }
                    }}
                    disabled={s.id > step}
                    className={cn(
                      'text-left group focus:outline-none',
                      s.id < step ? 'cursor-pointer' : 'cursor-default',
                    )}
                  >
                    <div
                      className={cn(
                        'h-1.5 rounded-full transition-colors',
                        isCurrent ? 'bg-brand' : isDone ? 'bg-secondary' : 'bg-line',
                      )}
                    />
                    <span
                      className={cn(
                        'mt-1 block text-[10px] truncate',
                        isCurrent
                          ? 'text-brand font-semibold'
                          : isDone
                            ? 'text-secondary font-medium'
                            : 'text-ink-subtle font-normal',
                      )}
                    >
                      {s.id}. {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Preserved inner body dimensions: p-6 sm:p-7 max-h-[82vh] overflow-y-auto */}
        <div className="p-6 sm:p-7 max-h-[82vh] overflow-y-auto">
          {submitted ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-[8px] bg-brand-subtle border border-brand/30">
                <div className="w-10 h-10 rounded-[8px] bg-brand text-white flex items-center justify-center shrink-0">
                  <Icon icon={CheckCircle2} size="md" />
                </div>
                <div>
                  <p className="text-xs font-medium text-brand uppercase">
                    Proposal Ref: {referenceId}
                  </p>
                  <h3 className="text-base font-semibold text-ink">
                    Proposal Request Submitted Successfully
                  </h3>
                </div>
              </div>

              <div className="bg-surface-muted border border-line rounded-[8px] p-4 space-y-2 text-xs font-normal">
                <div className="flex justify-between gap-4 border-b border-line pb-1.5">
                  <span className="text-ink-muted">Organisation</span>
                  <span className="font-medium text-ink text-right">{form.companyName}</span>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-1.5">
                  <span className="text-ink-muted">Contact</span>
                  <span className="text-ink text-right">
                    {form.contactName} ({form.email})
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-1.5">
                  <span className="text-ink-muted">Locations &amp; Coverage</span>
                  <span className="text-ink text-right">
                    {form.city}, {form.state} ({form.locationCount})
                  </span>
                </div>
                <div className="flex justify-between gap-4 border-b border-line pb-1.5">
                  <span className="text-ink-muted">Estate Size</span>
                  <span className="text-ink text-right">{form.approximateQuantity}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-ink-muted">Preferred SLA</span>
                  <span className="font-medium text-brand text-right">{form.preferredSla}</span>
                </div>
              </div>

              <p className="text-xs font-normal text-ink-muted leading-relaxed">
                Our commercial engineering team has received your proposal request under reference{' '}
                <span className="text-ink font-medium">{referenceId}</span> and will respond to{' '}
                <span className="text-ink font-medium">{form.email}</span> within one business day.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-2 border-t border-line">
                <Button href={`mailto:${siteContent.contact.proposalEmail}?subject=${encodeURIComponent(`[${referenceId}] IT AMC Proposal — ${form.companyName}`)}`} variant="secondary" size="sm" className="w-full sm:w-auto rounded-[8px]">
                  <Icon icon={Mail} size="xs" />
                  Email Copy to Commercial Desk
                </Button>
                <Button onClick={handleResetAndClose} size="sm" className="w-full sm:w-auto rounded-[8px]">
                  Done
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {error && (
                <div
                  role="alert"
                  className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-xs font-normal flex items-start gap-2"
                >
                  <Icon icon={AlertCircle} size="xs" className="shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* STEP 1: BUSINESS DETAILS */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="wiz-company"
                      className="block text-xs font-medium text-ink mb-1.5"
                    >
                      Company / Organisation Name *
                    </label>
                    <div className="relative">
                      <Icon
                        icon={Building}
                        size="xs"
                        className="absolute left-3.5 top-3 text-ink-muted pointer-events-none"
                      />
                      <input
                        id="wiz-company"
                        required
                        type="text"
                        placeholder="e.g. Apex Manufacturing Pvt. Ltd."
                        value={form.companyName}
                        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                        className="ui-input pl-9"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="wiz-name"
                      className="block text-xs font-medium text-ink mb-1.5"
                    >
                      Contact Person Full Name *
                    </label>
                    <div className="relative">
                      <Icon
                        icon={User}
                        size="xs"
                        className="absolute left-3.5 top-3 text-ink-muted pointer-events-none"
                      />
                      <input
                        id="wiz-name"
                        required
                        type="text"
                        placeholder="e.g. Rahul Sharma (IT Head)"
                        value={form.contactName}
                        onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                        className="ui-input pl-9"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="wiz-email"
                        className="block text-xs font-medium text-ink mb-1.5"
                      >
                        Business Email *
                      </label>
                      <div className="relative">
                        <Icon
                          icon={Mail}
                          size="xs"
                          className="absolute left-3.5 top-3 text-ink-muted pointer-events-none"
                        />
                        <input
                          id="wiz-email"
                          required
                          type="email"
                          placeholder="rahul@company.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          className="ui-input pl-9"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="wiz-phone"
                        className="block text-xs font-medium text-ink mb-1.5"
                      >
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Icon
                          icon={Phone}
                          size="xs"
                          className="absolute left-3.5 top-3 text-ink-muted pointer-events-none"
                        />
                        <input
                          id="wiz-phone"
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                          className="ui-input pl-9"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: LOCATION AND COVERAGE */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="wiz-city"
                        className="block text-xs font-medium text-ink mb-1.5"
                      >
                        Primary City / HQ *
                      </label>
                      <input
                        id="wiz-city"
                        required
                        type="text"
                        placeholder="e.g. Pune / Mumbai / Bengaluru"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="ui-input"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="wiz-state"
                        className="block text-xs font-medium text-ink mb-1.5"
                      >
                        State / Region *
                      </label>
                      <input
                        id="wiz-state"
                        required
                        type="text"
                        placeholder="e.g. Maharashtra / Karnataka / Gujarat"
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        className="ui-input"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="wiz-locations"
                      className="block text-xs font-medium text-ink mb-1.5"
                    >
                      Number of Office / Plant Locations *
                    </label>
                    <select
                      id="wiz-locations"
                      value={form.locationCount}
                      onChange={(e) => setForm({ ...form, locationCount: e.target.value })}
                      className="ui-input cursor-pointer"
                    >
                      {LOCATION_COUNT_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="wiz-coverage"
                      className="block text-xs font-medium text-ink mb-1.5"
                    >
                      Required Support Coverage Window *
                    </label>
                    <select
                      id="wiz-coverage"
                      value={form.coverageType}
                      onChange={(e) => setForm({ ...form, coverageType: e.target.value })}
                      className="ui-input cursor-pointer"
                    >
                      {COVERAGE_TYPE_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* STEP 3: IT INFRASTRUCTURE */}
              {step === 3 && (
                <div className="space-y-3.5">
                  <div>
                    <span className="block text-xs font-medium text-ink mb-1.5">
                      In-Scope Equipment Groups (Select all that apply) *
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {DEVICE_TYPE_OPTIONS.map((device) => {
                        const checked = form.deviceTypes.includes(device);
                        return (
                          <label
                            key={device}
                            className={cn(
                              'flex items-center gap-2 px-3 py-2 rounded-lg border text-xs cursor-pointer transition-colors',
                              checked
                                ? 'bg-brand-subtle border-brand text-ink font-medium'
                                : 'bg-surface border-line text-ink-muted font-normal hover:text-ink',
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                setForm({
                                  ...form,
                                  deviceTypes: toggleArrayItem(form.deviceTypes, device),
                                })
                              }
                              className="h-3.5 w-3.5 rounded border-line text-brand focus:ring-brand"
                            />
                            <span className="truncate">{device}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="wiz-quantity"
                      className="block text-xs font-medium text-ink mb-1"
                    >
                      Approximate Total Asset Quantity *
                    </label>
                    <select
                      id="wiz-quantity"
                      value={form.approximateQuantity}
                      onChange={(e) => setForm({ ...form, approximateQuantity: e.target.value })}
                      className="ui-input py-2 cursor-pointer"
                    >
                      {QUANTITY_BAND_OPTIONS.map((q) => (
                        <option key={q} value={q}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="wiz-infra-details"
                      className="block text-xs font-medium text-ink mb-1"
                    >
                      Key OEM Makes / Infrastructure Details (Optional)
                    </label>
                    <input
                      id="wiz-infra-details"
                      type="text"
                      placeholder="e.g. 120 Dell Laptops, 4 HPE ProLiant Servers, FortiGate Firewall..."
                      value={form.infrastructureDetails}
                      onChange={(e) => setForm({ ...form, infrastructureDetails: e.target.value })}
                      className="ui-input py-2"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: SERVICE REQUIREMENTS */}
              {step === 4 && (
                <div className="space-y-3.5">
                  <div>
                    <span className="block text-xs font-medium text-ink mb-1.5">
                      Required AMC Services *
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {SERVICE_OPTIONS.map((srv) => {
                        const checked = form.requiredServices.includes(srv);
                        return (
                          <label
                            key={srv}
                            className={cn(
                              'flex items-center gap-2 px-3 py-2 rounded-lg border text-xs cursor-pointer transition-colors',
                              checked
                                ? 'bg-brand-subtle border-brand text-ink font-medium'
                                : 'bg-surface border-line text-ink-muted font-normal hover:text-ink',
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() =>
                                setForm({
                                  ...form,
                                  requiredServices: toggleArrayItem(form.requiredServices, srv),
                                })
                              }
                              className="h-3.5 w-3.5 rounded border-line text-brand focus:ring-brand"
                            />
                            <span className="truncate">{srv}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="wiz-sla"
                      className="block text-xs font-medium text-ink mb-1"
                    >
                      Preferred Response SLA Tier *
                    </label>
                    <select
                      id="wiz-sla"
                      value={form.preferredSla}
                      onChange={(e) => setForm({ ...form, preferredSla: e.target.value })}
                      className="ui-input py-2 cursor-pointer"
                    >
                      {SLA_TIER_OPTIONS.map((tier) => (
                        <option key={tier} value={tier}>
                          {tier}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="wiz-issues"
                      className="block text-xs font-medium text-ink mb-1"
                    >
                      Current Operational Challenges / Specific Requirements (Optional)
                    </label>
                    <input
                      id="wiz-issues"
                      type="text"
                      placeholder="e.g. Need quarterly preventive maintenance & single SLA escalation..."
                      value={form.currentIssues}
                      onChange={(e) => setForm({ ...form, currentIssues: e.target.value })}
                      className="ui-input py-2"
                    />
                  </div>

                  <label className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface-muted border border-line text-xs font-normal text-ink-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.exclusionsAcknowledged}
                      onChange={(e) =>
                        setForm({ ...form, exclusionsAcknowledged: e.target.checked })
                      }
                      className="mt-0.5 h-3.5 w-3.5 rounded border-line text-brand focus:ring-brand shrink-0"
                    />
                    <span>
                      I understand that Mint AMC provides maintenance, preventive care, diagnostics,
                      monitoring, and field engineering support. Physical hardware replacement,
                      spare parts, and consumables are excluded and billed separately or covered via
                      OEM warranty. *
                    </span>
                  </label>
                </div>
              )}

              {/* STEP 5: REVIEW AND SUBMIT */}
              {step === 5 && (
                <div className="space-y-3.5">
                  <div className="rounded-[8px] border border-line bg-surface-muted p-3.5 space-y-2 text-xs font-normal">
                    <div className="flex justify-between gap-3 border-b border-line pb-1.5">
                      <span className="text-ink-muted">1. Business</span>
                      <span className="text-ink font-medium text-right truncate">
                        {form.companyName} · {form.contactName}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3 border-b border-line pb-1.5">
                      <span className="text-ink-muted">Contact</span>
                      <span className="text-ink text-right truncate">
                        {form.email} · {form.phone}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3 border-b border-line pb-1.5">
                      <span className="text-ink-muted">2. Locations</span>
                      <span className="text-ink text-right truncate">
                        {form.city}, {form.state} ({form.locationCount})
                      </span>
                    </div>
                    <div className="flex justify-between gap-3 border-b border-line pb-1.5">
                      <span className="text-ink-muted">Coverage</span>
                      <span className="text-secondary font-medium text-right truncate">
                        {form.coverageType}
                      </span>
                    </div>
                    <div className="flex justify-between gap-3 border-b border-line pb-1.5">
                      <span className="text-ink-muted">3. Infrastructure</span>
                      <span className="text-ink text-right truncate">
                        {form.approximateQuantity} ({form.deviceTypes.length} selected)
                      </span>
                    </div>
                    <div className="flex justify-between gap-3">
                      <span className="text-ink-muted">4. SLA &amp; Services</span>
                      <span className="text-brand font-medium text-right truncate">
                        {form.preferredSla.split('—')[0].trim()} ({form.requiredServices.length}{' '}
                        services)
                      </span>
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 p-2.5 rounded-lg bg-surface border border-line text-xs font-normal text-ink-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.consentConfirmed}
                      onChange={(e) => setForm({ ...form, consentConfirmed: e.target.checked })}
                      className="mt-0.5 h-3.5 w-3.5 rounded border-line text-brand focus:ring-brand shrink-0"
                    />
                    <span>
                      I confirm the details above are accurate and authorise Mint AMC to contact me with a tailored IT AMC proposal.
                      *
                    </span>
                  </label>
                </div>
              )}

              {/* Wizard Footer Actions */}
              <div className="pt-3 flex items-center justify-between gap-3 border-t border-line">
                <div className="flex items-center gap-2">
                  {step > 1 ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={handleBack}
                      disabled={submitting}
                    >
                      <Icon icon={ArrowLeft} size="xs" />
                      Back
                    </Button>
                  ) : null}
                  <button
                    type="button"
                    onClick={handleCancelAndClose}
                    disabled={submitting}
                    className="px-3 py-1.5 text-xs font-medium text-ink-muted hover:text-ink transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                {step < 5 ? (
                  <Button type="button" size="sm" onClick={handleNext}>
                    <span>Next Step</span>
                    <Icon icon={ArrowRight} size="xs" />
                  </Button>
                ) : (
                  <Button type="submit" size="sm" disabled={submitting}>
                    <Icon icon={Send} size="xs" />
                    {submitting ? 'Submitting Proposal...' : 'Submit Proposal Request'}
                  </Button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
