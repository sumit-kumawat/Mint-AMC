'use client';

import { useState } from 'react';
import { siteContent } from '@/content/site';
import { cn } from '@/lib/utils';

type BrandLogoProps = {
  className?: string;
  heightClass?: string;
};

/**
 * Renders the official Mint AMC logo (https://mintamc.com/assets/img/logo.png)
 * with consistent sizing across the navbar, footer, and branding locations.
 */
export default function BrandLogo({ className, heightClass = 'h-9 sm:h-10' }: BrandLogoProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <span className={cn('inline-flex items-center gap-2.5 select-none', className)}>
      {!imgError ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src="https://mintamc.com/assets/img/logo.png"
          alt={siteContent.brandName}
          width={220}
          height={58}
          className={cn(heightClass, 'w-auto object-contain block')}
          decoding="async"
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-[8px] bg-brand text-white font-extrabold text-sm">
            M
          </span>
          <span className="font-sans font-bold text-lg tracking-tight text-ink">
            Mint <span className="text-brand">AMC</span>
          </span>
        </span>
      )}
    </span>
  );
}
