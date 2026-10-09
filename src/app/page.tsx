import type { Metadata } from 'next';
import Image, { getImageProps } from 'next/image';
import Link from 'next/link';
import { getUpcomingEvents } from '@/lib/bandsintown';
import { BIO } from '@/lib/bio';
import { album, albumCopy, isAlbumOut, releases } from '@/lib/releases';
import { videos } from '@/lib/videos';
import ParallaxSection from '@/components/ParallaxSection';
import EmailCapture from '@/components/EmailCapture';
import Texture from '@/components/Texture';
import TornEdge from '@/components/TornEdge';
import VideoTheater from '@/components/VideoTheater';

// Closing site index. Every destination in the sitemap, so it reads as the last
// way to navigate rather than a partial repeat of the header.
const indexLinks = [
  { href: '/music', label: 'Music' },
  { href: '/videos', label: 'Videos' },
  { href: '/tour', label: 'Tour' },
  { href: '/about', label: 'About' },
  { href: '/sign-up', label: 'Sign Up' },
];

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

// Shared props for the art-directed hero below.
const heroImage = { alt: '', fill: true, priority: true, sizes: '100vw' };
const { props: heroDesktop } = getImageProps({
  ...heroImage,
  src: '/backgrounds/GreylanJames_DesktopAlbumPhoto.jpg',
});
const { props: heroMobile } = getImageProps({
  ...heroImage,
  src: '/backgrounds/GreylanJames_AlbumPhoto.jpg',
});

export default async function Home() {
  const events = await getUpcomingEvents();
  const albumText = albumCopy(isAlbumOut());
  return (
    <>
      {/* SECTION 1: HERO */}
      <section data-bg="hero" aria-label="Greylan James, debut album, Greylan James" className="relative">
        <h1 className="sr-only">Greylan James, Nashville country singer-songwriter</h1>
        <div className="relative h-[100svh] min-h-[520px] w-full">
          {/* Art directed: the landscape crop from 768px up, the portrait
              original on phones. One <picture>, so only the matching file
              downloads. */}
          <picture>
            <source media="(min-width: 768px)" srcSet={heroDesktop.srcSet} sizes="100vw" />
            <img
              {...heroMobile}
              alt="Greylan James with his guitar on a bench beside a bonfire at dusk, a beagle at his feet"
              /* Portrait (2:3) on phones is shown nearly whole. The desktop
                 frame is wide (about 2:1), so most screens trim its sides;
                 on extra-wide ones it trims top and bottom instead, and 30%
                 keeps his cap clear of the header. */
              className="absolute inset-0 h-full w-full object-cover object-[50%_center] md:object-[center_30%]"
            />
          </picture>
          {/* Black, not brand brown: the photo is already dark, so only the
              bottom half gets a scrim, enough to keep the lockup readable
              where it crosses the bench and the dog. */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent" />
          {/* The bottom quarter eases into brand brown so the photo meets the
              Music section's torn brown edge without a hard cut. */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-brand-brown via-brand-brown/30 via-40% to-transparent" />
          {/* Right-aligned on phones so the lockup clears the dog at bottom
              left of the portrait photo. Left-aligned from 768px up. */}
          <div className="relative z-10 flex h-full flex-col items-end justify-end px-4 pb-12 text-right md:items-start md:px-12 md:pb-20 md:text-left">
            <p className="font-headline text-[20px] leading-none uppercase text-brand-cream/80 md:text-[30px]">
              Debut Album
            </p>
            <p className="font-headline text-[64px] leading-[0.9] uppercase tracking-tight text-brand-cream md:text-[120px]">
              {album.title}
            </p>
            <p className="mt-2 font-headline text-[20px] leading-none uppercase text-brand-cream/80 md:text-[30px]">
              {albumText.date}
            </p>
            <a
              href={album.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block w-fit bg-brand-cream px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-brand-brown hover:opacity-90 transition-opacity"
            >
              {albumText.cta}<span className="sr-only"> the album Greylan James (opens in new tab)</span>
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2: MUSIC */}
      <section data-bg="dark" aria-label="Music" className="relative bg-brand-brown px-4 py-16 md:px-12 md:py-24">
        {/* Tears up over the bottom of the hero photo. */}
        <TornEdge side="top" />
        <Texture variant="press" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <h2 className="font-headline text-[64px] leading-none uppercase tracking-tight text-brand-cream md:text-[96px]">
            Music
          </h2>

          <div className="mt-10 grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
            {releases.slice(0, 4).map((release) => {
              /* Cover art and title live inside one link so the whole card is a
                 single tap target, and one focus stop instead of two. */
              const cover = (
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={release.cover}
                    alt={`${release.title} cover art`}
                    fill
                    sizes="(min-width: 768px) 25vw, 50vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              );

              return (
                <div key={release.title}>
                  {release.link ? (
                    <a
                      href={release.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cream"
                    >
                      {cover}
                      <span className="mt-3 block font-headline text-[20px] uppercase tracking-wide text-brand-cream transition-colors group-hover:text-brand-cream/70">
                        {release.title}<span className="sr-only"> (opens in new tab)</span>
                      </span>
                    </a>
                  ) : (
                    /* No smart link supplied for this release yet. */
                    <>
                      {cover}
                      <span className="mt-3 block font-headline text-[20px] uppercase tracking-wide text-brand-cream">
                        {release.title}
                      </span>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          <Link
            href="/music"
            className="mt-10 inline-block bg-brand-cream px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-brand-brown hover:opacity-90 transition-opacity"
          >
            See All Music
          </Link>
        </div>
      </section>

      {/* SECTION 3: VIDEOS */}
      <section data-bg="dark" aria-label="Videos" className="relative bg-brand-brown px-4 py-16 md:px-12 md:py-24">
        {/* Tears down over the top of the Tour photo below. */}
        <TornEdge side="bottom" />
        <Texture variant="tape" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <h2 className="font-headline text-[64px] leading-none uppercase tracking-tight text-brand-cream md:text-[96px]">
            Videos
          </h2>

          <VideoTheater videos={videos.slice(0, 2)} tone="dark" />

          <Link
            href="/videos"
            className="mt-10 inline-block bg-brand-cream px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-brand-brown hover:opacity-90 transition-opacity"
          >
            See All Videos
          </Link>
        </div>
      </section>

      {/* SECTION 4: TOUR */}
      <ParallaxSection
        src="/backgrounds/GreylanJames_TourAsset.jpg"
        alt="Greylan James playing guitar on stage under red lights"
        className="px-4 py-16 md:px-8 md:py-24"
        overlay="bg-brand-brown/65"
      >
        <div className="mx-auto max-w-7xl">
          <h2 className="font-headline text-[64px] leading-none uppercase tracking-tight text-brand-cream md:text-[96px]">
            Tour
          </h2>

          {events.length > 0 ? (
            <div className="mt-10">
              {events.slice(0, 10).map((event, i, arr) => (
                <div
                  key={`${event.date}-${event.venue}`}
                  className={`flex flex-col gap-3 py-6 md:flex-row md:items-center md:justify-between${i < arr.length - 1 ? ' border-b border-brand-cream/20' : ''}`}
                >
                  <span className="font-headline text-[28px] uppercase tracking-wide text-brand-cream md:text-[32px] md:w-64 md:shrink-0">
                    {event.date}
                  </span>
                  {/* Matches the /tour rows: venue at full strength, city a
                      step back, sized up so the condensed face stays readable
                      next to the date. */}
                  <span className="font-body text-[20px] leading-snug text-brand-cream md:flex-1 md:text-[22px]">
                    {event.venue}{' '}
                    <span className="text-brand-cream/60">&middot; {event.city}</span>
                  </span>
                  <div className="flex gap-3 mt-2 md:mt-0">
                    <a
                      href={event.eventUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block border border-brand-cream px-6 py-2 font-headline text-[22px] uppercase tracking-wide text-brand-cream text-center hover:bg-brand-cream hover:text-brand-brown transition-colors"
                    >
                      RSVP<span className="sr-only"> (opens in new tab)</span>
                    </a>
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block bg-brand-cream px-6 py-2 font-headline text-[22px] uppercase tracking-wide text-brand-brown text-center hover:opacity-90 transition-opacity"
                    >
                      Buy<span className="sr-only"> tickets (opens in new tab)</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-lg text-brand-cream/70 font-body">
              No upcoming dates right now. Check back soon.
            </p>
          )}

          <Link
            href="/tour"
            className="mt-8 inline-block bg-brand-cream px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-brand-brown hover:opacity-90 transition-opacity"
          >
            See All Dates
          </Link>
        </div>
      </ParallaxSection>

      {/* SECTION 5: ABOUT */}
      <section data-bg="dark" aria-label="About Greylan James" className="relative bg-brand-brown px-4 py-16 md:px-8 md:py-24">
        {/* Tears up over the bottom of the Tour photo above. Shifted so it does
            not repeat the hero tear verbatim. */}
        <TornEdge side="top" surface="paper" shift />
        <Texture variant="paper" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <h2 className="font-headline text-[64px] leading-none uppercase tracking-tight text-brand-cream md:text-[96px]">
            About
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-brand-cream/80 font-body">{BIO}</p>
          <Link
            href="/about"
            className="mt-8 inline-block bg-brand-cream px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-brand-brown hover:opacity-90 transition-opacity"
          >
            Full Story
          </Link>
        </div>
      </section>

      {/* SECTION 6: INDEX
          The last way to navigate. Stacked rows on mobile, one oversized row
          across the page on desktop. */}
      <section data-bg="dark" aria-label="Site index" className="relative bg-brand-brown px-4 py-16 md:px-12 md:py-24">
        {/* Shares About's treatment: the two sections collapse into one slab,
            so the texture has to carry across or the seam shows. */}
        <Texture variant="paper" vignette={false} />
        {/* The brown slab tears down over the cream Join the List section. */}
        <TornEdge side="bottom" surface="paper" />
        <nav
          aria-label="Site index"
          className="relative z-10 mx-auto flex max-w-7xl flex-col md:flex-row md:items-baseline md:justify-between md:gap-4"
        >
          {indexLinks.map((item, i, arr) => (
            <Link
              key={item.href}
              href={item.href}
              className={`font-headline text-[56px] leading-[0.9] uppercase tracking-tight text-brand-cream hover:text-brand-cream/60 transition-colors py-5 md:py-0 md:text-[6.5vw] xl:text-[96px]${
                i < arr.length - 1 ? ' border-b border-brand-cream/20 md:border-b-0' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </section>

      {/* SECTION 7: EMAIL CAPTURE */}
      <EmailCapture />
    </>
  );
}
