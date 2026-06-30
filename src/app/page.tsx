import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getUpcomingEvents } from '@/lib/bandsintown';
import ParallaxVideo from '@/components/ParallaxVideo';
import ParallaxSection from '@/components/ParallaxSection';
import EmailCapture from '@/components/EmailCapture';

export const metadata: Metadata = {
  alternates: { canonical: 'https://greylanjames.com' },
  openGraph: {
    title: 'Greylan James | Nashville Country Singer-Songwriter',
    description:
      'Official website of Greylan James, Knoxville-raised, Nashville-based country singer-songwriter. New music, tour dates, videos, and more.',
    url: 'https://greylanjames.com',
    type: 'website',
    siteName: 'Greylan James',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Greylan James | Nashville Country Singer-Songwriter',
    description:
      'Official website of Greylan James, Knoxville-raised, Nashville-based country singer-songwriter. New music, tour dates, videos, and more.',
    images: ['/og-image.png'],
  },
};

export default async function Home() {
  const events = await getUpcomingEvents();
  return (
    <>
      {/* SECTION 1: HERO */}
      <section data-bg="hero" aria-label="New single, Small Town">
        {/* TODO: Replace /music with the Small Town smart link once provided */}
        <Link
          href="/music"
          aria-label="Greylan James, Small Town, out now. Listen."
          className="block"
        >
          <Image
            src="/banners/GreylanJames_SmallTown_MobileBanner.jpg"
            alt="Greylan James, Small Town, out now"
            width={1080}
            height={1920}
            priority
            className="w-full h-auto md:hidden"
          />
          <Image
            src="/banners/GreylanJames_SmallTown_DesktopBanner.jpg"
            alt="Greylan James, Small Town, out now"
            width={3200}
            height={1800}
            priority
            className="hidden md:block w-full h-auto"
          />
        </Link>
      </section>

      {/* SECTION 2: INDEX */}
      <section data-bg="dark" aria-label="Site navigation index" className="bg-brand-black px-4 py-0 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl flex flex-col gap-12 md:flex-row md:items-start md:gap-20">
          <nav className="flex flex-col md:flex-1 md:justify-center md:self-center">
            {[
              { href: '/music', label: 'Music', meta: 'New single, Small Town' },
              { href: '/videos', label: 'Videos', meta: 'Watch the latest' },
              { href: '/about', label: 'About', meta: 'The story' },
              { href: '/sign-up', label: 'Sign Up', meta: 'Join the list' },
            ].map((item, i, arr) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center justify-between py-6 md:py-8${i < arr.length - 1 ? ' border-b border-white/20' : ''}`}
              >
                <span className="font-headline text-[64px] leading-[0.9] uppercase tracking-tight text-white group-hover:text-brand-red transition-colors md:text-[108px]">
                  {item.label}
                </span>
                <span className="font-body text-sm text-white/40 md:text-base">
                  {item.meta}
                </span>
              </Link>
            ))}
          </nav>
          <ParallaxVideo src="https://res.cloudinary.com/dgbiatexy/video/upload/v1781879607/GreylandJames_Visual3_ul4glf.mp4" />
        </div>
      </section>

      {/* SECTION 3: TOUR */}
      <ParallaxSection
        src="/backgrounds/GreylanJames_TourBackground.jpg"
        alt="Tour background"
        className="px-4 py-16 md:px-8 md:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="font-headline text-[64px] leading-none uppercase tracking-tight text-white md:text-[96px]">
            Tour
          </h2>

          {events.length > 0 ? (
            <div className="mt-10">
              {events.slice(0, 10).map((event, i, arr) => (
                <div
                  key={`${event.date}-${event.venue}`}
                  className={`flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between${i < arr.length - 1 ? ' border-b border-white/20' : ''}`}
                >
                  <span className="font-headline text-[28px] uppercase tracking-wide text-white md:text-[32px] md:w-64 md:shrink-0">
                    {event.date}
                  </span>
                  <span className="font-body text-lg text-white/70 md:flex-1">
                    {event.venue} &middot; {event.city}
                  </span>
                  <div className="flex gap-3 mt-2 md:mt-0">
                    <a
                      href={event.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border border-white px-6 py-2 font-headline text-[22px] uppercase tracking-wide text-white text-center hover:bg-white hover:text-brand-black transition-colors"
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
            <p className="mt-6 text-lg text-white/70 font-body">
              No upcoming dates right now. Check back soon.
            </p>
          )}

          <Link
            href="/tour"
            className="mt-8 inline-block bg-brand-red px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-white hover:opacity-90 transition-opacity"
          >
            See All Dates
          </Link>
        </div>
      </ParallaxSection>

      {/* SECTION 4: ABOUT */}
      <section aria-label="About Greylan James" className="bg-brand-black px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-headline text-[64px] leading-none uppercase tracking-tight text-white md:text-[96px]">
            About
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/80 font-body">
            From the moment his Papaw gifted him his first guitar at the age of five, one of Nashville&apos;s most exciting young breakout Country stars Greylan James knew he was meant to be a musician. The Knoxville-raised artist-on-the-rise has been manifesting his vision of Country music stardom since his earliest days: from those cleats and cowboy hats he wore to school to playing every sort of live show imaginable from tailgates to patios and dive bars to funerals around his hometown. Since moving to Music City eight years ago, Greylan has become a &quot;celebrated songwriter&quot; (Country Now) earning cuts from some of Country music&apos;s most notable artists including Kenny Chesney, Chris Young, Cole Swindell, Darius Rucker, Chris Janson, Bailey Zimmerman, Breland and more. The singer/songwriter recently earned his first No. 1 and ACM Award for Song Of The Year co-writing Jordan Davis&apos; smash hit &quot;Next Thing You Know.&quot; The song also earned Greylan his first CMA Award nomination for Song Of The Year. To date, Greylan&apos;s songbook has amassed more than 650 million streams. And while Greylan has undoubtedly been incredibly successful penning hits for others in the writer&apos;s room, he&apos;s ready to strike out on his own with the recent release of his anticipated debut single &quot;Young Man.&quot; Co-written alongside esteemed Nashville songwriters Jacob Davis and Josh Miller, and dedicated to Greylan&apos;s late grandfather, the reflective song of notching wisdom from one&apos;s elders is his most personal song yet. After joining Old Dominion and Cole Swindell on the road in 2023, Greylan has supported Scotty McCreery&apos;s CAB IN A SOLO TOUR and Adam Doleac&apos;s WRONG SIDE OF A SUNRISE TOUR in 2024.
          </p>
          <Link
            href="/about"
            className="mt-8 inline-block bg-brand-red px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-white hover:opacity-90 transition-opacity"
          >
            Full Story
          </Link>
        </div>
      </section>

      {/* SECTION 5: EMAIL CAPTURE */}
      <EmailCapture />
    </>
  );
}
