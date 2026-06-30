'use client';

import { useState } from 'react';
import { COUNTRIES } from '@/lib/countries';

export default function SignUpForm() {
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
      } else if (res.status === 429) {
        setStatus('error');
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

  if (isSubmitted) {
    return (
      <div role="status" aria-live="polite" className="mt-10">
        <p className="text-lg text-white font-body">
          {status === 'success' ? 'You are on the list.' : 'You are already subscribed.'}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-10">
      {/* Honeypot field — hidden from humans, traps bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="su-website">Website</label>
        <input
          type="text"
          id="su-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <label htmlFor="su-firstName" className="sr-only">First name</label>
          <input
            type="text"
            id="su-firstName"
            name="firstName"
            placeholder="First name"
            required
            aria-required="true"
            aria-invalid={errors.firstName ? 'true' : undefined}
            aria-describedby={errors.firstName ? 'su-firstName-error' : undefined}
            className={inputClass}
          />
          {errors.firstName && (
            <p id="su-firstName-error" role="alert" className="mt-1 text-sm text-[#EF4444] font-body">Required</p>
          )}
        </div>
        <div>
          <label htmlFor="su-lastName" className="sr-only">Last name</label>
          <input
            type="text"
            id="su-lastName"
            name="lastName"
            placeholder="Last name"
            required
            aria-required="true"
            aria-invalid={errors.lastName ? 'true' : undefined}
            aria-describedby={errors.lastName ? 'su-lastName-error' : undefined}
            className={inputClass}
          />
          {errors.lastName && (
            <p id="su-lastName-error" role="alert" className="mt-1 text-sm text-[#EF4444] font-body">Required</p>
          )}
        </div>
        <div>
          <label htmlFor="su-email" className="sr-only">Email address</label>
          <input
            type="email"
            id="su-email"
            name="email"
            placeholder="Email address"
            required
            aria-required="true"
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'su-email-error' : undefined}
            className={inputClass}
          />
          {errors.email && (
            <p id="su-email-error" role="alert" className="mt-1 text-sm text-[#EF4444] font-body">Required</p>
          )}
        </div>
        <div>
          <label htmlFor="su-phone" className="sr-only">Phone number</label>
          <input
            type="tel"
            id="su-phone"
            name="phone"
            placeholder="Phone number"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="su-zip" className="sr-only">Zip code</label>
          <input
            type="text"
            id="su-zip"
            name="zip"
            placeholder="Zip code"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="su-country" className="sr-only">Country</label>
          <select
            id="su-country"
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
  );
}
