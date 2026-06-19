import type { Metadata } from 'next';
import Image from 'next/image';
import { FaSpotify, FaAmazon } from 'react-icons/fa6';
import { SiApplemusic } from 'react-icons/si';

export const metadata: Metadata = {
  title: 'Music | Greylan James',
  description:
    'Listen to all releases from Greylan James including Small Town, Hold It Down, Young Man, and more.',
};

const releases = [
  {
    title: 'Small Town',
    cover: '/covers/GreylanJames_SmallTown_Cover.jpg',
    // TODO: replace with Small Town smart link when received from label
    link: null,
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

export default function MusicPage() {
  return (
    <section className="bg-brand-gray px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-7xl">
        <h1 className="font-headline text-[64px] leading-none uppercase tracking-tight text-brand-black md:text-[96px]">
          Music
        </h1>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {releases.map((release) => (
            <div key={release.title}>
              <div className="relative aspect-square w-full overflow-hidden">
                <Image
                  src={release.cover}
                  alt={`${release.title} cover art`}
                  fill
                  className="object-cover"
                />
              </div>
              {release.link ? (
                <a
                  href={release.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 block font-headline text-[20px] uppercase tracking-wide text-brand-black hover:text-brand-red transition-colors"
                >
                  {release.title}
                </a>
              ) : (
                /* TODO: replace with Small Town smart link when received from label */
                <span className="mt-3 block font-headline text-[20px] uppercase tracking-wide text-brand-black">
                  {release.title}
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-16 text-lg text-brand-black/70 font-body">
          Available everywhere you listen.
        </p>
        <div className="mt-4 flex items-center gap-6">
          <a
            href="https://open.spotify.com/artist/0obiwW8UEpyliJ4xhXqrra"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Spotify"
            className="text-brand-black hover:text-brand-red transition-colors"
          >
            <FaSpotify className="w-6 h-6" />
          </a>
          <a
            href="https://music.apple.com/us/artist/greylan-james/1607407826"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apple Music"
            className="text-brand-black hover:text-brand-red transition-colors"
          >
            <SiApplemusic className="w-6 h-6" />
          </a>
          <a
            href="https://music.amazon.com/artists/B004JXBNXW/greylan-james"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Amazon Music"
            className="text-brand-black hover:text-brand-red transition-colors"
          >
            <FaAmazon className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
