import type { Metadata } from 'next';
import { videos } from '@/lib/videos';
import Texture from '@/components/Texture';
import VideoTheater from '@/components/VideoTheater';

export const metadata: Metadata = {
  title: 'Videos',
  description:
    'Watch music videos, lyric videos, and live performances from country artist Greylan James. Official video content from Nashville.',
  alternates: { canonical: 'https://greylanjames.com/videos' },
  openGraph: {
    title: 'Videos | Greylan James',
    description:
      'Watch music videos, lyric videos, and live performances from country artist Greylan James. Official video content from Nashville.',
    url: 'https://greylanjames.com/videos',
    type: 'website',
    siteName: 'Greylan James',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Videos | Greylan James',
    description:
      'Watch music videos, lyric videos, and live performances from country artist Greylan James. Official video content from Nashville.',
    images: ['/og-image.png'],
  },
};

export default function VideosPage() {
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
            { '@type': 'ListItem', position: 2, name: 'Videos', item: 'https://greylanjames.com/videos' },
          ],
        }),
      }}
    />
    {/* Extra bottom padding covers what the footer's tear takes. See the
        spacing note in globals.css. */}
    <section aria-label="Music videos" className="relative bg-brand-cream px-4 pt-16 pb-20 md:px-8 md:pt-24 md:pb-[120px]">
      <Texture variant="paper-light" vignette={false} />
      <div className="relative z-10 mx-auto max-w-7xl">
        <h1 className="font-headline text-[64px] leading-none uppercase tracking-tight text-brand-brown md:text-[96px]">
          Videos
        </h1>

        <VideoTheater videos={videos} tone="light" />
      </div>
    </section>
    </>
  );
}
