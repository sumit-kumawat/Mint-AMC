import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import MarketingChrome from '@/components/layout/marketing-chrome';
import PageHeroBand from '@/components/layout/page-hero-band';
import PageSection from '@/components/layout/page-section';
import {
  ResourcesStickySidebar,
  STICKY_SIDEBAR_WRAPPER_CLASS,
} from '@/components/layout/sticky-sidebar-nav';
import Breadcrumbs from '@/components/ui/breadcrumbs';
import { Icon } from '@/components/ui/icon';
import { BreadcrumbJsonLd, TechArticleJsonLd } from '@/components/seo/structured-data';
import { articles } from '@/content/resources';
import { siteContent } from '@/content/site';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) return { title: 'Guide Not Found' };

  const metaTitle = article.shortTitle
    ? `${article.shortTitle} - Enterprise Guide`
    : article.title.split('?')[0];

  const metaDesc =
    article.excerpt.length > 158
      ? `${article.excerpt.slice(0, 155)}...`
      : article.excerpt;

  return {
    title: metaTitle,
    description: metaDesc,
    alternates: {
      canonical: `https://mintamc.com/resources/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | Mint AMC Knowledge Centre`,
      description: metaDesc,
      url: `https://mintamc.com/resources/${article.slug}`,
      siteName: 'Mint AMC',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${metaTitle} | Mint AMC`,
      description: metaDesc,
    },
  };
}

export default function ResourceDetailPage({ params }: Props) {
  const article = articles.find((a) => a.slug === params.slug);
  if (!article) notFound();

  const related = articles.filter((a) => a.slug !== article.slug).slice(0, 3);

  const breadcrumbs = [
    { label: siteContent.nav.home.label, href: '/' },
    { label: 'Knowledge Centre', href: '/resources' },
    { label: article.shortTitle ?? article.title },
  ];

  return (
    <MarketingChrome>
      <BreadcrumbJsonLd
        items={breadcrumbs.map((b) => ({
          name: b.label,
          item: b.href ? `https://mintamc.com${b.href}` : `https://mintamc.com/resources/${article.slug}`,
        }))}
      />
      <TechArticleJsonLd
        headline={article.title}
        description={article.excerpt}
        datePublished={article.date}
        url={`https://mintamc.com/resources/${article.slug}`}
        category={article.category}
      />

      {/* SECTION 1: Light-Themed Title Hero Band */}
      <PageHeroBand
        eyebrow={`${article.category} · ${article.readTime} Read`}
        title={article.title}
        subtitle={article.excerpt}
      />

      {/* SECTION 2: Main Guide Body with Sticky Sidebar */}
      <PageSection tone="muted">
        <div className="mb-5">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Sticky Sidebar */}
          <div className={STICKY_SIDEBAR_WRAPPER_CLASS}>
            <ResourcesStickySidebar currentSlug={article.slug} />
          </div>

          {/* Main Article Body */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-6">
            {/* Key Takeaways Box */}
            <div className="ui-card p-6 sm:p-7 bg-surface">
              <h2 className="type-card-title mb-4 pb-3 border-b border-line flex items-center gap-2">
                <Icon icon={CheckCircle2} size="sm" className="text-brand" />
                Key Strategic Takeaways
              </h2>
              <ul className="space-y-3 type-body text-sm">
                {article.keyTakeaways.map((pt) => (
                  <li key={pt} className="flex items-start gap-2.5">
                    <Icon
                      icon={CheckCircle2}
                      size="sm"
                      className="text-brand shrink-0 mt-0.5"
                    />
                    <span className="text-ink-muted">{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Sections */}
            {article.sections.map((section, idx) => (
              <div key={idx} className="ui-card p-6 sm:p-7 bg-surface space-y-4">
                <h3 className="type-card-title text-base sm:text-lg pb-2.5 border-b border-line text-ink">
                  {section.heading}
                </h3>
                <div className="type-body text-sm space-y-3 leading-relaxed text-ink-muted">
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx}>{para}</p>
                  ))}
                </div>
                {section.bullets && section.bullets.length > 0 && (
                  <ul className="space-y-2 pt-2 border-t border-line/60">
                    {section.bullets.map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-ink-muted">
                        <Icon icon={CheckCircle2} size="xs" className="text-brand shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {section.exampleBox && (
                  <div className="p-4 rounded-[8px] bg-surface-muted border border-line text-xs space-y-1">
                    <p className="font-semibold text-ink">{section.exampleBox.title}</p>
                    <p className="text-ink-muted leading-relaxed">{section.exampleBox.text}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </PageSection>

      {/* SECTION 3: Related Knowledge Guides */}
      <PageSection tone="white" borderTop>
        <div className="max-w-5xl mx-auto space-y-6">
          <h3 className="type-card-title text-lg border-b border-line pb-3">
            Related IT AMC Guides &amp; Best Practices
          </h3>

          <div className="grid sm:grid-cols-3 gap-5">
            {related.map((rel) => (
              <Link
                key={rel.slug}
                href={`/resources/${rel.slug}`}
                className="group p-5 rounded-[8px] bg-surface hover:bg-brand-subtle/30 border border-line hover:border-brand/40 transition-colors flex flex-col justify-between shadow-xs"
              >
                <div>
                  <span className="text-[11px] font-semibold text-brand block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-sm font-semibold text-ink group-hover:text-brand transition-colors">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-ink-muted mt-2 line-clamp-2">
                    {rel.excerpt}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-line flex items-center justify-between text-xs font-medium text-secondary group-hover:text-brand">
                  <span>Read Guide</span>
                  <Icon icon={ArrowRight} size="xs" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </PageSection>
    </MarketingChrome>
  );
}
