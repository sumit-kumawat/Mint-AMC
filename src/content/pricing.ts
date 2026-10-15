export const pricingContent = {
  heroBadge: 'DPIIT-recognised · Transparent Commercial Governance',
  heroTitle: 'Tailored IT AMC Pricing Built Around Your Infrastructure',
  heroSubtitle:
    'IT Annual Maintenance Contract costs depend on your device mix, site locations, coverage hours, and response SLAs. We provide clear, itemised commercial proposals with zero hidden dispatch charges.',
  heroPrimaryCta: 'Request a Proposal',
  heroSecondaryCta: 'Read Pricing Guide',

  modelExplanationTitle: 'How Mint AMC Pricing Works',
  modelExplanationBody:
    'Every enterprise IT environment differs in hardware density, criticality, and geographic spread. Rather than publishing arbitrary fixed rates that fail to reflect your actual infrastructure, Mint AMC builds a transparent per-asset or per-site commercial schedule after reviewing your baseline inventory.',
  modelNotice:
    'Service Scope Note: Mint AMC provides Maintenance, Preventive Care, Troubleshooting & Engineering Support (Non-Comprehensive AMC). Physical hardware replacement, spare parts, and consumables are not included in AMC fees and remain covered via active OEM warranties or billed separately upon client approval.',

  factorsTitle: 'Key Factors That Determine Your IT AMC Cost',
  factorsSubtitle:
    'Our solutions engineering team evaluates five operational dimensions when preparing your annual maintenance proposal:',
  pricingFactors: [
    {
      title: '1. Device Count & Asset Density',
      description:
        'Total number of desktops, laptops, printers, switches, firewalls, and servers per site. Higher concentration of assets at a single location reduces per-device servicing overhead.',
    },
    {
      title: '2. Equipment Types & Technical Complexity',
      description:
        'Standard end-user workstations require routine OS and thermal care, whereas enterprise rack servers, SAN storage, and HA firewalls require senior L2/L3 systems engineering.',
    },
    {
      title: '3. Geographic Spread & Number of Locations',
      description:
        'Single-site headquarters vs. distributed multi-state branch offices across tier-1 metros, tier-2 cities, and industrial corridors.',
    },
    {
      title: '4. Support Coverage Window & Response SLA',
      description:
        'Standard business-hours support (8×5) with Next-Business-Day (NBD) onsite visits vs. extended (12×6) or prioritized mission-critical response.',
    },
    {
      title: '5. Preventive Maintenance & Telemetry Scope',
      description:
        'Frequency of scheduled on-site preventive maintenance audits (quarterly or monthly) and optional SNMP/ICMP remote infrastructure monitoring.',
    },
  ],

  tiersTitle: 'Service Coverage Options',
  tiersSubtitle:
    'Select the operational service level that matches each location or asset class. You can combine tiers across headquarters and branch offices under a single master agreement.',
  tiers: [
    {
      id: 'essential',
      name: 'Essential AMC',
      tagline: 'For single offices, SMBs, and standard end-user IT estates',
      pricingModel: 'Custom Proposal · Per-Device or Annual Site Schedule',
      bestFor: 'Desktops, laptops, printers, and basic office LAN',
      features: [
        '8×5 Business-hours remote helpdesk & troubleshooting',
        'Next-Business-Day (NBD) onsite field engineer dispatch',
        'Quarterly scheduled on-site Preventive Maintenance (PM)',
        'OS stability, driver, and basic network configuration support',
        'OEM warranty claim logging and vendor coordination',
      ],
      cta: 'Request Essential Proposal',
      highlighted: false,
    },
    {
      id: 'professional',
      name: 'Professional AMC',
      tagline: 'For growing multi-branch enterprises & core office infrastructure',
      pricingModel: 'Custom Proposal · Multi-Site Tiered Schedule',
      bestFor: 'Multi-location endpoints, managed switches, Wi-Fi, and branch servers',
      badge: 'Recommended for Multi-Site IT',
      features: [
        '12×6 Extended-hours priority helpdesk & L2/L3 escalation',
        'Priority metro onsite dispatch for critical infrastructure incidents',
        'Quarterly deep Preventive Maintenance & thermal health audits',
        'Firewall, VLAN, Wi-Fi controller, and Windows/Linux OS support',
        'SNMP/ICMP link and server availability monitoring options',
        'Monthly SLA compliance and asset health summary reports',
      ],
      cta: 'Request Professional Proposal',
      highlighted: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise Extended AMC',
      tagline: 'For mission-critical servers, data centres, and national estates',
      pricingModel: 'Custom Master Agreement · Enterprise Governance',
      bestFor: 'Data centre racks, physical servers, SAN/NAS, and high-density estates',
      features: [
        'Comprehensive infrastructure monitoring & prioritized P1 incident triage',
        'Priority emergency onsite dispatch in covered metropolitan hubs',
        'Dedicated L3 systems engineering & data centre smart hands',
        'Hypervisor (VMware/Hyper-V/KVM), SAN/NAS, and HA cluster care',
        'Custom PM cadence, DR drill assistance, and executive reviews',
        'Optional dedicated on-site resident engineer deployment',
      ],
      cta: 'Request Enterprise Proposal',
      highlighted: false,
    },
  ],

  comparisonTitle: 'Service Option Comparison',
  comparisonHeaders: {
    capability: 'Service Capability',
    essential: 'Essential AMC',
    professional: 'Professional AMC',
    enterprise: 'Enterprise Extended AMC',
  },
  comparisonRows: [
    {
      capability: 'Support Coverage Window',
      essential: '8×5 Business Hours',
      professional: '12×6 Extended Hours',
      enterprise: 'Extended & Priority Windows',
    },
    {
      capability: 'Remote Helpdesk Response Target',
      essential: 'Within 1 Hour',
      professional: 'Within 30 Minutes',
      enterprise: 'Priority Urgent Triage (P1)',
    },
    {
      capability: 'On-Site Field Engineer Dispatch',
      essential: 'Next Business Day (NBD)',
      professional: 'Priority Metro / NBD Branch',
      enterprise: 'Custom Priority SLA',
    },
    {
      capability: 'Scheduled Preventive Maintenance (PM)',
      essential: 'Quarterly On-Site',
      professional: 'Quarterly + Health Scoring',
      enterprise: 'Quarterly / Monthly Custom',
    },
    {
      capability: 'Server, Storage & Firewall L3 Support',
      essential: 'Optional Add-On',
      professional: 'Included for In-Scope Gear',
      enterprise: 'Full Stack L3 Included',
    },
    {
      capability: 'Infrastructure Telemetry (SNMP/ICMP)',
      essential: 'Optional Add-On',
      professional: 'Optional Add-On',
      enterprise: 'Included',
    },
    {
      capability: 'OEM Warranty Coordination',
      essential: 'Included',
      professional: 'Included',
      enterprise: 'Included',
    },
    {
      capability: 'Governance & Audit Reporting',
      essential: 'Quarterly PM Sign-Offs',
      professional: 'Monthly SLA Reports',
      enterprise: 'Monthly + Executive QBRs',
    },
  ],

  inclusionsTitle: 'What Is Included in Mint AMC',
  inclusions: [
    'Scheduled Preventive Maintenance (physical dust removal, thermal checks, airflow inspection, diagnostic logs)',
    'Unlimited remote helpdesk troubleshooting for covered operating systems, software configurations, and network policies',
    'On-site field engineer visits for hardware diagnostics, fault isolation, and system restoration within your SLA tier',
    'Firmware, BIOS, driver, and security patch governance for covered servers, firewalls, switches, and endpoints',
    'OEM warranty coordination and vendor docket tracking for assets still under manufacturer coverage',
    'Structured incident ticketing, escalation management, and periodic SLA compliance documentation',
  ],

  exclusionsTitle: 'Standard Exclusions & Boundaries',
  exclusions: [
    'Physical hardware replacement, spare parts costs, and component replacement guarantees are not included',
    'Consumables such as printer toner, ink cartridges, paper, fuser drums, laptop batteries, and power adapters',
    'Third-party software license fees, cloud hosting subscriptions, or proprietary application source-code changes',
    'Damage caused by severe electrical surges, liquid spills, unauthorised modifications, or force majeure events',
    'Civil cabling trenching, major office relocation projects, or new infrastructure deployment outside agreed scope',
  ],

  proposalChecklistTitle: 'What You Need to Request a Proposal',
  proposalChecklistSubtitle:
    'Sharing these four details allows our engineering desk to prepare an accurate, itemised AMC proposal within one business day:',
  proposalChecklist: [
    {
      step: '01',
      title: 'Approximate Device & Server Count',
      detail: 'Rough breakdown of desktops, laptops, printers, switches, firewalls, and servers.',
    },
    {
      step: '02',
      title: 'Office Locations & PIN Codes',
      detail: 'List of cities or branches where on-site preventive maintenance and dispatch are needed.',
    },
    {
      step: '03',
      title: 'Preferred Coverage & SLA Tier',
      detail: 'Whether your operations require 8×5 business hours, extended hours, or prioritized mission-critical response.',
    },
    {
      step: '04',
      title: 'Current Pain Points or Audit Goals',
      detail: 'Any recurring downtime issues, compliance requirements, or upcoming warranty expirations.',
    },
  ],

  faq: [
    {
      question: 'Does Mint AMC include free hardware replacement or spare parts?',
      answer:
        'No. Mint AMC operates on a transparent Maintenance & Engineering Support model (Non-Comprehensive AMC). Our contract covers preventive maintenance, remote helpdesk, on-site troubleshooting, configuration support, and OEM warranty coordination. If a physical component fails out of warranty, our engineers isolate the fault and assist your procurement team or coordinate authorised OEM part sourcing, which is billed separately upon approval.',
    },
    {
      question: 'Why do you provide custom proposals instead of fixed online prices?',
      answer:
        'Supporting 50 laptops in a single metro office has a very different engineering footprint than supporting 50 servers and firewalls across 12 industrial branches. Custom proposals ensure you only pay for the exact equipment classes, locations, and SLA hours your business actually needs.',
    },
    {
      question: 'Can we combine Essential and Enterprise SLA tiers in one contract?',
      answer:
        'Yes. Most multi-location organisations choose Enterprise or Professional coverage for headquarters and server rooms while selecting Essential NBD coverage for smaller regional branch offices under one unified agreement.',
    },
    {
      question: 'Are there extra per-visit charges for on-site engineer dispatch?',
      answer:
        'No. For all covered assets within your active AMC scope, scheduled preventive maintenance visits and qualifying break-fix engineer dispatches are included within your annual contract fee.',
    },
  ],
};
