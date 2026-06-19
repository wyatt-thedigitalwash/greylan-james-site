import type { Metadata } from 'next';
import SignUpForm from './SignUpForm';

export const metadata: Metadata = {
  title: 'Sign Up | Greylan James',
  description:
    'Sign up for updates from Greylan James. Be the first to know about new music, tour dates, and more.',
};

export default function SignUpPage() {
  return (
    <section className="bg-brand-black px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h1 className="font-headline text-[64px] leading-none uppercase tracking-tight text-white md:text-[96px]">
          Sign Up
        </h1>
        <p className="mt-4 text-lg text-white/80 font-body">
          Be the first to know about new music, tour dates, and more.
        </p>

        {/* TODO: Wire to Laylo and Mailchimp when integration is ready */}
        <SignUpForm />
      </div>
    </section>
  );
}
