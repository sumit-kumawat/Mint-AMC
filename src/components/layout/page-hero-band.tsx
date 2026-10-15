'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import PageContainer from './page-container';

type PageHeroBandProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  align?: 'left' | 'center';
  className?: string;
};

/**
 * Executive Darkened Title Band for Inner Pages
 * - Darkened atmospheric background using Mint AMC primary (#2FA878) and secondary (#0076CE) brand colors
 * - Datacenter flythrough video backdrop with relaxed cinematic pace
 * - 100% WCAG AAA text visibility with radiant white heading and slate-200 subtitle
 * - Clean enterprise badge with pulsing emerald indicator
 * - Fully responsive, balanced vertical rhythm, and zero layout shift
 */
export default function PageHeroBand({
  title,
  subtitle,
  eyebrow,
  align = 'center',
  className,
}: PageHeroBandProps) {
  const isCenter = align === 'center';
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.playbackRate = 0.7; // Relaxed cinematic speed
      const attemptPlay = () => {
        video.play().catch(() => {});
      };
      attemptPlay();
      const handleLoadedData = () => {
        video.playbackRate = 0.7;
        attemptPlay();
      };
      video.addEventListener('loadeddata', handleLoadedData);
      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-slate-950 text-white border-b border-slate-800 py-14 sm:py-18 lg:py-20',
        className,
      )}
    >
      {/* Background Datacenter Animation Video & Mint AMC Brand Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-slate-950">
        {/* Fallback image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-60"
          style={{ backgroundImage: "url('/assets/dc_poster.jpg')" }}
          aria-hidden="true"
        />

        {/* Cinematic Video Layer */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/dc_poster.jpg"
          className="w-full h-full object-cover object-center pointer-events-none opacity-60 sm:opacity-70 transition-opacity duration-700"
        >
          <source src="/assets/dc_animation.webm" type="video/webm" />
          <source src="/assets/dc_animation.mp4" type="video/mp4" />
        </video>

        {/* Mint AMC Brand Colors Ambient Glow: Primary (#2FA878) and Secondary (#0076CE) */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(47,168,120,0.22)_0%,rgba(0,118,206,0.15)_45%,transparent_85%)] pointer-events-none" />

        {/* Calibrated Dark Contrast Scrim: Guarantees 100% WCAG AAA Text Visibility while Keeping Video Visible */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/55 to-slate-950/85 pointer-events-none" />
      </div>

      <PageContainer
        className={cn(
          'relative z-10 flex flex-col justify-center',
          isCenter ? 'items-center text-center' : 'items-start text-left',
        )}
      >
        {eyebrow && (
          <div
            className={cn(
              'inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-emerald-500/40 text-xs font-semibold text-emerald-300 tracking-wide mb-4 shadow-sm backdrop-blur-sm',
              isCenter && 'mx-auto',
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
            <span className="uppercase tracking-wider font-mono text-[11px] sm:text-xs text-emerald-300">{eyebrow}</span>
          </div>
        )}

        <h1
          className={cn(
            'font-sans text-2xl sm:text-3xl lg:text-[2.65rem] font-extrabold text-white tracking-tight leading-[1.2] max-w-3xl text-balance drop-shadow-xs',
            isCenter && 'mx-auto',
          )}
        >
          {title}
        </h1>

        {subtitle ? (
          <p
            className={cn(
              'mt-4 font-sans text-sm sm:text-base lg:text-lg text-slate-200 font-normal leading-relaxed max-w-2xl text-pretty',
              isCenter && 'mx-auto',
            )}
          >
            {subtitle}
          </p>
        ) : null}
      </PageContainer>
    </section>
  );
}
