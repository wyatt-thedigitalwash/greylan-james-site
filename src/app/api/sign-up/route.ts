import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ---------- Rate limiting (in-memory, resets on cold start) ----------
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 3;
const RATE_WINDOW = 5 * 60 * 1000; // 5 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT;
}

// ---------- Validation helpers ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_EMAIL = 254;
const MAX_ZIP = 20;
const MAX_PHONE = 30;
const MAX_COUNTRY = 100;

function sanitize(value: unknown, maxLen: number): string {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

// ---------- Handler ----------
export async function POST(request: NextRequest) {
  // Rate limit by IP
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || 'unknown';
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { success: false, error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request' },
      { status: 400 }
    );
  }

  // Honeypot — if the hidden field has a value, silently succeed
  if (body.website) {
    return NextResponse.json({ success: true });
  }

  // Sanitize and validate
  const firstName = sanitize(body.firstName, MAX_NAME);
  const lastName = sanitize(body.lastName, MAX_NAME);
  const email = sanitize(body.email, MAX_EMAIL);
  const zipCode = sanitize(body.zipCode, MAX_ZIP);
  const phone = sanitize(body.phone, MAX_PHONE);
  const country = sanitize(body.country, MAX_COUNTRY);

  if (!firstName) {
    return NextResponse.json(
      { success: false, error: 'First name is required' },
      { status: 400 }
    );
  }
  if (!lastName) {
    return NextResponse.json(
      { success: false, error: 'Last name is required' },
      { status: 400 }
    );
  }
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { success: false, error: 'A valid email address is required' },
      { status: 400 }
    );
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const SERVER = process.env.MAILCHIMP_SERVER_PREFIX;
  const AUDIENCE = process.env.MAILCHIMP_AUDIENCE_ID;

  if (!API_KEY || !SERVER || !AUDIENCE) {
    console.error('Missing Mailchimp environment variables');
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(
      `https://${SERVER}.api.mailchimp.com/3.0/lists/${AUDIENCE}/members`,
      {
        method: 'POST',
        headers: {
          Authorization: `Basic ${Buffer.from('anystring:' + API_KEY).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: email,
          status: 'subscribed',
          tags: ['Greylan James'],
          merge_fields: {
            FNAME: firstName,
            LNAME: lastName,
            MMERGE14: zipCode,
            PHONE: phone,
            MMERGE12: country,
            MMERGE9: 'greylanjames.com',
          },
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      // Laylo subscription (secondary — failures don't affect user response)
      const LAYLO_KEY = process.env.LAYLO_API_KEY;
      if (LAYLO_KEY) {
        try {
          await fetch('https://laylo.com/api/graphql', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${LAYLO_KEY}`,
            },
            body: JSON.stringify({
              query: 'mutation($email: String) { subscribeToUser(email: $email) }',
              variables: { email },
            }),
          });
        } catch (err) {
          console.error('Laylo email error:', err);
        }

        if (phone) {
          try {
            const digits = phone.replace(/\D/g, '');
            const formatted = digits.startsWith('1') ? `+${digits}` : `+1${digits}`;
            await fetch('https://laylo.com/api/graphql', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${LAYLO_KEY}`,
              },
              body: JSON.stringify({
                query: 'mutation($phoneNumber: String) { subscribeToUser(phoneNumber: $phoneNumber) }',
                variables: { phoneNumber: formatted },
              }),
            });
          } catch (err) {
            console.error('Laylo phone error:', err);
          }
        }
      }

      return NextResponse.json({ success: true });
    }

    if (res.status === 400 && data.title === 'Member Exists') {
      return NextResponse.json(
        { success: false, error: 'already_subscribed' },
        { status: 409 }
      );
    }

    console.error('Mailchimp error:', data.title, data.detail);
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    );
  } catch (err) {
    console.error('Subscribe route error:', err);
    return NextResponse.json(
      { success: false, error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
