"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cormorant, naskh } from "@/lib/herSideFonts";
import { herSide, herSideCopy } from "@/lib/releases";
import SmearText from "@/components/herside/SmearText";

// Shared button frame. Labels are set like the "her side." headline, lowercase
// Cormorant Garamond, so the buttons read as part of the release artwork.
const BUTTON =
  "flex h-12 w-full items-center justify-center pb-[2px] text-[21px] font-bold lowercase leading-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white min-[480px]:w-[200px]";

// Campaign palette: black background, dark red names, white headline.
const RED = "#620909";

// Versioned so a new campaign re-shows the splash to everyone automatically.
// Bump the suffix when the release changes, and keep it in sync with the
// pre-paint script in layout.tsx and useSplashEntered.ts. sessionStorage, not
// localStorage: it should come back on a new session, not be dismissed forever.
const SPLASH_KEY = "gj_splash_herside";

// Must match the #splash-overlay opacity transition in globals.css.
const EXIT_MS = 600;

// `released` comes from the server layout rather than the clock here, so the
// prerendered copy and the hydrated copy always agree.
export default function Splash({ released }: { released: boolean }) {
  const copy = herSideCopy(released);
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
      aria-label="Water At A Wedding (her side.), Greylan James and Gabriella Rose"
      className="splash-root overflow-hidden bg-black"
    >
      {/* Photo. On mobile it's scaled up and lifted so the arch sits right
          under the names, matching the mobile key art; otherwise a tall phone
          shows the photo's whole black top as an empty band. On desktop the
          photo sits in a centered column whose sides feather into the black. */}
      <div
        className="splash-photo absolute inset-x-0 -top-[16%] h-[114%] md:top-0 md:h-full md:left-1/2 md:right-auto md:w-[68vw] md:-translate-x-1/2"
        style={{ animation: "splashFade 1200ms ease both" }}
      >
        <Image
          src="/backgrounds/GreylanJames_WaterAtAWedding_herside.jpg"
          alt="Greylan James in a black ball cap and t-shirt, with Gabriella Rose in a white slip dress looking back over her shoulder, inside a candlelit chapel"
          fill
          priority
          sizes="(min-width: 768px) 68vw, 100vw"
          className="object-cover object-[55%_center] md:object-[center_49%]"
        />
      </div>

      {/* Darken the bottom so the buttons and legal line stay legible. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black via-black/60 to-transparent"
      />

      {/* Artist names. Pinned to the top corners on desktop, dropped lower on
          mobile so they sit in the black above the arch. */}
      <div
        className={`${naskh.className} absolute inset-x-0 top-[6%] flex justify-between px-[6.5%] text-[12px] uppercase tracking-[0.04em] [word-spacing:0.3em] min-[400px]:text-[14px] md:top-[5%] md:px-[3.3%] md:text-[clamp(18px,1.5vw,30px)]`}
        style={{ color: RED, animation: "splashFadeUp 700ms ease 400ms both" }}
      >
        <p>Greylan James</p>
        <p>Gabriella Rose</p>
      </div>

      {/* Title, centered over the pair. The wrapper does the positioning so
          the fade-up transform on the heading can't override it. */}
      <div className="absolute inset-x-0 top-[46%] -translate-y-1/2">
        <h2
          className="text-center text-[34px] font-bold leading-none text-white min-[400px]:text-[38px] md:text-[clamp(36px,2.6vw,56px)]"
          style={{ animation: "splashFadeUp 700ms ease 600ms both" }}
        >
          <SmearText>her side.</SmearText>
        </h2>
        {/* Release date, a step smaller and softer than the title so it reads
            as part of the same smeared lockup without competing with it. */}
        <p
          className="mt-2 text-center text-[17px] font-semibold leading-none text-white/75 [filter:blur(0.3px)] md:mt-3 md:text-[clamp(18px,1.3vw,26px)]"
          style={{ animation: "splashFadeUp 700ms ease 700ms both" }}
        >
          <SmearText>{copy.date}</SmearText>
        </p>
      </div>

      {/* CTAs and the arbitration notice. */}
      <div
        className="absolute inset-x-0 bottom-0 flex flex-col items-center px-6 pb-8 md:pb-10"
        style={{ animation: "splashFadeUp 700ms ease 800ms both" }}
      >
        <div className="flex w-full max-w-[320px] flex-col gap-3 min-[480px]:max-w-none min-[480px]:w-auto min-[480px]:flex-row min-[480px]:gap-4">
          <a
            href={herSide.link!}
            target="_blank"
            rel="noopener noreferrer"
            className={`${cormorant.className} ${BUTTON} bg-white text-black transition-opacity hover:opacity-85`}
          >
            {copy.cta}
            <span className="sr-only"> (opens in new tab)</span>
          </a>
          <button
            type="button"
            onClick={enterSite}
            className={`${cormorant.className} ${BUTTON} border border-white/40 text-white/85 transition-colors hover:border-white/80 hover:text-white`}
          >
            enter site
          </button>
        </div>

        <p
          className={`${cormorant.className} mt-5 max-w-[340px] text-center text-[13px] font-semibold leading-snug text-white/65 min-[480px]:max-w-[460px]`}
        >
          By entering, you consent to our{" "}
          <Link href="/legal/terms" className="text-white/90 underline underline-offset-2 hover:text-white">
            Terms &amp; Conditions
          </Link>
          , including{" "}
          <Link href="/legal/terms#section-17" className="text-white/90 underline underline-offset-2 hover:text-white">
            binding arbitration
          </Link>{" "}
          and a{" "}
          <Link
            href="/legal/terms#class-action-waiver"
            className="text-white/90 underline underline-offset-2 hover:text-white"
          >
            waiver of class action rights
          </Link>
          .
        </p>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .splash-photo {
            -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 20%, #000 80%, transparent 100%);
            mask-image: linear-gradient(to right, transparent 0%, #000 20%, #000 80%, transparent 100%);
          }
        }
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
