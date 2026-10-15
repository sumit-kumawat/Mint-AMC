'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  CheckSquare,
  ChevronDown,
  ChevronRight,
  FileCheck,
  FileText,
  MapPin,
  Scale,
  ShieldCheck,
  Tag,
  Wrench,
} from 'lucide-react';
import { Icon } from '@/components/ui/icon';
import { megaMenuColumns, solutionsMegaMenuColumns } from '@/content/mega-menu';
import { articles } from '@/content/resources';
import { cn } from '@/lib/utils';

/**
 * Shared sticky wrapper class for sidebar columns across Services, Solutions, Resources, and Legal pages.
 */
export const STICKY_SIDEBAR_WRAPPER_CLASS =
  'lg:col-span-4 xl:col-span-3 sticky top-16 sm:top-[4.25rem] lg:top-24 z-30 self-start';

const RESOURCE_ARTICLE_ICONS: Record<string, LucideIcon> = {
  'what-is-an-it-amc': BookOpen,
  'it-amc-pricing-guide': Tag,
  'it-amc-vs-warranty-vs-oem-support': ShieldCheck,
  'how-to-choose-an-it-amc-provider-in-india': FileCheck,
  'it-amc-coverage-and-exclusions': FileText,
  'pan-india-it-support-and-multi-location-management': MapPin,
  'it-amc-proposal-checklist': CheckSquare,
};

function useCloseOnOutsideClick(open: boolean, onClose: () => void) {
  const containerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const handleMouseDown = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open, onClose]);
  return containerRef;
}

/**
 * Sticky sidebar navigation for Services index and detail pages.
 */
export function ServicesStickySidebar({ currentSlug = '' }: { currentSlug?: string }) {
  const activeColId =
    megaMenuColumns.find((col) => col.links.some((l) => l.slug === currentSlug))?.id ??
    megaMenuColumns[0].id;
  const [openColId, setOpenColId] = useState<string>(activeColId);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const ref = useCloseOnOutsideClick(mobileExpanded, () => setMobileExpanded(false));

  const currentServiceLabel =
    megaMenuColumns.flatMap((c) => c.links).find((l) => l.slug === currentSlug)?.label ??
    'All AMC Services';

  return (
    <aside ref={ref} className="relative ui-card p-3.5 sm:p-5 bg-surface rounded-[8px]">
      {/* Mobile / Tablet Responsive Toggle */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          aria-expanded={mobileExpanded}
          className="w-full flex items-center justify-between gap-2 text-left py-0.5 cursor-pointer"
        >
          <div className="min-w-0 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center shrink-0">
              <Icon icon={Wrench} size="xs" />
            </span>
            <div className="min-w-0">
              <span className="block text-[10px] font-medium uppercase tracking-wider text-brand leading-none">
                AMC Services
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-ink truncate mt-0.5">
                {currentServiceLabel}
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary shrink-0 px-2.5 py-1 rounded-[8px] bg-secondary-subtle">
            <span>{mobileExpanded ? 'Close' : 'Browse'}</span>
            <Icon
              icon={ChevronDown}
              size="xs"
              className={cn('transition-transform', mobileExpanded && 'rotate-180')}
            />
          </span>
        </button>
      </div>

      {/* Desktop Header */}
      <div className="hidden lg:flex items-center justify-between gap-2 pb-3 mb-3 border-b border-line">
        <div className="flex items-center gap-2">
          <Icon icon={Wrench} size="sm" className="text-brand" />
          <h2 className="text-xs font-semibold text-ink uppercase tracking-wider">
            AMC Services
          </h2>
        </div>
        <Link
          href="/services"
          className={cn(
            'text-xs transition-colors',
            currentSlug === ''
              ? 'font-medium text-brand'
              : 'font-normal text-secondary hover:underline',
          )}
        >
          All services
        </Link>
      </div>

      <nav
        aria-label="AMC Services Navigation"
        className={cn(
          'space-y-2',
          mobileExpanded
            ? 'block absolute left-0 right-0 top-full mt-1.5 p-3 rounded-[8px] bg-surface border border-line shadow-mega z-40 max-h-[68vh] overflow-y-auto lg:static lg:mt-0 lg:p-0 lg:border-0 lg:shadow-none lg:max-h-none lg:overflow-visible'
            : 'hidden lg:block',
        )}
      >
        {megaMenuColumns.map((col) => {
          const isOpen = openColId === col.id;
          const hasCurrent = col.links.some((l) => l.slug === currentSlug);
          return (
            <div
              key={col.id}
              className="rounded-[8px] border border-line/80 bg-surface overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenColId(col.id)}
                aria-expanded={isOpen}
                className={cn(
                  'w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer',
                  isOpen || hasCurrent
                    ? 'bg-surface-muted text-ink font-semibold'
                    : 'text-ink-muted hover:text-ink hover:bg-surface-muted/60',
                )}
              >
                <span className="flex items-center gap-2 truncate">
                  <Icon
                    icon={col.icon}
                    size="xs"
                    className={hasCurrent ? 'text-brand' : 'text-ink-subtle'}
                  />
                  <span className="truncate">{col.heading}</span>
                </span>
                <Icon
                  icon={ChevronDown}
                  size="xs"
                  className={cn(
                    'shrink-0 text-ink-subtle transition-transform',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              {isOpen && (
                <ul className="px-2 py-1.5 space-y-0.5 border-t border-line/60 bg-surface">
                  {col.links.map((link) => {
                    const isActive = link.slug === currentSlug;
                    return (
                      <li key={link.slug}>
                        <Link
                          href={`/services/${link.slug}`}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={() => setMobileExpanded(false)}
                          className={cn(
                            'group flex items-center justify-between text-xs px-2.5 py-1.5 rounded-[8px] transition-colors',
                            isActive
                              ? 'bg-brand-subtle text-brand font-medium'
                              : 'text-ink-muted hover:text-ink hover:bg-surface-muted',
                          )}
                        >
                          <span className="truncate">{link.label}</span>
                          <Icon
                            icon={ChevronRight}
                            size="xs"
                            className={cn(
                              'shrink-0 ml-1 transition-opacity',
                              isActive
                                ? 'opacity-100 text-brand'
                                : 'opacity-0 group-hover:opacity-100 text-ink-muted',
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

/**
 * Sticky sidebar navigation for Solutions index and detail pages.
 */
export function SolutionsStickySidebar({ currentSlug = '' }: { currentSlug?: string }) {
  const activeColId =
    solutionsMegaMenuColumns.find((col) => col.links.some((l) => l.slug === currentSlug))?.id ??
    solutionsMegaMenuColumns[0].id;
  const [openColId, setOpenColId] = useState<string>(activeColId);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const ref = useCloseOnOutsideClick(mobileExpanded, () => setMobileExpanded(false));

  const currentSolutionLabel =
    solutionsMegaMenuColumns.flatMap((c) => c.links).find((l) => l.slug === currentSlug)?.label ??
    'All AMC Solutions';

  return (
    <aside ref={ref} className="relative ui-card p-3.5 sm:p-5 bg-surface rounded-[8px]">
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          aria-expanded={mobileExpanded}
          className="w-full flex items-center justify-between gap-2 text-left py-0.5 cursor-pointer"
        >
          <div className="min-w-0 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center shrink-0">
              <Icon icon={ShieldCheck} size="xs" />
            </span>
            <div className="min-w-0">
              <span className="block text-[10px] font-medium uppercase tracking-wider text-brand leading-none">
                Solutions
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-ink truncate mt-0.5">
                {currentSolutionLabel}
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary shrink-0 px-2.5 py-1 rounded-[8px] bg-secondary-subtle">
            <span>{mobileExpanded ? 'Close' : 'Browse'}</span>
            <Icon
              icon={ChevronDown}
              size="xs"
              className={cn('transition-transform', mobileExpanded && 'rotate-180')}
            />
          </span>
        </button>
      </div>

      <div className="hidden lg:flex items-center justify-between gap-2 pb-3 mb-3 border-b border-line">
        <div className="flex items-center gap-2">
          <Icon icon={ShieldCheck} size="sm" className="text-brand" />
          <h2 className="text-xs font-semibold text-ink uppercase tracking-wider">Solutions</h2>
        </div>
        <Link
          href="/solutions"
          className={cn(
            'text-xs transition-colors',
            currentSlug === ''
              ? 'font-medium text-brand'
              : 'font-normal text-secondary hover:underline',
          )}
        >
          All solutions
        </Link>
      </div>

      <nav
        aria-label="Solutions Navigation"
        className={cn(
          'space-y-2',
          mobileExpanded
            ? 'block absolute left-0 right-0 top-full mt-1.5 p-3 rounded-[8px] bg-surface border border-line shadow-mega z-40 max-h-[68vh] overflow-y-auto lg:static lg:mt-0 lg:p-0 lg:border-0 lg:shadow-none lg:max-h-none lg:overflow-visible'
            : 'hidden lg:block',
        )}
      >
        {solutionsMegaMenuColumns.map((col) => {
          const isOpen = openColId === col.id;
          const hasCurrent = col.links.some((l) => l.slug === currentSlug);
          return (
            <div
              key={col.id}
              className="rounded-[8px] border border-line/80 bg-surface overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenColId(col.id)}
                aria-expanded={isOpen}
                className={cn(
                  'w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer',
                  isOpen || hasCurrent
                    ? 'bg-surface-muted text-ink font-semibold'
                    : 'text-ink-muted hover:text-ink hover:bg-surface-muted/60',
                )}
              >
                <span className="flex items-center gap-2 truncate">
                  <Icon
                    icon={col.icon}
                    size="xs"
                    className={hasCurrent ? 'text-secondary' : 'text-ink-subtle'}
                  />
                  <span className="truncate">{col.heading}</span>
                </span>
                <Icon
                  icon={ChevronDown}
                  size="xs"
                  className={cn(
                    'shrink-0 text-ink-subtle transition-transform',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              {isOpen && (
                <ul className="px-2 py-1.5 space-y-0.5 border-t border-line/60 bg-surface">
                  {col.links.map((link) => {
                    const isActive = link.slug === currentSlug;
                    return (
                      <li key={link.slug}>
                        <Link
                          href={`/solutions/${link.slug}`}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={() => setMobileExpanded(false)}
                          className={cn(
                            'group flex items-center justify-between text-xs px-2.5 py-1.5 rounded-[8px] transition-colors',
                            isActive
                              ? 'bg-secondary-subtle text-secondary font-medium'
                              : 'text-ink-muted hover:text-ink hover:bg-surface-muted',
                          )}
                        >
                          <span className="truncate">{link.label}</span>
                          <Icon
                            icon={ChevronRight}
                            size="xs"
                            className={cn(
                              'shrink-0 ml-1 transition-opacity',
                              isActive
                                ? 'opacity-100 text-secondary'
                                : 'opacity-0 group-hover:opacity-100 text-ink-muted',
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

/**
 * Sticky sidebar navigation for Knowledge Centre / Resources articles.
 */
export function ResourcesStickySidebar({ currentSlug = '' }: { currentSlug?: string }) {
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const ref = useCloseOnOutsideClick(mobileExpanded, () => setMobileExpanded(false));
  const currentArticle = articles.find((a) => a.slug === currentSlug);

  return (
    <aside ref={ref} className="relative ui-card p-3.5 sm:p-5 bg-surface rounded-[8px]">
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          aria-expanded={mobileExpanded}
          className="w-full flex items-center justify-between gap-2 text-left py-0.5 cursor-pointer"
        >
          <div className="min-w-0 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center shrink-0">
              <Icon icon={BookOpen} size="xs" />
            </span>
            <div className="min-w-0">
              <span className="block text-[10px] font-medium uppercase tracking-wider text-brand leading-none">
                Knowledge Centre
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-ink truncate mt-0.5">
                {currentArticle?.shortTitle ?? 'All Guides'}
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary shrink-0 px-2.5 py-1 rounded-[8px] bg-secondary-subtle">
            <span>{mobileExpanded ? 'Close' : 'Browse'}</span>
            <Icon
              icon={ChevronDown}
              size="xs"
              className={cn('transition-transform', mobileExpanded && 'rotate-180')}
            />
          </span>
        </button>
      </div>

      <div className="hidden lg:flex items-center justify-between gap-2 pb-3 mb-3 border-b border-line">
        <div className="flex items-center gap-2">
          <Icon icon={BookOpen} size="sm" className="text-brand" />
          <h2 className="text-xs font-semibold text-ink uppercase tracking-wider">
            Knowledge Centre
          </h2>
        </div>
        <Link
          href="/resources"
          className={cn(
            'text-xs transition-colors',
            currentSlug === ''
              ? 'font-medium text-brand'
              : 'font-normal text-secondary hover:underline',
          )}
        >
          All guides
        </Link>
      </div>

      <nav
        aria-label="Knowledge Centre Guides"
        className={cn(
          'space-y-1',
          mobileExpanded
            ? 'block absolute left-0 right-0 top-full mt-1.5 p-3 rounded-[8px] bg-surface border border-line shadow-mega z-40 max-h-[68vh] overflow-y-auto lg:static lg:mt-0 lg:p-0 lg:border-0 lg:shadow-none lg:max-h-none lg:overflow-visible'
            : 'hidden lg:block',
        )}
      >
        <ul className="space-y-1">
          {articles.map((item) => {
            const isActive = item.slug === currentSlug;
            const itemIcon = RESOURCE_ARTICLE_ICONS[item.slug] ?? FileText;
            return (
              <li key={item.slug}>
                <Link
                  href={`/resources/${item.slug}`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setMobileExpanded(false)}
                  className={cn(
                    'group flex items-center justify-between text-xs px-2.5 py-2 rounded-[8px] transition-colors border',
                    isActive
                      ? 'bg-brand-subtle text-brand font-medium border-brand/30'
                      : 'border-transparent text-ink-muted hover:text-ink hover:bg-surface-muted font-normal',
                  )}
                >
                  <span className="flex items-center gap-2 truncate">
                    <Icon
                      icon={itemIcon}
                      size="xs"
                      className={cn(
                        'shrink-0',
                        isActive ? 'text-brand' : 'text-secondary group-hover:text-brand',
                      )}
                    />
                    <span className="truncate">{item.shortTitle ?? item.title}</span>
                  </span>
                  <Icon
                    icon={ChevronRight}
                    size="xs"
                    className={cn(
                      'shrink-0 ml-1 transition-opacity',
                      isActive
                        ? 'opacity-100 text-brand'
                        : 'opacity-0 group-hover:opacity-100 text-ink-muted',
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}

/**
 * Governance categories mapped to maintain the exact same accordion container structure as AMC Services.
 */
export const governanceColumns: {
  id: string;
  heading: string;
  icon: LucideIcon;
  primaryPath: string;
  links: { label: string; path: string }[];
}[] = [
  {
    id: 'privacy',
    heading: 'Privacy Policy',
    icon: Scale,
    primaryPath: '/privacy',
    links: [
      { label: 'Privacy Policy Overview', path: '/privacy' },
      { label: 'Information We Collect', path: '/privacy' },
      { label: 'Enterprise Data Security', path: '/privacy' },
      { label: 'Compliance & Data Protection', path: '/privacy' },
    ],
  },
  {
    id: 'terms',
    heading: 'Terms of Service',
    icon: FileText,
    primaryPath: '/terms',
    links: [
      { label: 'Terms of Service Overview', path: '/terms' },
      { label: 'Scope of Maintenance Services', path: '/terms' },
      { label: 'Client Asset Responsibilities', path: '/terms' },
      { label: 'Service Fees & Renewals', path: '/terms' },
    ],
  },
  {
    id: 'sla',
    heading: 'SLA Framework',
    icon: FileCheck,
    primaryPath: '/sla',
    links: [
      { label: 'SLA Overview & Philosophy', path: '/sla' },
      { label: 'P1–P4 Incident Classification', path: '/sla' },
      { label: 'Response & Resolution Matrix', path: '/sla' },
      { label: 'Service Credits & Escalation', path: '/sla' },
    ],
  },
];

/**
 * Sticky sidebar navigation for Legal & Governance pages (Privacy Policy, Terms of Service, SLA Overview).
 * Maintains the exact accordion menu style, container cards, and responsive patterns as ServicesStickySidebar.
 */
export function LegalStickySidebar({ currentPath = '/privacy' }: { currentPath?: string }) {
  const activeDocId =
    governanceColumns.find((col) => col.primaryPath === currentPath)?.id ??
    governanceColumns[0].id;
  const [openColId, setOpenColId] = useState<string>(activeDocId);
  const [mobileExpanded, setMobileExpanded] = useState(false);
  const ref = useCloseOnOutsideClick(mobileExpanded, () => setMobileExpanded(false));

  const currentDoc =
    governanceColumns.find((col) => col.primaryPath === currentPath) ??
    governanceColumns[0];

  return (
    <aside ref={ref} className="relative ui-card p-3.5 sm:p-5 bg-surface rounded-[8px]">
      {/* Mobile / Tablet Responsive Toggle — Identical to Services sidebar */}
      <div className="lg:hidden">
        <button
          type="button"
          onClick={() => setMobileExpanded(!mobileExpanded)}
          aria-expanded={mobileExpanded}
          className="w-full flex items-center justify-between gap-2 text-left py-0.5 cursor-pointer"
        >
          <div className="min-w-0 flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-[8px] bg-brand-subtle text-brand flex items-center justify-center shrink-0">
              <Icon icon={currentDoc.icon} size="xs" />
            </span>
            <div className="min-w-0">
              <span className="block text-[10px] font-medium uppercase tracking-wider text-brand leading-none">
                Governance &amp; Legal
              </span>
              <span className="block text-xs sm:text-sm font-semibold text-ink truncate mt-0.5">
                {currentDoc.heading}
              </span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1 text-xs font-medium text-secondary shrink-0 px-2.5 py-1 rounded-[8px] bg-secondary-subtle">
            <span>{mobileExpanded ? 'Close' : 'Browse'}</span>
            <Icon
              icon={ChevronDown}
              size="xs"
              className={cn('transition-transform', mobileExpanded && 'rotate-180')}
            />
          </span>
        </button>
      </div>

      {/* Desktop Header — Identical to Services sidebar */}
      <div className="hidden lg:flex items-center justify-between gap-2 pb-3 mb-3 border-b border-line">
        <div className="flex items-center gap-2">
          <Icon icon={ShieldCheck} size="sm" className="text-brand" />
          <h2 className="text-xs font-semibold text-ink uppercase tracking-wider">
            Governance &amp; Legal
          </h2>
        </div>
        <span className="text-xs font-medium text-brand">
          Official Documents
        </span>
      </div>

      {/* Navigation Accordion Sections — Exact same structure and style as Services sidebar */}
      <nav
        aria-label="Governance & Legal Navigation"
        className={cn(
          'space-y-2',
          mobileExpanded
            ? 'block absolute left-0 right-0 top-full mt-1.5 p-3 rounded-[8px] bg-surface border border-line shadow-mega z-40 max-h-[68vh] overflow-y-auto lg:static lg:mt-0 lg:p-0 lg:border-0 lg:shadow-none lg:max-h-none lg:overflow-visible'
            : 'hidden lg:block',
        )}
      >
        {governanceColumns.map((col) => {
          const isOpen = openColId === col.id;
          const isCurrentDoc = col.primaryPath === currentPath;

          return (
            <div
              key={col.id}
              className="rounded-[8px] border border-line/80 bg-surface overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenColId(isOpen ? '' : col.id)}
                aria-expanded={isOpen}
                className={cn(
                  'w-full flex items-center justify-between gap-2 px-3 py-2 text-left text-xs font-medium transition-colors cursor-pointer',
                  isOpen || isCurrentDoc
                    ? 'bg-surface-muted text-ink font-semibold'
                    : 'text-ink-muted hover:text-ink hover:bg-surface-muted/60',
                )}
              >
                <span className="flex items-center gap-2 truncate">
                  <Icon
                    icon={col.icon}
                    size="xs"
                    className={isCurrentDoc ? 'text-brand' : 'text-ink-subtle'}
                  />
                  <span className="truncate">{col.heading}</span>
                </span>
                <Icon
                  icon={ChevronDown}
                  size="xs"
                  className={cn(
                    'shrink-0 text-ink-subtle transition-transform',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>

              {isOpen && (
                <ul className="px-2 py-1.5 space-y-0.5 border-t border-line/60 bg-surface">
                  {col.links.map((link, idx) => {
                    const isActive = isCurrentDoc && idx === 0;
                    return (
                      <li key={`${col.id}-${idx}`}>
                        <Link
                          href={col.primaryPath}
                          aria-current={isActive ? 'page' : undefined}
                          onClick={() => setMobileExpanded(false)}
                          className={cn(
                            'group flex items-center justify-between text-xs px-2.5 py-1.5 rounded-[8px] transition-colors',
                            isActive
                              ? 'bg-brand-subtle text-brand font-medium'
                              : 'text-ink-muted hover:text-ink hover:bg-surface-muted',
                          )}
                        >
                          <span className="truncate">{link.label}</span>
                          <Icon
                            icon={ChevronRight}
                            size="xs"
                            className={cn(
                              'shrink-0 ml-1 transition-opacity',
                              isActive
                                ? 'opacity-100 text-brand'
                                : 'opacity-0 group-hover:opacity-100 text-ink-muted',
                            )}
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
