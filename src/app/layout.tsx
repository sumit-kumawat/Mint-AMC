import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { QuoteModalProvider } from '@/components/ui/request-quote-modal';
import ProgressIndicator from '@/components/ui/progress-indicator';
import { OrganizationJsonLd } from '@/components/seo/structured-data';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL('https://mintamc.com'),
  title: {
    default: 'Mint AMC | Enterprise IT Annual Maintenance Contracts',
    template: '%s | Mint AMC',
  },
  description:
    'Pan-India Enterprise IT Annual Maintenance Contracts (AMC) for servers, networks, storage, desktops, and data centers. Fast SLAs & multi-vendor OEM support.',
  keywords: [
    'IT AMC India',
    'Enterprise IT Annual Maintenance Contract',
    'Server AMC Delhi NCR Mumbai Bangalore',
    'Data Centre Infrastructure AMC',
    'Network Switch Router AMC',
    'Firewall AMC Fortinet Sophos',
    'Preventive IT Maintenance Services',
    'Pan India Field Engineering AMC',
  ],
  alternates: {
    canonical: 'https://mintamc.com',
  },
  icons: {
    icon: [
      { url: 'https://mintamc.com/assets/img/icon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    shortcut: ['https://mintamc.com/assets/img/icon.png'],
    apple: [{ url: 'https://mintamc.com/assets/img/icon.png' }],
  },
  openGraph: {
    title: 'Mint AMC | Enterprise IT Annual Maintenance Contracts',
    description:
      'Scheduled preventive maintenance, multi-vendor OEM hardware coordination, and structured technical support across your enterprise IT stack.',
    url: 'https://mintamc.com',
    siteName: 'Mint AMC',
    type: 'website',
    images: [
      {
        url: 'https://mintamc.com/assets/img/logo.png',
        alt: 'Mint AMC Official Logo',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mint AMC | Enterprise IT Annual Maintenance Contracts',
    description:
      'Structured IT AMC with responsive technical triage, scheduled quarterly preventive care, and multi-OEM hardware support.',
    images: ['https://mintamc.com/assets/img/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sans.variable}>
      <head>
        <link rel="preconnect" href="https://mintamc.com" />
        <link rel="dns-prefetch" href="https://mintamc.com" />
        <link rel="icon" href="https://mintamc.com/assets/img/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="https://mintamc.com/assets/img/icon.png" />
        <OrganizationJsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-surface text-ink font-sans antialiased selection:bg-brand/15 selection:text-ink">
        <ProgressIndicator />
        <QuoteModalProvider>{children}</QuoteModalProvider>
      </body>
    </html>
  );
}
