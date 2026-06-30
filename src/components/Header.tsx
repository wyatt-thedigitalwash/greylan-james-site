'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMenuVisible(true));
    });
  }, []);

  const closeMenu = useCallback(() => {
    setMenuVisible(false);
    const timeout = setTimeout(() => {
      setMenuOpen(false);
      hamburgerRef.current?.focus();
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

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

  // Escape key closes mobile menu
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') closeMenu();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [menuOpen, closeMenu]);

  // Focus trap inside mobile menu
  useEffect(() => {
    if (!menuOpen || !menuRef.current) return;
    const menu = menuRef.current;
    const focusable = menu.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    function trapFocus(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    // Focus first link when menu opens
    first.focus();
    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [menuOpen, menuVisible]);

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-black">
      <div className="relative z-50 flex h-16 items-center justify-between px-4 md:px-12 bg-brand-black">
        <Link href="/" className="shrink-0" aria-label="Greylan James, home">
          <Image
            src="/logos/GreylanJames_Logo_White.png"
            alt="Greylan James"
            width={180}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-headline text-[24px] uppercase tracking-wide text-white hover:text-brand-red transition-colors"
            >
              {link.label}
            </Link>
          ))}

          <div className="flex items-center gap-3 ml-2">
            {socialLinks.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in new tab)`}
                className="text-white/70 hover:text-white transition-colors"
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </nav>

        {/* Animated hamburger / X button */}
        <button
          ref={hamburgerRef}
          type="button"
          onClick={() => (menuOpen ? closeMenu() : openMenu())}
          className="md:hidden relative flex flex-col justify-center items-center w-11 h-11 p-2 text-white"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
        >
          <span
            aria-hidden="true"
            className="block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-in-out absolute"
            style={{
              transform: menuVisible
                ? 'rotate(45deg) translateY(0)'
                : 'rotate(0) translateY(-6px)',
            }}
          />
          <span
            aria-hidden="true"
            className="block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-in-out absolute"
            style={{
              opacity: menuVisible ? 0 : 1,
              transform: menuVisible ? 'scaleX(0)' : 'scaleX(1)',
            }}
          />
          <span
            aria-hidden="true"
            className="block h-0.5 w-6 bg-white rounded-full transition-all duration-300 ease-in-out absolute"
            style={{
              transform: menuVisible
                ? 'rotate(-45deg) translateY(0)'
                : 'rotate(0) translateY(6px)',
            }}
          />
        </button>
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          className="fixed inset-0 top-16 z-40 flex flex-col bg-brand-black transition-opacity duration-400 ease-in-out"
          style={{ opacity: menuVisible ? 1 : 0 }}
        >
          <nav aria-label="Mobile navigation" className="flex flex-1 flex-col items-center justify-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="font-headline text-4xl uppercase tracking-wide text-white hover:text-brand-red transition-colors duration-300"
                style={{
                  opacity: menuVisible ? 1 : 0,
                  transform: menuVisible ? 'translateY(0)' : 'translateY(12px)',
                  transition: `opacity 350ms ease ${100 + i * 60}ms, transform 350ms ease ${100 + i * 60}ms, color 300ms`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            className="flex items-center justify-center gap-6 pb-12"
            style={{
              opacity: menuVisible ? 1 : 0,
              transform: menuVisible ? 'translateY(0)' : 'translateY(8px)',
              transition: `opacity 350ms ease ${100 + navLinks.length * 60}ms, transform 350ms ease ${100 + navLinks.length * 60}ms`,
            }}
          >
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
        </div>
      )}
    </header>
  );
}
