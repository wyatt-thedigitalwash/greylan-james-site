'use client';

import Link from 'next/link';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-brand-black px-4 text-center">
      <h1 className="font-headline text-[64px] leading-none uppercase tracking-tight text-white md:text-[96px]">
        Something Went Wrong
      </h1>
      <p className="mt-4 text-lg text-white/80 font-body">
        An unexpected error occurred.
      </p>
      <div className="mt-8 flex gap-4">
        <button
          onClick={reset}
          className="bg-brand-red px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-white hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="border border-white px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-white hover:bg-white hover:text-brand-black transition-colors"
        >
          Go Home
        </Link>
      </div>
    </section>
  );
}
