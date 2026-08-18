export type TextureVariant = 'press' | 'tape' | 'paper' | 'paper-light';

/**
 * Surface texture for a section. See the Texture Pack block in globals.css for
 * what each variant is made of and why.
 *
 *   press       -- Newsprint dot screen over letterpress paper tooth.
 *   tape        -- Scanlines, tape dust and dropout streaks over grain.
 *   paper       -- Coarse newsprint tooth only, nothing that fights copy.
 *   paper-light -- paper for cream surfaces. Use this one on bg-brand-cream:
 *                  the dark variants are built from cream specks and vanish
 *                  against a cream ground.
 *
 * The host section needs `relative overflow-hidden`, and its content wrapper
 * needs `relative z-10` so the texture stays behind it. Textures deliberately
 * do not paint over album art or video players: they treat the surface, not
 * the media. The overlay is inert -- aria-hidden and pointer-events: none --
 * so it cannot intercept clicks or reach a screen reader. It is also fully
 * static, with no animated tracking lines, which keeps it out of the way of
 * prefers-reduced-motion and stops it from getting tiresome on repeat visits.
 */
export default function Texture({
  variant,
  vignette = true,
}: {
  variant: TextureVariant;
  vignette?: boolean;
}) {
  return (
    <div aria-hidden="true" className={`texture texture-${variant}`}>
      <div className="texture-grit" />
      <div className="texture-detail" />
      {vignette && <div className="texture-vignette" />}
    </div>
  );
}
