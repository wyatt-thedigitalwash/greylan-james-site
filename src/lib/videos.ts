/**
 * Every Greylan James video, newest first. Shared by the /videos page and the
 * Videos section on the home page so the two can never drift apart.
 */
export type Video = {
  title: string;
  /** YouTube video id, embedded through youtube-nocookie. */
  id: string;
};

export const videos: Video[] = [
  // The two official videos lead the list, so they are the pair the home page
  // surfaces and the first thing on /videos.
  {
    title: 'Water At A Wedding (Official Music Video)',
    id: 'q5nsBKvCTPU',
  },
  {
    title: 'Small Town (Official Video)',
    id: 'rGPAEbuD0HM',
  },
  {
    title: 'Hold It Down (the after demo) (Lyric Video)',
    id: 'hLbG7hL4hME',
  },
  {
    title: "Pullin' From A Bottle (Lyric Video)",
    id: 'bnRr2Z2u3C8',
  },
  {
    title: 'Give Me A Second (the before) (Lyric Video)',
    id: 'pIOmS5fwZGw',
  },
  {
    title: 'Water At A Wedding (Lyric Video)',
    id: 'gSI2nt5OdxQ',
  },
  {
    title: 'Wait Til You Have Kids (Home Video Version)',
    id: 'J7apgDRFttc',
  },
  {
    title: 'Wait Til You Have Kids (Lyric Video)',
    id: 'iXUMhoDTTyA',
  },
  {
    title: "Things That I Can't Change (From The Road) ft. Cole Swindell",
    id: 't7G-hA-exCg',
  },
  {
    title: 'Man Up (From Her Side of Town)',
    id: 'jsw3fygbHoI',
  },
  {
    title: 'Man Up (Lyric Video)',
    id: 'J1tkgkpEsXg',
  },
  {
    title: 'Who Broke Up With You',
    id: '5mPdWOvFgJ4',
  },
];
