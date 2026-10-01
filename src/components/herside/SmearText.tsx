import { cormorant } from '@/lib/herSideFonts';

/**
 * The "her side." motion-blur lockup from the cover art: a wide horizontal
 * ghost that drifts slowly side to side, under a softly smeared core. The ghost
 * is a decorative duplicate, hidden from screen readers. Size, color, and
 * weight come from the caller. Needs <SmearDefs /> on the page.
 */
export default function SmearText({ children }: { children: string }) {
  return (
    <span className={`${cormorant.className} relative inline-block lowercase`}>
      <span aria-hidden="true" className="smear-ghost absolute inset-0" style={{ filter: 'url(#smear-wide)' }}>
        {children}
      </span>
      <span className="relative" style={{ filter: 'url(#smear-core)' }}>
        {children}
      </span>
    </span>
  );
}

/**
 * Horizontal-only blurs (stdDeviation "x 0"), which CSS blur() can't do. The
 * filter region is widened so the smear isn't clipped at the edges. Rendered
 * once in the root layout, outside the splash: a filter defined inside a
 * display: none subtree stops working, and the splash is hidden once entered.
 */
export function SmearDefs() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <defs>
        <filter id="smear-wide" x="-30%" y="-10%" width="160%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5 0" result="smear" />
          <feComponentTransfer in="smear">
            <feFuncA type="linear" slope="0.45" />
          </feComponentTransfer>
        </filter>
        <filter id="smear-core" x="-20%" y="-10%" width="140%" height="120%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.4 0" result="soft" />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.6 0.3" result="sharp" />
          <feMerge>
            <feMergeNode in="soft" />
            <feMergeNode in="sharp" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
}
