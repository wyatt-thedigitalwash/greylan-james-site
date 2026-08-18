'use client';

import { useRef, useState } from 'react';
import { COUNTRIES } from '@/lib/countries';
import { SMS_COUNTRIES } from '@/lib/subscribe-validation';
import Texture from '@/components/Texture';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';
type ErrorField = 'email' | 'phone' | '';

const DEFAULT_SUCCESS =
  "You're on the list. Check your phone for a text and reply to confirm SMS updates.";

// Keep only digits and auto-format a US number as NXX-NXX-XXXX as the fan types.
function formatUsPhone(value: string): string {
  let d = value.replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

export default function EmailCapture() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [website, setWebsite] = useState(''); // honeypot
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorField, setErrorField] = useState<ErrorField>('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const isNorthAmerica = SMS_COUNTRIES.has(country);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');
    setErrorField('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName, lastName, email, phone, zipCode, country, website }),
      });
      const data = await res.json().catch(() => null);

      if (res.ok) {
        setSuccessMessage(data?.message || DEFAULT_SUCCESS);
        setStatus('success');
        return;
      }

      const field: ErrorField =
        data?.field === 'email' || data?.field === 'phone' ? data.field : '';
      setErrorField(field);
      setErrorMessage(data?.error || 'Something went wrong. Please try again.');
      setStatus('error');
      requestAnimationFrame(() => {
        if (field === 'email') emailRef.current?.focus();
        else if (field === 'phone') phoneRef.current?.focus();
      });
    } catch {
      setErrorMessage('Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  const inputClass =
    'w-full bg-brand-cream px-4 py-3 text-brand-brown placeholder-brand-brown/50 font-body text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream';
  /* Two color palette, so an errored field is flagged with a heavier, darker
     brown border instead of a second hue. */
  const fieldClass = (field?: ErrorField) =>
    `${inputClass} ${field && errorField === field ? 'border-2 border-brand-brown' : 'border border-brand-brown/50'}`;

  return (
    // Torn on both sides: the section above tears down over the top of this one
    // and the footer tears up over its bottom, so both ends are padded out. See
    // the spacing note in globals.css.
    <section aria-label="Email signup" data-bg="light" className="relative bg-brand-cream px-4 pt-[84px] pb-20 md:px-8 md:pt-[112px] md:pb-[104px]">
      <Texture variant="paper-light" vignette={false} />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="font-headline text-[48px] leading-none uppercase tracking-tight text-brand-brown md:text-[64px]">
          Join the List
        </h2>
        <p className="mt-4 text-lg text-brand-brown/80 font-body">
          Be the first to know about new music, tour dates, and more.
        </p>

        {status === 'success' ? (
          <div role="status" aria-live="polite" className="mt-8">
            <p className="text-lg text-brand-brown font-body">{successMessage || DEFAULT_SUCCESS}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="mt-8 text-left">
            {/* Honeypot field — hidden from humans, traps bots */}
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="ec-website">Website</label>
              <input
                type="text"
                id="ec-website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              <div>
                <label htmlFor="ec-firstName" className="sr-only">First name</label>
                <input type="text" id="ec-firstName" name="firstName" placeholder="First name"
                  autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)}
                  className={fieldClass()} />
              </div>
              <div>
                <label htmlFor="ec-lastName" className="sr-only">Last name</label>
                <input type="text" id="ec-lastName" name="lastName" placeholder="Last name"
                  autoComplete="family-name" value={lastName} onChange={(e) => setLastName(e.target.value)}
                  className={fieldClass()} />
              </div>
              <div>
                <label htmlFor="ec-email" className="sr-only">Email address</label>
                <input ref={emailRef} type="email" id="ec-email" name="email" placeholder="Email address *"
                  required aria-required="true" aria-invalid={errorField === 'email'}
                  aria-describedby={status === 'error' ? 'ec-error' : undefined}
                  autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className={fieldClass('email')} />
              </div>
              <div>
                <label htmlFor="ec-phone" className="sr-only">Phone number</label>
                {isNorthAmerica ? (
                  <div className={`flex items-stretch bg-brand-cream ${errorField === 'phone' ? 'border-2 border-brand-brown' : 'border border-brand-brown/50'} focus-within:ring-2 focus-within:ring-brand-brown focus-within:ring-offset-2 focus-within:ring-offset-brand-cream`}>
                    <span className="flex items-center pl-4 pr-2 text-brand-brown/50 font-body select-none" aria-hidden="true">+1</span>
                    <input ref={phoneRef} type="tel" id="ec-phone" name="phone" inputMode="numeric"
                      placeholder="555-555-5555" required aria-required="true" aria-invalid={errorField === 'phone'}
                      aria-describedby={status === 'error' ? 'ec-error' : undefined}
                      autoComplete="tel" value={phone} onChange={(e) => setPhone(formatUsPhone(e.target.value))}
                      className="w-full bg-brand-cream px-0 py-3 pr-4 text-brand-brown placeholder-brand-brown/50 font-body text-base border-0 focus:outline-none" />
                  </div>
                ) : (
                  <input ref={phoneRef} type="tel" id="ec-phone" name="phone" inputMode="tel"
                    placeholder="Phone number (optional)" aria-invalid={errorField === 'phone'}
                    autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    className={fieldClass('phone')} />
                )}
              </div>
              <div>
                <label htmlFor="ec-zip" className="sr-only">Zip code</label>
                <input type="text" id="ec-zip" name="zip" inputMode="numeric" placeholder="Zip code"
                  autoComplete="postal-code" value={zipCode} onChange={(e) => setZipCode(e.target.value)}
                  className={fieldClass()} />
              </div>
              <div>
                <label htmlFor="ec-country" className="sr-only">Country</label>
                <select id="ec-country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}
                  className={fieldClass() + ' appearance-none'}>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {status === 'error' && (
              <p id="ec-error" role="alert" className="mt-3 text-sm text-brand-brown font-body">
                {errorMessage || 'Something went wrong. Please try again.'}
              </p>
            )}

            <button type="submit" disabled={status === 'loading'}
              className="mt-3 w-full bg-brand-brown px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-brand-cream hover:opacity-90 transition-opacity disabled:opacity-50">
              {status === 'loading' ? 'Submitting...' : 'Sign Up'}
            </button>

            <p className="mt-4 text-xs text-brand-brown/60 font-body leading-relaxed">
              By submitting this form you agree to receive email and recurring automated marketing
              text messages. We will text you once to confirm your number, reply to opt in. Consent
              is not a condition of purchase. Message and data rates may apply. See the Big Machine
              Records{' '}
              <a href="https://www.bigmachinelabelgroup.com/privacy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-brown/80">Privacy Policy</a>
              , and Laylo&apos;s{' '}
              <a href="https://docs.laylo.com/en/articles/6497431-terms-of-service" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-brown/80">Terms</a>
              {' '}and{' '}
              <a href="https://docs.laylo.com/en/articles/6497219-privacy-and-gdpr-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-brand-brown/80">Privacy Policy</a>
              .
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
