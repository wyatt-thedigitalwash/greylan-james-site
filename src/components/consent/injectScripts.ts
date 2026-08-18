// Injects analytics / advertising tags ONLY after the user consents to the
// matching category. Nothing non-essential fires before consent.
//
// Everything runs through one Google Tag Manager container, GTM-PS6RRXKG, the
// same container the previous WordPress site used. GA4 and the advertising
// pixel are tags inside it, each gated on the consent categories we report.
// See lib/analytics.ts for the full picture.

import type { Consent } from "./consent";
import { grantedCategories, loadTagManager, pushConsentSignal } from "@/lib/analytics";

/** Inject scripts for every category the user has consented to. Additive only. */
export function applyConsent(consent: Consent) {
  const categories = grantedCategories(consent);

  // No analytics and no advertising means the container has nothing it may
  // fire, so we do not load it at all.
  if (categories.length === 0) return;

  loadTagManager();
  pushConsentSignal(categories);

  // Functional and Social categories have no active third-party scripts on this
  // site yet; they are reserved so the choice is recorded for future use.
}
