'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type ScrollRevealProps = {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
  distancePx?: number;
};

/**
 * Lightweight, non-blocking reveal wrapper.
 * Sets opacity with zero layout thrashing or scroll overhead.
 * Automatically respects `prefers-reduced-motion: reduce`.
 */
export function ScrollReveal({
  children,
  className,
  delayMs = 0,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px',
      },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: delayMs > 0 ? `${delayMs}ms` : undefined,
      }}
      className={cn(
        'transition-opacity duration-300 ease-out',
        visible ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      {children}
    </div>
  );
}

type Tilt3DCardProps = {
  children: React.ReactNode;
  className?: string;
  maxTiltDeg?: number;
};

/**
 * Clean, lightweight card container with zero 3D tilt overhead.
 * Prevents CPU thrashing and erratic hover jumping.
 */
export function Tilt3DCard({ children, className }: Tilt3DCardProps) {
  return <div className={cn('h-full', className)}>{children}</div>;
}
