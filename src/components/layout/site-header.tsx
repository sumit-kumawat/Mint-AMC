'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import {
  BookOpen,
  Boxes,
  Building2,
  ChevronDown,
  CreditCard,
  Headset,
  Home,
  Menu,
  ShieldCheck,
  Wrench,
  X,
} from 'lucide-react';
import BrandLogo from '@/components/brand/brand-logo';
import { megaMenuColumns, solutionsMegaMenuColumns } from '@/content/mega-menu';
import PageContainer from './page-container';
import { ServicesMegaMenuPanel } from './services-mega-menu';
import { SolutionsMegaMenuPanel } from './solutions-mega-menu';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

export default function SiteHeader() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSolutionsOpen, setMobileSolutionsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeMega, setActiveMega] = useState<'services' | 'solutions' | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const handleMouseEnter = (menu: 'services' | 'solutions') => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setActiveMega(menu);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMega(null);
    }, 140);
  };

  // Close menus on route change
  useEffect(() => {
    setActiveMega(null);
    setMobileOpen(false);
  }, [pathname]);

  // Subtle header shadow on scroll, maintaining strict pure-white light theme
  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const isScrolled = window.scrollY > 4;
      setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard navigation & click outside
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileOpen(false);
        setActiveMega(null);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setActiveMega(null);
      }
    };
    document.addEventListener('keydown', onEsc);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onEsc);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const navLinkClass = (href: string, activeCheck?: boolean) => {
    const active =
      activeCheck ?? (pathname === href || (href !== '/' && pathname.startsWith(`${href}/`)));
    return cn(
      'h-9 px-3 rounded-[8px] text-sm font-medium transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap',
      active
        ? 'text-brand bg-brand-subtle font-medium'
        : 'text-ink hover:text-brand hover:bg-surface-muted',
    );
  };

  return (
    <header
      ref={headerRef}
      className={cn(
        'text-ink shrink-0 sticky top-0 z-50 bg-white border-b border-line transition-shadow duration-150',
        scrolled ? 'shadow-xs' : '',
      )}
    >
      <PageContainer>
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Official Mint AMC Logo */}
          <Link
            href="/"
            className="shrink-0 flex items-center hover:opacity-95 transition-opacity"
            aria-label="Mint AMC Home"
          >
            <BrandLogo heightClass="h-9 sm:h-9" />
          </Link>

          {/* Desktop Right-Aligned Navigation & Contact Us Action */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-5 ml-auto">
            <nav
              className="flex items-center gap-1 xl:gap-1.5"
              aria-label="Primary Navigation"
            >
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('services')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={navLinkClass(
                    '/services',
                    activeMega === 'services' || pathname.startsWith('/services'),
                  )}
                  aria-expanded={activeMega === 'services'}
                  aria-haspopup="true"
                  onClick={() => setActiveMega(activeMega === 'services' ? null : 'services')}
                >
                  <Icon icon={Wrench} size="xs" className="text-brand shrink-0" />
                  <span>Services</span>
                  <Icon
                    icon={ChevronDown}
                    size="xs"
                    className={cn(
                      'transition-transform duration-150 opacity-70',
                      activeMega === 'services' && 'rotate-180 text-brand opacity-100',
                    )}
                  />
                </button>
              </div>

              {/* Solutions Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleMouseEnter('solutions')}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  className={navLinkClass(
                    '/solutions',
                    activeMega === 'solutions' || pathname.startsWith('/solutions'),
                  )}
                  aria-expanded={activeMega === 'solutions'}
                  aria-haspopup="true"
                  onClick={() => setActiveMega(activeMega === 'solutions' ? null : 'solutions')}
                >
                  <Icon icon={Boxes} size="xs" className="text-secondary shrink-0" />
                  <span>Solutions</span>
                  <Icon
                    icon={ChevronDown}
                    size="xs"
                    className={cn(
                      'transition-transform duration-150 opacity-70',
                      activeMega === 'solutions' && 'rotate-180 text-brand opacity-100',
                    )}
                  />
                </button>
              </div>

              <Link href="/pricing" className={navLinkClass('/pricing')}>
                <Icon icon={CreditCard} size="xs" className="text-ink-muted shrink-0" />
                <span>Pricing</span>
              </Link>
              <Link href="/why-mint-amc" className={navLinkClass('/why-mint-amc')}>
                <Icon icon={ShieldCheck} size="xs" className="text-brand shrink-0" />
                <span>Why Mint AMC</span>
              </Link>
              <Link href="/about" className={navLinkClass('/about')}>
                <Icon icon={Building2} size="xs" className="text-ink-muted shrink-0" />
                <span>About</span>
              </Link>
              <Link href="/resources" className={navLinkClass('/resources')}>
                <Icon icon={BookOpen} size="xs" className="text-ink-muted shrink-0" />
                <span>Resources</span>
              </Link>
            </nav>

            {/* Clean Vertical Divider */}
            <div className="h-5 w-px bg-line shrink-0" aria-hidden="true" />

            {/* Redesigned Contact Us Button: Secondary border & icon default, Primary brand on hover */}
            <Button
              href="/contact"
              variant="transparent"
              size="header"
              className="group rounded-[8px] bg-transparent border border-secondary text-ink hover:border-brand hover:text-brand hover:bg-brand-subtle/30 transition-colors duration-200 font-semibold focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 active:scale-[0.98] shadow-none shrink-0"
            >
              <Icon
                icon={Headset}
                size="xs"
                className="text-secondary group-hover:text-brand transition-colors duration-200 shrink-0"
              />
              <span>Contact Us</span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-[8px] border border-line text-ink hover:bg-surface-muted transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            <Icon icon={mobileOpen ? X : Menu} size="md" />
          </button>
        </div>
      </PageContainer>

      {/* Dark Hover Overlay (Hoverlay) Behind Mega Menu */}
      {activeMega && (
        <div
          className="hidden lg:block fixed inset-0 top-16 bg-black/45 backdrop-blur-[2px] z-[55] transition-opacity duration-200 pointer-events-auto"
          aria-hidden="true"
          onClick={() => setActiveMega(null)}
        />
      )}

      {/* Desktop Light-Theme Mega Menus */}
      {activeMega === 'services' && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full z-[60] pt-1"
          onMouseEnter={() => handleMouseEnter('services')}
          onMouseLeave={handleMouseLeave}
        >
          <ServicesMegaMenuPanel onClose={() => setActiveMega(null)} />
        </div>
      )}

      {activeMega === 'solutions' && (
        <div
          className="hidden lg:block absolute left-0 right-0 top-full z-[60] pt-1"
          onMouseEnter={() => handleMouseEnter('solutions')}
          onMouseLeave={handleMouseLeave}
        >
          <SolutionsMegaMenuPanel onClose={() => setActiveMega(null)} />
        </div>
      )}

      {/* Mobile Navigation Drawer Overlay — Clean Light Theme */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-50 bg-ink/30 flex flex-col justify-start">
          <div className="bg-white border-b border-line shadow-lg max-h-[calc(100vh-4rem)] overflow-y-auto px-4 py-4 space-y-1">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 py-2 px-3 rounded-[8px] text-sm font-medium text-ink hover:bg-surface-muted"
            >
              <Icon icon={Home} size="xs" className="text-brand shrink-0" />
              <span>Home</span>
            </Link>

            {/* Mobile Services Accordion */}
            <div>
              <button
                type="button"
                className="w-full flex items-center justify-between py-2 px-3 rounded-[8px] text-sm font-medium text-ink hover:bg-surface-muted cursor-pointer"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
              >
                <span className="flex items-center gap-2.5">
                  <Icon icon={Wrench} size="xs" className="text-brand" />
                  <span>AMC Services</span>
                </span>
                <Icon
                  icon={ChevronDown}
                  size="xs"
                  className={cn('transition-transform duration-150', mobileServicesOpen && 'rotate-180')}
                />
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 pr-2 py-2 space-y-2 border-l-2 border-brand/20 ml-3 my-1">
                  <Link
                    href="/services"
                    className="block py-1 text-xs font-medium text-secondary hover:underline"
                    onClick={() => setMobileOpen(false)}
                  >
                    View All Services Overview →
                  </Link>
                  {megaMenuColumns.map((col) => (
                    <div key={col.id} className="pt-1.5 space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                        {col.heading}
                      </p>
                      {col.links.map((link) => (
                        <Link
                          key={link.slug}
                          href={`/services/${link.slug}`}
                          className="block py-1 text-xs text-ink hover:text-brand"
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Solutions Accordion */}
            <div>
              <button
                type="button"
                className="w-full flex items-center justify-between py-2 px-3 rounded-[8px] text-sm font-medium text-ink hover:bg-surface-muted cursor-pointer"
                onClick={() => setMobileSolutionsOpen(!mobileSolutionsOpen)}
              >
                <span className="flex items-center gap-2.5">
                  <Icon icon={Boxes} size="xs" className="text-secondary" />
                  <span>Solutions</span>
                </span>
                <Icon
                  icon={ChevronDown}
                  size="xs"
                  className={cn('transition-transform duration-150', mobileSolutionsOpen && 'rotate-180')}
                />
              </button>
              {mobileSolutionsOpen && (
                <div className="pl-4 pr-2 py-2 space-y-2 border-l-2 border-secondary/20 ml-3 my-1">
                  <Link
                    href="/solutions"
                    className="block py-1 text-xs font-medium text-secondary hover:underline"
                    onClick={() => setMobileOpen(false)}
                  >
                    View All Solutions Overview →
                  </Link>
                  {solutionsMegaMenuColumns.map((col) => (
                    <div key={col.id} className="pt-1.5 space-y-1">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                        {col.heading}
                      </p>
                      {col.links.map((link) => (
                        <Link
                          key={link.slug}
                          href={`/solutions/${link.slug}`}
                          className="block py-1 text-xs text-ink hover:text-brand"
                          onClick={() => setMobileOpen(false)}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/pricing"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 py-2 px-3 rounded-[8px] text-sm font-medium text-ink hover:bg-surface-muted"
            >
              <Icon icon={CreditCard} size="xs" className="text-ink-muted shrink-0" />
              <span>Pricing Model</span>
            </Link>
            <Link
              href="/why-mint-amc"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 py-2 px-3 rounded-[8px] text-sm font-medium text-ink hover:bg-surface-muted"
            >
              <Icon icon={ShieldCheck} size="xs" className="text-brand shrink-0" />
              <span>Why Mint AMC</span>
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 py-2 px-3 rounded-[8px] text-sm font-medium text-ink hover:bg-surface-muted"
            >
              <Icon icon={Building2} size="xs" className="text-ink-muted shrink-0" />
              <span>About Us</span>
            </Link>
            <Link
              href="/resources"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2.5 py-2 px-3 rounded-[8px] text-sm font-medium text-ink hover:bg-surface-muted"
            >
              <Icon icon={BookOpen} size="xs" className="text-ink-muted shrink-0" />
              <span>Knowledge Centre</span>
            </Link>

            {/* Mobile Contact Us Transparent CTA */}
            <div className="pt-3 mt-2 border-t border-line">
              <Button
                href="/contact"
                onClick={() => setMobileOpen(false)}
                variant="transparent"
                className="group w-full rounded-[8px] bg-transparent border border-secondary text-ink hover:border-brand hover:text-brand hover:bg-brand-subtle/30 transition-colors duration-200 font-semibold active:scale-[0.98] shadow-none"
                size="md"
              >
                <Icon
                  icon={Headset}
                  size="xs"
                  className="text-secondary group-hover:text-brand transition-colors duration-200"
                />
                <span>Contact Us</span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
