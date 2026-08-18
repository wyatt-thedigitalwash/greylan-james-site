'use client';

import Link from 'next/link';

export default function Error({ reset }: { reset: () => void }) {
  return (
    /* Content is centred, so bottom padding lifts it by half, which is exactly
       what the footer's tear takes off the bottom. See globals.css. */
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-brand-brown px-4 pb-8 text-center md:pb-12">
      <h1 className="font-headline text-[64px] leading-none uppercase tracking-tight text-brand-cream md:text-[96px]">
        Something Went Wrong
      </h1>
      <p className="mt-4 text-lg text-brand-cream/80 font-body">
        An unexpected error occurred.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="bg-brand-cream px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-brand-brown hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-brand-cream px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-brand-cream hover:bg-brand-cream hover:text-brand-brown transition-colors"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
