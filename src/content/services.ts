import { servicesBySlug, type ServiceRecord } from './service-catalog';

export type { ServiceRecord } from './service-catalog';
export { servicesBySlug } from './service-catalog';
export { megaMenuColumns } from './mega-menu';

const serviceSlugAliases: Record<string, string> = {
  'printer-amc': 'printer-mfp-amc',
  'scanner-amc': 'scanner-peripheral-amc',
  'peripheral-amc': 'scanner-peripheral-amc',
  'network-amc': 'network-equipment-amc',
  'wifi-amc': 'wifi-wireless-amc',
  'wireless-amc': 'wifi-wireless-amc',
  'cabling-amc': 'structured-cabling-amc',
  'firewall-amc': 'firewall-utm-amc',
  'utm-amc': 'firewall-utm-amc',
  'storage-amc': 'storage-san-nas-amc',
  'san-nas-amc': 'storage-san-nas-amc',
  'data-centre-amc': 'data-centre-infrastructure-amc',
  'data-center-amc': 'data-centre-infrastructure-amc',
  'datacenter-amc': 'data-centre-infrastructure-amc',
  'cloud-support': 'cloud-infrastructure-support',
  'noc-monitoring': 'monitoring-noc',
  'os-support': 'software-os-support',
  'cybersecurity-amc': 'cybersecurity-support',
  'smart-hands': 'remote-hands',
  'dr-support': 'disaster-recovery',
};

export function getService(slug: string): ServiceRecord | undefined {
  const resolved = serviceSlugAliases[slug] ?? slug;
  return servicesBySlug[resolved];
}

export const servicesPageContent = {
  heroTitle: 'Enterprise IT Infrastructure AMC Services',
  heroSubtitle:
    'Structured Annual Maintenance Contracts across end-user IT, networking, servers, and data centre infrastructure — one accountable partner, PAN-India delivery.',
};

export const servicePageLabels = {
  includedHeading: 'What Is Included',
  howHeading: 'How Delivery Works',
  slaHeading: 'SLA Summary',
  relatedHeading: 'Related AMC Services',
  cta: 'Request a Proposal',
};
