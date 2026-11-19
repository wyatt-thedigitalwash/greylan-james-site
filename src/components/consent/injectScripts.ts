// Injects the label's analytics / advertising tags ONLY after the visitor
// consents to the matching category -- nothing non-essential fires before
// consent. The loading logic lives in labelTags.ts (shared across the label's
// artist sites):
//
//   Analytics    -> GA4 (G-DMLPVHD2YG), loaded directly
//   Advertising  -> Google Ads, Meta, TikTok, and the label's GTM container
//                   GTM-PS6RRXKG
//
// The container is Advertising, not Analytics, because the label can change
// what it loads at any time (it injects Evidon and the Audigent ID-sync pixel).

import { type Consent, readConsent } from "./consent";
import { applyLabelTags, trackLabelPageView, type LabelTagConfig } from "./labelTags";

const TAGS: LabelTagConfig = {
  gtm: "GTM-PS6RRXKG",
  ga4: ["G-DMLPVHD2YG"],
  googleAds: ["AW-17574370157"],
  metaPixels: ["1858545644702596"],
  tiktokPixel: "D26CTKBC77U110BN94C0",
};

/** Inject scripts for every category the user has consented to. Additive only. */
export function applyConsent(consent: Consent) {
  applyLabelTags(TAGS, consent);
  // Functional and Social categories have no third-party scripts on this site;
  // they are reserved so the choice is recorded for future use.
}

/** Report a client-side route change to whatever tags consent allowed. */
export function trackSpaPageView() {
  const consent = readConsent();
  if (consent) trackLabelPageView(TAGS, consent);
}

/**
 * Remove the cookies left behind by any category the visitor just turned off
 * (shared implementation: Consent Mode deny first, then clear by category).
 * The caller reloads the page afterwards so the scripts themselves are gone too.
 */
export { revokeConsent } from "./privacy";
