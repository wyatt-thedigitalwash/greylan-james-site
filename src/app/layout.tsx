import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

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
  themeColor: "#16140D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${knockout.variable} h-full antialiased`}
    >
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link rel="dns-prefetch" href="https://www.youtube-nocookie.com" />
        <link rel="stylesheet" href="https://use.typekit.net/exs1pha.css" />
      </head>
      <body className="min-h-full flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-[100] focus:bg-brand-red focus:px-6 focus:py-3 focus:text-white focus:font-headline focus:text-[20px] focus:uppercase focus:tracking-wide"
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
        <Header />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
