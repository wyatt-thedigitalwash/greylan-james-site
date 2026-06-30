'use client';

import { useState } from 'react';
import { COUNTRIES } from '@/lib/countries';

export default function EmailCapture() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'already' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const firstName = (data.get('firstName') as string).trim();
    const lastName = (data.get('lastName') as string).trim();
    const email = (data.get('email') as string).trim();
    const zipCode = (data.get('zip') as string).trim();
    const phone = (data.get('phone') as string).trim();
    const country = (data.get('country') as string).trim();
    const website = ((data.get('website') as string) || '').trim();

    // Client-side validation
    const fieldErrors: Record<string, boolean> = {};
    if (!firstName) fieldErrors.firstName = true;
    if (!lastName) fieldErrors.lastName = true;
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = true;

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus('loading');

    try {
      const res = await fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, firstName, lastName, zipCode, phone, country, website }),
      });

      if (res.ok) {
        setStatus('success');
      } else if (res.status === 409) {
        setStatus('already');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  const isSubmitted = status === 'success' || status === 'already';

  const inputClass =
    'w-full border border-white bg-brand-black px-4 py-3 text-white placeholder-white/50 font-body text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black';

  return (
    <section aria-label="Email signup" className="bg-brand-black border-t border-brand-red px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-headline text-[48px] leading-none uppercase tracking-tight text-white md:text-[64px]">
          Join the List
        </h2>
        <p className="mt-4 text-lg text-white/80 font-body">
          Be the first to know about new music, tour dates, and more.
        </p>

        {isSubmitted ? (
          <div role="status" aria-live="polite" className="mt-8">
            <p className="text-lg text-white font-body">
              {status === 'success' ? 'You are on the list.' : 'You are already subscribed.'}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-8">
            {/* Honeypot field — hidden from humans, traps bots */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="ec-website">Website</label>
              <input
                type="text"
                id="ec-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label htmlFor="ec-firstName" className="sr-only">First name</label>
                <input
                  type="text"
                  id="ec-firstName"
                  name="firstName"
                  placeholder="First name"
                  required
                  aria-required="true"
                  aria-invalid={errors.firstName ? 'true' : undefined}
                  aria-describedby={errors.firstName ? 'ec-firstName-error' : undefined}
                  className={inputClass}
                />
                {errors.firstName && (
                  <p id="ec-firstName-error" role="alert" className="mt-1 text-sm text-[#EF4444] font-body">Required</p>
                )}
              </div>
              <div>
                <label htmlFor="ec-lastName" className="sr-only">Last name</label>
                <input
                  type="text"
                  id="ec-lastName"
                  name="lastName"
                  placeholder="Last name"
                  required
                  aria-required="true"
                  aria-invalid={errors.lastName ? 'true' : undefined}
                  aria-describedby={errors.lastName ? 'ec-lastName-error' : undefined}
                  className={inputClass}
                />
                {errors.lastName && (
                  <p id="ec-lastName-error" role="alert" className="mt-1 text-sm text-[#EF4444] font-body">Required</p>
                )}
              </div>
              <div>
                <label htmlFor="ec-email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="ec-email"
                  name="email"
                  placeholder="Email address"
                  required
                  aria-required="true"
                  aria-invalid={errors.email ? 'true' : undefined}
                  aria-describedby={errors.email ? 'ec-email-error' : undefined}
                  className={inputClass}
                />
                {errors.email && (
                  <p id="ec-email-error" role="alert" className="mt-1 text-sm text-[#EF4444] font-body">Required</p>
                )}
              </div>
              <div>
                <label htmlFor="ec-phone" className="sr-only">Phone number</label>
                <input
                  type="tel"
                  id="ec-phone"
                  name="phone"
                  placeholder="Phone number"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="ec-zip" className="sr-only">Zip code</label>
                <input
                  type="text"
                  id="ec-zip"
                  name="zip"
                  placeholder="Zip code"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="ec-country" className="sr-only">Country</label>
                <select
                  id="ec-country"
                  name="country"
                  defaultValue=""
                  className={inputClass + ' appearance-none'}
                >
                  <option value="" disabled className="text-white/50">Country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {status === 'error' && (
              <p role="alert" className="mt-3 text-sm text-[#EF4444] font-body">Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="mt-3 w-full bg-brand-red px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {status === 'loading' ? 'Submitting...' : 'Sign Up'}
            </button>

            <p className="mt-4 text-xs text-white/50 font-body">
              By submitting this form, you agree to the Big Machine Records{' '}
              <a
                href="https://www.bigmachinelabelgroup.com/privacy/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/80"
              >
                Privacy Policy
              </a>
              , and Laylo&apos;s{' '}
              <a
                href="https://docs.laylo.com/en/articles/6497431-terms-of-service"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/80"
              >
                Terms
              </a>
              {' '}and{' '}
              <a
                href="https://docs.laylo.com/en/articles/6497219-privacy-and-gdpr-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-white/80"
              >
                Privacy Policy
              </a>
              .
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
