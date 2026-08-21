// Builds every derived brand asset in public/ from the two source files the
// label supplies. Run with `node scripts/generate-icons.mjs` after either
// source changes.
//
//   logos/greyland-james-favicon.png  -> favicon.ico, apple-touch-icon,
//                                        android-chrome-192, android-chrome-512
//   backgrounds/GreylanJames_HomeHeroAsset.jpg
//     + logos/GreylanJames_LogoColored.png -> og-image.png
//
// This replaces the old set, which drew a "GJ" monogram in Knockout rather than
// using the real brand marks.

import sharp from 'sharp';
import toIco from 'to-ico';
import { writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const pub = resolve(__dirname, '..', 'public');

/* ---------------------------------------------------------------- icons ---- */

// The supplied favicon is a black square with the G roundel inset at about 76%
// of the width. That much padding turns the mark to mush in a browser tab, so
// the roundel is trimmed off its background and re-seated. The background is
// rebuilt in the source's own black rather than brand brown, so the ring keeps
// the contrast it was drawn with.
const ICON_BG = { r: 0, g: 0, b: 0, alpha: 1 };

// Tab sizes run full bleed and get a light sharpen, because the double ring and
// the three stars are right at the edge of resolving at 16px and every pixel of
// margin costs legibility. The large sizes keep a margin instead, which sits
// better inside the rounded mask iOS applies to the touch icon.
const TAB_SIZES = new Set([16, 32]);

const mark = await sharp(resolve(pub, 'logos/greyland-james-favicon.png'))
  .trim({ threshold: 1 })
  .toBuffer();

async function iconAtSize(size) {
  const small = TAB_SIZES.has(size);
  const inner = small ? size : Math.round(size * 0.9);

  let pipeline = sharp(mark).resize(inner, inner, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  if (small) pipeline = pipeline.sharpen({ sigma: 0.6 });
  const resized = await pipeline.toBuffer();

  const offset = Math.round((size - inner) / 2);

  return sharp({
    create: { width: size, height: size, channels: 4, background: ICON_BG },
  })
    .composite([{ input: resized, left: offset, top: offset }])
    .png()
    .toBuffer();
}

const sizes = [16, 32, 180, 192, 512];
const icons = {};
for (const size of sizes) icons[size] = await iconAtSize(size);

await writeFile(resolve(pub, 'apple-touch-icon.png'), icons[180]);
await writeFile(resolve(pub, 'android-chrome-192x192.png'), icons[192]);
await writeFile(resolve(pub, 'android-chrome-512x512.png'), icons[512]);
await writeFile(resolve(pub, 'favicon.ico'), await toIco([icons[16], icons[32]]));

console.log('✓ favicon.ico (16 + 32)');
console.log('✓ apple-touch-icon.png (180)');
console.log('✓ android-chrome-192x192.png');
console.log('✓ android-chrome-512x512.png');

/* ------------------------------------------------------------- og image ---- */

const OG_W = 1200;
const OG_H = 630;

// The hero is 3:2 and the card is roughly 1.9:1, so covering crops height, not
// width. A centered crop lands Greylan's face in the upper third of the card.
const bg = await sharp(resolve(pub, 'backgrounds/GreylanJames_HomeHeroAsset.jpg'))
  .resize(OG_W, OG_H, { fit: 'cover', position: 'center' })
  .toBuffer();

// Trimmed first, because the supplied logo carries uneven transparent margins
// that would otherwise throw the centering off.
const logoTargetWidth = Math.round(OG_W * 0.42);
const logo = await sharp(resolve(pub, 'logos/GreylanJames_LogoColored.png'))
  .trim({ threshold: 1 })
  .resize(logoTargetWidth, null, { fit: 'inside' })
  .toBuffer();

const logoMeta = await sharp(logo).metadata();

// Sits low on purpose. Centered vertically it would cover his face, so the
// wordmark is dropped into the clear band across his chest and the grass.
const LOGO_TOP_RATIO = 0.51;
const logoLeft = Math.round((OG_W - logoMeta.width) / 2);
const logoTop = Math.round(OG_H * LOGO_TOP_RATIO);

// A soft dark wash under the lower half keeps the cream wordmark legible over
// the sunlit grass without dimming the photo as a whole. It ramps in above the
// logo and holds through the bottom, since the hardest stretch to read is where
// the cream letters cross his near-cream shirt.
const scrim = Buffer.from(
  `<svg width="${OG_W}" height="${OG_H}" xmlns="http://www.w3.org/2000/svg">
     <defs>
       <linearGradient id="s" x1="0" y1="0" x2="0" y2="1">
         <stop offset="0.32" stop-color="#16140D" stop-opacity="0" />
         <stop offset="0.62" stop-color="#16140D" stop-opacity="0.44" />
         <stop offset="1.00" stop-color="#16140D" stop-opacity="0.66" />
       </linearGradient>
     </defs>
     <rect width="${OG_W}" height="${OG_H}" fill="url(#s)" />
   </svg>`
);

const ogImage = await sharp(bg)
  .composite([
    { input: scrim },
    { input: logo, left: logoLeft, top: logoTop },
  ])
  .png()
  .toBuffer();

await writeFile(resolve(pub, 'og-image.png'), ogImage);
console.log('✓ og-image.png (1200x630)');
