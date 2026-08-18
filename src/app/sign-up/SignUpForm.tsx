'use client';

import { useRef, useState } from 'react';
import { COUNTRIES } from '@/lib/countries';
import { SMS_COUNTRIES } from '@/lib/subscribe-validation';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';
type ErrorField = 'email' | 'phone' | '';

const DEFAULT_SUCCESS =
  'You are on the list. Check your phone for a text and reply to confirm SMS updates.';

// Keep only digits and auto-format a US number as NXX-NXX-XXXX as the fan types.
// Handles pastes that include a leading country code (1 or +1) or punctuation.
function formatUsPhone(value: string): string {
  let d = value.replace(/\D/g, '');
  if (d.length === 11 && d.startsWith('1')) d = d.slice(1);
  d = d.slice(0, 10);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}-${d.slice(3)}`;
  return `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
}

const inputBase =
  'w-full bg-brand-cream px-4 py-3 text-brand-brown placeholder-brand-brown/50 font-body text-base focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-brown focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream';

export default function SignUpForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');
  const [website, setWebsite] = useState(''); // honeypot

  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorField, setErrorField] = useState<ErrorField>('');
  const [successMessage, setSuccessMessage] = useState('');

  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  // US/Canada get the +1 auto-formatted REQUIRED phone; elsewhere it's optional/plain
  // because Laylo can only text North American numbers.
  const isNorthAmerica = SMS_COUNTRIES.has(country);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return; // guard double-submit
    setStatus('loading');
    setErrorMessage('');
    setErrorField('');

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
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setZipCode('');
        setCountry('United States');
        return;
      }

      const field: ErrorField =
        data?.field === 'email' || data?.field === 'phone' ? data.field : '';
      setErrorMessage(data?.error || 'Something went wrong. Please try again.');
      setErrorField(field);
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

  if (status === 'success') {
    return (
      <div role="status" aria-live="polite" className="mt-10">
        <p className="text-lg text-brand-brown font-body">{successMessage || DEFAULT_SUCCESS}</p>
      </div>
    );
  }

  const fieldClass = (field?: ErrorField) =>
    /* Two color palette, so an errored field is flagged with a heavier, darker
       brown border instead of a second hue. */
    `${inputBase} ${field && errorField === field ? 'border-2 border-brand-brown' : 'border border-brand-brown/50'}`;

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
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
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
            autoComplete="given-name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={fieldClass()}
          />
        </div>
        <div>
          <label htmlFor="su-lastName" className="sr-only">Last name</label>
          <input
            type="text"
            id="su-lastName"
            name="lastName"
            placeholder="Last name"
            autoComplete="family-name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={fieldClass()}
          />
        </div>
        <div>
          <label htmlFor="su-email" className="sr-only">Email address</label>
          <input
            ref={emailRef}
            type="email"
            id="su-email"
            name="email"
            placeholder="Email address*"
            required
            aria-required="true"
            aria-invalid={errorField === 'email'}
            aria-describedby={status === 'error' ? 'su-error' : undefined}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={fieldClass('email')}
          />
        </div>
        <div>
          <label htmlFor="su-phone" className="sr-only">
            Phone number{isNorthAmerica ? '' : ' (optional)'}
          </label>
          {isNorthAmerica ? (
            <div
              className={`flex items-stretch bg-brand-cream focus-within:ring-2 focus-within:ring-brand-brown focus-within:ring-offset-2 focus-within:ring-offset-brand-cream ${
                errorField === 'phone' ? 'border-2 border-brand-brown' : 'border border-brand-brown/50'
              }`}
            >
              <span
                className="flex items-center pl-4 pr-2 text-brand-brown/50 font-body text-base select-none"
                aria-hidden="true"
              >
                +1
              </span>
              <input
                ref={phoneRef}
                type="tel"
                id="su-phone"
                name="phone"
                inputMode="numeric"
                placeholder="555-555-5555"
                required
                aria-required="true"
                aria-invalid={errorField === 'phone'}
                aria-describedby={status === 'error' ? 'su-error' : undefined}
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(formatUsPhone(e.target.value))}
                className="w-full border-0 bg-brand-cream py-3 pr-4 text-brand-brown placeholder-brand-brown/50 font-body text-base focus:outline-none"
              />
            </div>
          ) : (
            <input
              ref={phoneRef}
              type="tel"
              id="su-phone"
              name="phone"
              inputMode="tel"
              placeholder="Phone number (optional)"
              aria-invalid={errorField === 'phone'}
              aria-describedby={status === 'error' ? 'su-error' : undefined}
              autoComplete="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={fieldClass('phone')}
            />
          )}
        </div>
        <div>
          <label htmlFor="su-zip" className="sr-only">Zip code</label>
          <input
            type="text"
            id="su-zip"
            name="zip"
            inputMode="numeric"
            placeholder="Zip code"
            autoComplete="postal-code"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            className={fieldClass()}
          />
        </div>
        <div>
          <label htmlFor="su-country" className="sr-only">Country</label>
          <select
            id="su-country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={`${fieldClass()} appearance-none`}
          >
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {status === 'error' && (
        <p id="su-error" role="alert" className="mt-3 text-sm text-brand-brown font-body">
          {errorMessage || 'Something went wrong. Please try again.'}
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="mt-3 w-full bg-brand-brown px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-brand-cream hover:opacity-90 transition-opacity disabled:opacity-50"
      >
        {status === 'loading' ? 'Submitting...' : 'Sign Up'}
      </button>

      {/* Legally required SMS consent copy when collecting phone via Laylo. Keep the copy and both Laylo links. */}
      <p className="mt-4 text-xs text-brand-brown/60 font-body leading-relaxed">
        By submitting this form you agree to receive email and recurring automated marketing
        text messages. We will text you once to confirm your number, reply to opt in. Consent is
        not a condition of purchase. Message and data rates may apply. See the Big Machine Records{' '}
        <a
          href="https://www.bigmachinelabelgroup.com/privacy/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-brand-brown/80"
        >
          Privacy Policy
        </a>
        , and Laylo&apos;s{' '}
        <a
          href="https://docs.laylo.com/en/articles/6497431-terms-of-service"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-brand-brown/80"
        >
          Terms
        </a>
        {' '}and{' '}
        <a
          href="https://docs.laylo.com/en/articles/6497219-privacy-and-gdpr-policy"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-brand-brown/80"
        >
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
