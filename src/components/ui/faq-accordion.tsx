'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

type Item = { question: string; answer: string };

export default function FaqAccordion({
  items,
  className,
}: {
  items: Item[];
  className?: string;
}) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!items || items.length === 0) return null;

  return (
    <div
      className={cn(
        'ui-card overflow-hidden w-full bg-surface border border-line rounded-[8px] shadow-xs',
        className,
      )}
    >
      <div className="divide-y divide-line">
        {items.map((item, i) => {
          const isOpen = openFaq === i;
          return (
            <div key={item.question} className="transition-colors">
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpenFaq(isOpen ? null : i)}
                className="w-full px-6 sm:px-8 py-5 flex items-center justify-between gap-6 text-left hover:bg-surface-muted/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
              >
                <span className="text-base sm:text-lg font-semibold text-ink leading-snug pr-2">
                  {item.question}
                </span>
                <span className="w-8 h-8 rounded-full bg-surface-muted/90 flex items-center justify-center shrink-0 border border-line/60 transition-colors">
                  <Icon
                    icon={ChevronDown}
                    size="sm"
                    className={cn(
                      'text-brand shrink-0 transition-transform duration-200',
                      isOpen && 'rotate-180',
                    )}
                  />
                </span>
              </button>
              {isOpen && (
                <div className="px-6 sm:px-8 pb-6 pt-1 type-body text-sm sm:text-base text-ink-muted leading-relaxed max-w-4xl">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
