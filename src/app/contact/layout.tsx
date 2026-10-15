import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Mint AMC | Commercial Proposals & Technical Support Desk',
  description:
    'Connect with Mint AMC. Commercial proposals, technical support desk, incident triage, and corporate office correspondence.',
  alternates: {
    canonical: 'https://mintamc.com/contact',
  },
  openGraph: {
    title: 'Contact Mint AMC | Technical Support & Commercial Desks',
    description:
      'Reach our designated commercial, technical support, and corporate governance teams across India. Telephone: (+91) 800 7060 308.',
    url: 'https://mintamc.com/contact',
    siteName: 'Mint AMC',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Mint AMC | Technical Support & Proposals',
    description:
      'Submit an enterprise IT AMC scope request or connect with our Pan-India support desk.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
