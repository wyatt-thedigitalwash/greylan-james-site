import Link from 'next/link';
import Image from 'next/image';

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function AppleMusicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043A5.022 5.022 0 0 0 19.63.28a10.58 10.58 0 0 0-1.63-.16c-.036-.003-.072-.007-.108-.01H6.108c-.036.003-.072.007-.108.01a10.58 10.58 0 0 0-1.63.16 5.022 5.022 0 0 0-1.944.65C1.308 1.634.563 2.634.246 3.944a9.23 9.23 0 0 0-.24 2.19c-.003.036-.007.072-.006.108v11.52c0 .036.003.072.006.108a9.23 9.23 0 0 0 .24 2.19c.317 1.3 1.062 2.3 2.18 3.034a5.022 5.022 0 0 0 1.944.65c.536.1 1.08.15 1.63.16.036.003.072.007.108.01h11.784c.036-.003.072-.007.108-.01a10.58 10.58 0 0 0 1.63-.16 5.022 5.022 0 0 0 1.944-.65c1.118-.733 1.863-1.734 2.18-3.034a9.23 9.23 0 0 0 .24-2.19c.003-.036.007-.072.006-.108V6.232c0-.036-.003-.072-.006-.108zM16.95 16.55c0 .644-.12 1.26-.48 1.82a2.84 2.84 0 0 1-1.4 1.15c-.46.2-.94.3-1.44.32-.5.02-.99-.06-1.44-.25a2.17 2.17 0 0 1-1.26-1.28 2.63 2.63 0 0 1-.16-.99c.02-.5.18-.96.49-1.37.31-.41.72-.7 1.19-.87.32-.12.66-.2 1-.26.34-.06.68-.11 1.02-.16.34-.05.62-.14.82-.32.1-.09.15-.21.15-.39V8.38c0-.18-.07-.32-.22-.39a.83.83 0 0 0-.44-.04l-5.49 1.17c-.16.04-.28.12-.35.27-.04.09-.05.2-.05.32v7.25c0 .66-.12 1.28-.49 1.85a2.89 2.89 0 0 1-1.41 1.15c-.46.19-.93.29-1.43.3-.5.02-.99-.06-1.44-.26A2.18 2.18 0 0 1 3.02 19a2.6 2.6 0 0 1-.15-1.02c.03-.5.19-.96.5-1.37.31-.4.72-.68 1.18-.86.33-.13.67-.21 1.01-.27.34-.06.68-.11 1.02-.16.33-.05.6-.14.8-.32.1-.09.16-.22.16-.4V7.96c0-.3.05-.58.19-.84.13-.25.34-.43.6-.51l6.42-1.67c.26-.07.52-.1.79-.08.27.02.5.11.68.3.14.15.22.34.24.56.02.11.01.22.01.33v10.5z" />
    </svg>
  );
}

function AmazonMusicIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.66.66 0 0 1-.753.077c-1.06-.876-1.248-1.284-1.829-2.12-1.749 1.784-2.987 2.318-5.253 2.318-2.683 0-4.77-1.656-4.77-4.967 0-2.587 1.402-4.347 3.399-5.208 1.73-.753 4.148-.886 5.993-1.095v-.41c0-.753.058-1.642-.383-2.292-.385-.579-1.124-.818-1.775-.818-1.205 0-2.277.618-2.54 1.897-.054.285-.261.566-.546.58l-3.063-.33c-.258-.058-.544-.266-.47-.66C6.057 1.926 9.326.5 12.27.5c1.463 0 3.376.39 4.53 1.5 1.462 1.389 1.322 3.243 1.322 5.262v4.762c0 1.432.593 2.06 1.15 2.836.196.274.24.604-.01.806-.626.524-1.738 1.5-2.35 2.046l-.008-.006zM21.779 19.65C19.314 21.6 15.67 22.65 12.52 22.65c-4.453 0-8.464-1.648-11.495-4.39-.238-.216-.025-.511.261-.344 3.274 1.903 7.323 3.05 11.506 3.05 2.821 0 5.923-.585 8.78-1.796.43-.185.792.283.207.48z" />
    </svg>
  );
}

const socialLinks = [
  { href: 'https://www.instagram.com/greylanjames/', label: 'Instagram', Icon: InstagramIcon },
  { href: 'https://www.facebook.com/greylanjamesmusic/', label: 'Facebook', Icon: FacebookIcon },
  { href: 'https://www.tiktok.com/@greylanjames', label: 'TikTok', Icon: TikTokIcon },
  { href: 'https://twitter.com/greylanjames', label: 'X', Icon: XIcon },
  { href: 'https://www.youtube.com/greylanjames', label: 'YouTube', Icon: YouTubeIcon },
];

const streamingLinks = [
  { href: 'https://open.spotify.com/artist/0obiwW8UEpyliJ4xhXqrra', label: 'Spotify', Icon: SpotifyIcon },
  { href: 'https://music.apple.com/us/artist/greylan-james/1607407826', label: 'Apple Music', Icon: AppleMusicIcon },
  { href: 'https://music.amazon.com/artists/B004JXBNXW/greylan-james', label: 'Amazon Music', Icon: AmazonMusicIcon },
];

export default function Footer() {
  return (
    <footer className="w-full bg-brand-black text-white">
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
                  aria-label={link.label}
                  className="text-white hover:text-brand-red transition-colors"
                >
                  <link.Icon className="w-5 h-5" />
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
                  aria-label={link.label}
                  className="text-white hover:text-brand-red transition-colors"
                >
                  <link.Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col items-center gap-2 text-xs text-white/40 md:flex-row md:justify-between">
          <p>
            &copy; 2026{' '}
            <a
              href="https://www.bigmachinelabelgroup.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Big Machine Records
            </a>
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:justify-end">
            <a
              href="https://www.bigmachinelabelgroup.com/terms/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Terms
            </a>
            <a
              href="https://www.bigmachinelabelgroup.com/privacy/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Privacy
            </a>
            <a
              href="https://www.bigmachinelabelgroup.com/cookies/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Cookies
            </a>
            <a
              href="https://www.bigmachinelabelgroup.com/do-not-sell/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Do Not Sell My Information
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
