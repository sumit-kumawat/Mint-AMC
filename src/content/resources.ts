export type ResourceSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  exampleBox?: {
    title: string;
    text: string;
  };
};

export type ResourceArticle = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  introduction: string;
  keyTakeaways: string[];
  sections: ResourceSection[];
  relatedServiceSlugs: { slug: string; label: string }[];
  relatedResourceSlugs: string[];
};

export const resourcesPageContent = {
  heroBadge: 'DPIIT-Recognised · IT AMC Knowledge Centre',
  heroTitle: 'Technical Resources & Enterprise IT AMC Guides',
  heroSubtitle:
    'Practical, in-depth guides answering common customer questions on IT Annual Maintenance Contracts, pricing factors, SLA governance, coverage boundaries, and multi-location support across India.',
};

export const articles: ResourceArticle[] = [
  {
    slug: 'what-is-an-it-amc',
    title: 'What Is an IT AMC? Overview, Benefits, Coverage & Enterprise Use Cases',
    shortTitle: 'What Is an IT AMC?',
    category: 'AMC Fundamentals',
    date: 'October 2026',
    readTime: '6 min read',
    excerpt:
      'Understand how an IT Annual Maintenance Contract (AMC) structures preventive care, remote helpdesk support, and SLA-bound field engineering for business infrastructure.',
    introduction:
      'An IT Annual Maintenance Contract (AMC) is a formal, recurring service agreement between an organisation and an specialised IT maintenance provider to ensure the continuous health, stability, and operational uptime of business technology infrastructure. Instead of relying on ad-hoc break-fix technicians when systems fail, an IT AMC establishes a predictable framework for scheduled preventive maintenance, remote troubleshooting, and time-bound on-site engineering dispatch.',
    keyTakeaways: [
      'Consolidates support for desktops, laptops, servers, networking, and peripherals under one accountable SLA.',
      'Shifts IT operations from reactive break-fix firefighting to quarterly preventive maintenance.',
      'Provides documented incident tracking, escalation matrices, and audit-ready maintenance records.',
    ],
    sections: [
      {
        heading: '1. Why Businesses Use an IT Annual Maintenance Contract',
        paragraphs: [
          'As organisations expand across multiple floors, branches, or cities, hardware estates quickly become heterogeneous. A typical enterprise runs a mix of corporate laptops, office desktops, network switches, Wi-Fi access points, perimeter firewalls, and on-premise servers from multiple OEMs with staggered warranty expiration dates.',
          'Without a structured AMC, internal IT teams spend disproportionate time diagnosing routine OS crashes, thermal throttling, network port drops, and printer queue failures. An IT AMC offloads day-to-day maintenance and structured troubleshooting to a dedicated engineering partner governed by contractual Service Level Agreements (SLAs).',
        ],
        bullets: [
          'Predictable annual operational expenditure (OpEx) for technical support and preventive care.',
          'Guaranteed remote response and on-site engineer dispatch timelines based on incident severity.',
          'Reduced hardware failure rates through systematic quarterly physical and logical health checks.',
          'Single point of contact (SPOC) across multi-vendor endpoints, networks, and server rooms.',
        ],
      },
      {
        heading: '2. Core Components of a Mint AMC Programme',
        paragraphs: [
          'At Mint AMC, every maintenance contract is structured around four operational pillars: Asset Baseline & Onboarding, Scheduled Preventive Maintenance (PM), Reactive Helpdesk & Field Engineering, and Monthly/Quarterly Governance Reporting.',
          'During onboarding, our engineers document the make, model, serial number, location, and current health state of each covered asset. This baseline drives both your quarterly preventive maintenance calendar and our helpdesk triage runbooks.',
        ],
        exampleBox: {
          title: 'Practical Example: 180-Seat Multi-Branch Company',
          text: 'A logistics company operating a 100-seat headquarters in Pune and four 20-seat regional branches places its laptops, FortiGate firewalls, Cisco switches, and two local file servers under a single Mint AMC agreement. Quarterly PM visits eliminate summer thermal shutdowns in branch network closets, while structured remote helpdesk triage resolves the majority of routine user tickets without waiting for an on-site visit.',
        },
      },
      {
        heading: '3. Common Enterprise Use Cases',
        paragraphs: [
          'Organisations adopt an IT AMC at different maturity stages depending on their internal IT staffing model:',
        ],
        bullets: [
          'Co-Managed IT for Growing Enterprises: Internal IT leaders retain strategic architecture control while delegating routine endpoint maintenance, branch dispatches, and quarterly PM audits to Mint AMC.',
          'Post-Warranty Infrastructure Life Extension: Servers, switches, and workstations that have passed their initial 3-year OEM warranty continue operating reliably with professional preventive maintenance and diagnostics.',
          'Server Room & Branch Augmentation: Organisations running critical on-premise or colocation racks add structured telemetry and smart-hands support.',
        ],
      },
    ],
    relatedServiceSlugs: [
      { slug: 'desktop-amc', label: 'Desktop AMC' },
      { slug: 'network-equipment-amc', label: 'Network Equipment AMC' },
      { slug: 'server-amc', label: 'Server AMC' },
    ],
    relatedResourceSlugs: [
      'it-amc-pricing-guide',
      'it-amc-coverage-and-exclusions',
      'it-amc-proposal-checklist',
    ],
  },
  {
    slug: 'it-amc-pricing-guide',
    title: 'IT AMC Pricing Guide: Cost Factors, Quotation Requirements & Budgeting',
    shortTitle: 'IT AMC Pricing Guide',
    category: 'Commercial & Budgeting',
    date: 'October 2026',
    readTime: '7 min read',
    excerpt:
      'Learn how enterprise IT AMC pricing is calculated in India, the five operational variables that drive cost, and how to budget accurately without hidden fees.',
    introduction:
      'When budgeting for annual IT maintenance, procurement and technology leaders often encounter vague flat percentages or inflexible per-seat templates that fail to account for infrastructure complexity. Understanding how professional IT AMC pricing is structured helps you compare proposals fairly and avoid unexpected service exclusions.',
    keyTakeaways: [
      'IT AMC pricing is driven by five core variables: asset count, equipment class, site geography, SLA window, and monitoring scope.',
      'Mint AMC provides Maintenance & Engineering Support (Non-Comprehensive AMC) so you never pay inflated markups for unused hardware replacement risk pools.',
      'Tiering SLAs by location (e.g., 4-hour metro SLA for HQ, Next-Business-Day for branches) optimises annual maintenance budgets.',
    ],
    sections: [
      {
        heading: '1. The Five Factors That Determine IT AMC Costs',
        paragraphs: [
          'Rather than applying an arbitrary percentage of hardware purchase value, Mint AMC calculates maintenance proposals based on the actual engineering effort required to support your environment:',
        ],
        bullets: [
          'Asset Quantity & Site Density: Supporting 150 desktops in a single corporate tower requires fewer travel dispatches per device than supporting 150 desktops spread across 15 retail branches.',
          'Equipment Tier & Complexity: End-user devices (desktops, laptops, printers) require L1/L2 field technicians, while rack servers, SAN storage arrays, and HA firewalls require senior L3 systems engineers.',
          'Coverage Window (8×5 vs. 12×6 vs. Extended): Standard business-hours coverage is the most cost-effective baseline; extended and priority response carry dedicated shift staffing.',
          'Response SLA Target: Next-Business-Day (NBD) onsite response vs. priority metro onsite dispatch.',
          'Preventive Maintenance Frequency: Standard quarterly on-site PM audits (4 visits/year) vs. monthly high-touch facility inspections.',
        ],
      },
      {
        heading: '2. Why Maintenance-Only (Non-Comprehensive) Pricing Is More Transparent',
        paragraphs: [
          'Some vendors bundle "free hardware replacement" into comprehensive contracts by adding a heavy risk premium across every device in your inventory—even when 90% of your hardware does not suffer catastrophic part failure in a given year, or when replacement parts are substituted with refurbished components.',
          'Mint AMC operates strictly on a transparent Maintenance & Engineering Support model. Your annual contract fee covers 100% of preventive maintenance, remote helpdesk, on-site engineering diagnostics, OS/configuration support, and OEM warranty coordination. Physical hardware replacements and consumables remain excluded and are only procured with your explicit approval when genuinely required.',
        ],
        exampleBox: {
          title: 'Budgeting Tip: Hybrid SLA Tiering',
          text: 'Instead of purchasing high-priority SLAs for every single office laptop, assign priority coverage to your core server room, firewalls, and switches, and assign Essential (8×5 + NBD) coverage to standard user workstations. This typically reduces overall AMC spend by 25–35% without compromising core uptime.',
        },
      },
      {
        heading: '3. Information Needed for an Accurate Quotation',
        paragraphs: [
          'To receive a firm, itemised commercial proposal from Mint AMC within one business day, prepare a simple summary of your device categories, approximate quantities per city, and preferred response SLA.',
        ],
      },
    ],
    relatedServiceSlugs: [
      { slug: 'server-amc', label: 'Server AMC' },
      { slug: 'monitoring-noc', label: 'Remote Monitoring & Telemetry' },
      { slug: 'laptop-amc', label: 'Laptop AMC' },
    ],
    relatedResourceSlugs: [
      'what-is-an-it-amc',
      'it-amc-coverage-and-exclusions',
      'it-amc-proposal-checklist',
    ],
  },
  {
    slug: 'it-amc-vs-warranty-vs-oem-support',
    title: 'IT AMC vs. Warranty vs. OEM Support: Key Differences & Responsibilities',
    shortTitle: 'IT AMC vs. Warranty vs. OEM',
    category: 'Strategy & Governance',
    date: 'October 2026',
    readTime: '6 min read',
    excerpt:
      'Compare base manufacturer warranties, OEM care packs, and multi-vendor IT Annual Maintenance Contracts to eliminate support gaps across your estate.',
    introduction:
      'A common misconception in corporate procurement is that newly purchased laptops, servers, or switches do not require an IT AMC because they carry a manufacturer warranty. In practice, OEM warranties and IT Annual Maintenance Contracts solve very different operational problems—and work best when coordinated together.',
    keyTakeaways: [
      'Manufacturer warranties cover defective hardware parts from a single brand, not day-to-day OS, network, or cross-vendor troubleshooting.',
      'An IT AMC provides unified L1–L3 engineering across all brands, scheduled preventive maintenance, and day-to-day configuration support.',
      'Mint AMC coordinates directly with OEM warranty desks on your behalf when an in-warranty hardware component requires manufacturer replacement.',
    ],
    sections: [
      {
        heading: '1. What Standard OEM Warranties Actually Cover (and Leave Out)',
        paragraphs: [
          'When you purchase a server, laptop, or switch with a 1-year or 3-year OEM warranty, the manufacturer promises to repair or replace a physically defective component (such as a failed motherboard or power supply) subject to their diagnostic verification.',
          'However, standard OEM warranties do not include quarterly physical dust cleaning, rack cable dressing, Active Directory troubleshooting, VLAN configuration changes, printer queue fixes, or diagnosing why a multi-vendor network link is dropping packets.',
        ],
        bullets: [
          'OEM Warranty Scope: Single-brand hardware defect remediation after the customer runs initial diagnostics.',
          'OEM Care Pack Scope: Extended manufacturer part/labour coverage for a specific serial number, often at high renewal cost once equipment passes year 3.',
          'Mint AMC Scope: Multi-vendor preventive maintenance, unlimited remote helpdesk, on-site diagnostics, OS/network configuration support, and end-to-end OEM warranty coordination.',
        ],
      },
      {
        heading: '2. Eliminating Multi-Vendor Finger-Pointing',
        paragraphs: [
          'When an application slows down or a branch loses connectivity, the root cause could lie in a Windows Server update, a Cisco switch port, a FortiGate firewall rule, or an ISP link. Calling three separate OEM support lines leaves your internal team managing vendor handoffs.',
          'Under a Mint AMC agreement, our helpdesk and field engineers take first-line ownership of the incident, isolate the exact fault across the stack, resolve configuration or software issues directly, and log any required OEM hardware warranty docket with the complete diagnostic evidence already prepared.',
        ],
        exampleBox: {
          title: 'Real-World Scenario: Mixed In-Warranty & Out-of-Warranty Estate',
          text: 'An enterprise has 60 new laptops under OEM warranty and 90 older desktops out of warranty, plus a 4-year-old server rack. Mint AMC covers all 150 endpoints and the server rack for preventive maintenance and helpdesk support, while managing OEM warranty claims whenever one of the 60 newer laptops experiences a hardware fault.',
        },
      },
    ],
    relatedServiceSlugs: [
      { slug: 'server-amc', label: 'Server AMC' },
      { slug: 'firewall-utm-amc', label: 'Firewall & UTM AMC' },
      { slug: 'software-os-support', label: 'Software & OS Support' },
    ],
    relatedResourceSlugs: [
      'what-is-an-it-amc',
      'how-to-choose-an-it-amc-provider-in-india',
      'it-amc-coverage-and-exclusions',
    ],
  },
  {
    slug: 'how-to-choose-an-it-amc-provider-in-india',
    title: 'How to Choose an IT AMC Provider in India: Evaluation Criteria & Governance',
    shortTitle: 'Choosing an IT AMC Provider',
    category: 'Procurement Guide',
    date: 'October 2026',
    readTime: '7 min read',
    excerpt:
      'A structured evaluation checklist for IT heads and procurement committees selecting an enterprise IT AMC partner across India.',
    introduction:
      'Selecting an Annual Maintenance Contract partner impacts your organisation’s productivity, security posture, and audit readiness for the next 12 to 36 months. Whether you are consolidating local computer vendors into one national partner or renewing an enterprise infrastructure contract, evaluating providers against objective engineering criteria prevents operational surprises.',
    keyTakeaways: [
      'Verify corporate governance, parent company backing, and documented escalation matrices before signing.',
      'Insist on written preventive maintenance (PM) checklists and clear definitions of response vs. resolution SLAs.',
      'Ensure the provider can support your entire stack—from end-user laptops to L3 firewalls, servers, and network switches.',
    ],
    sections: [
      {
        heading: '1. Technical Breadth Across the Infrastructure Stack',
        paragraphs: [
          'Many local AMC vendors only service desktop PCs and printers, forcing you to hire separate consultants whenever a core switch, firewall, or virtualisation host experiences an issue. Evaluate whether your prospective partner maintains in-house L2 and L3 engineering capability across:',
        ],
        bullets: [
          'End-User Computing: Windows/macOS desktops, laptops, printers, scanners, and desktop UPS units.',
          'Network & Security: Managed L2/L3 switches, enterprise Wi-Fi controllers, structured cabling, and NGFW/UTM appliances.',
          'Data Centre & Servers: Rack/tower servers, RAID storage arrays, hypervisors (VMware, Hyper-V, KVM), and rack PDUs.',
          'Infrastructure Telemetry: Proactive SNMP v3 and ICMP monitoring for critical links and server hosts.',
        ],
      },
      {
        heading: '2. Contractual SLA Clarity and Escalation Discipline',
        paragraphs: [
          'Review how the provider defines Severity 1 (Critical) through Severity 4 (Scheduled) incidents. A credible AMC contract specifies exact remote triage timelines (e.g., 15–30 minutes), on-site engineer dispatch targets (e.g., priority metro or Next-Business-Day), and named escalation levels from the service desk up to engineering leadership.',
        ],
        exampleBox: {
          title: 'Key Evaluation Question to Ask Vendors',
          text: 'Ask every shortlisted vendor: "Can you share a sample Quarterly Preventive Maintenance Sign-Off Report and your L1-to-L3 escalation matrix?" Providers with mature ITIL-aligned operations will immediately provide structured templates.',
        },
      },
      {
        heading: '3. Corporate Accountability and Transparency',
        paragraphs: [
          'Verify the legal entity behind the brand, its corporate registrations, and its transparency around inclusions and exclusions. Mint AMC operates as a specialised enterprise maintenance provider (DPIIT-recognised), providing clear contractual documentation and single-invoice simplicity for multi-location Indian enterprises.',
        ],
      },
    ],
    relatedServiceSlugs: [
      { slug: 'data-centre-infrastructure-amc', label: 'Data Centre Infrastructure AMC' },
      { slug: 'monitoring-noc', label: 'Remote Monitoring & Telemetry' },
      { slug: 'network-equipment-amc', label: 'Network Equipment AMC' },
    ],
    relatedResourceSlugs: [
      'it-amc-proposal-checklist',
      'pan-india-it-support-and-multi-location-management',
      'it-amc-pricing-guide',
    ],
  },
  {
    slug: 'it-amc-coverage-and-exclusions',
    title: 'IT AMC Coverage and Exclusions: Supported Services, Limitations & Responsibilities',
    shortTitle: 'Coverage & Exclusions',
    category: 'Contract Governance',
    date: 'October 2026',
    readTime: '6 min read',
    excerpt:
      'A transparent breakdown of what is included in a Mint AMC agreement, what is excluded, and how customer and provider responsibilities are aligned.',
    introduction:
      'Clear boundaries make for strong engineering partnerships. Before executing an Annual Maintenance Contract, both IT operations and finance teams should have complete clarity on which technical activities are covered under the annual fee, which items are excluded, and how out-of-scope requests are handled.',
    keyTakeaways: [
      'Included: Preventive maintenance visits, remote helpdesk, on-site troubleshooting, OS/firmware support, and OEM warranty coordination.',
      'Excluded: Physical hardware replacement, spare parts costs, consumables (toner, batteries), and third-party software license fees.',
      'Transparent non-comprehensive scope prevents disputes and ensures every rupee of your AMC fee goes toward skilled engineering delivery.',
    ],
    sections: [
      {
        heading: '1. Supported Services & Standard Inclusions',
        paragraphs: [
          'Every Mint AMC contract covers the skilled engineering labor, diagnostics, and operational governance required to keep your in-scope hardware and system software running smoothly:',
        ],
        bullets: [
          'Scheduled Preventive Maintenance (PM): Physical internal/external dust cleaning, thermal paste and fan airflow inspection, RAID/SMART disk health checks, and rack cable dressing.',
          'Remote Technical Helpdesk: Fast remote troubleshooting for OS errors, user profile issues, domain connectivity, printer queues, VPN clients, and firewall rules.',
          'On-Site Field Engineering Dispatch: Qualified engineer visits to your covered locations when an incident cannot be resolved remotely, governed by your contracted SLA tier (NBD or 4-hour metro).',
          'System Software & Firmware Governance: BIOS, firmware, driver, and security patch updates for in-scope servers, network switches, firewalls, and workstations.',
          'OEM Warranty Coordination: Logging, tracking, and coordinating hardware replacement claims with Dell, HPE, Lenovo, Cisco, Fortinet, or other OEMs for assets under active manufacturer warranty.',
        ],
      },
      {
        heading: '2. Explicit Exclusions & Service Limitations',
        paragraphs: [
          'To maintain complete commercial honesty, Mint AMC does not advertise or bundle physical hardware replacement or replacement guarantees. The following items are excluded from standard AMC fees:',
        ],
        bullets: [
          'Physical Hardware Replacement & Spare Parts: The cost of replacement motherboards, hard drives/SSDs, RAM modules, power supplies, switch chassis, or other physical components.',
          'Consumables & Wear Items: Printer ink, toner cartridges, imaging drums, fuser assemblies, paper rollers, laptop batteries, external power adapters, and patch cords.',
          'Software Licensing & Subscriptions: Microsoft, Linux, VMware, firewall UTM subscriptions, or cloud hosting consumption charges.',
          'Physical Damage & Force Majeure: Equipment damaged by liquid spills, fire, lightning, severe electrical surges without functional UPS protection, or unauthorised third-party tampering.',
        ],
        exampleBox: {
          title: 'How Out-of-Warranty Part Failures Are Handled',
          text: 'If a power supply or SSD fails on an out-of-warranty desktop or server, your Mint AMC engineer diagnoses and isolates the exact fault at no extra labor charge, provides the exact OEM part specification, and installs/configures the new component once procured by your team or sourced via authorised channels upon your approval.',
        },
      },
      {
        heading: '3. Customer Operational Responsibilities',
        paragraphs: [
          'For smooth AMC execution, clients provide safe site access during scheduled PM windows, maintain valid operating system and security software licenses, ensure functional UPS/earthing power protection for server and network racks, and maintain regular off-site data backups.',
        ],
      },
    ],
    relatedServiceSlugs: [
      { slug: 'desktop-amc', label: 'Desktop AMC' },
      { slug: 'printer-mfp-amc', label: 'Printer & MFP AMC' },
      { slug: 'server-amc', label: 'Server AMC' },
    ],
    relatedResourceSlugs: [
      'what-is-an-it-amc',
      'it-amc-pricing-guide',
      'it-amc-vs-warranty-vs-oem-support',
    ],
  },
  {
    slug: 'pan-india-it-support-and-multi-location-management',
    title: 'PAN-India IT Support & Multi-Location AMC Management',
    shortTitle: 'PAN-India Multi-Site AMC',
    category: 'Multi-Site Operations',
    date: 'October 2026',
    readTime: '6 min read',
    excerpt:
      'How multi-branch enterprises coordinate consistent preventive maintenance, unified ticketing, and tiered SLAs across offices, warehouses, and plants in India.',
    introduction:
      'Managing IT support for a single corporate office is straightforward. Managing IT support across 10, 25, or 100 branch offices, regional warehouses, and manufacturing plants across India is an entirely different operational challenge. Contracting separate local computer shops in every city leads to inconsistent security practices, untracked assets, and zero SLA accountability.',
    keyTakeaways: [
      'A single Master AMC Agreement replaces fragmented regional vendor contracts with one central helpdesk and billing structure.',
      'Standardised Preventive Maintenance runbooks ensure branch network closets and endpoints receive the same care as headquarters.',
      'Centralised monthly SLA reporting gives leadership visibility into ticket volumes and asset health by location.',
    ],
    sections: [
      {
        heading: '1. Challenges of Fragmented Regional IT Support',
        paragraphs: [
          'When regional branch managers hire local break-fix technicians independently, headquarters IT loses visibility into what changes are being made on branch routers, Wi-Fi access points, and corporate laptops. Common symptoms include:',
        ],
        bullets: [
          'No unified ticket log or root-cause tracking across branches.',
          'Unscheduled downtime caused by neglected dust accumulation and overheating in branch network racks.',
          'Inconsistent OS patch levels and disabled endpoint security agents.',
          'Administrative overhead of processing dozens of small vendor invoices every month.',
        ],
      },
      {
        heading: '2. How Mint AMC Coordinates Multi-Location Delivery',
        paragraphs: [
          'Mint AMC provides a centralised service desk and NOC backed by field engineering coverage across major Indian metros, state capitals, and industrial hubs. Every location operates under a single Master Service Agreement with site-appropriate SLA tiers:',
        ],
        bullets: [
          'Tier-1 Metro Headquarters & Data Rooms: Priority onsite SLA with telemetry monitoring options.',
          'Regional Sales & Branch Offices: Cost-effective 8×5 remote helpdesk with Next-Business-Day (NBD) onsite field dispatch.',
          'Synchronised Quarterly PM Calendar: Pre-scheduled preventive maintenance windows coordinated with branch administrators so visits never disrupt peak business hours.',
        ],
        exampleBox: {
          title: 'Multi-Site Governance in Action',
          text: 'During quarterly review meetings, your IT leadership receives a consolidated report showing ticket resolution times, preventive maintenance sign-off status, and aging hardware advisories across every covered city—enabling data-driven refresh planning.',
        },
      },
    ],
    relatedServiceSlugs: [
      { slug: 'network-equipment-amc', label: 'Network Equipment AMC' },
      { slug: 'wifi-wireless-amc', label: 'WiFi & Wireless AMC' },
      { slug: 'remote-hands', label: 'Remote Hands & Smart Hands' },
    ],
    relatedResourceSlugs: [
      'how-to-choose-an-it-amc-provider-in-india',
      'it-amc-proposal-checklist',
      'what-is-an-it-amc',
    ],
  },
  {
    slug: 'it-amc-proposal-checklist',
    title: 'IT AMC Proposal Checklist: What to Prepare Before Requesting a Quote',
    shortTitle: 'AMC Proposal Checklist',
    category: 'Planning & Onboarding',
    date: 'October 2026',
    readTime: '5 min read',
    excerpt:
      'Use this practical pre-proposal checklist to gather your asset counts, location details, and SLA preferences for a fast, accurate IT AMC quotation.',
    introduction:
      'Requesting an IT Annual Maintenance Contract proposal does not require a 50-page RFP or a complete serial-number audit upfront. However, preparing a concise summary of your locations, hardware categories, and support expectations allows our engineering team to turn around an accurate, tailored commercial proposal within one business day.',
    keyTakeaways: [
      'You only need approximate asset quantities by category to receive an initial proposal; exact serial tagging happens during onboarding.',
      'Grouping your locations into Critical (HQ/Server Rooms) and Standard (Branch Offices) helps optimise SLA pricing.',
      'Use our guided 5-step Request a Proposal wizard to submit your checklist in under two minutes.',
    ],
    sections: [
      {
        heading: '1. Hardware & Infrastructure Summary',
        paragraphs: [
          'Start with an approximate count of the devices you want covered under the maintenance contract:',
        ],
        bullets: [
          'End-User Devices: Number of desktops/workstations, corporate laptops, multi-function printers (MFPs), barcode scanners, and desktop UPS units.',
          'Network & Security Gear: Number of managed L2/L3 switches, routers, wireless access points, and firewall/UTM appliances.',
          'Server & Storage Infrastructure: Number of physical rack/tower servers, virtualisation hosts, and SAN/NAS storage arrays.',
          'Data Centre / Server Room Facilities: Number of server racks, precision PDUs, and online UPS systems.',
        ],
      },
      {
        heading: '2. Location & Coverage Requirements',
        paragraphs: [
          'List the cities or states where your equipment is installed and define the operating hours for each site:',
        ],
        bullets: [
          'Primary HQ / Server Room Location: City, state, and whether standard 8×5 or extended support is required.',
          'Branch / Regional Locations: Total number of additional offices and whether standard 8×5 Next-Business-Day (NBD) onsite support is sufficient.',
          'Infrastructure Telemetry: Identify which critical servers, firewalls, or WAN links require active telemetry monitoring.',
        ],
        exampleBox: {
          title: 'Ready to Submit Your Scope?',
          text: 'Click "Request a Proposal" anywhere on this page to launch our guided 5-step wizard. Even if you only have rough estimates today, our solutions engineers will help refine your asset baseline during a complimentary consultation call.',
        },
      },
    ],
    relatedServiceSlugs: [
      { slug: 'desktop-amc', label: 'Desktop AMC' },
      { slug: 'server-amc', label: 'Server AMC' },
      { slug: 'monitoring-noc', label: 'Remote Monitoring & Telemetry' },
    ],
    relatedResourceSlugs: [
      'it-amc-pricing-guide',
      'it-amc-coverage-and-exclusions',
      'how-to-choose-an-it-amc-provider-in-india',
    ],
  },
];

const legacySlugMap: Record<string, string> = {
  'annual-it-maintenance-checklist': 'it-amc-proposal-checklist',
  'choosing-amc-sla-tiers': 'how-to-choose-an-it-amc-provider-in-india',
  'comprehensive-vs-non-comprehensive-amc': 'it-amc-coverage-and-exclusions',
};

export function getArticle(slug: string): ResourceArticle | undefined {
  const mapped = legacySlugMap[slug] ?? slug;
  return articles.find((a) => a.slug === mapped);
}
