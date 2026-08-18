import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    /* Content is centred, so bottom padding lifts it by half, which is exactly
       what the footer's tear takes off the bottom. See globals.css. */
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-brand-brown px-4 pb-8 text-center md:pb-12">
      <h1 className="font-headline text-[64px] leading-none uppercase tracking-tight text-brand-cream md:text-[96px]">
        Page Not Found
      </h1>
      <p className="mt-4 text-lg text-brand-cream/80 font-body">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-brand-cream px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-brand-brown hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </section>
  );
}
