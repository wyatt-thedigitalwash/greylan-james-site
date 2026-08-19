'use client';

import { usePathname } from 'next/navigation';

/**
 * usePathname with the home route normalized.
 *
 * Vercel writes the prerendered home route out as index.html / index.rsc, and
 * the flight payload it ships records that route's canonical path as "/index".
 * The router boots from that payload, so on the deployed site usePathname()
 * reports "/index" on the home page until the first client-side navigation,
 * while a local build reports "/" the whole time. Anything that keys off the
 * home route has to read through here or it renders the wrong way in
 * production only.
 */
export function useCurrentPath() {
  const pathname = usePathname();
  return pathname === '/index' ? '/' : pathname;
}
