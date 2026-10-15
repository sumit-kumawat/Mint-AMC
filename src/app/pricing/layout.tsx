import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Enterprise IT AMC Pricing Models & Coverage',
  description:
    'Transparent enterprise IT Annual Maintenance Contract pricing structures. Compare Comprehensive, Non-Comprehensive, and Resident Engineer tiers across India.',
  keywords: [
    'IT AMC Pricing',
    'Comprehensive AMC Cost',
    'Non-Comprehensive IT AMC',
    'Resident Engineer Cost India',
    'Server AMC Pricing India',
    'Corporate IT Maintenance Rates',
  ],
  alternates: {
    canonical: 'https://mintamc.com/pricing',
  },
  openGraph: {
    title: 'Enterprise IT AMC Pricing Models & Coverage | Mint AMC',
    description:
      'Transparent enterprise pricing framework for corporate desktop, server, storage, and network maintenance contracts with SLA guarantees.',
    url: 'https://mintamc.com/pricing',
    siteName: 'Mint AMC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise IT AMC Pricing Models & Coverage | Mint AMC',
    description:
      'Explore Comprehensive vs Non-Comprehensive IT AMC cost models and custom contract scopes.',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
