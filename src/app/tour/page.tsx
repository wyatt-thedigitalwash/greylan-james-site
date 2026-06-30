import type { Metadata } from 'next';
import { getUpcomingEvents } from '@/lib/bandsintown';
import ParallaxBanner from '@/components/ParallaxBanner';

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
    <ParallaxBanner src="https://res.cloudinary.com/dgbiatexy/video/upload/v1781882696/TxQenAtI2UU5_briwls.mp4" height="h-[350px] md:h-[500px]" />
    <section aria-label="Tour dates" className="bg-brand-gray px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-headline text-[64px] leading-none uppercase tracking-tight text-brand-black md:text-[96px]">
          Tour
        </h1>

        {events.length > 0 ? (
          <div className="mt-10">
            {events.map((event, i) => (
              <div
                key={`${event.date}-${event.venue}`}
                className={`flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between${i < events.length - 1 ? ' border-b border-brand-black/15' : ''}`}
              >
                <span className="font-headline text-[28px] uppercase tracking-wide text-brand-black md:text-[32px] md:w-64 md:shrink-0">
                  {event.date}
                </span>
                <span className="font-body text-lg text-brand-black/70 md:flex-1">
                  {event.venue} &middot; {event.city}
                </span>
                <div className="flex gap-3 mt-2 md:mt-0">
                  <a
                    href={event.eventUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block border border-brand-black px-6 py-2 font-headline text-[22px] uppercase tracking-wide text-brand-black text-center hover:bg-brand-black hover:text-white transition-colors"
                  >
                    RSVP<span className="sr-only"> (opens in new tab)</span>
                  </a>
                  <a
                    href={event.ticketUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-brand-red px-6 py-2 font-headline text-[22px] uppercase tracking-wide text-white text-center hover:opacity-90 transition-opacity"
                  >
                    Buy<span className="sr-only"> tickets (opens in new tab)</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-lg text-brand-black/70 font-body">
            No upcoming dates right now. Check back soon.
          </p>
        )}
      </div>
    </section>
    </>
  );
}
