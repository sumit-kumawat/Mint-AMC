import { NextRequest, NextResponse } from 'next/server';
import { checkThrottling, sendInquiryEmail } from '@/lib/mailer';

export type ProposalSubmissionPayload = {
  // Step 1: Business Details
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  // Step 2: Location & Coverage
  city: string;
  state: string;
  locationCount: string;
  coverageType: string;
  // Step 3: IT Infrastructure
  deviceTypes: string[];
  approximateQuantity: string;
  infrastructureDetails?: string;
  // Step 4: Service Requirements
  requiredServices: string[];
  preferredSla: string;
  currentIssues?: string;
  exclusionsAcknowledged: boolean;
  // Step 5: Consent
  consentConfirmed: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ProposalSubmissionPayload>;

    const companyName = (body.companyName ?? '').trim();
    const contactName = (body.contactName ?? '').trim();
    const email = (body.email ?? '').trim();
    const phone = (body.phone ?? '').trim();
    const city = (body.city ?? '').trim();
    const state = (body.state ?? '').trim();
    const locationCount = (body.locationCount ?? '').trim();
    const coverageType = (body.coverageType ?? '').trim();
    const deviceTypes = Array.isArray(body.deviceTypes) ? body.deviceTypes.filter(Boolean) : [];
    const approximateQuantity = (body.approximateQuantity ?? '').trim();
    const infrastructureDetails = (body.infrastructureDetails ?? '').trim();
    const requiredServices = Array.isArray(body.requiredServices)
      ? body.requiredServices.filter(Boolean)
      : [];
    const preferredSla = (body.preferredSla ?? '').trim();
    const currentIssues = (body.currentIssues ?? '').trim();
    const exclusionsAcknowledged = Boolean(body.exclusionsAcknowledged);
    const consentConfirmed = Boolean(body.consentConfirmed);

    if (!companyName || companyName.length < 2) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid company or organisation name.' },
        { status: 400 },
      );
    }
    if (!contactName || contactName.length < 2) {
      return NextResponse.json(
        { ok: false, error: 'Please provide the contact person’s full name.' },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid business email address.' },
        { status: 400 },
      );
    }
    if (!/^[0-9+\-\s()]{7,20}$/.test(phone)) {
      return NextResponse.json(
        { ok: false, error: 'Please provide a valid contact phone number.' },
        { status: 400 },
      );
    }
    if (!city || !state) {
      return NextResponse.json(
        { ok: false, error: 'Please provide your primary city and state.' },
        { status: 400 },
      );
    }
    if (!locationCount || !coverageType) {
      return NextResponse.json(
        { ok: false, error: 'Please specify the number of locations and required coverage.' },
        { status: 400 },
      );
    }
    if (deviceTypes.length === 0 || !approximateQuantity) {
      return NextResponse.json(
        { ok: false, error: 'Please select at least one device category and approximate quantity.' },
        { status: 400 },
      );
    }
    if (requiredServices.length === 0 || !preferredSla) {
      return NextResponse.json(
        { ok: false, error: 'Please select required AMC services and preferred SLA coverage.' },
        { status: 400 },
      );
    }
    if (!exclusionsAcknowledged) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'Please acknowledge the service scope and exclusions (maintenance & engineering support only; physical hardware replacement excluded).',
        },
        { status: 400 },
      );
    }
    if (!consentConfirmed) {
      return NextResponse.json(
        { ok: false, error: 'Please confirm consent to process your proposal request.' },
        { status: 400 },
      );
    }

    // Check duplicate submission throttling (15 second window)
    const fingerprint = `${email.toLowerCase()}::${companyName.toLowerCase()}::${approximateQuantity}`;
    if (checkThrottling(fingerprint, 15000)) {
      return NextResponse.json(
        {
          ok: false,
          error:
            'A matching proposal request was just submitted. Please wait a moment before submitting again.',
        },
        { status: 429 },
      );
    }

    const referenceId = `MINT-PRP-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const submittedAt = new Date().toISOString();

    const textContent = `
New IT AMC Proposal Request — ${referenceId}
=====================================================
Recipient: Commercial & Proposal Desk
Reference ID: ${referenceId}
Submitted At: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

1. Business Details:
--------------------
Company: ${companyName}
Contact Person: ${contactName}
Business Email: ${email}
Phone Number: ${phone}

2. Locations & Scope:
---------------------
Primary Location: ${city}, ${state}
Total Locations: ${locationCount}
Coverage Model: ${coverageType}

3. IT Infrastructure Estate:
----------------------------
Total Quantity Band: ${approximateQuantity}
Device Categories: ${deviceTypes.join(', ')}
${infrastructureDetails ? `Infrastructure Notes: ${infrastructureDetails}` : ''}

4. Service Requirements & SLA:
------------------------------
Selected Services: ${requiredServices.join(', ')}
Preferred SLA Tier: ${preferredSla}
${currentIssues ? `Specific Requirements: ${currentIssues}` : ''}
Exclusions Acknowledged: Yes (Hardware parts excluded; engineering/PM support included)
Consent Confirmed: Yes

=====================================================
Mint AMC — Enterprise IT Annual Maintenance Contracts
Corporate Desk: Punawale, Pune (MH), India 411033
`.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1B2430; background-color: #F4F7F9; margin: 0; padding: 20px; }
    .card { background-color: #FFFFFF; max-width: 640px; margin: 0 auto; border: 1px solid #DCE4EA; border-radius: 8px; overflow: hidden; }
    .header { background-color: #0076CE; color: #FFFFFF; padding: 20px 24px; }
    .header h1 { margin: 0; font-size: 18px; font-weight: 600; }
    .content { padding: 24px; }
    .badge { display: inline-block; background-color: #EBF5FF; color: #0076CE; font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 8px; margin-bottom: 16px; }
    .section-title { font-size: 13px; font-weight: 700; text-transform: uppercase; color: #0076CE; letter-spacing: 0.5px; margin: 18px 0 8px 0; border-bottom: 1px solid #DCE4EA; padding-bottom: 4px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 12px; font-size: 14px; }
    td { padding: 7px 10px; border-bottom: 1px solid #EEF2F6; }
    td.label { width: 160px; color: #526170; font-weight: 500; }
    td.value { color: #1B2430; font-weight: 600; }
    .pill-list { margin: 4px 0; padding: 0; list-style: none; }
    .pill-list li { display: inline-block; background: #F4F7F9; border: 1px solid #DCE4EA; border-radius: 8px; padding: 3px 8px; font-size: 12px; margin: 2px 4px 2px 0; }
    .footer { background-color: #F8FAFC; padding: 16px 24px; font-size: 12px; color: #6E7E8F; border-top: 1px solid #DCE4EA; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Mint AMC — Enterprise Proposal Request</h1>
    </div>
    <div class="content">
      <div class="badge">Reference ID: ${referenceId} · Commercial &amp; Proposal Desk</div>

      <div class="section-title">1. Business Information</div>
      <table>
        <tr><td class="label">Company Name</td><td class="value">${companyName}</td></tr>
        <tr><td class="label">Contact Person</td><td class="value">${contactName}</td></tr>
        <tr><td class="label">Email Address</td><td class="value"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td class="label">Phone Number</td><td class="value">${phone}</td></tr>
      </table>

      <div class="section-title">2. Locations &amp; Coverage</div>
      <table>
        <tr><td class="label">Primary HQ / City</td><td class="value">${city}, ${state}</td></tr>
        <tr><td class="label">Branch Count</td><td class="value">${locationCount}</td></tr>
        <tr><td class="label">Coverage Model</td><td class="value">${coverageType}</td></tr>
      </table>

      <div class="section-title">3. IT Hardware Estate</div>
      <table>
        <tr><td class="label">Quantity Band</td><td class="value">${approximateQuantity}</td></tr>
        <tr><td class="label">Device Categories</td><td class="value">
          <ul class="pill-list">
            ${deviceTypes.map((d) => `<li>${d}</li>`).join('')}
          </ul>
        </td></tr>
        ${infrastructureDetails ? `<tr><td class="label">Specific Asset Notes</td><td class="value">${infrastructureDetails}</td></tr>` : ''}
      </table>

      <div class="section-title">4. Service Requirements &amp; SLA</div>
      <table>
        <tr><td class="label">Preferred SLA Tier</td><td class="value">${preferredSla}</td></tr>
        <tr><td class="label">Selected Services</td><td class="value">
          <ul class="pill-list">
            ${requiredServices.map((s) => `<li>${s}</li>`).join('')}
          </ul>
        </td></tr>
        ${currentIssues ? `<tr><td class="label">Specific Needs / Challenges</td><td class="value">${currentIssues}</td></tr>` : ''}
      </table>
    </div>
    <div class="footer">
      Submitted to Commercial &amp; Proposal Desk via Mint AMC Portal.<br/>
      Mint AMC Corporate Desk · info@mintamc.com · https://mintamc.com
    </div>
  </div>
</body>
</html>
`.trim();

    const sendResult = await sendInquiryEmail({
      department: 'commercial',
      subject: `Enterprise IT AMC Proposal Request — ${companyName}`,
      referenceId,
      replyTo: email,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({
      ok: true,
      referenceId,
      submittedAt,
      recipient: sendResult.recipient,
      summary: {
        companyName,
        contactName,
        email,
        phone,
        locationSummary: `${city}, ${state} (${locationCount}) · ${coverageType}`,
        infrastructureSummary: `${approximateQuantity} (${deviceTypes.join(', ')})`,
        serviceSummary: `${requiredServices.join(', ')} · ${preferredSla}`,
      },
    });
  } catch (err: unknown) {
    console.error('Proposal form submission error:', err);
    return NextResponse.json(
      {
        ok: false,
        error: 'Unable to process your proposal request right now. Please try again.',
      },
      { status: 500 },
    );
  }
}
