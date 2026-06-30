import type { Metadata } from 'next';
import Image from 'next/image';

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
      {/* Mobile: stacked image then content */}
      <section className="relative overflow-hidden md:hidden">
        <Image
          src="/backgrounds/GreylanJames_AboutBackground_Mobile.jpg"
          alt="Greylan James"
          width={1080}
          height={1350}
          priority
          className="w-full h-auto"
        />
      </section>

      <section className="bg-brand-black px-4 py-16 md:hidden">
        <h1 className="font-headline text-[64px] leading-none uppercase tracking-tight text-white">
          About
        </h1>
        {/* NOTE: This bio is from the "Young Man" release cycle. It does not mention the current single "Small Town" or current tours. Flagged for a client update before launch. */}
        <p className="mt-8 text-lg leading-relaxed text-white/80 font-body">
          From the moment his Papaw gifted him his first guitar at the age of five, one of Nashville&apos;s most exciting young breakout Country stars Greylan James knew he was meant to be a musician. The Knoxville-raised artist-on-the-rise has been manifesting his vision of Country music stardom since his earliest days: from those cleats and cowboy hats he wore to school to playing every sort of live show imaginable from tailgates to patios and dive bars to funerals around his hometown. Since moving to Music City eight years ago, Greylan has become a &quot;celebrated songwriter&quot; (Country Now) earning cuts from some of Country music&apos;s most notable artists including Kenny Chesney, Chris Young, Cole Swindell, Darius Rucker, Chris Janson, Bailey Zimmerman, Breland and more.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-white/80 font-body">
          The singer/songwriter recently earned his first No. 1 and ACM Award for Song Of The Year co-writing Jordan Davis&apos; smash hit &quot;Next Thing You Know.&quot; The song also earned Greylan his first CMA Award nomination for Song Of The Year. To date, Greylan&apos;s songbook has amassed more than 650 million streams.
        </p>
        <p className="mt-6 text-lg leading-relaxed text-white/80 font-body">
          And while Greylan has undoubtedly been incredibly successful penning hits for others in the writer&apos;s room, he&apos;s ready to strike out on his own with the recent release of his anticipated debut single &quot;Young Man.&quot; Co-written alongside esteemed Nashville songwriters Jacob Davis and Josh Miller, and dedicated to Greylan&apos;s late grandfather, the reflective song of notching wisdom from one&apos;s elders is his most personal song yet. After joining Old Dominion and Cole Swindell on the road in 2023, Greylan has supported Scotty McCreery&apos;s CAB IN A SOLO TOUR and Adam Doleac&apos;s WRONG SIDE OF A SUNRISE TOUR in 2024.
        </p>
      </section>

      {/* Desktop: side by side, content left, image right */}
      <section className="hidden md:flex min-h-screen">
        <div className="w-1/2 bg-brand-black px-12 py-24 flex flex-col justify-center">
          <h1 className="font-headline text-[96px] leading-none uppercase tracking-tight text-white">
            About
          </h1>
          {/* NOTE: This bio is from the "Young Man" release cycle. It does not mention the current single "Small Town" or current tours. Flagged for a client update before launch. */}
          <p className="mt-8 text-lg leading-relaxed text-white/80 font-body">
            From the moment his Papaw gifted him his first guitar at the age of five, one of Nashville&apos;s most exciting young breakout Country stars Greylan James knew he was meant to be a musician. The Knoxville-raised artist-on-the-rise has been manifesting his vision of Country music stardom since his earliest days: from those cleats and cowboy hats he wore to school to playing every sort of live show imaginable from tailgates to patios and dive bars to funerals around his hometown. Since moving to Music City eight years ago, Greylan has become a &quot;celebrated songwriter&quot; (Country Now) earning cuts from some of Country music&apos;s most notable artists including Kenny Chesney, Chris Young, Cole Swindell, Darius Rucker, Chris Janson, Bailey Zimmerman, Breland and more.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-white/80 font-body">
            The singer/songwriter recently earned his first No. 1 and ACM Award for Song Of The Year co-writing Jordan Davis&apos; smash hit &quot;Next Thing You Know.&quot; The song also earned Greylan his first CMA Award nomination for Song Of The Year. To date, Greylan&apos;s songbook has amassed more than 650 million streams.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-white/80 font-body">
            And while Greylan has undoubtedly been incredibly successful penning hits for others in the writer&apos;s room, he&apos;s ready to strike out on his own with the recent release of his anticipated debut single &quot;Young Man.&quot; Co-written alongside esteemed Nashville songwriters Jacob Davis and Josh Miller, and dedicated to Greylan&apos;s late grandfather, the reflective song of notching wisdom from one&apos;s elders is his most personal song yet. After joining Old Dominion and Cole Swindell on the road in 2023, Greylan has supported Scotty McCreery&apos;s CAB IN A SOLO TOUR and Adam Doleac&apos;s WRONG SIDE OF A SUNRISE TOUR in 2024.
          </p>
        </div>
        <div className="w-1/2 relative">
          <Image
            src="/backgrounds/GreylanJames_AboutBackground.jpg"
            alt="Greylan James"
            fill
            priority
            sizes="50vw"
            className="object-cover object-top"
          />
        </div>
      </section>
    </>
  );
}
