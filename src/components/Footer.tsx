import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaTiktok, FaXTwitter, FaYoutube, FaSpotify, FaAmazon } from 'react-icons/fa6';
import { SiApplemusic } from 'react-icons/si';

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
    <footer className="w-full bg-brand-black text-white" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="flex flex-col items-center gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-6 md:items-start">
            <Image
              src="/logos/GreylanJames_LogoStacked_White.png"
              alt="Greylan James"
              width={160}
              height={80}
              className="h-20 w-auto"
            />
            <Link
              href="/sign-up"
              className="inline-block bg-brand-red px-8 py-3 font-headline text-[20px] uppercase tracking-wide text-white hover:opacity-90 transition-opacity"
            >
              Sign Up
            </Link>
          </div>

          <div className="flex flex-col items-center gap-6 md:items-end">
            <div className="flex items-center gap-4">
              <span className="font-headline text-[24px] uppercase tracking-wide text-white/60">Follow</span>
              {socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in new tab)`}
                  className="text-white hover:text-brand-red transition-colors p-2"
                >
                  <link.Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <span className="font-headline text-[24px] uppercase tracking-wide text-white/60">Listen</span>
              {streamingLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${link.label} (opens in new tab)`}
                  className="text-white hover:text-brand-red transition-colors p-2"
                >
                  <link.Icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col items-center gap-2 text-xs text-white/60 md:flex-row md:justify-between">
          <p>
            &copy; 2026{' '}
            <a
              href="https://www.bigmachinelabelgroup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Big Machine Records<span className="sr-only"> (opens in new tab)</span>
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            <a
              href="https://www.bigmachinelabelgroup.com/terms/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Terms<span className="sr-only"> (opens in new tab)</span>
            </a>
            <a
              href="https://www.bigmachinelabelgroup.com/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Privacy<span className="sr-only"> (opens in new tab)</span>
            </a>
            <a
              href="https://www.bigmachinelabelgroup.com/cookies/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Cookies<span className="sr-only"> (opens in new tab)</span>
            </a>
            <a
              href="https://www.bigmachinelabelgroup.com/do-not-sell/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Do Not Sell My Information<span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
