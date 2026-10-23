import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieConsent from "@/components/consent/CookieConsent";
import PageViewTracker from "@/components/consent/PageViewTracker";
import TermsGate from "@/components/consent/TermsGate";
import AnchorScroll from "@/components/shared/AnchorScroll";
import Splash from "@/components/splash/Splash";

// Re-render every route at most hourly so the pre-save copy flips to "out now"
// on release day without a deploy. See isAlbumOut in src/lib/releases.ts.
export const revalidate = 3600;
import "./globals.css";

// Keep in sync with SPLASH_KEY in src/components/splash/Splash.tsx. Read before
// paint so a visitor who already entered this session never sees the splash
// flash, and a visitor landing on /legal never sees it at all.
const SPLASH_KEY = "gj_splash_tennesseeyouagain";
const splashScript = `try{var e=document.documentElement;if(sessionStorage.getItem('${SPLASH_KEY}')){e.classList.add('splash-entered')}else if(location.pathname.indexOf('/legal')===0){e.classList.add('splash-exempt')}}catch(err){}`;

const knockout = localFont({
  src: "../../public/fonts/Knockout-HTF67-FullBantamwt.otf",
  variable: "--font-knockout",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://greylanjames.com"),
  title: {
    default: "Greylan James | Nashville Country Singer-Songwriter",
    template: "%s | Greylan James",
  },
  description:
    "Official website of Greylan James, Knoxville-raised, Nashville-based country singer-songwriter. New music, tour dates, videos, and more.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    siteName: "Greylan James",
    title: "Greylan James | Nashville Country Singer-Songwriter",
    description:
      "Official website of Greylan James, Knoxville-raised, Nashville-based country singer-songwriter. New music, tour dates, videos, and more.",
    url: "https://greylanjames.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Greylan James | Nashville Country Singer-Songwriter",
    description:
      "Official website of Greylan James, Knoxville-raised, Nashville-based country singer-songwriter. New music, tour dates, videos, and more.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://greylanjames.com",
  },
};

export const viewport: Viewport = {
  themeColor: "#2E2422",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: the splash script below mutates the class list
    // before React hydrates, so server and client markup intentionally differ.
    <html
      lang="en"
      className={`${knockout.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashScript }} />
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="stylesheet" href="https://use.typekit.net/exs1pha.css" />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Splash must be the first child of <body> so it exists on first
            paint. Shown once per browser session; never on /legal routes. */}
        <Splash />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[100] focus:bg-brand-cream focus:px-6 focus:py-3 focus:text-brand-brown focus:font-headline focus:text-[20px] focus:uppercase focus:tracking-wide"
        >
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MusicGroup",
              name: "Greylan James",
              url: "https://greylanjames.com",
              description:
                "Knoxville-raised, Nashville-based country singer-songwriter. ACM Award winner, celebrated hitmaker, and artist signed to Big Machine Label Group.",
              genre: "Country",
              image: "https://greylanjames.com/og-image.png",
              sameAs: [
                "https://www.instagram.com/greylanjames/",
                "https://www.facebook.com/greylanjamesmusic/",
                "https://www.tiktok.com/@greylanjames",
                "https://twitter.com/greylanjames",
                "https://www.youtube.com/greylanjames",
                "https://open.spotify.com/artist/0obiwW8UEpyliJ4xhXqrra",
                "https://music.apple.com/us/artist/greylan-james/1607407826",
              ],
            }),
          }}
        />
        <AnchorScroll />
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        {/* Cookie consent banner. Shows once per new visitor, persisted in
            localStorage; injects nothing before consent is granted. Held back
            until the visitor has entered past the splash. */}
        <CookieConsent />
        {/* Reports a page view to the tag container on each client-side route
            change. No-op until the visitor consents to analytics. */}
        <PageViewTracker />
        {/* Arbitration / class-action notice. The way in for a visitor who
            landed on /legal before entering, and otherwise a one-time backup
            right after the cookie decision. */}
        <TermsGate />
      </body>
    </html>
  );
}
