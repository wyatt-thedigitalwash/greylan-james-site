"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { freshman, sourceSans } from "@/lib/tennesseeFonts";
import { tennesseeYouAgain } from "@/lib/releases";

// Campaign palette, per the release toolkit: dark green #22241E background,
// orange #C98155 headline, beige #B6A394 sub-heads and body. The splash is the
// only place it applies.

// Shared button frame. Labels are set in the campaign's body face, Source Sans
// 3, in semibold caps, so they read as controls rather than more title art.
const BUTTON = `${sourceSans.className} flex h-12 w-full items-center justify-center text-[16px] font-semibold uppercase leading-none tracking-[0.12em] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#B6A394] min-[480px]:w-[200px]`;

// Versioned so a new campaign re-shows the splash to everyone automatically.
// Bump the suffix when the release changes, and keep it in sync with the
// pre-paint script in layout.tsx and useSplashEntered.ts. sessionStorage, not
// localStorage: it should come back on a new session, not be dismissed forever.
const SPLASH_KEY = "gj_splash_tennesseeyouagain";

// Must match the #splash-overlay opacity transition in globals.css.
const EXIT_MS = 600;

export default function Splash() {
  const pathname = usePathname();

  // The pre-paint script in the root layout handles the first paint. This
  // handles client-side navigation, e.g. clicking the Terms link on the splash
  // itself. Someone who lands on a legal page is exempt but NOT marked as
  // entered, so reading the Terms is never treated as agreeing to them.
  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("splash-entered")) return;
    root.classList.toggle("splash-exempt", pathname.startsWith("/legal"));
  }, [pathname]);

  // Entering is an explicit click only (no Escape shortcut), since it doubles
  // as agreeing to the Terms notice below the buttons.
  const enterSite = () => {
    try {
      sessionStorage.setItem(SPLASH_KEY, "1");
    } catch {
      /* private mode throws -- dismiss regardless */
    }
    const overlay = document.getElementById("splash-overlay");
    if (overlay) {
      // Fade first, then display: none. Flipping the class immediately would
      // hard-cut instead of dissolving.
      overlay.classList.add("is-exiting");
      window.setTimeout(() => {
        document.documentElement.classList.add("splash-entered");
      }, EXIT_MS);
    } else {
      document.documentElement.classList.add("splash-entered");
    }
  };

  return (
    <div
      id="splash-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Tennessee You Again by Greylan James, out now"
      className="splash-root overflow-y-auto bg-[#22241E]"
    >
      {/* Cover art on one side, the lockup on the other. Stacked on phones,
          cover first. min-h-full plus the overlay's own scroll keeps short
          phones from clipping the Terms notice. */}
      <div className="flex min-h-full flex-col items-center justify-center gap-7 px-5 py-8 md:flex-row md:gap-[6vw] md:px-[6vw] md:py-12">
        <div
          className="relative aspect-square w-[min(78vw,34svh)] shrink-0 md:w-[min(40vw,72vh,640px)]"
          style={{ animation: "splashFade 1200ms ease both" }}
        >
          <Image
            src={tennesseeYouAgain.cover}
            alt="Tennessee You Again cover art: Greylan James from behind in an orange number 16 football jersey and black cap, walking through a field under an overcast sky"
            fill
            priority
            sizes="(min-width: 768px) 40vw, 78vw"
            className="object-cover"
          />
        </div>

        {/* Lockup, CTAs, and the arbitration notice. */}
        <div className="flex w-full flex-col items-center text-center md:w-[min(560px,40vw)]">
          {/* "Out Now" kicker, then the title art in the headline orange with
              the white wordmark under it, the lockup from the release's color
              palette sheet. */}
          <p
            className={`${freshman.className} mb-4 text-[18px] uppercase leading-none tracking-[0.12em] text-[#B6A394] md:mb-5 md:text-[22px]`}
            style={{ animation: "splashFadeUp 700ms ease 300ms both" }}
          >
            Out Now
          </p>
          <h2 className="w-full max-w-[360px] md:max-w-none" style={{ animation: "splashFadeUp 700ms ease 400ms both" }}>
            <Image
              src="/logos/GreylanJames_TennesseeYouAgain_TitleTrimmed.png"
              alt="Tennessee You Again"
              width={2498}
              height={159}
              priority
              sizes="(min-width: 768px) 40vw, 360px"
              className="h-auto w-full"
            />
          </h2>
          <Image
            src="/logos/GreylanJames_LogoWhite.png"
            alt="Greylan James"
            width={1104}
            height={566}
            sizes="(min-width: 768px) 11vw, 110px"
            className="mt-5 h-auto w-[110px] md:mt-7 md:w-[clamp(125px,10.5vw,180px)]"
            style={{ animation: "splashFadeUp 700ms ease 550ms both" }}
          />

          <div
            className="mt-6 flex w-full flex-col items-center md:mt-8"
            style={{ animation: "splashFadeUp 700ms ease 800ms both" }}
          >
            <div className="flex w-full max-w-[320px] flex-col gap-3 min-[480px]:w-auto min-[480px]:max-w-none min-[480px]:flex-row min-[480px]:gap-4 md:flex-col md:gap-3 lg:flex-row lg:gap-4">
              <a
                href={tennesseeYouAgain.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${BUTTON} bg-[#C98155] text-[#22241E] transition-opacity hover:opacity-85`}
              >
                Listen Now
                <span className="sr-only"> to Tennessee You Again (opens in new tab)</span>
              </a>
              <button
                type="button"
                onClick={enterSite}
                className={`${BUTTON} border border-[#B6A394]/50 text-[#B6A394] transition-colors hover:border-[#B6A394]`}
              >
                Enter Site
              </button>
            </div>

            <p
              className={`${sourceSans.className} mt-5 max-w-[340px] text-[13px] font-medium leading-snug text-[#B6A394]/80 min-[480px]:max-w-[460px]`}
            >
              By entering, you consent to our{" "}
              <Link href="/legal/terms" className="text-[#B6A394] underline underline-offset-2 hover:text-[#E1DDCE]">
                Terms &amp; Conditions
              </Link>
              , including{" "}
              <Link
                href="/legal/terms#section-17"
                className="text-[#B6A394] underline underline-offset-2 hover:text-[#E1DDCE]"
              >
                binding arbitration
              </Link>{" "}
              and a{" "}
              <Link
                href="/legal/terms#class-action-waiver"
                className="text-[#B6A394] underline underline-offset-2 hover:text-[#E1DDCE]"
              >
                waiver of class action rights
              </Link>
              .
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes splashFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes splashFadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .splash-root * { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
