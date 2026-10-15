'use client';

import { useState } from 'react';
import { partnersContent, type PartnerItem } from '@/content/partners';
import { cn } from '@/lib/utils';

function PartnerLogoTile({ partner }: { partner: PartnerItem }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="h-20 px-4 py-3 rounded-[8px] bg-surface border border-line flex items-center justify-center shadow-xs transition-colors duration-150 hover:border-brand/60 hover:shadow-card-hover"
      title={partner.name}
    >
      {!failed ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={partner.logoUrl}
          alt={partner.alt}
          width={128}
          height={44}
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="max-h-9 sm:max-h-10 w-auto max-w-[124px] object-contain select-none"
        />
      ) : (
        <span className="text-xs sm:text-sm font-semibold text-ink tracking-tight text-center">
          {partner.name}
        </span>
      )}
    </div>
  );
}

type PartnersSectionProps = {
  className?: string;
};

/**
 * Clean, minimal Our Technology Partners logo section using official partner assets
 * from https://mintamc.com/assets/partner/ with stable 8px radius.
 */
export default function PartnersSection({ className }: PartnersSectionProps) {
  return (
    <div className={cn('space-y-6', className)}>
      <div className="text-center max-w-3xl mx-auto">
        <span className="type-eyebrow block mb-2">{partnersContent.eyebrow}</span>
        <h2 className="type-section-title">{partnersContent.heading}</h2>
        <p className="type-body text-sm mt-2 max-w-2xl mx-auto">{partnersContent.subtitle}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        {partnersContent.partners.map((partner) => (
          <PartnerLogoTile key={partner.name} partner={partner} />
        ))}
      </div>
    </div>
  );
}
