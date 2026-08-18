/**
 * Generates the texture pack in public/textures.
 *
 * Run with: node scripts/generate-textures.mjs
 *
 * Everything is generated rather than sourced, so the pack is reproducible, has
 * no licensing attached, and can be retuned by editing the constants below.
 *
 * The references are the ones already in SITE.md -- Hatch Show Print
 * letterpress and newsprint classified layout -- with camcorder-era tape
 * artifacts layered over them. Country retro is a printed thing first and a
 * VHS thing second.
 *
 * All tiles are RGBA and seamless, and every pixel is either brand cream or
 * brand brown with a varying alpha. That matters for two reasons. The palette
 * stays at two colors, because no texture can introduce a third hue. And the
 * textures stay visible: the site's surface is #2E2422, which is dark enough
 * that multiplicative blends (multiply, overlay, soft-light) have almost
 * nothing left to darken. Real grain on a dark surface reads as bright specks,
 * so these tiles lighten with cream and are composited normally.
 */
import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outDir = resolve(__dirname, '../public/textures');

// Brand colors from SITE.md.
const CREAM = [225, 221, 206];
const BROWN = [46, 36, 34];

/** Deterministic PRNG so re-running the script produces byte-identical files. */
function mulberry32(seed) {
  return function random() {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp8(v) {
  return v < 0 ? 0 : v > 255 ? 255 : Math.round(v);
}

/** A blank RGBA tile: fully transparent, so anything left untouched disappears. */
function blank(width, height = width) {
  return { width, height, px: new Uint8Array(width * height * 4) };
}

function put(tile, x, y, rgb, alpha) {
  // Wrap so marks near an edge continue on the opposite side and stay seamless.
  const wx = ((x % tile.width) + tile.width) % tile.width;
  const wy = ((y % tile.height) + tile.height) % tile.height;
  const i = (wy * tile.width + wx) * 4;
  const a = clamp8(alpha);
  if (a <= tile.px[i + 3]) return; // keep the strongest mark at each pixel
  tile.px[i] = rgb[0];
  tile.px[i + 1] = rgb[1];
  tile.px[i + 2] = rgb[2];
  tile.px[i + 3] = a;
}

async function writeTile(name, tile) {
  await sharp(Buffer.from(tile.px), {
    raw: { width: tile.width, height: tile.height, channels: 4 },
  })
    .png({ compressionLevel: 9, effort: 10 })
    .toFile(resolve(outDir, name));
  return name;
}

/**
 * GRAIN -- the base layer, on every variant.
 * Film grain and letterpress paper tooth. Random noise tiles seamlessly by
 * definition, since it has no structure to line up.
 *
 * darkRatio sets the mix of brown to cream specks, and has to follow the
 * surface. On the dark brown sections the grain is mostly cream, because only
 * the lighter specks are visible against #2E2422. On the cream sections that
 * inverts: cream specks disappear into the paper and the brown ones do the
 * work. A tile built for one surface is close to invisible on the other.
 */
function grain({ size = 160, coverage = 0.55, maxAlpha = 46, seed = 1879, darkRatio = 0.3 } = {}) {
  const random = mulberry32(size + seed);
  const tile = blank(size);
  const count = Math.round(size * size * coverage);
  for (let i = 0; i < count; i++) {
    const x = Math.floor(random() * size);
    const y = Math.floor(random() * size);
    const dark = random() < darkRatio;
    // Bias toward faint grains: a few strong specks read as dirt, a field of
    // faint ones reads as texture.
    const strength = random() * random();
    put(tile, x, y, dark ? BROWN : CREAM, strength * maxAlpha * (dark ? 1.6 : 1));
  }
  return tile;
}

/**
 * HALFTONE -- the newsprint / classified-ad reference.
 * A 45 degree dot screen in ink, so the dots sink rather than lift. The tile is
 * one full period of the lattice, so it repeats without a seam. Dots are
 * supersampled to come out round and soft-edged instead of blocky.
 */
function halftone({ size = 8, radius = 1.35, maxAlpha = 40, samples = 4 } = {}) {
  const tile = blank(size);
  const centers = [
    [size * 0.25, size * 0.25],
    [size * 0.75, size * 0.75],
  ];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let hits = 0;
      for (let sy = 0; sy < samples; sy++) {
        for (let sx = 0; sx < samples; sx++) {
          const sampleX = x + (sx + 0.5) / samples;
          const sampleY = y + (sy + 0.5) / samples;
          for (const [cx, cy] of centers) {
            let dx = Math.abs(sampleX - cx);
            let dy = Math.abs(sampleY - cy);
            if (dx > size / 2) dx = size - dx;
            if (dy > size / 2) dy = size - dy;
            if (Math.sqrt(dx * dx + dy * dy) <= radius) {
              hits++;
              break;
            }
          }
        }
      }
      if (hits) put(tile, x, y, BROWN, (hits / (samples * samples)) * maxAlpha);
    }
  }
  return tile;
}

/**
 * SPECKLE -- tape dust and dropouts, the VHS layer.
 * Sparse cream and brown specks plus short horizontal streaks standing in for
 * tape dropout. The tile is large on purpose: a small one would make the
 * specks read as a repeating pattern instead of as damage. Because most of it
 * is transparent, it still compresses down to a couple of kilobytes.
 */
function speckle({ size = 512, dust = 260, streaks = 30, seed = 1994 } = {}) {
  const random = mulberry32(seed);
  const tile = blank(size);

  for (let i = 0; i < dust; i++) {
    const x = Math.floor(random() * size);
    const y = Math.floor(random() * size);
    const bright = random() > 0.4;
    const alpha = (bright ? 90 : 130) * (0.4 + random() * 0.6);
    const w = 1 + Math.floor(random() * 2);
    const h = 1 + Math.floor(random() * 2);
    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) {
        put(tile, x + dx, y + dy, bright ? CREAM : BROWN, alpha);
      }
    }
  }

  for (let i = 0; i < streaks; i++) {
    const x = Math.floor(random() * size);
    const y = Math.floor(random() * size);
    const len = 10 + Math.floor(random() * 44);
    const bright = random() > 0.45;
    const peak = (bright ? 80 : 110) * (0.5 + random() * 0.5);
    for (let dx = 0; dx < len; dx++) {
      // Taper the ends so streaks fade in and out instead of stopping dead.
      put(tile, x + dx, y, bright ? CREAM : BROWN, peak * Math.sin((dx / len) * Math.PI));
    }
  }

  return tile;
}

/**
 * TEAR -- the mask for a torn paper edge.
 *
 * Used where a brown section meets a photograph, so the brown rips over the
 * image instead of ending on a ruled line. Same letterpress vocabulary as the
 * rest of the pack: a poster pulled off a wall, a strip of newsprint torn by
 * hand.
 *
 * The edge is a sum of sine waves at integer frequencies, which makes it
 * exactly periodic and therefore seamless when the mask repeats across a wide
 * viewport. Fibonacci frequencies keep the octaves from lining up into an
 * obvious rhythm, and the high ones land at sub-pixel amplitudes, which is what
 * separates a torn edge from a wavy one. A few detached flecks past the tear
 * finish the effect.
 *
 * Output is a mask, not artwork: only the alpha channel is read by CSS, so the
 * brown fill and its grain are supplied by the stylesheet and carry across the
 * tear instead of reading as a flat cut-out.
 */
function tearMask({ width = 1600, height = 64, ragged = 'top', seed = 1861, flecks = 34 } = {}) {
  const random = mulberry32(seed);
  const freqs = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144];
  const amps = [0.3, 0.19, 0.13, 0.1, 0.075, 0.055, 0.042, 0.032, 0.024, 0.018, 0.013];
  const phases = freqs.map(() => random() * Math.PI * 2);
  const total = amps.reduce((a, b) => a + b, 0);

  /** Where the tear sits at x, in pixels down from the top of the strip. */
  function profileAt(x) {
    let v = 0;
    for (let i = 0; i < freqs.length; i++) {
      v += amps[i] * Math.sin((2 * Math.PI * freqs[i] * x) / width + phases[i]);
    }
    return (0.18 + ((v / total + 1) / 2) * 0.74) * height;
  }

  const tile = blank(width, height);
  const SS = 4;
  for (let x = 0; x < width; x++) {
    // Average across the pixel so the finest octaves antialias instead of
    // aliasing into a stair-step.
    let edge = 0;
    for (let s = 0; s < SS; s++) edge += profileAt(x + (s + 0.5) / SS);
    edge /= SS;
    for (let y = 0; y < height; y++) {
      let cover = 0;
      for (let s = 0; s < SS; s++) {
        const sy = y + (s + 0.5) / SS;
        if (ragged === 'top' ? sy > edge : sy < edge) cover++;
      }
      if (cover) put(tile, x, y, BROWN, (cover / SS) * 255);
    }
  }

  for (let i = 0; i < flecks; i++) {
    const x = Math.floor(random() * width);
    const gap = 2 + random() * 11;
    const y = Math.round(ragged === 'top' ? profileAt(x) - gap : profileAt(x) + gap);
    const w = 1 + Math.floor(random() * 3);
    const h = 1 + Math.floor(random() * 2);
    for (let dy = 0; dy < h; dy++) {
      for (let dx = 0; dx < w; dx++) put(tile, x + dx, y + dy, BROWN, 150 + random() * 105);
    }
  }

  return tile;
}

await mkdir(outDir, { recursive: true });

const built = [];
for (const [name, tile] of [
  ['grain.png', grain()],
  // The cream-surface counterpart: mostly brown specks, and a lower alpha
  // ceiling because dark grain on a light ground reads much harder than light
  // grain on a dark one.
  ['grain-light.png', grain({ seed: 1927, darkRatio: 0.82, maxAlpha: 30 })],
  ['halftone.png', halftone()],
  ['speckle.png', speckle()],
  ['tear-top.png', tearMask({ ragged: 'top', seed: 1861 })],
  ['tear-bottom.png', tearMask({ ragged: 'bottom', seed: 1927 })],
]) {
  built.push(await writeTile(name, tile));
}

console.log(`Wrote ${built.length} textures to public/textures: ${built.join(', ')}`);
