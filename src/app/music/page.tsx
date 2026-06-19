import type { Metadata } from 'next';
import Image from 'next/image';

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
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
            </svg>
          </a>
          <a
            href="https://music.apple.com/us/artist/greylan-james/1607407826"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apple Music"
            className="text-brand-black hover:text-brand-red transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M23.994 6.124a9.23 9.23 0 0 0-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 0 0-1.877-.726 10.496 10.496 0 0 0-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.802.42.127.856.187 1.298.228.468.043.937.065 1.407.066h.14c3.77 0 7.54 0 11.31-.002.483 0 .966-.017 1.447-.07.73-.077 1.437-.247 2.085-.606 1.1-.61 1.855-1.52 2.27-2.72.2-.576.3-1.176.352-1.786.042-.49.063-.983.064-1.476V6.14l-.005-.015zM17.872 12.5v4.855c0 .346-.04.688-.158 1.015-.26.72-.783 1.128-1.527 1.27-.347.067-.7.088-1.053.082-.548-.01-1.044-.137-1.47-.47-.514-.402-.753-.942-.7-1.6.043-.53.272-.97.692-1.296.313-.244.677-.38 1.054-.485.42-.118.847-.204 1.27-.307.33-.08.543-.28.617-.618.016-.073.024-.148.024-.223V9.9c0-.088-.013-.175-.042-.258-.053-.153-.162-.222-.32-.192-.12.022-.237.058-.353.092l-3.795 1.013c-.028.007-.056.018-.084.024-.13.04-.193.12-.207.257-.005.044-.006.088-.006.133v6.486c0 .376-.04.748-.17 1.105-.26.712-.783 1.11-1.517 1.255-.376.074-.757.097-1.14.08-.5-.022-.96-.13-1.367-.406-.584-.396-.855-.956-.805-1.67.033-.463.22-.86.568-1.178.283-.258.618-.4.972-.502.46-.133.928-.226 1.392-.34.28-.068.483-.214.58-.498.034-.098.048-.202.048-.308V7.27c0-.16.018-.317.063-.47.082-.28.28-.447.554-.517.118-.03.238-.053.357-.076l5.17-1.38c.205-.054.413-.1.623-.132.2-.03.345.08.377.282.008.053.013.108.013.162v7.36z" />
            </svg>
          </a>
          <a
            href="https://music.amazon.com/artists/B004JXBNXW/greylan-james"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Amazon Music"
            className="text-brand-black hover:text-brand-red transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705a.66.66 0 0 1-.753.077c-1.06-.878-1.247-1.287-1.832-2.122-1.748 1.784-2.985 2.318-5.251 2.318-2.68 0-4.768-1.653-4.768-4.963 0-2.586 1.402-4.345 3.398-5.208 1.73-.753 4.149-.891 5.993-1.095v-.41c0-.753.058-1.642-.384-2.294-.384-.576-1.117-.814-1.765-.814-1.198 0-2.267.616-2.528 1.891-.054.284-.261.563-.548.577l-3.061-.33c-.259-.058-.546-.266-.472-.66C5.943 1.887 8.896.702 11.549.702c1.36 0 3.135.362 4.207 1.39 1.36 1.278 1.23 2.983 1.23 4.84v4.382c0 1.317.548 1.894 1.06 2.605.182.254.222.56-.009.748-.576.481-1.601 1.378-2.164 1.879l-.028.058-.7.15zM21.779 20.8C19.474 22.676 16.09 23.7 13.162 23.7c-4.097 0-7.788-1.515-10.58-4.038-.22-.197-.023-.467.24-.314 3.013 1.753 6.741 2.808 10.591 2.808 2.596 0 5.452-.538 8.082-1.65.396-.172.728.26.284.294z M23.606 19.38c-.306-.39-2.024-.185-2.797-.094-.234.029-.27-.176-.059-.323 1.37-.963 3.617-.685 3.88-.362.263.325-.069 2.577-1.356 3.652-.197.165-.386.077-.298-.142.289-.721.937-2.34.63-2.73z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
