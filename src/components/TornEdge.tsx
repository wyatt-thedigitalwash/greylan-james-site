/**
 * A torn paper edge, for where a section meets a photograph. See the Torn Edge
 * block in globals.css for how it is built.
 *
 * The strip hangs outside the section it belongs to, so put it on the section
 * and point it at the photo: `side="top"` tears upward over whatever sits
 * above, `side="bottom"` tears downward over whatever sits below. The host
 * section needs `relative` and must not clip its overflow.
 *
 * Pass `tone="cream"` on a cream section, so the rip is the colour of the paper
 * it was torn from. Defaults to brown.
 *
 * Pass `surface` to match the host section's Texture variant, so the grain runs
 * across the rip instead of restarting at it. `press` and `tape` use the base
 * grit, which is the default here, so only the paper variants need declaring.
 *
 * Pass `shift` when a page uses the same side twice, so the two rips do not
 * come out identical.
 */
export default function TornEdge({
  side,
  tone = 'brown',
  surface,
  shift = false,
}: {
  side: 'top' | 'bottom';
  tone?: 'brown' | 'cream';
  surface?: 'paper' | 'paper-light';
  shift?: boolean;
}) {
  const classes = [
    'tear',
    `tear-${side}`,
    tone === 'cream' && 'tear-cream',
    surface && `tear-${surface}`,
    shift && 'tear-shift',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div aria-hidden="true" className={classes}>
      <div className="tear-sheet" />
    </div>
  );
}
