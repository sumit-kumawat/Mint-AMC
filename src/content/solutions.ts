export const solutionsContent = {
  heroTitle: 'IT AMC Solutions by Industry and Operational Need',
  heroSubtitle:
    'Whether you manage a single corporate office or a multi-state enterprise estate, Mint AMC aligns preventive maintenance, engineering dispatch, and multi-vendor technical support to your operational risk profile.',
  byIndustryTitle: 'Solutions by Industry',
  industries: [
    {
      id: 'enterprise',
      title: 'Enterprise Multi-Site AMC',
      body: 'Unified master agreement, location-specific SLA tiers, centralized helpdesk, and executive reporting across regions.',
    },
    {
      id: 'bfsi',
      title: 'BFSI & Financial Institutions',
      body: 'Priority SLA tiers, security policy coordination, and audit-ready maintenance logs for regulated environments.',
    },
    {
      id: 'smb',
      title: 'SMB & Branch Offices',
      body: 'Right-sized Essential and Professional tiers with Next-Business-Day onsite support and centralised remote helpdesk.',
    },
    {
      id: 'healthcare',
      title: 'Healthcare & Clinical Uptime',
      body: 'Uptime-focused network, server, and endpoint maintenance with prioritized incident support for hospital systems.',
    },
    {
      id: 'education',
      title: 'Education & Campus IT',
      body: 'Computer lab, classroom, and campus Wi-Fi maintenance with scheduled PM visits aligned to academic breaks.',
    },
    {
      id: 'government',
      title: 'Government & PSU Tenders',
      body: 'Compliance-ready documentation, defined escalation paths, and transparent commercial structures for public sector estates.',
    },
  ],
  byNeedTitle: 'Solutions by Operational Model',
  needs: [
    {
      id: 'comprehensive',
      title: 'Managed Full-Scope IT AMC',
      body: 'End-to-end engineering labor, quarterly PM, remote helpdesk, onsite dispatch, and OEM warranty coordination across your stack.',
    },
    {
      id: 'preventive',
      title: 'Preventive Maintenance (PM)',
      body: 'Scheduled quarterly physical inspection, thermal cleaning, and health audits to reduce unplanned hardware failures.',
    },
    {
      id: 'break-fix',
      title: 'Break-Fix & On-Call Engineering',
      body: 'Reactive field engineering and troubleshooting with defined response targets for non-contracted or legacy estates.',
    },
    {
      id: 'remote-hands',
      title: 'Data Centre Remote Hands & NOC',
      body: 'Colocation smart hands, guided rack tasks, and active SNMP/ICMP telemetry monitoring.',
    },
  ],
};

export type SolutionDetail = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  heroLead: string;
  highlights: string[];
  slaTier: string;
  deliverables: string[];
  faqs: { question: string; answer: string }[];
};

const solutionSlugAliases: Record<string, string> = {
  'enterprise-amc': 'enterprise',
  'bfsi-amc': 'bfsi',
  'smb-amc': 'smb',
  'healthcare-amc': 'healthcare',
  'education-amc': 'education',
  'government-amc': 'government',
  'full-scope-amc': 'comprehensive',
  'managed-amc': 'comprehensive',
  'preventive-maintenance': 'preventive',
  'pm-amc': 'preventive',
  'on-call': 'break-fix',
  'smart-hands': 'remote-hands',
};

export function getSolution(slug: string): SolutionDetail | undefined {
  const resolved = solutionSlugAliases[slug] ?? slug;
  return solutionDetailsMap[resolved];
}

export const solutionDetailsMap: Record<string, SolutionDetail> = {
  enterprise: {
    slug: 'enterprise',
    title: 'Enterprise Multi-Site AMC Solution',
    category: 'Enterprise & Financial',
    summary:
      'Unified PAN-India IT AMC governance for multi-location enterprises with tiered SLAs and centralized asset tracking.',
    heroLead:
      'Scale your infrastructure maintenance across multiple offices under one Master Service Agreement with dedicated escalation governance and contractual response times.',
    highlights: [
      'Single Master AMC Agreement covering multi-state operations',
      'Location-specific SLA tiers (Priority Response for HQ, NBD for regional branches)',
      'Centralised L1–L3 service desk and PAN-India field engineer dispatch',
      'Monthly SLA compliance reports & Quarterly Executive Reviews',
    ],
    slaTier: 'Priority Metro + Regional NBD SLA',
    deliverables: [
      'Centralized Technical Service Desk & Incident Management',
      'Quarterly Scheduled Preventive Maintenance across all sites',
      'OEM warranty docket management alongside out-of-warranty maintenance',
      'Asset lifecycle & end-of-support (EOSL) advisory reporting',
    ],
    faqs: [
      {
        question: 'Can we have different SLA response times for different locations?',
        answer:
          'Yes. Mint AMC allows tiering — for example, Priority response coverage for server rooms and critical HQs, and Next-Business-Day (NBD) coverage for regional branch offices.',
      },
      {
        question: 'How are OEM warranties managed under a unified AMC?',
        answer:
          'Mint AMC tracks active OEM warranties alongside out-of-warranty assets, acting as your single point of contact to log and coordinate manufacturer warranty claims.',
      },
    ],
  },
  bfsi: {
    slug: 'bfsi',
    title: 'BFSI & Financial Institutions AMC',
    category: 'Enterprise & Financial',
    summary:
      'Security-conscious, audit-aligned IT infrastructure maintenance for banks, NBFCs, insurance firms, and financial operations.',
    heroLead:
      'Maintain mission-critical financial networks, core servers, and branch workstations with disciplined field engineering, change documentation, and structured incident response.',
    highlights: [
      'Audit-aligned maintenance logs and documented change records',
      'NDA-bound field engineers for branch and server room visits',
      'Dedicated technical monitoring with structured P1 escalation bridge',
      'Proactive firmware patching and firewall rulebase hygiene',
    ],
    slaTier: 'Priority Corporate Incident SLA',
    deliverables: [
      'Server, firewall, SAN/NAS storage, and core switch maintenance support',
      'Regular firmware vulnerability patching and maintenance audit logs',
      'Disaster Recovery (DR) drill & failover runbook assistance',
      'Monthly SLA performance and incident root-cause (RCA) reports',
    ],
    faqs: [
      {
        question: 'Do your engineers follow change-management protocols for financial sites?',
        answer:
          'Yes. All preventive maintenance and firmware updates are executed within approved maintenance windows with documented pre- and post-change checklists.',
      },
    ],
  },
  smb: {
    slug: 'smb',
    title: 'SMB & Branch Office AMC Solution',
    category: 'Enterprise & Financial',
    summary:
      'Practical, predictable IT maintenance designed for growing businesses and distributed branch office networks.',
    heroLead:
      'Get structured enterprise IT maintenance without unnecessary overhead. Keep your office desktops, laptops, Wi-Fi, and printers operating reliably.',
    highlights: [
      'Transparent annual per-device or per-site maintenance schedules',
      'Next-Business-Day (NBD) onsite engineer dispatch',
      'Unlimited remote helpdesk troubleshooting during business hours',
      'Scheduled on-site Preventive Maintenance every quarter',
    ],
    slaTier: 'Essential / Professional NBD Business SLA',
    deliverables: [
      'Desktop & laptop preventive thermal care and OS troubleshooting',
      'Wi-Fi access point, router, firewall, and LAN switch support',
      'Antivirus health checks, OS patch verification, and printer queue fixes',
      'Quarterly PM sign-off reports and clear escalation contacts',
    ],
    faqs: [
      {
        question: 'What is included in the SMB AMC plan?',
        answer:
          'Our SMB programme covers preventive maintenance, remote helpdesk support, and onsite troubleshooting for desktops, laptops, printers, routers, switches, and office servers. Physical hardware replacement and consumables are billed separately.',
      },
    ],
  },
  healthcare: {
    slug: 'healthcare',
    title: 'Healthcare & Clinical Uptime AMC',
    category: 'Public & Healthcare',
    summary:
      'High-availability IT maintenance for hospital networks, clinical workstations, and healthcare server infrastructure.',
    heroLead:
      'Maintain reliable uptime for hospital LAN/Wi-Fi backbones, administrative servers, and clinical workstation fleets with priority field engineering.',
    highlights: [
      'Prioritized emergency triage for hospital network and server P1 tickets',
      'Careful on-site engineering protocols suited for clinical environments',
      'Proactive monitoring of core switches, firewalls, and server hosts',
      'Scheduled PM windows coordinated around outpatient hours',
    ],
    slaTier: 'Priority Healthcare Infrastructure SLA',
    deliverables: [
      'Clinical & administrative workstation maintenance and OS support',
      'Network backbone latency, VLAN, and Wi-Fi roaming optimization',
      'Server room UPS load verification and thermal health audits',
      'Strict confidentiality and documented maintenance audit trails',
    ],
    faqs: [
      {
        question: 'Do you offer round-the-clock support for hospital infrastructure?',
        answer:
          'Yes, our extended enterprise tier provides prioritized technical triage and coordinated emergency escalation for critical hospital network and server incidents.',
      },
    ],
  },
  education: {
    slug: 'education',
    title: 'Education & Campus IT AMC',
    category: 'Public & Healthcare',
    summary:
      'Structured annual maintenance for computer labs, campus-wide Wi-Fi networks, smart classrooms, and administrative servers.',
    heroLead:
      'Keep computer labs, faculty laptops, and campus Wi-Fi running reliably with preventive maintenance aligned to academic calendars.',
    highlights: [
      'Scheduled Preventive Maintenance executed during semester breaks',
      'High-density campus Wi-Fi & access point controller maintenance',
      'Bulk computer lab desktop, OS, and printer fleet support',
      'Predictable annual educational institution maintenance budgets',
    ],
    slaTier: 'Campus NBD / Extended Academic SLA',
    deliverables: [
      'Computer lab OS health checks and driver/software maintenance',
      'Core router, firewall, and campus switch maintenance',
      'Administrative server and storage health diagnostics',
      'Optional dedicated resident engineer for large university campuses',
    ],
    faqs: [
      {
        question: 'Can Preventive Maintenance visits be scheduled during vacation periods?',
        answer:
          'Yes. We align comprehensive lab and network preventive maintenance visits with semester breaks so classes and examinations are never disrupted.',
      },
    ],
  },
  government: {
    slug: 'government',
    title: 'Government & PSU IT AMC Programmes',
    category: 'Public & Healthcare',
    summary:
      'Transparent, documentation-ready IT maintenance contracts for public sector undertakings, municipal bodies, and government offices.',
    heroLead:
      'Structured IT maintenance governance with clear SLA definitions, physical preventive maintenance sign-offs, and multi-district coverage.',
    highlights: [
      'Comprehensive SLA compliance logs and audit documentation',
      'Multi-district field engineering coordination across India',
      'Clear non-comprehensive maintenance scope with zero hidden fees',
      'Dedicated escalation officer for department IT nodal heads',
    ],
    slaTier: 'Standard Government 8-Hour / NBD SLA',
    deliverables: [
      'Office desktop, laptop, printer, and scanner fleet maintenance',
      'Departmental server, LAN cabling, and firewall maintenance',
      'Quarterly physical PM completion certificates signed on site',
      'Consolidated monthly ticket and uptime compliance reports',
    ],
    faqs: [
      {
        question: 'Do you provide signed physical PM reports for government audits?',
        answer:
          'Yes. Every quarterly preventive maintenance visit includes an asset-by-asset checklist signed off by the site administrator for audit records.',
      },
    ],
  },
  comprehensive: {
    slug: 'comprehensive',
    title: 'Managed Full-Scope IT AMC',
    category: 'Maintenance Models',
    summary:
      'End-to-end annual IT maintenance covering preventive care, unlimited remote helpdesk, onsite L1–L3 engineering, and OEM warranty coordination.',
    heroLead:
      'Place your entire IT infrastructure under one accountable maintenance agreement covering engineering labor, scheduled preventive care, remote troubleshooting, and OEM vendor coordination.',
    highlights: [
      'Covers desktops, laptops, servers, storage, switches, firewalls, and printers',
      'Unlimited remote helpdesk + SLA-bound onsite field engineer dispatch',
      '4 scheduled quarterly Preventive Maintenance (PM) audits per year',
      'Single point of contact for OEM warranty claims and vendor coordination',
    ],
    slaTier: 'Tailored Metro & Regional Branch SLA',
    deliverables: [
      'Complete asset baseline registration and health scoring during onboarding',
      'L1–L3 remote and onsite troubleshooting across hardware and OS layers',
      'Quarterly thermal cleaning, firmware governance, and rack hygiene',
      'Transparent scope: engineering & maintenance included (hardware replacement excluded)',
    ],
    faqs: [
      {
        question: 'Does Managed Full-Scope IT AMC include physical hardware replacement?',
        answer:
          'Mint AMC provides Maintenance & Engineering Support (Non-Comprehensive AMC). All engineering labor, preventive maintenance, remote helpdesk, onsite troubleshooting, and OEM warranty coordination are included. Physical hardware replacement and consumables are excluded and either claimed under active OEM warranty or procured separately upon your approval.',
      },
    ],
  },
  preventive: {
    slug: 'preventive',
    title: 'Preventive Maintenance (PM) AMC',
    category: 'Maintenance Models',
    summary:
      'Proactive quarterly physical inspection, thermal servicing, and diagnostic audits to prevent unexpected infrastructure failures.',
    heroLead:
      'Extend hardware lifespan and prevent unplanned downtime with systematic physical cleaning, thermal profiling, firmware checks, and log analysis.',
    highlights: [
      '4 Scheduled On-Site Preventive Maintenance visits per year',
      'Internal dust removal, fan airflow checks, and thermal inspection',
      'RAID array health, disk SMART telemetry, and system log diagnostics',
      'Firmware & BIOS stability checks for servers, switches, and firewalls',
    ],
    slaTier: 'Scheduled Quarterly PM + Business Hours Helpdesk',
    deliverables: [
      'Physical inspection & cleaning of desktops, laptops, printers, and server racks',
      'Detailed PM sign-off certificate with asset-by-asset health status',
      'Early warning advisories for degrading disks, batteries, or power supplies',
      'Server room airflow, PDU load balance, and patch panel hygiene review',
    ],
    faqs: [
      {
        question: 'How often are Preventive Maintenance visits conducted?',
        answer:
          'Standard PM visits take place quarterly (every 90 days), with monthly schedules available for high-density server rooms and industrial environments.',
      },
    ],
  },
  'break-fix': {
    slug: 'break-fix',
    title: 'Break-Fix & On-Call Engineering',
    category: 'Specialised Operations',
    summary:
      'SLA-backed reactive troubleshooting and on-site field engineer dispatch for specific incidents or legacy equipment.',
    heroLead:
      'Rapid remote triage and on-site field engineering dispatch to diagnose and restore degraded IT systems across India.',
    highlights: [
      'Defined response SLAs for incident triage and onsite engineer arrival',
      'Qualified L1 to L3 field engineers for endpoints, networks, and servers',
      'Thorough fault isolation, OS recovery, and configuration restoration',
      'Seamless upgrade path to an annual Preventive + Break-Fix AMC',
    ],
    slaTier: '4-Hour Metro / Next-Business-Day Dispatch',
    deliverables: [
      'Onsite hardware diagnostic and fault isolation',
      'Operating system recovery, driver repair, and network restoration',
      'Detailed service job sheet and root-cause documentation',
      'Guidance on OEM warranty claim or part procurement if hardware is faulty',
    ],
    faqs: [
      {
        question: 'How fast can an engineer arrive on site for a break-fix incident?',
        answer:
          'For contracted customers, onsite response ranges from 4 hours in major metros to Next Business Day (NBD) depending on your selected SLA tier.',
      },
    ],
  },
  'remote-hands': {
    slug: 'remote-hands',
    title: 'Data Centre Remote Hands & NOC Support',
    category: 'Specialised Operations',
    summary:
      'On-site smart hands for colocation facilities and automated infrastructure telemetry.',
    heroLead:
      'Extend your infrastructure team into colocation data centres and remote server rooms across India without stationing full-time staff on site.',
    highlights: [
      'Data centre smart hands for cable patching, power cycles, and rack tasks',
      'Automated ping, port, and SNMP v3 infrastructure monitoring',
      'Guided troubleshooting bridge with your senior systems architects',
      'Physical LED verification, console attachment, and vendor escort',
    ],
    slaTier: 'Priority Data Centre Response SLA',
    deliverables: [
      'Physical server power cycling, console access, and visual LED checks',
      'Fiber/Ethernet patching, port testing, and structured cable labeling',
      'Guided diagnostics and OEM engineer escort inside colocation cages',
      'Proactive SNMP & syslog alert triage and engineer escalation',
    ],
    faqs: [
      {
        question: 'What tasks are covered under Data Centre Remote Hands?',
        answer:
          'Remote Hands covers physical rack inspection, cable patching, console connection, power cycling, transceiver/port checks, and assisting your remote L3 team during maintenance or troubleshooting windows.',
      },
    ],
  },
};

export function getSolutionDetail(slug: string) {
  return solutionDetailsMap[slug];
}
