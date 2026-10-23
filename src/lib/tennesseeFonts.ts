import localFont from 'next/font/local';
import { Source_Sans_3 } from 'next/font/google';

// "Tennessee You Again" campaign typography, per the release toolkit: Freshman
// Normal for headlines and sub-heads, Source Sans 3 Medium for body copy, and
// Source Sans 3 SemiBold for the splash buttons. Only the splash uses these;
// the rest of the site keeps Knockout and Acumin.
export const freshman = localFont({
  src: '../../public/fonts/Freshman.ttf',
  display: 'swap',
});

export const sourceSans = Source_Sans_3({
  subsets: ['latin'],
  weight: ['500', '600'],
  display: 'swap',
});
