export const privacyContent = {
  title: 'Privacy Policy',
  subtitle:
    'How Mint AMC collects, processes, and safeguards business contact and infrastructure service data.',
  lastUpdated: 'October 2026',
  sections: [
    {
      heading: '1. Scope and Corporate Entity',
      body:
        'This Privacy Policy applies to Mint AMC (https://mintamc.com), delivering enterprise IT Annual Maintenance Contract services located at B404 Atulya Nirman, Punawale, Pune (MH), INDIA 411033. It explains how we handle business contact information and technical service records collected through our website, proposal workflows, and support desks.',
    },
    {
      heading: '2. Information We Collect',
      body:
        '• Business Contact Details: Name, company name, designation, business email address, and telephone number submitted via our Request a Proposal wizard, contact forms, or email correspondence.\n• Infrastructure Scope Parameters: Approximate device counts, hardware categories, office cities/states, and SLA preferences provided for preparing commercial AMC proposals.\n• Service Delivery Records: Hardware serial numbers, asset configuration baselines, preventive maintenance checklists, helpdesk ticket logs, and NOC monitoring alerts collected during active AMC execution.',
    },
    {
      heading: '3. How We Use Information',
      body:
        'We process collected information strictly for legitimate business and contractual purposes:\n• Evaluating your infrastructure requirements and preparing tailored IT AMC proposals.\n• Delivering contracted preventive maintenance, remote helpdesk troubleshooting, on-site field engineering, and technical support.\n• Coordinating authorised manufacturer (OEM) warranty claims when requested by the client.\n• Complying with applicable Indian statutory, tax, and regulatory obligations.\n\nWe do not sell, rent, or trade customer contact lists or infrastructure records to third-party marketers.',
    },
    {
      heading: '4. Data Sharing and Confidentiality',
      body:
        'Access to client infrastructure records is restricted to authorised Mint AMC personnel and vetted field engineering partners bound by confidentiality obligations. Asset serial numbers and fault diagnostic logs are shared with Original Equipment Manufacturers (OEMs) only when necessary to log or coordinate warranty support on your behalf.',
    },
    {
      heading: '5. Data Retention and Security Practices',
      body:
        'Commercial proposal inquiries are retained for business follow-up and audit records. Active AMC service logs and preventive maintenance sign-offs are retained for the duration of the contract term plus applicable statutory retention periods under Indian law. We implement administrative and technical access controls, encrypted transport (HTTPS/TLS), and role-based authorisation to protect business records.',
    },
    {
      heading: '6. Your Rights and Contact Information',
      body:
        'Business contacts and clients may request updates, corrections, or deletion of their contact information, or raise privacy enquiries by contacting us at info@mintamc.com or support@mintamc.com (Attention: Mint AMC Legal & Data Protection, B404 Atulya Nirman, Punawale, Pune (MH), INDIA 411033).',
    },
  ],
};

export const termsContent = {
  title: 'Terms of Service',
  subtitle:
    'Terms governing the use of the Mint AMC website, proposal requests, and Annual Maintenance Contract service delivery.',
  lastUpdated: 'October 2026',
  sections: [
    {
      heading: '1. Governing Relationship & Master AMC Precedence',
      body:
        'Mint AMC has its business address at B404 Atulya Nirman, Punawale, Pune (MH), INDIA 411033. The content on this website is provided for informational and commercial enquiry purposes. Formal service obligations, covered asset serial lists, response SLAs, billing schedules, and commercial terms are governed exclusively by a mutually executed Master Annual Maintenance Contract (AMC) Agreement or Statement of Work (SOW) signed between your organisation and Mint AMC.',
    },
    {
      heading: '2. Scope of Supported AMC Services & Exclusions',
      body:
        'Unless explicitly stated otherwise in a signed SOW, Mint AMC provides Maintenance, Preventive Care, Troubleshooting, NOC Monitoring, and Field Engineering Support (Non-Comprehensive AMC). Our services cover technical labor, scheduled preventive maintenance visits, remote helpdesk support, on-site diagnostics, configuration assistance, and OEM warranty coordination.\n\nPhysical hardware replacement, spare parts costs, component replacement guarantees, consumables (such as toner, ink, drums, and batteries), and third-party software licenses are excluded from standard AMC fees and are billed separately upon client approval or processed under the client’s active OEM warranty.',
    },
    {
      heading: '3. Proposals and Commercial Quotations',
      body:
        'Submission of a request through the Request a Proposal wizard or contact form does not constitute a binding service contract. Formal commercial proposals issued by Mint AMC remain valid for the period stated on the quotation document (typically 30 days) and are subject to site baseline verification during onboarding.',
    },
    {
      heading: '4. Customer Responsibilities',
      body:
        'Clients engaging Mint AMC agree to:\n• Provide accurate asset inventory information and safe, timely access to premises for scheduled preventive maintenance and onsite engineering visits.\n• Maintain valid software/OS licenses and independent data backups for all covered systems.\n• Ensure proper electrical earthing, UPS protection, and environmental operating conditions for covered server and network equipment.',
    },
    {
      heading: '5. Intellectual Property',
      body:
        'All text, layout designs, trademarks, brand marks, and documentation on this website (including Mint AMC, xHosting, xData Center, Defendx, and UiDRAC) are the property of Mint AMC or their respective owners. Unauthorised reproduction is prohibited.',
    },
    {
      heading: '6. Limitation of Liability & Governing Law',
      body:
        'To the maximum extent permitted by applicable law, Mint AMC shall not be liable for indirect, incidental, special, or consequential damages, or loss of data or revenue arising from website use or service delays. Any disputes arising in connection with these Terms shall be governed by the laws of India and subject to the jurisdiction of the competent courts in Pune (Maharashtra), India.',
    },
  ],
};

export const slaContent = {
  title: 'Service Level Agreement (SLA) Overview',
  intro:
    'Structured incident severity definitions, response targets, and preventive maintenance governance applicable to Mint AMC agreements.',
  lastUpdated: 'October 2026',
  sections: [
    {
      heading: '1. Incident Severity Classification',
      body:
        '• Severity 1 (P1 — Critical): Complete outage of a core server, data centre rack, firewall cluster, or primary site network affecting business-critical operations with no immediate workaround.\n• Severity 2 (P2 — High): Significant degradation of a server, network segment, or multiple user workstations impacting departmental productivity.\n• Severity 3 (P3 — Normal): Isolated issue affecting a single desktop, laptop, printer, or non-critical configuration request.\n• Severity 4 (P4 — Scheduled / Advisory): Scheduled Preventive Maintenance (PM) visits, routine health checks, or general technical enquiries.',
    },
    {
      heading: '2. Standard SLA Response Tiers',
      body:
        '• Essential AMC Tier: 8×5 business-hours helpdesk · Remote triage within 1 hour · Next-Business-Day (NBD) onsite field dispatch where required.\n• Professional AMC Tier: 12×6 extended-hours helpdesk · Remote triage within 30 minutes · 4-hour onsite dispatch in covered metros (NBD in regional branches).\n• Enterprise & Extended Tier: Priority technical helpdesk · Rapid P1 remote triage & escalation · Priority onsite field dispatch as defined in your Master SOW.',
    },
    {
      heading: '3. Preventive Maintenance (PM) Governance',
      body:
        'Standard annual agreements include quarterly scheduled on-site Preventive Maintenance visits covering physical dust removal, thermal inspection, fan/PSU checks, SMART disk diagnostics, firmware stability reviews, and signed PM completion checklists.',
    },
    {
      heading: '4. Scope Boundaries & Hardware Fault Handling',
      body:
        'Response SLAs measure the time to remote technical triage and on-site engineer arrival/diagnosis. Because Mint AMC operates on a non-comprehensive maintenance model, physical hardware replacement timelines depend on active OEM warranty turnaround or client approval for external spare part procurement.',
    },
  ],
};
