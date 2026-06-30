import sharp from 'sharp';
import toIco from 'to-ico';
import { readFile, writeFile } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');
const pub = resolve(root, 'public');

// Brand colors from SITE.md
const BRAND_BLACK = '#16140D';
const BRAND_RED = '#B20606';

// Embed the Knockout font as base64 for SVG text rendering
const fontBuffer = await readFile(resolve(pub, 'fonts/Knockout-HTF67-FullBantamwt.otf'));
const fontBase64 = fontBuffer.toString('base64');

function gjMonogramSvg(size) {
  const fontSize = Math.round(size * 0.52);
  const yOffset = Math.round(size * 0.65);
  return Buffer.from(`
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          @font-face {
            font-family: 'Knockout';
            src: url('data:font/otf;base64,${fontBase64}');
          }
        </style>
      </defs>
      <rect width="${size}" height="${size}" fill="${BRAND_BLACK}" />
      <text
        x="50%" y="${yOffset}"
        font-family="Knockout, Arial Narrow, sans-serif"
        font-size="${fontSize}"
        fill="white"
        text-anchor="middle"
        letter-spacing="${Math.round(size * 0.02)}"
      >GJ</text>
    </svg>
  `);
}

// Generate icon PNGs at all required sizes
const sizes = [16, 32, 180, 192, 512];
const pngBuffers = {};

for (const size of sizes) {
  const svg = gjMonogramSvg(size);
  pngBuffers[size] = await sharp(svg).resize(size, size).png().toBuffer();
}

// Write static PNGs
await writeFile(resolve(pub, 'apple-touch-icon.png'), pngBuffers[180]);
await writeFile(resolve(pub, 'android-chrome-192x192.png'), pngBuffers[192]);
await writeFile(resolve(pub, 'android-chrome-512x512.png'), pngBuffers[512]);

// Generate favicon.ico (multi-size: 16x16 + 32x32)
const icoBuffer = await toIco([pngBuffers[16], pngBuffers[32]]);
await writeFile(resolve(pub, 'favicon.ico'), icoBuffer);

console.log('✓ favicon.ico (16 + 32)');
console.log('✓ apple-touch-icon.png (180)');
console.log('✓ android-chrome-192x192.png');
console.log('✓ android-chrome-512x512.png');

// Generate OG image: TourBackground.jpg with white logo centered
const bgPath = resolve(pub, 'backgrounds/GreylanJames_TourBackground.jpg');
const logoPath = resolve(pub, 'logos/GreylanJames_Logo_White.png');

const OG_W = 1200;
const OG_H = 630;

// Resize background to cover 1200x630
const bg = await sharp(bgPath)
  .resize(OG_W, OG_H, { fit: 'cover', position: 'center' })
  .toBuffer();

// Resize logo to fit nicely (about 55% of OG width)
const logoTargetWidth = Math.round(OG_W * 0.55);
const logo = await sharp(logoPath)
  .resize(logoTargetWidth, null, { fit: 'inside' })
  .toBuffer();

const logoMeta = await sharp(logo).metadata();
const logoLeft = Math.round((OG_W - logoMeta.width) / 2);
const logoTop = Math.round((OG_H - logoMeta.height) / 2);

const ogImage = await sharp(bg)
  .composite([{ input: logo, left: logoLeft, top: logoTop }])
  .png()
  .toBuffer();

await writeFile(resolve(pub, 'og-image.png'), ogImage);
console.log('✓ og-image.png (1200x630)');
