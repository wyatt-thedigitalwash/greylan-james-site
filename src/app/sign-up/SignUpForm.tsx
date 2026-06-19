'use client';

import { useState } from 'react';
import { COUNTRIES } from '@/lib/countries';

export default function SignUpForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (submitted) {
    return (
      <p className="mt-10 text-lg text-white font-body">You are on the list.</p>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
        if (!email) {
          setError('Email address is required.');
          return;
        }
        setError('');
        setSubmitted(true);
      }}
      className="mt-10"
    >
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <input
          type="email"
          name="email"
          placeholder="Email address"
          className="w-full border border-white bg-brand-black px-4 py-3 text-white placeholder-white/50 font-body text-base outline-none"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone number"
          className="w-full border border-white bg-brand-black px-4 py-3 text-white placeholder-white/50 font-body text-base outline-none"
        />
        <input
          type="text"
          name="zip"
          placeholder="Zip code"
          className="w-full border border-white bg-brand-black px-4 py-3 text-white placeholder-white/50 font-body text-base outline-none"
        />
        <select
          name="country"
          defaultValue=""
          className="w-full border border-white bg-brand-black px-4 py-3 text-white font-body text-base outline-none appearance-none"
        >
          <option value="" disabled className="text-white/50">Country</option>
          {COUNTRIES.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {error && (
        <p className="mt-3 text-sm text-brand-red font-body">{error}</p>
      )}

      <button
        type="submit"
        className="mt-3 w-full bg-brand-red px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-white hover:opacity-90 transition-opacity"
      >
        Sign Up
      </button>
    </form>
  );
}
