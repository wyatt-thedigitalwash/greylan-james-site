// Injects analytics / advertising tags ONLY after the user consents to the
// matching category. Nothing non-essential fires before consent.
//
// Analytics runs through one Google Tag Manager container, GTM-PS6RRXKG, the
// same container the previous WordPress site used. GA4 and the label's
// advertising pixel are tags inside it, each gated on the consent categories we
// report. See lib/analytics.ts for the full picture.
//
// The Google Ads, Meta and TikTok pixels load directly (see lib/adPixels.ts)
// and are gated on the Advertising category.

import type { Consent } from "./consent";
import { grantedCategories, loadTagManager, pushConsentSignal } from "@/lib/analytics";
import { CATEGORY_COOKIES, clearCookies, loadAdPixels } from "@/lib/adPixels";

/** Inject scripts for every category the user has consented to. Additive only. */
export function applyConsent(consent: Consent) {
  if (consent.advertising) loadAdPixels(consent.analytics);

  const categories = grantedCategories(consent);

  // No analytics and no advertising means the container has nothing it may
  // fire, so we do not load it at all.
  if (categories.length === 0) return;

  loadTagManager();
  pushConsentSignal(categories);

  // Functional and Social categories have no active third-party scripts on this
  // site yet; they are reserved so the choice is recorded for future use.
}

/**
 * Remove the cookies left behind by any category the visitor just turned off.
 * The caller reloads the page afterwards so the scripts themselves are gone too.
 */
export function revokeConsent(prev: Consent, next: Consent) {
  if (prev.analytics && !next.analytics) clearCookies(CATEGORY_COOKIES.analytics);
  if (prev.advertising && !next.advertising) clearCookies(CATEGORY_COOKIES.advertising);
}
