import type { Metadata } from 'next';
import { getUpcomingEvents } from '@/lib/bandsintown';
import Texture from '@/components/Texture';

export const metadata: Metadata = {
  title: 'Tour',
  description:
    'See all upcoming tour dates and buy tickets for Greylan James live shows. Country music concerts across the United States.',
  alternates: { canonical: 'https://greylanjames.com/tour' },
  openGraph: {
    title: 'Tour | Greylan James',
    description:
      'See all upcoming tour dates and buy tickets for Greylan James live shows. Country music concerts across the United States.',
    url: 'https://greylanjames.com/tour',
    type: 'website',
    siteName: 'Greylan James',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tour | Greylan James',
    description:
      'See all upcoming tour dates and buy tickets for Greylan James live shows. Country music concerts across the United States.',
    images: ['/og-image.png'],
  },
};

export default async function TourPage() {
  const events = await getUpcomingEvents();

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
            { '@type': 'ListItem', position: 2, name: 'Tour', item: 'https://greylanjames.com/tour' },
          ],
        }),
      }}
    />
    {/* Extra bottom padding covers what the footer's tear takes. See the
        spacing note in globals.css. */}
    <section aria-label="Tour dates" className="relative bg-brand-cream px-4 pt-16 pb-20 md:px-8 md:pt-24 md:pb-[120px]">
      <Texture variant="paper-light" vignette={false} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <h1 className="font-headline text-[64px] leading-none uppercase tracking-tight text-brand-brown md:text-[96px]">
          Tour
        </h1>

        {events.length > 0 ? (
          <div className="mt-10">
            {events.map((event, i) => (
              <div
                key={`${event.date}-${event.venue}`}
                className={`flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between${i < events.length - 1 ? ' border-b border-brand-brown/15' : ''}`}
              >
                <span className="font-headline text-[28px] uppercase tracking-wide text-brand-brown md:text-[32px] md:w-64 md:shrink-0">
                  {event.date}
                </span>
                {/* Acumin is condensed, so it needs more size than a normal
                    body face to hold its own next to the date. The venue is
                    what a fan scans for, so it carries full strength and the
                    city sits back a step. */}
                <span className="font-body text-[20px] leading-snug text-brand-brown md:flex-1 md:text-[22px]">
                  {event.venue}{' '}
                  <span className="text-brand-brown/60">&middot; {event.city}</span>
                </span>
                <div className="flex gap-3 mt-2 md:mt-0">
                  <a
                    href={event.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-brand-brown px-6 py-2 font-headline text-[22px] uppercase tracking-wide text-brand-brown text-center hover:bg-brand-brown hover:text-brand-cream transition-colors"
                  >
                    RSVP<span className="sr-only"> (opens in new tab)</span>
                  </a>
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-brown px-6 py-2 font-headline text-[22px] uppercase tracking-wide text-brand-cream text-center hover:opacity-90 transition-opacity"
                  >
                    Buy<span className="sr-only"> tickets (opens in new tab)</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-lg text-brand-brown/70 font-body">
            No upcoming dates right now. Check back soon.
          </p>
        )}
      </div>
    </section>
    </>
  );
}
