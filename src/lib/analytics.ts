// Tag Manager wiring, ported from the previous WordPress site at greylanjames.com.
//
// The container GTM-PS6RRXKG holds every marketing tag the label runs:
//   - GA4, measurement ID G-DMLPVHD2YG, configured with send_page_view: false
//   - an advertising ID-sync pixel, https://a.ad.gt/api/v1/u/matches/139
//
// Neither of those fires on container load. Both wait on a dataLayer event named
// "evidonConsentGiven" carrying a "consentCategories" list, because the old site
// gated them behind the Evidon consent notice. This site uses its own cookie
// banner instead (see components/consent), so we emit that same event ourselves
// with the categories the visitor actually granted. The container needs no
// changes, and nothing fires until consent is given.

export const GTM_CONTAINER_ID = "GTM-PS6RRXKG";

/** Lives inside the container as a tag. Recorded here for reference only, we never load it directly. */
export const GA4_MEASUREMENT_ID = "G-DMLPVHD2YG";

/** The event name the container listens for. Named for Evidon, kept for compatibility. */
const CONSENT_EVENT = "evidonConsentGiven";

/** Category strings the container matches on. These must stay exact. */
const CATEGORY_ANALYTICS = "performance and analytics";
const CATEGORY_ADVERTISING = "online advertising";

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

function dataLayer(): unknown[] {
  window.dataLayer = window.dataLayer ?? [];
  return window.dataLayer;
}

/** Inject the GTM container. Safe to call repeatedly, it only ever loads once. */
export function loadTagManager(): void {
  if (document.getElementById("gtm-container")) return;

  dataLayer().push({ "gtm.start": new Date().getTime(), event: "gtm.js" });

  const script = document.createElement("script");
  script.id = "gtm-container";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
  document.head.appendChild(script);
}

/**
 * Which container categories a consent choice unlocks. An empty list means the
 * container has nothing it is allowed to fire.
 */
export function grantedCategories(granted: { analytics: boolean; advertising: boolean }): string[] {
  const categories: string[] = [];
  if (granted.analytics) categories.push(CATEGORY_ANALYTICS);
  if (granted.advertising) categories.push(CATEGORY_ADVERTISING);
  return categories;
}

/**
 * Tell the container what the visitor allowed. This is also what fires the GA4
 * page_view, so it doubles as the page-view signal on route changes, matching
 * the old site where every navigation was a full page load.
 */
export function pushConsentSignal(categories: string[]): void {
  if (categories.length === 0) return;
  dataLayer().push({
    event: CONSENT_EVENT,
    consentCategories: categories,
    page_location: window.location.href,
    page_path: window.location.pathname,
    page_title: document.title,
  });
}
