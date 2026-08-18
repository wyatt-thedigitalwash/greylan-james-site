import type { Metadata } from 'next';
import Image from 'next/image';
import Texture from '@/components/Texture';
import TornEdge from '@/components/TornEdge';

export const metadata: Metadata = {
  title: 'About',
  description:
    'The story of Greylan James, Knoxville-raised, Nashville-based country singer-songwriter. ACM Award winner and celebrated Nashville hitmaker.',
  alternates: { canonical: 'https://greylanjames.com/about' },
  openGraph: {
    title: 'About | Greylan James',
    description:
      'The story of Greylan James, Knoxville-raised, Nashville-based country singer-songwriter. ACM Award winner and celebrated Nashville hitmaker.',
    url: 'https://greylanjames.com/about',
    type: 'website',
    siteName: 'Greylan James',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About | Greylan James',
    description:
      'The story of Greylan James, Knoxville-raised, Nashville-based country singer-songwriter. ACM Award winner and celebrated Nashville hitmaker.',
    images: ['/og-image.png'],
  },
};

export default function AboutPage() {
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
              { '@type': 'ListItem', position: 2, name: 'About', item: 'https://greylanjames.com/about' },
            ],
          }),
        }}
      />

      {/* HERO -- same treatment as the home hero. Height subtracts the header,
          which is fixed and always solid on this page, so the photo fills
          exactly the visible area rather than running under the bar. */}
      <section data-bg="hero" aria-label="Greylan James" className="relative">
        <div className="relative h-[calc(100svh-4rem)] min-h-[520px] w-full">
          <Image
            src="/backgrounds/GreylanJames_AboutAsset.jpg"
            alt="Greylan James in a denim jacket at golden hour"
            fill
            priority
            sizes="100vw"
            /* Landscape 3:2 in a portrait phone frame crops the width, not the
               height. See the note on the home hero. 46% matches the home hero
               focal point. */
            className="object-cover object-[46%_center] md:object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/85 via-brand-brown/25 to-brand-brown/10" />
          <div className="relative z-10 flex h-full flex-col justify-end px-4 pb-12 md:px-12 md:pb-20">
            <h1 className="font-headline text-[64px] leading-[0.9] uppercase tracking-tight text-brand-cream md:text-[120px]">
              About
            </h1>
          </div>
        </div>
      </section>

      {/* STORY */}
      {/* Same container and type treatment as the About section on the home
          page, so the bio reads identically in both places. */}
      {/* Uneven padding on purpose, so the cream band reads even. Two tears cut
          into this section from opposite directions: its own tear hangs above
          the section and adds cream on top, while the footer's tear hangs down
          over the section and takes cream off the bottom. Each rip averages 55%
          down its strip, so each moves the visible edge by about 25px on
          desktop and 15px on mobile. The padding below is the intended 64/96
          gap with that shift already taken out of the top and added to the
          bottom. */}
      <section
        data-bg="light"
        aria-label="Biography"
        className="relative bg-brand-cream px-4 pt-12 pb-20 md:px-8 md:pt-[72px] md:pb-[120px]"
      >
        <TornEdge side="top" tone="cream" surface="paper-light" />
        <Texture variant="paper-light" vignette={false} />
        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="text-lg leading-relaxed text-brand-brown/80 font-body">
            From the moment his Papaw gifted him his first guitar at the age of five, one of Nashville&rsquo;s most exciting young breakout Country stars Greylan James knew he was meant to be a musician. The Knoxville-raised artist-on-the-rise has been manifesting his vision of Country music stardom since his earliest days: from those cleats and cowboy hats he wore to school to playing every sort of live show imaginable from tailgates to patios and dive bars to funerals around his hometown. Since moving to Music City eight years ago, Greylan has become a &ldquo;celebrated songwriter&rdquo; (Country Now) earning cuts from some of Country music&rsquo;s most notable artists including Kenny Chesney, Chris Young, Cole Swindell, Darius Rucker, Chris Janson, Bailey Zimmerman, Breland and more. The singer/songwriter recently earned his first No. 1 and ACM Award for Song Of The Year co-writing Jordan Davis&rsquo; smash hit &ldquo;Next Thing You Know.&rdquo; The song also earned Greylan his first CMA Award nomination for Song Of The Year. To date, Greylan&rsquo;s songbook has amassed more than 650 million streams. And while Greylan has undoubtedly been incredibly successful penning hits for others in the writer&rsquo;s room, he&rsquo;s ready to strike out on his own with the recent release of his anticipated debut single &ldquo;Young Man.&rdquo; Co-written alongside esteemed Nashville songwriters Jacob Davis and Josh Miller, and dedicated to Greylan&rsquo;s late grandfather, the reflective song of notching wisdom from one&rsquo;s elders is his most personal song yet. After joining Old Dominion and Cole Swindell on the road in 2023, Greylan has supported Scotty McCreery&rsquo;s CAB IN A SOLO TOUR and Adam Doleac&rsquo;s WRONG SIDE OF A SUNRISE TOUR in 2024.
          </p>
        </div>
      </section>
    </>
  );
}
