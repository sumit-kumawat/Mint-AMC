'use client';

import { useState } from 'react';
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Clock,
  Headphones,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldAlert,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageContainer from '@/components/layout/page-container';
import PageHeroBand from '@/components/layout/page-hero-band';
import PageSection from '@/components/layout/page-section';
import { Button } from '@/components/ui/button';
import FaqAccordion from '@/components/ui/faq-accordion';
import { Icon } from '@/components/ui/icon';
import { PanelCard } from '@/components/ui/panel-card';
import { SectionHeader } from '@/components/ui/section-header';
import { FaqPageJsonLd } from '@/components/seo/structured-data';
import { contactContent } from '@/content/contact';
import { siteContent } from '@/content/site';

type FormTab = 'business' | 'support';

const SERVICE_CATEGORIES = [
  'Enterprise Server Infrastructure AMC',
  'Corporate Desktop & Workstation AMC',
  'Network Switches & Routers AMC',
  'Firewall & Perimeter Security AMC',
  'Data Centre Infrastructure AMC',
  'Multi-Branch IT Maintenance Agreement',
  'General Procurement / Commercial Enquiry',
];

const ASSET_CATEGORIES = [
  'Servers (Rack / Blade / Tower)',
  'Workstations & Office Desktops',
  'Network Switches & Core Routers',
  'Next-Gen Firewalls & VPN Gateways',
  'SAN / NAS / Backup Storage',
  'UPS & Rack Power Distribution',
  'Other Corporate IT Equipment',
];

const SEVERITY_LEVELS = [
  {
    value: 'Severity 1 - Critical Outage',
    label: 'Critical (Severity 1) — Production server/network down, business halted',
  },
  {
    value: 'Severity 2 - High / Degraded',
    label: 'High (Severity 2) — Core system impaired, redundancy lost',
  },
  {
    value: 'Severity 3 - Medium / Standard',
    label: 'Medium (Severity 3) — Standard operational issue, single user affected',
  },
  {
    value: 'Severity 4 - Low / Request',
    label: 'Low (Severity 4) — Routine request, firmware check, or scheduled PM',
  },
];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<FormTab>('business');

  // Business Enquiry Form State
  const [bizForm, setBizForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    category: SERVICE_CATEGORIES[0],
    subject: '',
    message: '',
    hp: '', // Honeypot
  });
  const [bizSubmitting, setBizSubmitting] = useState(false);
  const [bizError, setBizError] = useState<string | null>(null);
  const [bizSuccess, setBizSuccess] = useState<{
    referenceId: string;
    recipient: string;
  } | null>(null);

  // Technical Support Form State
  const [supForm, setSupForm] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    contractNumber: '',
    category: ASSET_CATEGORIES[0],
    severity: SEVERITY_LEVELS[2].value,
    subject: '',
    message: '',
    hp: '', // Honeypot
  });
  const [supSubmitting, setSupSubmitting] = useState(false);
  const [supError, setSupError] = useState<string | null>(null);
  const [supSuccess, setSupSuccess] = useState<{
    referenceId: string;
    recipient: string;
  } | null>(null);

  // Handle Business Enquiry Submit (routes to info@mintamc.com)
  const handleBusinessSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bizSubmitting) return;

    if (bizForm.hp) {
      // Spam honeypot triggered silently
      setBizSuccess({ referenceId: 'MINT-INQ-CONFIRMED', recipient: 'info@mintamc.com' });
      return;
    }

    if (!bizForm.name.trim() || bizForm.name.trim().length < 2) {
      setBizError('Please enter your full name (minimum 2 characters).');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bizForm.email.trim())) {
      setBizError('Please enter a valid business email address.');
      return;
    }
    if (bizForm.phone.trim() && !/^[0-9+\-\s()]{7,20}$/.test(bizForm.phone.trim())) {
      setBizError('Please enter a valid contact phone number.');
      return;
    }
    if (!bizForm.company.trim() || bizForm.company.trim().length < 2) {
      setBizError('Please enter your company or organisation name.');
      return;
    }
    if (!bizForm.subject.trim() || bizForm.subject.trim().length < 3) {
      setBizError('Please enter a subject for your enquiry.');
      return;
    }
    if (!bizForm.message.trim() || bizForm.message.trim().length < 10) {
      setBizError('Please provide details regarding your requirements (minimum 10 characters).');
      return;
    }

    setBizError(null);
    setBizSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bizForm.name.trim(),
          email: bizForm.email.trim(),
          phone: bizForm.phone.trim(),
          company: bizForm.company.trim(),
          department: 'business',
          subject: `[${bizForm.category}] ${bizForm.subject.trim()}`,
          message: bizForm.message.trim(),
          category: bizForm.category,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setBizError(data.error || 'Unable to submit your enquiry right now. Please email info@mintamc.com directly.');
        setBizSubmitting(false);
        return;
      }

      setBizSuccess({
        referenceId: data.referenceId,
        recipient: data.recipient || 'info@mintamc.com',
      });
      setBizSubmitting(false);
    } catch {
      setBizError('Network communication error. Please check your connection or contact info@mintamc.com directly.');
      setBizSubmitting(false);
    }
  };

  // Handle Technical Support Submit (routes to support@mintamc.com)
  const handleSupportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (supSubmitting) return;

    if (supForm.hp) {
      // Spam honeypot triggered silently
      setSupSuccess({ referenceId: 'MINT-TKT-CONFIRMED', recipient: 'support@mintamc.com' });
      return;
    }

    if (!supForm.name.trim() || supForm.name.trim().length < 2) {
      setSupError('Please enter the contact engineer or manager name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supForm.email.trim())) {
      setSupError('Please enter a valid client business email address.');
      return;
    }
    if (!supForm.phone.trim() || !/^[0-9+\-\s()]{7,20}$/.test(supForm.phone.trim())) {
      setSupError('Please enter a reachable contact phone number for support triage.');
      return;
    }
    if (!supForm.company.trim() || supForm.company.trim().length < 2) {
      setSupError('Please enter your company or account name.');
      return;
    }
    if (!supForm.subject.trim() || supForm.subject.trim().length < 3) {
      setSupError('Please enter a brief summary of the technical incident.');
      return;
    }
    if (!supForm.message.trim() || supForm.message.trim().length < 10) {
      setSupError('Please describe the fault symptoms, affected device, or error codes (minimum 10 characters).');
      return;
    }

    setSupError(null);
    setSupSubmitting(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: supForm.name.trim(),
          email: supForm.email.trim(),
          phone: supForm.phone.trim(),
          company: supForm.company.trim(),
          department: 'support',
          contractNumber: supForm.contractNumber.trim() || undefined,
          category: supForm.category,
          severity: supForm.severity,
          subject: `[${supForm.severity.split(' ')[0]}] ${supForm.subject.trim()}`,
          message: supForm.message.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        setSupError(data.error || 'Unable to submit your support ticket right now. Please email support@mintamc.com directly.');
        setSupSubmitting(false);
        return;
      }

      setSupSuccess({
        referenceId: data.referenceId,
        recipient: data.recipient || 'support@mintamc.com',
      });
      setSupSubmitting(false);
    } catch {
      setSupError('Network communication error. Please check your connection or contact support@mintamc.com directly.');
      setSupSubmitting(false);
    }
  };

  return (
    <MarketingChrome>
      <FaqPageJsonLd faqs={contactContent.faq} />

      {/* SECTION 1: Pure Light-Themed Title Hero Band with Crisp High Contrast */}
      <PageHeroBand
        eyebrow="Corporate Communications"
        title="Contact Mint AMC"
        subtitle="Direct communication channels for enterprise IT Annual Maintenance Contract scoping, corporate procurement enquiries, and contracted client technical support."
      />

      {/* SECTION 2: Verified Communication Channels Overview */}
      <PageSection tone="white" className="py-8 sm:py-10 border-b border-line">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Channel 1: Commercial & Proposals */}
          <div className="p-5 rounded-[8px] bg-surface-muted border border-line flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-brand font-mono">
                  Business Desk
                </span>
                <span className="text-[11px] font-medium text-slate-500">Mon–Sat, 9am–6pm</span>
              </div>
              <h3 className="text-base font-bold text-ink">Commercial &amp; Proposals</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Tailored IT AMC scopes, multi-site hardware quotation, SLAs, and commercial agreements.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/80 flex items-center gap-2 text-xs font-semibold text-brand">
              <Icon icon={Mail} size="xs" />
              <a href="mailto:info@mintamc.com" className="hover:underline">
                info@mintamc.com
              </a>
            </div>
          </div>

          {/* Channel 2: Technical Support */}
          <div className="p-5 rounded-[8px] bg-surface-muted border border-line flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-secondary font-mono">
                  Helpdesk
                </span>
                <span className="text-[11px] font-medium text-secondary">Contracted SLAs</span>
              </div>
              <h3 className="text-base font-bold text-ink">Technical Support</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Active AMC incident logging, hardware troubleshooting triage, and field engineer dispatch.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/80 flex items-center gap-2 text-xs font-semibold text-secondary">
              <Icon icon={Mail} size="xs" />
              <a href="mailto:support@mintamc.com" className="hover:underline">
                support@mintamc.com
              </a>
            </div>
          </div>

          {/* Channel 3: Direct Helpline & HQ */}
          <div className="p-5 rounded-[8px] bg-surface-muted border border-line flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                  Corporate
                </span>
                <span className="text-[11px] font-medium text-slate-500">Pune, India</span>
              </div>
              <h3 className="text-base font-bold text-ink">Helpline &amp; Operations</h3>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                Direct telephone line for contracted client support escalation and corporate correspondence.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-line/80 flex items-center gap-2 text-xs font-semibold text-ink">
              <Icon icon={Phone} size="xs" />
              <a href="tel:+918007060308" className="hover:underline">
                (+91) 800 7060 308
              </a>
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 3: Main Redesigned Form Area (Tabbed: Business Desk vs Technical Support) */}
      <PageSection tone="muted">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form Area */}
          <div className="lg:col-span-8">
            <div className="ui-card p-6 sm:p-8 bg-surface border border-line rounded-[8px] shadow-xs">
              {/* Tab Selector */}
              <div className="border-b border-line pb-4 mb-6">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Select Contact Purpose
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setActiveTab('business')}
                    className={`p-3.5 rounded-[8px] border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      activeTab === 'business'
                        ? 'border-brand bg-brand-subtle text-ink shadow-xs ring-1 ring-brand'
                        : 'border-line bg-surface hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0 mt-0.5 ${
                        activeTab === 'business'
                          ? 'bg-brand text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon icon={Building2} size="xs" />
                    </div>
                    <div>
                      <span className="block font-bold text-sm text-ink">
                        Business &amp; Procurement Enquiry
                      </span>
                      <span className="block text-xs text-slate-500 mt-0.5">
                        Routes to Commercial Desk: <strong className="text-brand">info@mintamc.com</strong>
                      </span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveTab('support')}
                    className={`p-3.5 rounded-[8px] border text-left transition-all cursor-pointer flex items-start gap-3 ${
                      activeTab === 'support'
                        ? 'border-secondary bg-secondary-subtle text-ink shadow-xs ring-1 ring-secondary'
                        : 'border-line bg-surface hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-[6px] flex items-center justify-center shrink-0 mt-0.5 ${
                        activeTab === 'support'
                          ? 'bg-secondary text-white'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      <Icon icon={Headphones} size="xs" />
                    </div>
                    <div>
                      <span className="block font-bold text-sm text-ink">
                        Technical Support &amp; Helpdesk
                      </span>
                      <span className="block text-xs text-slate-500 mt-0.5">
                        Routes to Support Desk: <strong className="text-secondary">support@mintamc.com</strong>
                      </span>
                    </div>
                  </button>
                </div>
              </div>

              {/* TAB 1: Business Enquiry Form */}
              {activeTab === 'business' && (
                <div>
                  <div className="mb-5">
                    <h2 className="text-lg font-bold text-ink">Commercial &amp; Proposal Inquiry</h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      For organisations evaluating Annual Maintenance Contracts, requesting customized quotations, or seeking multi-site infrastructure service agreements.
                    </p>
                  </div>

                  {bizSuccess ? (
                    <div className="py-8 px-4 text-center space-y-4">
                      <div className="w-12 h-12 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center mx-auto">
                        <Icon icon={CheckCircle2} size="lg" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ink">Enquiry Successfully Transmitted</h3>
                        <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                          Thank you. Your enquiry has been received and routed directly to our commercial desk at{' '}
                          <span className="font-semibold text-brand">{bizSuccess.recipient}</span>.
                        </p>
                      </div>
                      <div className="p-4 rounded-[8px] bg-slate-50 border border-line text-left text-xs space-y-1.5 max-w-md mx-auto">
                        <p>
                          <span className="text-slate-500">Tracking Reference:</span>{' '}
                          <strong className="text-brand font-mono">{bizSuccess.referenceId}</strong>
                        </p>
                        <p>
                          <span className="text-slate-500">Contact:</span> {bizForm.name} ({bizForm.email})
                        </p>
                        <p>
                          <span className="text-slate-500">Organisation:</span> {bizForm.company}
                        </p>
                        <p>
                          <span className="text-slate-500">Scope Category:</span> {bizForm.category}
                        </p>
                      </div>
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-[8px]"
                          onClick={() => {
                            setBizSuccess(null);
                            setBizForm({
                              name: '',
                              email: '',
                              phone: '',
                              company: '',
                              category: SERVICE_CATEGORIES[0],
                              subject: '',
                              message: '',
                              hp: '',
                            });
                          }}
                        >
                          Submit Another Business Enquiry
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleBusinessSubmit} className="space-y-4" noValidate>
                      {/* Honeypot anti-spam */}
                      <input
                        type="text"
                        name="hp_biz"
                        value={bizForm.hp}
                        onChange={(e) => setBizForm({ ...bizForm, hp: e.target.value })}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      {bizError && (
                        <div className="p-3.5 rounded-[8px] bg-red-50 border border-red-200 text-xs font-medium text-red-700 flex items-start gap-2.5">
                          <Icon icon={AlertCircle} size="xs" className="shrink-0 mt-0.5 text-red-600" />
                          <span>{bizError}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="biz-name" className="block text-xs font-semibold text-ink mb-1">
                            Contact Full Name *
                          </label>
                          <input
                            id="biz-name"
                            type="text"
                            required
                            value={bizForm.name}
                            onChange={(e) => setBizForm({ ...bizForm, name: e.target.value })}
                            placeholder="e.g. Rahul Sharma"
                            className="ui-input"
                            disabled={bizSubmitting}
                          />
                        </div>

                        <div>
                          <label htmlFor="biz-email" className="block text-xs font-semibold text-ink mb-1">
                            Work Email Address *
                          </label>
                          <input
                            id="biz-email"
                            type="email"
                            required
                            value={bizForm.email}
                            onChange={(e) => setBizForm({ ...bizForm, email: e.target.value })}
                            placeholder="e.g. rahul@company.com"
                            className="ui-input"
                            disabled={bizSubmitting}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="biz-company" className="block text-xs font-semibold text-ink mb-1">
                            Company / Organisation *
                          </label>
                          <input
                            id="biz-company"
                            type="text"
                            required
                            value={bizForm.company}
                            onChange={(e) => setBizForm({ ...bizForm, company: e.target.value })}
                            placeholder="e.g. Acme Tech Solutions Pvt Ltd"
                            className="ui-input"
                            disabled={bizSubmitting}
                          />
                        </div>

                        <div>
                          <label htmlFor="biz-phone" className="block text-xs font-semibold text-ink mb-1">
                            Phone / Mobile (Optional)
                          </label>
                          <input
                            id="biz-phone"
                            type="tel"
                            value={bizForm.phone}
                            onChange={(e) => setBizForm({ ...bizForm, phone: e.target.value })}
                            placeholder="e.g. +91 98765 43210"
                            className="ui-input"
                            disabled={bizSubmitting}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="biz-category" className="block text-xs font-semibold text-ink mb-1">
                            Primary Maintenance Scope *
                          </label>
                          <select
                            id="biz-category"
                            value={bizForm.category}
                            onChange={(e) => setBizForm({ ...bizForm, category: e.target.value })}
                            className="ui-input bg-surface"
                            disabled={bizSubmitting}
                          >
                            {SERVICE_CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="biz-subject" className="block text-xs font-semibold text-ink mb-1">
                            Subject / Inquiry Purpose *
                          </label>
                          <input
                            id="biz-subject"
                            type="text"
                            required
                            value={bizForm.subject}
                            onChange={(e) => setBizForm({ ...bizForm, subject: e.target.value })}
                            placeholder="e.g. IT AMC Proposal for 150 Workstations & Servers"
                            className="ui-input"
                            disabled={bizSubmitting}
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="biz-message" className="block text-xs font-semibold text-ink mb-1">
                          Infrastructure Scope &amp; Service Requirements *
                        </label>
                        <textarea
                          id="biz-message"
                          rows={4}
                          required
                          value={bizForm.message}
                          onChange={(e) => setBizForm({ ...bizForm, message: e.target.value })}
                          placeholder="Please describe approximate device counts, office locations, current hardware setup, or any specific support requirements..."
                          className="ui-input"
                          disabled={bizSubmitting}
                        />
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <p className="text-xs text-slate-500">
                          Directly dispatched to <strong className="text-brand">info@mintamc.com</strong> with audit reference.
                        </p>
                        <Button
                          type="submit"
                          disabled={bizSubmitting}
                          className="rounded-[8px] bg-brand hover:bg-brand-hover text-white font-semibold"
                          size="md"
                        >
                          <Icon icon={Send} size="xs" />
                          <span>{bizSubmitting ? 'Transmitting Enquiry...' : 'Dispatch Business Enquiry'}</span>
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* TAB 2: Technical Support Form */}
              {activeTab === 'support' && (
                <div>
                  <div className="mb-5">
                    <h2 className="text-lg font-bold text-ink">Technical Support &amp; Incident Ticket</h2>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      For contracted clients and enterprise IT managers logging hardware incidents, technical troubleshooting requests, or maintenance follow-ups.
                    </p>
                  </div>

                  {supSuccess ? (
                    <div className="py-8 px-4 text-center space-y-4">
                      <div className="w-12 h-12 rounded-[8px] bg-secondary-subtle text-secondary flex items-center justify-center mx-auto">
                        <Icon icon={CheckCircle2} size="lg" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-ink">Support Ticket Logged</h3>
                        <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                          Your technical support request has been logged and forwarded directly to{' '}
                          <span className="font-semibold text-secondary">{supSuccess.recipient}</span>.
                        </p>
                      </div>
                      <div className="p-4 rounded-[8px] bg-slate-50 border border-line text-left text-xs space-y-1.5 max-w-md mx-auto">
                        <p>
                          <span className="text-slate-500">Ticket Reference:</span>{' '}
                          <strong className="text-secondary font-mono">{supSuccess.referenceId}</strong>
                        </p>
                        <p>
                          <span className="text-slate-500">Contact:</span> {supForm.name} ({supForm.phone})
                        </p>
                        <p>
                          <span className="text-slate-500">Account:</span> {supForm.company}
                        </p>
                        <p>
                          <span className="text-slate-500">Severity Tier:</span> {supForm.severity}
                        </p>
                      </div>
                      <div className="pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-[8px]"
                          onClick={() => {
                            setSupSuccess(null);
                            setSupForm({
                              name: '',
                              email: '',
                              phone: '',
                              company: '',
                              contractNumber: '',
                              category: ASSET_CATEGORIES[0],
                              severity: SEVERITY_LEVELS[2].value,
                              subject: '',
                              message: '',
                              hp: '',
                            });
                          }}
                        >
                          Submit Another Support Ticket
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSupportSubmit} className="space-y-4" noValidate>
                      {/* Honeypot anti-spam */}
                      <input
                        type="text"
                        name="hp_sup"
                        value={supForm.hp}
                        onChange={(e) => setSupForm({ ...supForm, hp: e.target.value })}
                        className="hidden"
                        tabIndex={-1}
                        autoComplete="off"
                        aria-hidden="true"
                      />

                      {supError && (
                        <div className="p-3.5 rounded-[8px] bg-red-50 border border-red-200 text-xs font-medium text-red-700 flex items-start gap-2.5">
                          <Icon icon={AlertCircle} size="xs" className="shrink-0 mt-0.5 text-red-600" />
                          <span>{supError}</span>
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="sup-name" className="block text-xs font-semibold text-ink mb-1">
                            Contact Person Name *
                          </label>
                          <input
                            id="sup-name"
                            type="text"
                            required
                            value={supForm.name}
                            onChange={(e) => setSupForm({ ...supForm, name: e.target.value })}
                            placeholder="e.g. Vikram Joshi"
                            className="ui-input"
                            disabled={supSubmitting}
                          />
                        </div>

                        <div>
                          <label htmlFor="sup-email" className="block text-xs font-semibold text-ink mb-1">
                            Client Work Email *
                          </label>
                          <input
                            id="sup-email"
                            type="email"
                            required
                            value={supForm.email}
                            onChange={(e) => setSupForm({ ...supForm, email: e.target.value })}
                            placeholder="e.g. vikram@enterprise.com"
                            className="ui-input"
                            disabled={supSubmitting}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="sup-phone" className="block text-xs font-semibold text-ink mb-1">
                            Callback Phone *
                          </label>
                          <input
                            id="sup-phone"
                            type="tel"
                            required
                            value={supForm.phone}
                            onChange={(e) => setSupForm({ ...supForm, phone: e.target.value })}
                            placeholder="e.g. +91 98765 43210"
                            className="ui-input"
                            disabled={supSubmitting}
                          />
                        </div>

                        <div>
                          <label htmlFor="sup-company" className="block text-xs font-semibold text-ink mb-1">
                            Company / Account Name *
                          </label>
                          <input
                            id="sup-company"
                            type="text"
                            required
                            value={supForm.company}
                            onChange={(e) => setSupForm({ ...supForm, company: e.target.value })}
                            placeholder="e.g. Bharat Logistics Ltd"
                            className="ui-input"
                            disabled={supSubmitting}
                          />
                        </div>

                        <div>
                          <label htmlFor="sup-contract" className="block text-xs font-semibold text-ink mb-1">
                            Contract / Ref No (Optional)
                          </label>
                          <input
                            id="sup-contract"
                            type="text"
                            value={supForm.contractNumber}
                            onChange={(e) => setSupForm({ ...supForm, contractNumber: e.target.value })}
                            placeholder="e.g. MINT-AMC-2026-08"
                            className="ui-input font-mono text-xs"
                            disabled={supSubmitting}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="sup-category" className="block text-xs font-semibold text-ink mb-1">
                            Affected Asset Category *
                          </label>
                          <select
                            id="sup-category"
                            value={supForm.category}
                            onChange={(e) => setSupForm({ ...supForm, category: e.target.value })}
                            className="ui-input bg-surface"
                            disabled={supSubmitting}
                          >
                            {ASSET_CATEGORIES.map((cat) => (
                              <option key={cat} value={cat}>
                                {cat}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="sup-severity" className="block text-xs font-semibold text-ink mb-1">
                            Incident Severity Tier *
                          </label>
                          <select
                            id="sup-severity"
                            value={supForm.severity}
                            onChange={(e) => setSupForm({ ...supForm, severity: e.target.value })}
                            className="ui-input bg-surface text-xs"
                            disabled={supSubmitting}
                          >
                            {SEVERITY_LEVELS.map((sev) => (
                              <option key={sev.value} value={sev.value}>
                                {sev.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="sup-subject" className="block text-xs font-semibold text-ink mb-1">
                          Incident Summary / Error Heading *
                        </label>
                        <input
                          id="sup-subject"
                          type="text"
                          required
                          value={supForm.subject}
                          onChange={(e) => setSupForm({ ...supForm, subject: e.target.value })}
                          placeholder="e.g. Dell PowerEdge R740 Redundant PSU Amber Warning"
                          className="ui-input"
                          disabled={supSubmitting}
                        />
                      </div>

                      <div>
                        <label htmlFor="sup-message" className="block text-xs font-semibold text-ink mb-1">
                          Detailed Fault Description &amp; Diagnostic Symptoms *
                        </label>
                        <textarea
                          id="sup-message"
                          rows={4}
                          required
                          value={supForm.message}
                          onChange={(e) => setSupForm({ ...supForm, message: e.target.value })}
                          placeholder="Please provide device serial numbers, iDRAC/IPMI alert messages, troubleshooting already attempted, or physical office address for dispatch..."
                          className="ui-input"
                          disabled={supSubmitting}
                        />
                      </div>

                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <p className="text-xs text-slate-500">
                          Directly dispatched to <strong className="text-secondary">support@mintamc.com</strong> with priority triage.
                        </p>
                        <Button
                          type="submit"
                          disabled={supSubmitting}
                          className="rounded-[8px] bg-secondary hover:bg-secondary-hover text-white font-semibold"
                          size="md"
                        >
                          <Icon icon={Send} size="xs" />
                          <span>{supSubmitting ? 'Logging Support Ticket...' : 'Submit Technical Support Ticket'}</span>
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Verified Corporate & Support Guidelines */}
          <div className="lg:col-span-4 space-y-6">
            <PanelCard title="Official Communication Directory">
              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3 pb-3 border-b border-line">
                  <div className="w-7 h-7 rounded-[6px] bg-brand-subtle text-brand flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon={Mail} size="xs" />
                  </div>
                  <div>
                    <span className="block font-bold text-ink">Commercial &amp; Proposals</span>
                    <a href="mailto:info@mintamc.com" className="text-brand font-semibold hover:underline">
                      info@mintamc.com
                    </a>
                    <span className="block text-slate-500 text-[11px] mt-0.5">
                      New contracts, AMC scope scoping &amp; quotes
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-line">
                  <div className="w-7 h-7 rounded-[6px] bg-secondary-subtle text-secondary flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon={Wrench} size="xs" />
                  </div>
                  <div>
                    <span className="block font-bold text-ink">Technical Support</span>
                    <a href="mailto:support@mintamc.com" className="text-secondary font-semibold hover:underline">
                      support@mintamc.com
                    </a>
                    <span className="block text-slate-500 text-[11px] mt-0.5">
                      Active client ticketing &amp; fault escalation
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 pb-3 border-b border-line">
                  <div className="w-7 h-7 rounded-[6px] bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon={Phone} size="xs" />
                  </div>
                  <div>
                    <span className="block font-bold text-ink">Central Helpline</span>
                    <a href="tel:+918007060308" className="text-ink font-semibold hover:underline">
                      (+91) 800 7060 308
                    </a>
                    <span className="block text-slate-500 text-[11px] mt-0.5">
                      Telephonic triage for contracted accounts
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-7 h-7 rounded-[6px] bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon={MapPin} size="xs" />
                  </div>
                  <div>
                    <span className="block font-bold text-ink">Operations Base</span>
                    <span className="block text-slate-600 text-xs mt-0.5">
                      B404 Atulya Nirman, Punawale, Pune (MH), INDIA 411033
                    </span>
                    <span className="block text-slate-500 text-[11px] mt-0.5">
                      Corporate office &amp; national logistics coordination
                    </span>
                  </div>
                </div>
              </div>
            </PanelCard>

            <PanelCard title="Corporate Procurement Guidelines">
              <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <Icon icon={ShieldCheck} size="xs" className="text-brand shrink-0 mt-0.5" />
                  <span>
                    <strong>Itemised Proposal Scoping:</strong> Share your approximate device count (desktops, servers, firewalls) and office cities for rapid turn-around.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Icon icon={Clock} size="xs" className="text-secondary shrink-0 mt-0.5" />
                  <span>
                    <strong>Business Desk Hours:</strong> Commercial inquiries are processed Monday through Saturday, 9:00 AM – 6:00 PM IST.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Icon icon={ShieldAlert} size="xs" className="text-slate-500 shrink-0 mt-0.5" />
                  <span>
                    <strong>Critical Incident Dispatch:</strong> Contracted clients experiencing Severity 1 outages receive prioritized remote response and rapid field escalation.
                  </span>
                </div>
              </div>
            </PanelCard>
          </div>
        </div>
      </PageSection>

      {/* SECTION 4: Contact & Support FAQs (Full Layout Width) */}
      <PageSection tone="white" borderTop>
        <div className="w-full space-y-8 sm:space-y-10">
          <SectionHeader
            align="center"
            eyebrow="Help &amp; FAQ"
            title="Frequently Asked Questions on Communication &amp; Support"
            subtitle="Clear answers on communication desks, proposal turn-around times, and emergency support channels."
          />

          <FaqAccordion items={contactContent.faq} />
        </div>
      </PageSection>
    </MarketingChrome>
  );
}
