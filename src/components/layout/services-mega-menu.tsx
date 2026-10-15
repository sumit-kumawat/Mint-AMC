'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen } from 'lucide-react';
import { megaMenuColumns } from '@/content/mega-menu';
import { siteContent } from '@/content/site';
import PageContainer from './page-container';
import { Icon } from '@/components/ui/icon';

type Props = {
  onClose: () => void;
};

export function ServicesMegaMenuPanel({ onClose }: Props) {
  return (
    <PageContainer>
      <div
        className="w-full rounded-[8px] bg-surface text-ink shadow-mega border border-line overflow-hidden"
        role="region"
        aria-label="IT AMC Services Menu"
      >
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {megaMenuColumns.map((col) => (
            <div key={col.id} className="flex flex-col">
              <div className="pb-2.5 mb-2.5 border-b border-line">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-brand-subtle text-brand shrink-0">
                    <Icon icon={col.icon} size="xs" />
                  </span>
                  <p className="text-xs font-semibold uppercase tracking-wider text-ink">
                    {col.heading}
                  </p>
                </div>
                <p className="text-[11px] font-normal text-ink-muted mt-1 leading-snug">
                  {col.description}
                </p>
              </div>
              <ul className="space-y-1">
                {col.links.map((item) => (
                  <li key={item.slug}>
                    <Link
                      href={`/services/${item.slug}`}
                      onClick={onClose}
                      className="group flex items-start gap-2.5 rounded-lg p-2 hover:bg-surface-muted transition-colors"
                    >
                      <Icon
                        icon={item.icon}
                        size="xs"
                        className="text-secondary group-hover:text-brand shrink-0 mt-0.5 transition-colors"
                      />
                      <div className="min-w-0">
                        <span className="block text-xs font-medium text-ink group-hover:text-brand transition-colors leading-tight">
                          {item.label}
                        </span>
                        <span className="block text-[11px] font-normal text-ink-muted leading-snug mt-0.5">
                          {item.description}
                        </span>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 bg-surface-muted border-t border-line flex flex-wrap items-center justify-between gap-4 text-xs">
          <Link
            href="/services"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-medium text-secondary hover:text-secondary-hover transition-colors"
          >
            <span>All AMC Services</span>
            <Icon icon={ArrowRight} size="xs" />
          </Link>
          <Link
            href="/resources/what-is-an-it-amc"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 font-normal text-ink-muted hover:text-ink transition-colors"
          >
            <Icon icon={BookOpen} size="xs" className="text-brand" />
            <span>Guide: What Is an IT AMC?</span>
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
