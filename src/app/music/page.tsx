import type { Metadata } from 'next';
import Image from 'next/image';
import { FaSpotify, FaAmazon } from 'react-icons/fa6';
import { SiApplemusic } from 'react-icons/si';
import { releases } from '@/lib/releases';
import Texture from '@/components/Texture';

export const metadata: Metadata = {
  title: 'Music',
  description:
    'Listen to all releases from Greylan James including Tennessee You Again, Water At A Wedding (her side.) with Gabriella Rose, Small Town, and more. Available on Spotify, Apple Music, and Amazon.',
  alternates: { canonical: 'https://greylanjames.com/music' },
  openGraph: {
    title: 'Music | Greylan James',
    description:
      'Listen to all releases from Greylan James including Tennessee You Again, Water At A Wedding (her side.) with Gabriella Rose, Small Town, and more. Available on Spotify, Apple Music, and Amazon.',
    url: 'https://greylanjames.com/music',
    type: 'website',
    siteName: 'Greylan James',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Music | Greylan James',
    description:
      'Listen to all releases from Greylan James including Tennessee You Again, Water At A Wedding (her side.) with Gabriella Rose, Small Town, and more. Available on Spotify, Apple Music, and Amazon.',
    images: ['/og-image.png'],
  },
};

export default function MusicPage() {
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
            { '@type': 'ListItem', position: 2, name: 'Music', item: 'https://greylanjames.com/music' },
          ],
        }),
      }}
    />
    {/* Extra bottom padding covers what the footer's tear takes. See the
        spacing note in globals.css. */}
    <section aria-label="Music releases" className="relative bg-brand-cream px-4 pt-16 pb-20 md:px-8 md:pt-24 md:pb-[120px]">
      <Texture variant="paper-light" vignette={false} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <h1 className="font-headline text-[64px] leading-none uppercase tracking-tight text-brand-brown md:text-[96px]">
          Music
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {releases.map((release) => {
            /* Cover art and title live inside one link so the whole card is a
               single tap target, and one focus stop instead of two. */
            const cover = (
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={release.cover}
                  alt={`${release.title} cover art`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
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
                    className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-brown"
                  >
                    {cover}
                    <span className="mt-3 block font-headline text-[20px] uppercase tracking-wide text-brand-brown transition-colors group-hover:text-brand-brown/70">
                      {release.title}<span className="sr-only"> (opens in new tab)</span>
                    </span>
                  </a>
                ) : (
                  /* No smart link supplied for this release yet. */
                  <>
                    {cover}
                    <span className="mt-3 block font-headline text-[20px] uppercase tracking-wide text-brand-brown">
                      {release.title}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>

        <p className="mt-16 text-lg text-brand-brown/70 font-body">
          Available everywhere you listen.
        </p>
        <div className="mt-4 flex items-center gap-6">
          <a
            href="https://open.spotify.com/artist/0obiwW8UEpyliJ4xhXqrra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify (opens in new tab)"
            className="text-brand-brown hover:text-brand-brown/70 transition-colors p-2"
          >
            <FaSpotify className="w-6 h-6" aria-hidden="true" />
          </a>
          <a
            href="https://music.apple.com/us/artist/greylan-james/1607407826"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apple Music (opens in new tab)"
            className="text-brand-brown hover:text-brand-brown/70 transition-colors p-2"
          >
            <SiApplemusic className="w-6 h-6" aria-hidden="true" />
          </a>
          <a
            href="https://music.amazon.com/artists/B004JXBNXW/greylan-james"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Amazon Music (opens in new tab)"
            className="text-brand-brown hover:text-brand-brown/70 transition-colors p-2"
          >
            <FaAmazon className="w-6 h-6" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
    </>
  );
}
