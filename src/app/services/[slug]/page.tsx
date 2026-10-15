import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Layers,
  Send,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageHeroBand from '@/components/layout/page-hero-band';
import PageSection from '@/components/layout/page-section';
import {
  ServicesStickySidebar,
  STICKY_SIDEBAR_WRAPPER_CLASS,
} from '@/components/layout/sticky-sidebar-nav';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { BreadcrumbJsonLd, ServiceJsonLd } from '@/components/seo/structured-data';
import { getService, servicesBySlug, servicePageLabels } from '@/content/services';
import { siteContent } from '@/content/site';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getService(params.slug);
  if (!service) return { title: 'Service Not Found' };

  const baseTitle = service.title.toLowerCase().includes('amc')
    ? service.title
    : `${service.title} AMC`;

  const metaTitle = `${baseTitle} - Enterprise Support`;
  const metaDesc =
    service.shortDescription.length > 158
      ? `${service.shortDescription.slice(0, 155)}...`
      : service.shortDescription;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: `https://mintamc.com/services/${service.slug}`,
    },
    openGraph: {
      title: `${baseTitle} | Mint AMC`,
      description: metaDesc,
      url: `https://mintamc.com/services/${service.slug}`,
      siteName: 'Mint AMC',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${baseTitle} | Mint AMC`,
      description: metaDesc,
    },
  };
}

export default function ServiceDetailPage({ params }: Props) {
  const service = getService(params.slug);
  if (!service) notFound();

  const relatedServices = service.relatedSlugs
    .map((s) => servicesBySlug[s])
    .filter(Boolean);

  const breadcrumbs = [
    { label: siteContent.nav.home.label, href: '/' },
    { label: siteContent.nav.services.label, href: '/services' },
    { label: service.title },
  ];

  return (
    <MarketingChrome>
      <ServiceJsonLd
        name={`${service.title} AMC`}
        description={service.shortDescription}
        url={`https://mintamc.com/services/${service.slug}`}
      />
      <BreadcrumbJsonLd
        items={breadcrumbs.map((b) => ({
          name: b.label,
          item: b.href ? `https://mintamc.com${b.href}` : `https://mintamc.com/services/${service.slug}`,
        }))}
      />

      {/* SECTION 1: Pure Light-Themed Title Hero Band */}
      <PageHeroBand
        eyebrow={`Enterprise AMC · ${service.category}`}
        title={service.title}
        subtitle={service.shortDescription}
      />

      {/* SECTION 2: Core Scope & Operational Workflow with Sticky Sidebar */}
      <PageSection tone="muted">
        <div className="mb-5">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Sidebar */}
          <div className={STICKY_SIDEBAR_WRAPPER_CLASS}>
            <ServicesStickySidebar currentSlug={service.slug} />
          </div>

          {/* Main Scope Cards */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            <div className="grid sm:grid-cols-2 gap-6 items-stretch">
              <div className="ui-card p-6 sm:p-7 bg-surface h-full">
                <h2 className="type-card-title mb-4 pb-3 border-b border-line flex items-center gap-2">
                  <Icon icon={Wrench} size="sm" className="text-brand" />
                  {servicePageLabels.includedHeading}
                </h2>
                <ul className="space-y-3 type-body text-sm">
                  {service.included.map((i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Icon
                        icon={CheckCircle2}
                        size="sm"
                        className="text-brand shrink-0 mt-0.5"
                      />
                      <span className="text-ink-muted">{i}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="ui-card p-6 sm:p-7 bg-surface h-full">
                <h2 className="type-card-title mb-4 pb-3 border-b border-line flex items-center gap-2">
                  <Icon icon={Clock} size="sm" className="text-secondary" />
                  {servicePageLabels.howHeading}
                </h2>
                <ol className="space-y-3.5 type-body text-sm">
                  {service.howItWorks.map((s, idx) => (
                    <li key={s} className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-[8px] bg-secondary-subtle text-secondary text-xs font-semibold flex items-center justify-center shrink-0 mt-0.5">
                        0{idx + 1}
                      </span>
                      <span className="text-ink-muted">{s}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            {/* SLA Benchmark Box */}
            <div className="ui-card p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-surface">
              <div className="space-y-1.5">
                <h3 className="type-card-title">
                  {servicePageLabels.slaHeading}
                </h3>
                <p className="type-body text-sm max-w-2xl">
                  {service.slaSummary}
                </p>
              </div>
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="shrink-0 w-full md:w-auto font-semibold"
              >
                <Icon icon={Send} size="xs" />
                <span>Request Custom Scope</span>
              </Button>
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 3: Supported OEM Hardware Ecosystem */}
      <PageSection tone="white" borderTop>
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-brand">
              Hardware Compatibility
            </span>
            <h3 className="type-section-title">
              Supported OEM Brands &amp; Architectures for {service.title}
            </h3>
            <p className="type-lead text-sm max-w-2xl mx-auto">
              Our engineering team maintains multi-vendor certifications and genuine spare parts inventories for legacy, current, and post-warranty assets.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
            <div className="p-4 rounded-[8px] border border-line bg-surface text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-ink">Enterprise OEM Tier</p>
              <p className="text-sm font-semibold text-brand mt-1">Dell / HPE / Lenovo</p>
              <p className="text-xs text-ink-muted mt-1">Servers &amp; Workstations</p>
            </div>

            <div className="p-4 rounded-[8px] border border-line bg-surface text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-ink">Network Infrastructure</p>
              <p className="text-sm font-semibold text-secondary mt-1">Cisco / Fortinet / Aruba</p>
              <p className="text-xs text-ink-muted mt-1">Routers, Switches, Firewalls</p>
            </div>

            <div className="p-4 rounded-[8px] border border-line bg-surface text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-ink">Storage Arrays</p>
              <p className="text-sm font-semibold text-brand mt-1">NetApp / Synology / Dell EMC</p>
              <p className="text-xs text-ink-muted mt-1">SAN, NAS, Unified Fabric</p>
            </div>

            <div className="p-4 rounded-[8px] border border-line bg-surface text-center">
              <p className="text-xs font-bold uppercase tracking-wider text-ink">Workplace Endpoints</p>
              <p className="text-sm font-semibold text-secondary mt-1">HP / Acer / Apple Mac</p>
              <p className="text-xs text-ink-muted mt-1">Commercial Desktops &amp; Laptops</p>
            </div>
          </div>
        </div>
      </PageSection>

      {/* SECTION 4: Related Services & Enterprise Stack Integration */}
      {relatedServices.length > 0 && (
        <PageSection tone="muted">
          <div className="max-w-5xl mx-auto space-y-6">
            <h3 className="type-card-title text-lg border-b border-line pb-3">
              {servicePageLabels.relatedHeading}
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 items-stretch">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/services/${rel.slug}`}
                  className="group p-5 h-full rounded-[8px] bg-surface hover:bg-brand-subtle/40 border border-line hover:border-brand/40 transition-colors flex flex-col justify-between shadow-xs"
                >
                  <div>
                    <span className="text-[11px] font-semibold text-brand block mb-1">
                      {rel.category}
                    </span>
                    <h4 className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-ink-muted mt-2 line-clamp-2 leading-relaxed">
                      {rel.shortDescription}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs font-medium text-secondary group-hover:text-brand">
                    <span>View Service Scope</span>
                    <Icon icon={ArrowRight} size="xs" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </PageSection>
      )}
    </MarketingChrome>
  );
}
