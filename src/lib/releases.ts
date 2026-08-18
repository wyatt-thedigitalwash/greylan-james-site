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

export const releases: Release[] = [
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
