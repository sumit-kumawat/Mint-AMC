'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Global Top Progress Indication Component
 * - Tracks document scroll percentage with smooth requestAnimationFrame throttling
 * - Provides route transition feedback on client-side navigation
 * - Minimal, 2.5px brand-colored indicator that does not block pointer events
 */
export default function ProgressIndicator() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [navigating, setNavigating] = useState(false);

  // Route transition progress animation
  useEffect(() => {
    setNavigating(true);
    setScrollProgress(30);
    const midTimer = setTimeout(() => {
      setScrollProgress(80);
    }, 60);
    const endTimer = setTimeout(() => {
      setScrollProgress(100);
      setTimeout(() => {
        setNavigating(false);
        // Reset to initial scroll position after navigation completes
        const currentScroll =
          window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight || 1);
        setScrollProgress(Math.min(Math.max(currentScroll * 100, 0), 100));
      }, 150);
    }, 180);

    return () => {
      clearTimeout(midTimer);
      clearTimeout(endTimer);
    };
  }, [pathname]);

  // Document scroll progress tracking
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (navigating) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          if (docHeight > 0) {
            const progress = (window.scrollY / docHeight) * 100;
            setScrollProgress(Math.min(Math.max(progress, 0), 100));
          } else {
            setScrollProgress(0);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigating]);

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 z-[100] h-[2.5px] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-brand transition-[width,opacity] duration-150 ease-out shadow-[0_0_8px_rgba(47,168,120,0.4)]"
        style={{
          width: `${scrollProgress}%`,
          opacity: scrollProgress > 1 ? 1 : 0,
        }}
      />
    </div>
  );
}
