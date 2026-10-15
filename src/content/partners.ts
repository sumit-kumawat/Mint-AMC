export type PartnerItem = {
  name: string;
  logoUrl: string;
  alt: string;
};

export const partnersContent = {
  eyebrow: 'Ecosystem & Platform Alignment',
  heading: 'Our Technology Partners',
  subtitle:
    'We support, maintain, and coordinate across enterprise hardware, networking, security, operating system, and public procurement ecosystems.',
  partners: [
    {
      name: 'Quick Heal',
      logoUrl: 'https://mintamc.com/assets/partner/QuickHeal.png',
      alt: 'Quick Heal logo',
    },
    {
      name: 'Acer',
      logoUrl: 'https://mintamc.com/assets/partner/acer.png',
      alt: 'Acer logo',
    },
    {
      name: 'Cisco',
      logoUrl: 'https://mintamc.com/assets/partner/cisco.webp',
      alt: 'Cisco logo',
    },
    {
      name: 'Dell',
      logoUrl: 'https://mintamc.com/assets/partner/dell.webp',
      alt: 'Dell logo',
    },
    {
      name: 'GeM',
      logoUrl: 'https://mintamc.com/assets/partner/gem.webp',
      alt: 'GeM Government e-Marketplace logo',
    },
    {
      name: 'HP',
      logoUrl: 'https://mintamc.com/assets/partner/hp.webp',
      alt: 'HP logo',
    },
    {
      name: 'Microsoft',
      logoUrl: 'https://mintamc.com/assets/partner/microsoft.png',
      alt: 'Microsoft logo',
    },
  ] satisfies PartnerItem[],
};
