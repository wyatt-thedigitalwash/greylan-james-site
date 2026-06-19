'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaInstagram, FaFacebookF, FaTiktok, FaXTwitter, FaYoutube } from 'react-icons/fa6';

const navLinks = [
  { href: '/music', label: 'Music' },
  { href: '/videos', label: 'Videos' },
  { href: '/tour', label: 'Tour' },
  { href: '/about', label: 'About' },
  { href: '/sign-up', label: 'Sign Up' },
];

const socialLinks = [
  { href: 'https://www.instagram.com/greylanjames/', label: 'Instagram', Icon: FaInstagram },
  { href: 'https://www.facebook.com/greylanjamesmusic/', label: 'Facebook', Icon: FaFacebookF },
  { href: 'https://www.tiktok.com/@greylanjames', label: 'TikTok', Icon: FaTiktok },
  { href: 'https://twitter.com/greylanjames', label: 'X', Icon: FaXTwitter },
  { href: 'https://www.youtube.com/greylanjames', label: 'YouTube', Icon: FaYoutube },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-black">
      <div className="flex h-16 items-center justify-between px-4 md:px-12">
        <Link href="/" className="shrink-0">
          <Image
            src="/logos/GreylanJames_Logo_White.png"
            alt="Greylan James"
            width={180}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-headline text-[24px] uppercase tracking-wide text-white hover:text-brand-red transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          className="md:hidden flex flex-col justify-center gap-1.5 p-2 text-white"
          aria-label="Open menu"
        >
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
          <span className="block h-0.5 w-6 bg-white" />
        </button>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-brand-black">
          <div className="flex h-16 items-center justify-between px-4">
            <Link href="/" onClick={() => setMenuOpen(false)} className="shrink-0">
              <Image
                src="/logos/GreylanJames_Logo_White.png"
                alt="Greylan James"
                width={180}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              className="p-2 text-white"
              aria-label="Close menu"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-7 h-7">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-headline text-4xl uppercase tracking-wide text-white hover:text-brand-red transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-center gap-6 pb-12">
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
        </div>
      )}
    </header>
  );
}
