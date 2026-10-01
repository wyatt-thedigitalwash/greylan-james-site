import localFont from 'next/font/local';
import { Cormorant_Garamond } from 'next/font/google';

// "her side." campaign typography, per the release toolkit: Cormorant Garamond
// Bold (lowercase) for headlines and !F Naskh Nay (all caps) for sub-heads.
// Only the release's own surfaces use these (the splash and the home hero
// lockup); the rest of the site keeps Knockout and Acumin.
export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['600', '700'],
  display: 'swap',
});

// Its space glyph is almost zero width, so anything set in it needs word-spacing.
export const naskh = localFont({
  src: '../../public/fonts/FNaskhNay-Regular.ttf',
  display: 'swap',
});
