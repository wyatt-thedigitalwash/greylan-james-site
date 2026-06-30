import type { Metadata } from 'next';

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

const videos = [
  {
    title: 'Hold It Down (the after demo) (Lyric Video)',
    id: 'hLbG7hL4hME',
  },
  {
    title: "Pullin' From A Bottle (Lyric Video)",
    id: 'bnRr2Z2u3C8',
  },
  {
    title: 'Give Me A Second (the before) (Lyric Video)',
    id: 'pIOmS5fwZGw',
  },
  {
    title: 'Water At A Wedding (Lyric Video)',
    id: 'gSI2nt5OdxQ',
  },
  {
    title: 'Wait Til You Have Kids (Home Video Version)',
    id: 'J7apgDRFttc',
  },
  {
    title: 'Wait Til You Have Kids (Lyric Video)',
    id: 'iXUMhoDTTyA',
  },
  {
    title: "Things That I Can't Change (From The Road) ft. Cole Swindell",
    id: 't7G-hA-exCg',
  },
  {
    title: 'Man Up (From Her Side of Town)',
    id: 'jsw3fygbHoI',
  },
  {
    title: 'Man Up (Lyric Video)',
    id: 'J1tkgkpEsXg',
  },
  {
    title: 'Who Broke Up With You',
    id: '5mPdWOvFgJ4',
  },
];

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
    <section aria-label="Music videos" className="bg-brand-gray px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-headline text-[64px] leading-none uppercase tracking-tight text-brand-black md:text-[96px]">
          Videos
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
          {videos.map((video) => (
            <div key={video.id}>
              <div className="relative w-full aspect-video overflow-hidden">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${video.id}`}
                  title={video.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
              <p className="mt-3 font-headline text-[18px] uppercase tracking-wide text-brand-black">
                {video.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
