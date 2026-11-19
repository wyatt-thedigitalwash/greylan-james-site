"use client";

import { useEffect, useRef } from "react";
import { useCurrentPath } from "@/lib/useCurrentPath";
import { trackSpaPageView } from "./injectScripts";

// Reports client-side navigations to the consented tags. The landing page's
// pageview is sent by the tags themselves when they load (after consent), so
// the first render is skipped to avoid double counting.
export default function PageViewTracker() {
  const pathname = useCurrentPath();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    // Wait a tick so the new page's <title> is in place before it is read.
    const id = window.setTimeout(trackSpaPageView, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return null;
}
