'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';
import {
  ArrowUp,
  ArrowUpRight,
  BookOpen,
  Boxes,
  Building2,
  Cpu,
  FileCheck,
  FileText,
  Globe,
  HardDrive,
  Headphones,
  Scale,
  ShieldCheck,
  Tag,
  Wrench,
} from 'lucide-react';
import BrandLogo from '@/components/brand/brand-logo';
import { Icon } from '@/components/ui/icon';
import { siteContent } from '@/content/site';
import PageContainer from './page-container';

const FOOTER_COMPANY_LINKS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: 'Enterprise Solutions', href: '/solutions', icon: Boxes },
  { label: 'AMC Service Catalog', href: '/services', icon: Wrench },
  { label: 'Commercial Pricing', href: '/pricing', icon: Tag },
  { label: 'Why Mint AMC', href: '/why-mint-amc', icon: ShieldCheck },
  { label: 'About Company', href: '/about', icon: Building2 },
  { label: 'Knowledge Centre', href: '/resources', icon: BookOpen },
  { label: 'Contact Us', href: '/contact', icon: Headphones },
];

const DIVISION_ICONS: Record<string, LucideIcon> = {
  'Mint AMC': Wrench,
  xHosting: Globe,
  'xData Center': HardDrive,
  Defendx: ShieldCheck,
  'UiDRAC SaaS': Cpu,
};

const FOOTER_LEGAL_LINKS: { label: string; href: string; icon: LucideIcon }[] = [
  { label: siteContent.footerPrivacyLink, href: '/privacy', icon: Scale },
  { label: siteContent.footerTermsLink, href: '/terms', icon: FileText },
  { label: siteContent.footerSlaLink, href: '/sla', icon: FileCheck },
];

export default function SiteFooter() {
  const pathname = usePathname();
  const year = new Date().getFullYear();

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScrollToTop = () => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  };

  const linkClass =
    'group text-xs text-slate-600 hover:text-brand transition-colors inline-flex items-center gap-2 py-1 font-medium';

  return (
    <footer className="relative bg-gradient-to-b from-[#F3F8F5] via-[#EFF6FB] to-[#E7F3EE] text-ink mt-auto shrink-0 border-t border-[#D4E6DE]">
      <PageContainer className="py-12 sm:py-14">
        {/* Four Balanced Columns Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-10 border-b border-[#D4E6DE]/80">
          {/* Column 1: Brand & Overview */}
          <div className="space-y-3.5">
            <Link
              href="/"
              onClick={handleLogoClick}
              className="inline-flex items-center hover:opacity-95 transition-opacity cursor-pointer"
              aria-label="Mint AMC Home"
            >
              <BrandLogo heightClass="h-9" />
            </Link>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {siteContent.footerTagline}
            </p>
          </div>

          {/* Column 2: AMC Solutions & Company */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
              Company &amp; AMC
            </h3>
            <ul className="space-y-1">
              {FOOTER_COMPANY_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    <Icon
                      icon={item.icon}
                      size="xs"
                      className="text-secondary group-hover:text-brand shrink-0 transition-colors"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Conzex Group Entities */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
              {siteContent.footerDivisionsHeading}
            </h3>
            <ul className="space-y-1">
              {siteContent.divisions.map((d) => {
                const isExternal = d.url.startsWith('http');
                const DivisionIcon = DIVISION_ICONS[d.name] || Globe;
                return (
                  <li key={d.name}>
                    {isExternal ? (
                      <a
                        href={d.url}
                        className={linkClass}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon
                          icon={DivisionIcon}
                          size="xs"
                          className="text-secondary group-hover:text-brand shrink-0 transition-colors"
                        />
                        <span>{d.name}</span>
                        <Icon
                          icon={ArrowUpRight}
                          size="xs"
                          className="text-ink-subtle group-hover:text-brand transition-colors"
                        />
                      </a>
                    ) : (
                      <Link
                        href={d.url}
                        onClick={d.url === '/' ? handleLogoClick : undefined}
                        className={linkClass}
                      >
                        <Icon
                          icon={DivisionIcon}
                          size="xs"
                          className="text-secondary group-hover:text-brand shrink-0 transition-colors"
                        />
                        <span>{d.name}</span>
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 4: Governance & Legal */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
              {siteContent.footerLegalHeading}
            </h3>
            <ul className="space-y-1">
              {FOOTER_LEGAL_LINKS.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={linkClass}>
                    <Icon
                      icon={item.icon}
                      size="xs"
                      className="text-secondary group-hover:text-brand shrink-0 transition-colors"
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar with Copyright, Accreditation & Back to Top Button */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-600">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            <p>
              &copy; {year} {siteContent.brandName} &trade;. All rights reserved.
            </p>
            <span className="hidden sm:inline text-slate-400">&bull;</span>
            <p className="text-[11px] text-slate-500">
              DPIIT Recognised Enterprise IT Maintenance Framework
            </p>
          </div>

          <button
            type="button"
            onClick={handleScrollToTop}
            aria-label="Back to top of page"
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] text-xs font-semibold text-slate-700 hover:text-brand bg-white/80 hover:bg-white border border-[#D4E6DE] hover:border-brand/50 shadow-xs transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none"
          >
            <span>Back to top</span>
            <Icon icon={ArrowUp} size="xs" className="text-brand shrink-0" />
          </button>
        </div>
      </PageContainer>
    </footer>
  );
}
