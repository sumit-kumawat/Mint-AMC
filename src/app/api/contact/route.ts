import { NextRequest, NextResponse } from 'next/server';
import {
  checkThrottling,
  sendInquiryEmail,
  InquiryDepartment,
} from '@/lib/mailer';

export type ContactInquiryPayload = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  department?: InquiryDepartment;
  subject: string;
  message: string;
  contractNumber?: string;
  category?: string;
  severity?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Partial<ContactInquiryPayload>;

    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim();
    const phone = (body.phone ?? '').trim();
    const company = (body.company ?? '').trim();
    const subject = (body.subject ?? '').trim();
    const message = (body.message ?? '').trim();
    const contractNumber = (body.contractNumber ?? '').trim();
    const category = (body.category ?? '').trim();
    const severity = (body.severity ?? '').trim();

    let department: InquiryDepartment = 'business';
    if (body.department === 'commercial' || body.department === 'support') {
      department = body.department;
    } else if (
      subject.toLowerCase().includes('proposal') ||
      subject.toLowerCase().includes('quote') ||
      subject.toLowerCase().includes('amc')
    ) {
      department = 'commercial';
    }

    if (!name || name.length < 2) {
      return NextResponse.json(
        { ok: false, error: 'Please enter your full name (minimum 2 characters).' },
        { status: 400 },
      );
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid business email address.' },
        { status: 400 },
      );
    }
    if (phone && !/^[0-9+\-\s()]{7,20}$/.test(phone)) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a valid phone number (digits and standard formatting).' },
        { status: 400 },
      );
    }
    if (!subject || subject.length < 3) {
      return NextResponse.json(
        { ok: false, error: 'Please enter a subject for your enquiry.' },
        { status: 400 },
      );
    }
    if (!message || message.length < 10) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Please include a brief description of your requirements (at least 10 characters).',
        },
        { status: 400 },
      );
    }

    // Check duplicate submission throttling
    const fingerprint = `${email.toLowerCase()}::${subject.toLowerCase()}::${message.slice(0, 30).toLowerCase()}`;
    if (checkThrottling(fingerprint, 15000)) {
      return NextResponse.json(
        {
          ok: false,
          error: 'Your enquiry was just received. Please wait a moment before sending another.',
        },
        { status: 429 },
      );
    }

    const inquiryId = `MINT-INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const submittedAt = new Date().toISOString();

    const departmentLabel =
      department === 'commercial'
        ? 'Commercial & Proposal Desk'
        : department === 'support'
          ? 'Technical Support & Helpdesk'
          : 'General Business Enquiries Desk';

    const textContent = `
New Enquiry Received — ${inquiryId}
=====================================================
Department: ${departmentLabel}
Reference ID: ${inquiryId}
Submitted At: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST

Contact Details:
----------------
Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}
Company / Account: ${company || 'Not specified'}
${contractNumber ? `Contract / Ref No: ${contractNumber}\n` : ''}${category ? `Asset Category: ${category}\n` : ''}${severity ? `Incident Severity: ${severity}\n` : ''}
Subject: ${subject}

Message / Scope Requirements:
------------------------------
${message}

=====================================================
Mint AMC — Enterprise IT Annual Maintenance Contracts
Corporate Desk: Punawale, Pune (MH), India 411033
Phone: (+91) 800 7060 308
`.trim();

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #1B2430; background-color: #F4F7F9; margin: 0; padding: 20px; }
    .card { background-color: #FFFFFF; max-width: 620px; margin: 0 auto; border: 1px solid #DCE4EA; border-radius: 8px; overflow: hidden; }
    .header { background-color: #2FA878; color: #FFFFFF; padding: 20px 24px; }
    .header h1 { margin: 0; font-size: 18px; font-weight: 600; }
    .content { padding: 24px; }
    .badge { display: inline-block; background-color: #EAF7F1; color: #2FA878; font-size: 12px; font-weight: 600; padding: 4px 8px; border-radius: 8px; margin-bottom: 16px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px; }
    td { padding: 8px 12px; border-bottom: 1px solid #EEF2F6; }
    td.label { width: 140px; color: #526170; font-weight: 500; }
    td.value { color: #1B2430; font-weight: 600; }
    .message-box { background-color: #F4F7F9; border-left: 3px solid #2FA878; border-radius: 0 8px 8px 0; padding: 16px; margin: 16px 0; font-size: 14px; color: #1B2430; white-space: pre-line; }
    .footer { background-color: #F8FAFC; padding: 16px 24px; font-size: 12px; color: #6E7E8F; border-top: 1px solid #DCE4EA; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Mint AMC — New ${department === 'support' ? 'Technical Support Request' : 'Enquiry Notification'}</h1>
    </div>
    <div class="content">
      <div class="badge">Reference: ${inquiryId} · ${departmentLabel}</div>
      <table>
        <tr><td class="label">Full Name</td><td class="value">${name}</td></tr>
        <tr><td class="label">Business Email</td><td class="value"><a href="mailto:${email}">${email}</a></td></tr>
        <tr><td class="label">Phone</td><td class="value">${phone || 'Not provided'}</td></tr>
        <tr><td class="label">Company / Account</td><td class="value">${company || 'Not specified'}</td></tr>
        ${contractNumber ? `<tr><td class="label">Contract / Ref No</td><td class="value">${contractNumber}</td></tr>` : ''}
        ${category ? `<tr><td class="label">Asset Category</td><td class="value">${category}</td></tr>` : ''}
        ${severity ? `<tr><td class="label">Incident Severity</td><td class="value">${severity}</td></tr>` : ''}
        <tr><td class="label">Subject</td><td class="value">${subject}</td></tr>
        <tr><td class="label">Received At</td><td class="value">${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST</td></tr>
      </table>

      <h3 style="font-size: 14px; margin: 16px 0 8px 0; color: #1B2430;">Enquiry Details / Message</h3>
      <div class="message-box">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
    </div>
    <div class="footer">
      Mint AMC Corporate Desk · info@mintamc.com · https://mintamc.com<br/>
      Helpline: (+91) 800 7060 308
    </div>
  </div>
</body>
</html>
`.trim();

    const sendResult = await sendInquiryEmail({
      department,
      subject,
      referenceId: inquiryId,
      replyTo: email,
      text: textContent,
      html: htmlContent,
    });

    return NextResponse.json({
      ok: true,
      inquiryId,
      submittedAt,
      department,
      recipient: sendResult.recipient,
      summary: {
        name,
        email,
        company: company || 'Not specified',
        subject,
      },
    });
  } catch (err: unknown) {
    console.error('Contact form submission error:', err);
    return NextResponse.json(
      {
        ok: false,
        error: 'Unable to submit your enquiry right now. Please try again or email us directly.',
      },
      { status: 500 },
    );
  }
}
