import React from 'react';
import { siteContent } from '@/content/site';

/**
 * Organization Schema.org JSON-LD
 * Provides rich business credentials to Google and Bing
 */
export function OrganizationJsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Mint AMC',
    legalName: 'Mint AMC',
    url: siteContent.siteUrl,
    logo: 'https://mintamc.com/assets/img/logo.png',
    description:
      'Enterprise IT Annual Maintenance Contracts (AMC) for servers, networks, desktops, laptops, firewalls, and scheduled preventive maintenance across India.',
    telephone: siteContent.contact.phone,
    email: siteContent.contact.businessEmail,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'B404 Atulya Nirman, Punawale',
      addressLocality: 'Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411033',
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteContent.contact.phone,
        email: 'support@mintamc.com',
        contactType: 'technical support',
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'IN',
      },
      {
        '@type': 'ContactPoint',
        email: 'info@mintamc.com',
        contactType: 'sales and procurement',
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'IN',
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Service Schema.org JSON-LD for service catalog & detail pages
 */
export function ServiceJsonLd({
  name,
  description,
  serviceType = 'IT Infrastructure Maintenance',
  url,
}: {
  name: string;
  description: string;
  serviceType?: string;
  url: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType,
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: 'Mint AMC',
      url: siteContent.siteUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'India',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Enterprise IT AMC Portfolio',
    },
    url,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * FAQPage Schema.org JSON-LD for pages with interactive FAQ accordions
 */
export function FaqPageJsonLd({
  faqs,
}: {
  faqs: { question: string; answer: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * BreadcrumbList Schema.org JSON-LD for navigation breadcrumbs
 */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; item: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((crumb, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * TechArticle Schema.org JSON-LD for Knowledge Centre Guides
 */
export function TechArticleJsonLd({
  headline,
  description,
  datePublished,
  url,
  category,
}: {
  headline: string;
  description: string;
  datePublished: string;
  url: string;
  category: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline,
    description,
    datePublished,
    url,
    articleSection: category,
    author: {
      '@type': 'Organization',
      name: 'Mint AMC Engineering Desk',
      url: siteContent.siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Mint AMC',
      logo: {
        '@type': 'ImageObject',
        url: 'https://mintamc.com/assets/img/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
