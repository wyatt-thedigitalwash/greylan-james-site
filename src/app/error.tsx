'use client';

import Link from 'next/link';

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-lg text-gray-600 mb-8">
        An unexpected error occurred.
      </p>
      <div className="flex gap-4">
        <button
          onClick={reset}
          className="rounded bg-foreground px-6 py-3 text-background font-medium hover:opacity-90 transition-opacity"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="rounded border border-foreground px-6 py-3 font-medium hover:opacity-90 transition-opacity"
        >
          Go Home
        </Link>
      </div>
    </main>
  );
}
