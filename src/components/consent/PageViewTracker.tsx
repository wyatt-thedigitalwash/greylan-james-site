"use client";

import { useEffect, useRef } from "react";
import { useCurrentPath } from "@/lib/useCurrentPath";
import { readConsent } from "./consent";
import { grantedCategories, pushConsentSignal } from "@/lib/analytics";

/**
 * On the old WordPress site every navigation was a full page load, so GA4
 * recorded a page_view each time. This site is a single-page app, so the
 * document never reloads and the container would only ever see the landing
 * page. This re-emits the container's page-view signal on each route change.
 *
 * The first run is skipped: CookieConsent already fires the signal on mount for
 * a visitor who has decided, and a first-time visitor has not consented yet.
 */
export default function PageViewTracker() {
  const pathname = useCurrentPath();
  const firstRun = useRef(true);

  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    const consent = readConsent();
    if (!consent) return;

    const categories = grantedCategories(consent);
    if (categories.length === 0) return;

    // Wait a tick so the new page's <title> is in place before it is read.
    const id = window.setTimeout(() => pushConsentSignal(categories), 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
