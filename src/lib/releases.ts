/**
 * Every Greylan James release, newest first. Shared by the /music page and the
 * Music section on the home page so the two can never drift apart.
 */
export type Release = {
  title: string;
  cover: string;
  /** Smart link. null while the label has not supplied one yet. */
  link: string | null;
};

/** The current campaign. Used by the splash, the home hero, and the lists below. */
export const herSide: Release = {
  title: 'Water At A Wedding (her side.)',
  cover: '/covers/GreylanJames_WaterAtAWedding_HerSide_GabriellaRose_Cover.jpg',
  link: 'https://greylanjames.ffm.to/waterataweddingherside.OWE',
};

// Midnight Eastern on release day, when the single goes live on US services.
// The smart link stays the same; it flips from pre-save to listen on its own.
const HER_SIDE_RELEASE = new Date('2026-10-07T00:00:00-04:00');

// Call this from server components only and pass the result down as a prop. A
// client component reading the clock itself would disagree with prerendered
// HTML on either side of release day and trip a hydration mismatch. The root
// layout revalidates hourly, so every route picks up the flip on its own.
export function isHerSideOut(): boolean {
  return Date.now() >= HER_SIDE_RELEASE.getTime();
}

export function herSideCopy(released: boolean) {
  return released
    ? { kicker: 'New Single, Out Now', cta: 'Listen Now', date: 'out now' }
    : { kicker: 'New Single, Out October 7', cta: 'Pre-Save', date: 'october 7' };
}

/** The debut album. Headlines the home hero. No cover art supplied yet. */
export const album = {
  title: 'Greylan James',
  link: 'https://greylanjames.ffm.to/greylanjames.OWE',
};

// Midnight Eastern on release day. Same smart link before and after.
const ALBUM_RELEASE = new Date('2026-11-13T00:00:00-05:00');

// Server components only, for the same hydration reason as isHerSideOut.
export function isAlbumOut(): boolean {
  return Date.now() >= ALBUM_RELEASE.getTime();
}

export function albumCopy(released: boolean) {
  return released
    ? { date: 'Out Now', cta: 'Listen Now' }
    : { date: 'Out November 13', cta: 'Pre-Save' };
}

export const releases: Release[] = [
  herSide,
  {
    title: 'Small Town',
    cover: '/covers/GreylanJames_SmallTown_Cover.jpg',
    link: 'https://greylanjames.ffm.to/smalltown.OWE',
  },
  {
    title: 'Hold It Down (the after demo)',
    cover: '/covers/GreylanJames_HoldItDown_Cover.jpg',
    link: 'https://greylanjames.ffm.to/holditdown.OWE',
  },
  {
    title: "Pullin' From A Bottle",
    cover: '/covers/GreylanJames_PullinFromABottle_Cover.jpg',
    link: 'https://greylanjames.ffm.to/pullinfromabottle.O',
  },
  {
    title: 'Give Me A Second (the before)',
    cover: '/covers/GreylanJames_GiveMeASecond_Cover.jpg',
    link: 'https://greylanjames.lnk.to/GiveMeASecondWE',
  },
  {
    title: 'Water At A Wedding',
    cover: '/covers/GreylanJames_WaterAtAWedding_Cover.jpg',
    link: 'https://greylanjames.lnk.to/WaterAtAWeddingWE',
  },
  {
    title: 'Water At A Wedding - Acoustic Version',
    cover: '/covers/GreylanJames_WaterAtAWeddingAcoustic_Cover.jpg',
    link: 'https://greylanjames.lnk.to/WaterAtAWeddingAcousticWE',
  },
  {
    title: 'Wait Til You Have Kids',
    cover: '/covers/GreylanJames_WaitTilYouHaveKids_Cover.jpg',
    link: 'https://greylanjames.lnk.to/WaitTilYouHaveKidsWE',
  },
  {
    title: "Things That I Can't Change",
    cover: '/covers/GreylanJames_ThingsICantChange_Cover.jpg',
    link: 'https://greylanjames.lnk.to/ThingsThatICantChangeWE',
  },
  {
    title: 'Man Up',
    cover: '/covers/GreylanJames_ManUp_Cover.jpg',
    link: 'https://greylanjames.lnk.to/ManUpWE',
  },
  {
    title: 'Who Broke Up With You',
    cover: '/covers/GreylanJames_WhoBrokeUpWithYou_Cover.jpg',
    link: 'https://greylanjames.lnk.to/WhoBrokeUpWithYouWE',
  },
  {
    title: "Ain't Thinkin' Bout You",
    cover: '/covers/GreylanJames_AintThinkinBoutYou_Cover.jpg',
    link: 'https://greylanjames.lnk.to/AintThinkinBoutYouWE',
  },
  {
    title: 'Young Man',
    cover: '/covers/GreylanJames_YoungMan_Cover.jpg',
    link: 'https://greylanjames.lnk.to/YoungManWE',
  },
  {
    // TODO: add Undermine cover art when received from label.
    title: 'Undermine',
    cover: '/covers/GreylanJames_Undermine_Cover.jpg',
    link: 'https://greylanjames.lnk.to/Undermine_WE',
  },
];
