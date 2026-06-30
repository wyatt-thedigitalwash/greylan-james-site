import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiting: IP -> { count, resetAt }
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 3;
const RATE_LIMIT_WINDOW = 5 * 60 * 1000; // 5 minutes

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  const { email, phone, zip, country, website } = body as {
    email?: string;
    phone?: string;
    zip?: string;
    country?: string;
    website?: string;
  };

  // Honeypot: if the hidden "website" field is filled, silently succeed
  if (website) {
    return NextResponse.json({ success: true });
  }

  // Validate email (required)
  if (!email || typeof email !== 'string') {
    return NextResponse.json(
      { error: 'Email address is required.' },
      { status: 400 }
    );
  }

  const trimmedEmail = email.trim();
  if (trimmedEmail.length > 254) {
    return NextResponse.json(
      { error: 'Email address is too long.' },
      { status: 400 }
    );
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return NextResponse.json(
      { error: 'Please enter a valid email address.' },
      { status: 400 }
    );
  }

  // Validate optional fields with length limits
  if (phone && (typeof phone !== 'string' || phone.length > 20)) {
    return NextResponse.json(
      { error: 'Phone number is too long.' },
      { status: 400 }
    );
  }

  if (zip && (typeof zip !== 'string' || zip.length > 20)) {
    return NextResponse.json(
      { error: 'Zip code is too long.' },
      { status: 400 }
    );
  }

  if (country && (typeof country !== 'string' || country.length > 100)) {
    return NextResponse.json(
      { error: 'Country name is too long.' },
      { status: 400 }
    );
  }

  // TODO: Wire to Laylo and Mailchimp when integration is ready
  // For now, accept the submission
  console.log('Sign-up submission:', {
    email: trimmedEmail,
    phone: phone || null,
    zip: zip || null,
    country: country || null,
  });

  return NextResponse.json({ success: true });
}
