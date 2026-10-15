import type { LucideIcon } from 'lucide-react';
import {
  Monitor,
  Laptop,
  Printer,
  HardDrive,
  Network,
  Wifi,
  Cable,
  Shield,
  Server,
  Database,
  Building2,
  Cloud,
  Activity,
  Code,
  Lock,
  Wrench,
  RotateCcw,
  Briefcase,
  Landmark,
  Store,
  Stethoscope,
  GraduationCap,
  FileCheck,
  CheckSquare,
  Clock,
} from 'lucide-react';

export type MegaMenuLink = {
  slug: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export type MegaMenuColumn = {
  id: string;
  heading: string;
  description: string;
  icon: LucideIcon;
  links: MegaMenuLink[];
};

export const megaMenuColumns: MegaMenuColumn[] = [
  {
    id: 'end-user',
    heading: 'End-User IT',
    description: 'Workstations, corporate laptops, printers, and branch peripherals.',
    icon: Monitor,
    links: [
      {
        slug: 'desktop-amc',
        label: 'Desktop AMC',
        description: 'Preventive care & OS support for office workstations',
        icon: Monitor,
      },
      {
        slug: 'laptop-amc',
        label: 'Laptop AMC',
        description: 'Diagnostics & field support for enterprise notebooks',
        icon: Laptop,
      },
      {
        slug: 'printer-mfp-amc',
        label: 'Printer & MFP AMC',
        description: 'Roller servicing, calibration & queue troubleshooting',
        icon: Printer,
      },
      {
        slug: 'scanner-peripheral-amc',
        label: 'Scanner & Peripheral AMC',
        description: 'Scanners, desktop UPS & terminal maintenance',
        icon: HardDrive,
      },
    ],
  },
  {
    id: 'network',
    heading: 'Network & Security',
    description: 'Core switching, enterprise Wi-Fi, structured cabling, and firewalls.',
    icon: Network,
    links: [
      {
        slug: 'network-equipment-amc',
        label: 'Network Equipment AMC',
        description: 'L2/L3 switches, routers & config backup governance',
        icon: Network,
      },
      {
        slug: 'wifi-wireless-amc',
        label: 'WiFi & Wireless AMC',
        description: 'Access point health, RF tuning & controller support',
        icon: Wifi,
      },
      {
        slug: 'structured-cabling-amc',
        label: 'Structured Cabling AMC',
        description: 'Copper/fiber continuity testing & patch panel audits',
        icon: Cable,
      },
      {
        slug: 'firewall-utm-amc',
        label: 'Firewall & UTM AMC',
        description: 'HA cluster checks, VPN stability & firmware patching',
        icon: Shield,
      },
    ],
  },
  {
    id: 'infrastructure',
    heading: 'Servers & Data Centre',
    description: 'Physical servers, storage arrays, rack infrastructure, and hybrid cloud.',
    icon: Server,
    links: [
      {
        slug: 'server-amc',
        label: 'Server AMC',
        description: 'Rack/blade diagnostics, RAID checks & hypervisor care',
        icon: Server,
      },
      {
        slug: 'storage-san-nas-amc',
        label: 'Storage & SAN/NAS AMC',
        description: 'SAN/NAS health monitoring & multipath validation',
        icon: Database,
      },
      {
        slug: 'data-centre-infrastructure-amc',
        label: 'Data Centre Infrastructure AMC',
        description: 'Rack PDUs, thermal audits & scheduled facility PM',
        icon: Building2,
      },
      {
        slug: 'cloud-infrastructure-support',
        label: 'Cloud Infrastructure Support',
        description: 'Hybrid workload monitoring & VPN link management',
        icon: Cloud,
      },
    ],
  },
  {
    id: 'monitoring',
    heading: 'Monitoring & Operations',
    description: 'Proactive remote monitoring, OS governance, smart hands, and DR.',
    icon: Activity,
    links: [
      {
        slug: 'monitoring-noc',
        label: 'Remote Monitoring & Telemetry',
        description: 'SNMP/ICMP telemetry & priority alert triage',
        icon: Activity,
      },
      {
        slug: 'software-os-support',
        label: 'Software & OS Support',
        description: 'Windows/Linux server OS, AD, DNS & patch support',
        icon: Code,
      },
      {
        slug: 'cybersecurity-support',
        label: 'Cybersecurity Support',
        description: 'EDR health, vulnerability patching & policy audits',
        icon: Lock,
      },
      {
        slug: 'remote-hands',
        label: 'Remote Hands & Smart Hands',
        description: 'On-site colocation assistance & guided troubleshooting',
        icon: Wrench,
      },
      {
        slug: 'disaster-recovery',
        label: 'Disaster Recovery Support',
        description: 'Backup verification & scheduled failover drill support',
        icon: RotateCcw,
      },
    ],
  },
];

export const allServiceSlugs = megaMenuColumns.flatMap((c) => c.links.map((l) => l.slug));

export const solutionsMegaMenuColumns: MegaMenuColumn[] = [
  {
    id: 'by-industry-1',
    heading: 'Enterprise & Financial',
    description: 'Multi-location corporate estates, banking, and growing branches.',
    icon: Briefcase,
    links: [
      {
        slug: 'enterprise',
        label: 'Enterprise Multi-Site AMC',
        description: 'Unified master agreement across PAN-India offices',
        icon: Briefcase,
      },
      {
        slug: 'bfsi',
        label: 'BFSI & Financial Institutions',
        description: 'Audit-aligned maintenance for regulated environments',
        icon: Landmark,
      },
      {
        slug: 'smb',
        label: 'SMB & Branch Office AMC',
        description: 'Right-sized preventive care & helpdesk for branches',
        icon: Store,
      },
    ],
  },
  {
    id: 'by-industry-2',
    heading: 'Public & Healthcare',
    description: 'Hospitals, educational campuses, and government tenders.',
    icon: Stethoscope,
    links: [
      {
        slug: 'healthcare',
        label: 'Healthcare & Clinical Uptime',
        description: 'Prioritized support for hospital IT & networks',
        icon: Stethoscope,
      },
      {
        slug: 'education',
        label: 'Education & Campus IT',
        description: 'Campus Wi-Fi, labs & academic break PM schedules',
        icon: GraduationCap,
      },
      {
        slug: 'government',
        label: 'Government & PSU Tenders',
        description: 'Documented SLA compliance & multi-district support',
        icon: FileCheck,
      },
    ],
  },
  {
    id: 'by-need-1',
    heading: 'Maintenance Models',
    description: 'Structured annual maintenance and scheduled preventive care.',
    icon: CheckSquare,
    links: [
      {
        slug: 'comprehensive',
        label: 'Managed Full-Scope IT AMC',
        description: 'End-to-end engineering, helpdesk, PM & OEM coordination',
        icon: CheckSquare,
      },
      {
        slug: 'preventive',
        label: 'Preventive Maintenance (PM)',
        description: 'Quarterly physical inspection, thermal & health audits',
        icon: Clock,
      },
    ],
  },
  {
    id: 'by-need-2',
    heading: 'Specialised Operations',
    description: 'On-call field dispatch and data centre remote hands.',
    icon: Wrench,
    links: [
      {
        slug: 'break-fix',
        label: 'Break-Fix & On-Call Engineering',
        description: 'SLA-backed reactive field engineering dispatch',
        icon: Wrench,
      },
      {
        slug: 'remote-hands',
        label: 'Data Centre Remote Hands & NOC',
        description: 'Colocation smart hands & active telemetry monitoring',
        icon: Server,
      },
    ],
  },
];

export const allSolutionSlugs = solutionsMegaMenuColumns.flatMap((c) => c.links.map((l) => l.slug));
