import type { Metadata } from 'next';
import SignUpForm from './SignUpForm';
import Texture from '@/components/Texture';

export const metadata: Metadata = {
  title: 'Sign Up',
  description:
    'Sign up for updates from Greylan James. Be the first to know about new music, tour dates, exclusive content, and more.',
  alternates: { canonical: 'https://greylanjames.com/sign-up' },
  openGraph: {
    title: 'Sign Up | Greylan James',
    description:
      'Sign up for updates from Greylan James. Be the first to know about new music, tour dates, exclusive content, and more.',
    url: 'https://greylanjames.com/sign-up',
    type: 'website',
    siteName: 'Greylan James',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sign Up | Greylan James',
    description:
      'Sign up for updates from Greylan James. Be the first to know about new music, tour dates, exclusive content, and more.',
    images: ['/og-image.png'],
  },
};

export default function SignUpPage() {
  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://greylanjames.com' },
            { '@type': 'ListItem', position: 2, name: 'Sign Up', item: 'https://greylanjames.com/sign-up' },
          ],
        }),
      }}
    />
    {/* Extra bottom padding covers what the footer's tear takes. See the
        spacing note in globals.css. */}
    <section data-bg="light" className="relative bg-brand-cream px-4 pt-16 pb-20 md:px-8 md:pt-24 md:pb-[120px]">
      <Texture variant="paper-light" vignette={false} />
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h1 className="font-headline text-[64px] leading-none uppercase tracking-tight text-brand-brown md:text-[96px]">
          Sign Up
        </h1>
        <p className="mt-4 text-lg text-brand-brown/80 font-body">
          Be the first to know about new music, tour dates, and more.
        </p>

        <SignUpForm />
      </div>
    </section>
    </>
  );
}
