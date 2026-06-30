'use client';

import { useState } from 'react';
import { COUNTRIES } from '@/lib/countries';

export default function EmailCapture() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const email = (formData.get('email') as string)?.trim();

    if (!email) {
      setError('Email address is required.');
      return;
    }

    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/sign-up', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone: formData.get('phone') || '',
          zip: formData.get('zip') || '',
          country: formData.get('country') || '',
          website: formData.get('website') || '',
        }),
      });

      if (res.status === 429) {
        setError('Too many requests. Please try again later.');
        return;
      }

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section aria-label="Email signup" className="bg-brand-black border-t border-brand-red px-4 py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-headline text-[48px] leading-none uppercase tracking-tight text-white md:text-[64px]">
          Join the List
        </h2>
        <p className="mt-4 text-lg text-white/80 font-body">
          Be the first to know about new music, tour dates, and more.
        </p>

        {submitted ? (
          <p role="status" className="mt-8 text-lg text-white font-body">You are on the list.</p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8">
            {/* Honeypot field — hidden from humans, traps bots */}
            <div className="hidden" aria-hidden="true">
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
                <label htmlFor="ec-email" className="sr-only">Email address</label>
                <input
                  type="email"
                  id="ec-email"
                  name="email"
                  placeholder="Email address"
                  aria-required="true"
                  aria-invalid={error ? 'true' : undefined}
                  aria-describedby={error ? 'ec-error' : undefined}
                  className="w-full border border-white bg-brand-black px-4 py-3 text-white placeholder-white/50 font-body text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
                />
              </div>
              <div>
                <label htmlFor="ec-phone" className="sr-only">Phone number</label>
                <input
                  type="tel"
                  id="ec-phone"
                  name="phone"
                  placeholder="Phone number"
                  className="w-full border border-white bg-brand-black px-4 py-3 text-white placeholder-white/50 font-body text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
                />
              </div>
              <div>
                <label htmlFor="ec-zip" className="sr-only">Zip code</label>
                <input
                  type="text"
                  id="ec-zip"
                  name="zip"
                  placeholder="Zip code"
                  className="w-full border border-white bg-brand-black px-4 py-3 text-white placeholder-white/50 font-body text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
                />
              </div>
              <div>
                <label htmlFor="ec-country" className="sr-only">Country</label>
                <select
                  id="ec-country"
                  name="country"
                  defaultValue=""
                  className="w-full border border-white bg-brand-black px-4 py-3 text-white font-body text-base appearance-none focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-red focus-visible:ring-offset-2 focus-visible:ring-offset-brand-black"
                >
                  <option value="" disabled className="text-white/50">Country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {error && (
              <p id="ec-error" role="alert" className="mt-3 text-sm text-[#EF4444] font-body">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="mt-3 w-full bg-brand-red px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-white hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Sign Up'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
