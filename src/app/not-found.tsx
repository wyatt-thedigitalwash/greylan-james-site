import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
};

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center bg-brand-black px-4 text-center">
      <h1 className="font-headline text-[64px] leading-none uppercase tracking-tight text-white md:text-[96px]">
        Page Not Found
      </h1>
      <p className="mt-4 text-lg text-white/80 font-body">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block bg-brand-red px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-white hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </section>
  );
}
