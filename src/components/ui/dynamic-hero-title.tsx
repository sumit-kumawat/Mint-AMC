'use client';

import React, { useEffect, useState } from 'react';

export const AMC_SERVICE_ROTATIONS = [
  'Enterprise Server Infrastructure',
  'Corporate Desktops & Workstations',
  'Network Switches & Routers',
  'Firewalls & Perimeter Security',
  'Multi-Vendor IT Hardware Fleets',
];

type DynamicHeroTitleProps = {
  prefix?: string;
  defaultHighlight?: string;
  messages?: string[];
  inverted?: boolean;
  className?: string;
};

/**
 * Modern Dynamic Hero Heading with fixed-height container and seamless typography transitions
 * - Dynamic rotation between relevant, professional messages describing Mint AMC's actual services
 * - ZERO layout shift (Cumulative Layout Shift = 0) via strict container height discipline
 * - Semantic H1 with accessible aria-label and polite announcements for screen readers
 * - Respects prefers-reduced-motion
 * - Premium Mint AMC light-theme typography (#1B2430 heading and #2FA878 brand highlight)
 */
export default function DynamicHeroTitle({
  prefix = 'Structured IT Annual Maintenance for ',
  defaultHighlight = 'Enterprise Server Infrastructure',
  messages = AMC_SERVICE_ROTATIONS,
  inverted = false,
  className = '',
}: DynamicHeroTitleProps) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || messages.length <= 1) return;

    const interval = setInterval(() => {
      setFade(false);
      const timer = setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 250);
      return () => clearTimeout(timer);
    }, 3800);

    return () => clearInterval(interval);
  }, [prefersReducedMotion, messages.length]);

  const currentMessage = messages[index] || defaultHighlight;

  return (
    <div className={`relative max-w-4xl mx-auto ${className}`}>
      <h1
        className={`font-sans text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.18] sm:leading-[1.14] text-balance ${
          inverted ? 'text-white' : 'text-ink'
        }`}
        aria-label={`${prefix}${currentMessage}`}
      >
        <span className="block">{prefix}</span>
        {/* Fixed-height container prevents any layout shifts while messages change */}
        <span className="block mt-1 sm:mt-2 h-[1.35em] sm:h-[1.25em] flex items-center justify-center overflow-hidden">
          <span
            aria-live="polite"
            className={`inline-block ${
              inverted ? 'text-emerald-400' : 'text-brand'
            } font-extrabold transition-all duration-300 ease-out transform ${
              fade ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-[0.98]'
            }`}
          >
            {currentMessage}
          </span>
        </span>
      </h1>
    </div>
  );
}

