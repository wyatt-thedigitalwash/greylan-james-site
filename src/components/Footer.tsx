import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaTiktok, FaXTwitter, FaYoutube, FaSpotify, FaAmazon } from 'react-icons/fa6';
import { SiApplemusic } from 'react-icons/si';
import CookieChoicesLink from '@/components/legal/CookieChoicesLink';
import Texture from '@/components/Texture';
import TornEdge from '@/components/TornEdge';

const legalLinks = [
  { href: '/legal/terms', label: 'Terms' },
  { href: '/legal/privacy', label: 'Privacy' },
  { href: '/legal/dmca', label: 'Copyright (DMCA)' },
  { href: '/legal/cybersecurity', label: 'Cybersecurity' },
  { href: '/legal/tcpa', label: 'TCPA' },
  { href: '/legal/privacy#s10-2', label: 'Do Not Sell My Personal Information' },
];

const socialLinks = [
  { href: 'https://www.instagram.com/greylanjames/', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://www.facebook.com/greylanjamesmusic/', label: 'Facebook', Icon: FaFacebookF },
  { href: 'https://www.tiktok.com/@greylanjames', label: 'TikTok', Icon: FaTiktok },
  { href: 'https://twitter.com/greylanjames', label: 'X', Icon: FaXTwitter },
  { href: 'https://www.youtube.com/greylanjames', label: 'YouTube', Icon: FaYoutube },
];

const streamingLinks = [
  { href: 'https://open.spotify.com/artist/0obiwW8UEpyliJ4xhXqrra', label: 'Spotify', Icon: FaSpotify },
  { href: 'https://music.apple.com/us/artist/greylan-james/1607407826', label: 'Apple Music', Icon: SiApplemusic },
  { href: 'https://music.amazon.com/artists/B004JXBNXW/greylan-james', label: 'Amazon Music', Icon: FaAmazon },
];

export default function Footer() {
  return (
    <footer className="relative w-full bg-brand-brown text-brand-cream" aria-label="Site footer">
      {/* The footer tears up over whatever page section sits above it, so the
          page never ends on a ruled line. Brown on brown reads as a ragged
          grain boundary; against the cream Music page it is a full torn edge. */}
      <TornEdge side="top" surface="paper" />
      {/* The footer carries the same paper surface as the sections above it,
          otherwise the grain stops dead at the footer's top edge and puts a
          ruled line right back where the tear is meant to be. No vignette, for
          the same reason. */}
      <Texture variant="paper" vignette={false} />
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-6 md:items-start">
            <Image
              src="/logos/GreylanJames_LogoInitials.png"
              alt="Greylan James"
              width={569}
              height={591}
              className="h-20 w-auto"
            />
            <Link
              href="/sign-up"
              className="inline-block bg-brand-cream px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-brand-brown hover:opacity-90 transition-opacity"
            >
              Sign Up
            </Link>
          </div>

          <div className="flex flex-col items-center gap-6 md:items-end">
            {/* On mobile the label sits on its own line above its icon row, so
                the icons stay centered under the logo instead of being pushed
                off-center by the label. At md the label returns inline. */}
            <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4">
              <span className="font-headline text-[24px] uppercase tracking-wide text-brand-cream/60">Follow</span>
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} (opens in new tab)`}
                    className="text-brand-cream hover:text-brand-cream/70 transition-colors p-2"
                  >
                    <link.Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-1 md:flex-row md:gap-4">
              <span className="font-headline text-[24px] uppercase tracking-wide text-brand-cream/60">Listen</span>
              <div className="flex items-center gap-4">
                {streamingLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} (opens in new tab)`}
                    className="text-brand-cream hover:text-brand-cream/70 transition-colors p-2"
                  >
                    <link.Icon className="w-5 h-5" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-cream/10 pt-6 flex flex-col items-center gap-2 text-xs text-brand-cream/60 md:flex-row md:justify-between">
          <p>
            &copy; 2026{' '}
            <a
              href="https://www.bigmachinelabelgroup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-cream transition-colors"
            >
              Big Machine Records<span className="sr-only"> (opens in new tab)</span>
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-brand-cream transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <CookieChoicesLink className="hover:text-brand-cream transition-colors" />
          </div>
        </div>
      </div>
    </footer>
  );
}
