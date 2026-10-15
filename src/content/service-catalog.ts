import { megaMenuColumns, allServiceSlugs } from './mega-menu';

export type ServiceRecord = {
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  included: string[];
  howItWorks: string[];
  slaSummary: string;
  relatedSlugs: string[];
};

const customServiceDetails: Record<
  string,
  Partial<Pick<ServiceRecord, 'shortDescription' | 'included' | 'howItWorks' | 'slaSummary'>>
> = {
  'desktop-amc': {
    shortDescription:
      'Enterprise Desktop AMC covers preventive thermal cleaning, OS troubleshooting, peripheral diagnostics, and SLA-bound onsite engineer dispatch across branch and headquarters workstations.',
    included: [
      'Quarterly internal dust cleaning, thermal inspection, and power supply diagnostics',
      'OS stability troubleshooting, driver updates, and domain connectivity support',
      'Remote helpdesk resolution plus Next-Business-Day (NBD) or 4-hour metro onsite dispatch',
      'Asset serial tracking, health scoring, and OEM warranty claim coordination',
    ],
  },
  'laptop-amc': {
    shortDescription:
      'Corporate Laptop AMC keeps enterprise notebooks reliable with battery health diagnostics, thermal servicing, OS hardening, and priority remote and onsite field support.',
    included: [
      'Scheduled preventive diagnostics for thermal throttling, SSD health, and battery wear',
      'Priority remote desk support for VPN, endpoint agents, and OS stability',
      'Onsite engineer dispatch across PAN-India offices for hardware diagnostics and OS recovery',
      'OEM warranty claim coordination alongside out-of-warranty maintenance support',
    ],
  },
  'printer-mfp-amc': {
    shortDescription:
      'Multi-Function Printer (MFP) & Enterprise Printer AMC ensures smooth document workflows with roller cleaning, calibration, network print-server support, and onsite diagnostics.',
    included: [
      'Quarterly roller cleaning, pickup assembly inspection, and fuser unit calibration',
      'Network print queue, SMB scan-to-folder, and print driver troubleshooting',
      'Onsite break-fix engineer dispatch for paper jams, feed faults, and error codes',
      'Preventive maintenance sign-off logs and OEM service coordination',
    ],
  },
  'scanner-peripheral-amc': {
    shortDescription:
      'High-speed document scanners, barcode terminals, desktop UPS units, and workstation peripherals maintained under a unified SLA for branches, warehouses, and offices.',
    included: [
      'Optical sensor cleaning, ADF roller alignment, and calibration for high-volume scanners',
      'Desktop UPS battery load testing and peripheral interface troubleshooting',
      'Driver, TWAIN/WIA profile, and workstation integration support',
      'Centralised ticket logging and quarterly preventive inspection schedules',
    ],
  },
  'network-equipment-amc': {
    shortDescription:
      'Core and access layer network maintenance for enterprise L2/L3 switches, branch routers, SD-WAN appliances, and rack interconnects backed by active network telemetry.',
    included: [
      'Configuration backup automation, VLAN/routing validation, and firmware lifecycle audits',
      'Active SNMP port health, packet loss, and bandwidth threshold monitoring',
      'Priority onsite engineer dispatch for switch or router fault isolation',
      'Quarterly physical rack inspection, PSU redundancy checks, and airflow verification',
    ],
  },
  'wifi-wireless-amc': {
    shortDescription:
      'Enterprise Wi-Fi & Wireless Controller AMC delivering dead-zone remediation, RF channel optimization, AP firmware governance, and seamless roaming reliability.',
    included: [
      'Access Point (AP) health checks, PoE budget verification, and controller redundancy audits',
      'RF interference analysis, channel balancing, and SSID security policy validation',
      'Onsite AP diagnostics, ceiling/wall mount inspection, and patch-lead testing',
      'Continuous uptime monitoring with automated alert routing and engineer dispatch',
    ],
  },
  'structured-cabling-amc': {
    shortDescription:
      'Structured copper and fiber-optic backbone maintenance, patch panel dressing, continuity testing, and port labeling for offices and server rooms.',
    included: [
      'Quarterly patch panel dressing, rack cable organization, and port mapping audits',
      'Fault isolation, RJ45/keystone re-termination, and fiber patch cord testing',
      'Identification and cleanup of disconnected patch runs in MDF/IDF closets',
      'Updated rack elevation diagrams and port-to-workstation documentation',
    ],
  },
  'firewall-utm-amc': {
    shortDescription:
      'Next-Gen Firewall (NGFW) & UTM AMC covering HA cluster health, VPN tunnel stability, rulebase hygiene, security firmware patching, and prioritized P1 incident response.',
    included: [
      'High-Availability (HA) active-passive failover verification and config backups',
      'Critical CVE firmware patching, IPS/UTM signature checks, and SSL-VPN support',
      'Priority engineer acknowledgement for critical WAN/tunnel down alerts with L3 escalation',
      'Periodic firewall rule audit and compliance documentation for security reviews',
    ],
  },
  'server-amc': {
    shortDescription:
      'Mission-critical physical rack, tower, and blade server AMC across Dell PowerEdge, HPE ProLiant, Lenovo ThinkSystem, and Cisco UCS estates.',
    included: [
      'Out-of-band iDRAC/iLO/IMM health monitoring, RAID array checks, and thermal profiling',
      'BIOS, storage controller, and hypervisor (VMware ESXi, Hyper-V, KVM) patch governance',
      'Priority onsite field engineering response for critical server outages',
      'Quarterly physical deep-cleaning, redundant PSU testing, and predictive disk alerts',
    ],
  },
  'storage-san-nas-amc': {
    shortDescription:
      'Enterprise SAN, NAS, and backup appliance maintenance with proactive SMART disk telemetry, controller multipath validation, and L3 diagnostic support.',
    included: [
      'LUN health, fibre-channel / iSCSI multipath redundancy, and controller cache checks',
      'Proactive disk health monitoring and guided RAID rebuild oversight',
      'Storage OS firmware stability reviews and snapshot schedule verification',
      'Priority escalation bridge with storage specialists for data-access incidents',
    ],
  },
  'data-centre-infrastructure-amc': {
    shortDescription:
      'Facility and rack-level Data Centre AMC covering server cabinets, precision PDUs, environmental sensors, structured fiber, and scheduled preventive maintenance.',
    included: [
      'Rack PDU load balancing, dual-feed power verification, and thermal hotspot audits',
      'Environmental sensor checks (temperature, humidity, leak detection, and airflow)',
      'Scheduled quarterly preventive maintenance with controlled change windows',
      'Audit-ready compliance reports, incident RCA documentation, and SLA governance',
    ],
  },
  'cloud-infrastructure-support': {
    shortDescription:
      'Hybrid cloud and virtualized infrastructure operational support covering VM health, backup verification, site-to-cloud VPN connectivity, and proactive alert triage.',
    included: [
      'Continuous monitoring of hybrid cloud workloads, virtual machines, and storage snapshots',
      'Site-to-site IPsec VPN link monitoring and failover troubleshooting',
      'OS patching, resource utilization reviews, and backup restoration testing',
      'Unified incident ticketing across on-premise hardware and cloud workloads',
    ],
  },
  'monitoring-noc': {
    shortDescription:
      'Proactive infrastructure monitoring via SNMP, ICMP, WMI, and syslog — detecting and triaging infrastructure anomalies before business impact occurs.',
    included: [
      'Real-time telemetry for servers, switches, firewalls, WAN links, and UPS systems',
      'Rapid P1 incident acknowledgement, automated runbook triage, and engineer dispatch',
      'ISP link-down coordination and third-party vendor docket management',
      'Monthly SLA compliance, incident telemetry, and availability audit reports',
    ],
  },
  'software-os-support': {
    shortDescription:
      'System software, Windows/Linux server OS, Active Directory, DNS/DHCP, and virtualization hypervisor maintenance for stable enterprise operations.',
    included: [
      'Active Directory, Group Policy, DNS, DHCP, and file-server health maintenance',
      'Windows Server and Enterprise Linux (RHEL, Ubuntu, Rocky) patch and kernel governance',
      'Hypervisor cluster troubleshooting, VM migration, and crash dump root-cause analysis',
      'Scheduled maintenance window execution with documented rollback procedures',
    ],
  },
  'cybersecurity-support': {
    shortDescription:
      'Operational endpoint and infrastructure security maintenance including EDR/AV health, patch compliance, firewall auditing, and incident containment support.',
    included: [
      'Endpoint Detection & Response (EDR) / Antivirus agent deployment and signature verification',
      'Monthly OS and firmware vulnerability remediation across servers and endpoints',
      'Access control, USB lockdown policy, and perimeter firewall rulebase review',
      'Rapid isolation and recovery assistance during security alerts',
    ],
  },
  'remote-hands': {
    shortDescription:
      'On-demand and retained Smart Hands & Remote Hands engineering across colocation data centres and unattended regional server rooms PAN-India.',
    included: [
      'Physical equipment racking, stacking, de-racking, and structured cable patching',
      'Visual port/LED verification, console cable attachment, and hard power cycling',
      'Physical port inspection, transceiver seating verification, and guided hardware diagnostics',
      'Media handling, vendor escort coordination, and physical asset inventory verification',
    ],
  },
  'disaster-recovery': {
    shortDescription:
      'Disaster Recovery (DR) readiness, backup integrity verification, replication link monitoring, and scheduled failover drill execution for business continuity.',
    included: [
      'Daily/weekly backup job verification and backup storage health monitoring',
      'Bi-annual or quarterly DR failover and failback drill execution with runbook updates',
      'RTO and RPO alignment reviews across primary and secondary sites',
      'Emergency onsite and remote engineering mobilization during declared DR events',
    ],
  },
};

function makeService(slug: string, title: string, category: string): ServiceRecord {
  const sameCategorySlugs =
    megaMenuColumns
      .find((c) => c.heading === category)
      ?.links.map((l) => l.slug)
      .filter((s) => s !== slug) ?? [];
  const otherSlugs = allServiceSlugs.filter((s) => s !== slug && !sameCategorySlugs.includes(s));
  const relatedSlugs = [...sameCategorySlugs, ...otherSlugs].slice(0, 3);
  const custom = customServiceDetails[slug] ?? {};

  return {
    slug,
    title,
    category,
    shortDescription:
      custom.shortDescription ??
      `${title} from Mint AMC covers preventive maintenance, remote helpdesk troubleshooting, and SLA-backed engineer dispatch for ${category.toLowerCase()}. Contracts include engineering labor, diagnostics, and preventive maintenance, with optional 24/7 NOC monitoring.`,
    included: custom.included ?? [
      'Preventive maintenance visits per contract (quarterly or as agreed)',
      'Remote triage plus onsite engineer dispatch within your SLA tier',
      'Firmware, driver, and configuration support within scope',
      'Ticket tracking, monthly service summaries, and OEM warranty coordination',
    ],
    howItWorks: custom.howItWorks ?? [
      'Site survey, serial baseline, and asset register for all in-scope equipment',
      'AMC activation with SLA matrix, preventive maintenance calendar, and escalation contacts',
      'Run-state operations: scheduled PM visits, 24/7 incident handling, and quarterly governance reviews',
    ],
    slaSummary:
      custom.slaSummary ??
      'Standard tiers include remote helpdesk triage within 15–30 minutes and Next-Business-Day (NBD) or 4-hour metro onsite dispatch. Enterprise programmes add 24/7 NOC integration and custom RTO alignment documented in your Master SLA. Note: Physical hardware replacement and consumables are excluded and handled via OEM warranty or billed separately.',
    relatedSlugs,
  };
}

const titleBySlug: Record<string, { title: string; category: string }> = {};

for (const col of megaMenuColumns) {
  for (const link of col.links) {
    titleBySlug[link.slug] = {
      title: link.label,
      category: col.heading,
    };
  }
}

export const servicesBySlug: Record<string, ServiceRecord> = Object.fromEntries(
  allServiceSlugs.map((slug) => {
    const meta = titleBySlug[slug];
    return [slug, makeService(slug, meta.title, meta.category)];
  }),
);
