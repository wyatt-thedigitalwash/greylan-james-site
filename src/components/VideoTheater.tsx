'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import type { Video } from '@/lib/videos';

/**
 * The video grid, plus the theater it opens into. Clicking a video darkens the
 * page and brings the player up centred over it, the way the lights go down in
 * a room.
 *
 * Nothing from YouTube loads until a video is opened: the grid is thumbnails,
 * and the iframe is only mounted while the theater is up. That keeps a dozen
 * third-party players off the page on /videos, and unmounting on close is also
 * what stops playback.
 */

/** How long the open and close transitions run. Keep in step with the classes below. */
const OPEN_MS = 320;
const CLOSE_MS = 220;

const FOCUSABLE = 'a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])';

function thumbnailUrl(id: string, fallback: boolean) {
  // maxres is 1280x720 and exists for every label upload so far. hqdefault is
  // guaranteed to exist, so it catches anything that ever lacks a maxres.
  return `https://i.ytimg.com/vi/${id}/${fallback ? 'hqdefault' : 'maxresdefault'}.jpg`;
}

function VideoCard({
  video,
  tone,
  onOpen,
}: {
  video: Video;
  tone: 'dark' | 'light';
  onOpen: (video: Video, trigger: HTMLButtonElement) => void;
}) {
  const [fallback, setFallback] = useState(false);
  const ref = useRef<HTMLButtonElement>(null);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => ref.current && onOpen(video, ref.current)}
      className={`group block w-full text-left focus-visible:outline-2 focus-visible:outline-offset-4 ${
        tone === 'dark' ? 'focus-visible:outline-brand-cream' : 'focus-visible:outline-brand-brown'
      }`}
    >
      <div className="relative aspect-video w-full overflow-hidden bg-brand-brown">
        <Image
          src={thumbnailUrl(video.id, fallback)}
          alt={`${video.title} thumbnail`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          onError={() => setFallback(true)}
          className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {/* Sits over the still so the play mark always has something to read
            against, and lifts on hover as the picture comes forward. */}
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-brand-brown/25 transition-colors duration-300 group-hover:bg-brand-brown/10 motion-reduce:transition-none"
        />
        <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center">
          {/* Square, not a circle: the brand keeps its buttons hard edged. */}
          <span className="flex h-14 w-14 items-center justify-center bg-brand-cream transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none motion-reduce:group-hover:scale-100 md:h-16 md:w-16">
            <svg viewBox="0 0 24 24" className="h-6 w-6 translate-x-[1px] fill-brand-brown md:h-7 md:w-7">
              <path d="M6 4l14 8-14 8V4z" />
            </svg>
          </span>
        </span>
      </div>
      <p
        className={`mt-3 font-headline text-[18px] uppercase tracking-wide transition-colors ${
          tone === 'dark'
            ? 'text-brand-cream group-hover:text-brand-cream/70'
            : 'text-brand-brown group-hover:text-brand-brown/70'
        }`}
      >
        {video.title}
      </p>
    </button>
  );
}

export default function VideoTheater({
  videos,
  tone = 'dark',
}: {
  videos: Video[];
  tone?: 'dark' | 'light';
}) {
  const [active, setActive] = useState<Video | null>(null);
  /** Drives the in and out transitions. Set a frame after mount, cleared before unmount. */
  const [shown, setShown] = useState(false);
  /** The theater is portalled, which needs a document, so it waits for the client. */
  const [mounted, setMounted] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeTimer = useRef<number | null>(null);

  const open = useCallback((video: Video, trigger: HTMLButtonElement) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    triggerRef.current = trigger;
    setActive(video);
    // Mount first, paint the closed state, then transition to the open one.
    requestAnimationFrame(() => setShown(true));
  }, []);

  const close = useCallback(() => {
    setShown(false);
    closeTimer.current = window.setTimeout(() => {
      setActive(null);
      // Send the visitor back to the video they came from, not the top of the page.
      triggerRef.current?.focus();
      triggerRef.current = null;
    }, CLOSE_MS);
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  // Escape to close, Tab kept inside the theater, and the page held still
  // behind it.
  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close();
        return;
      }
      if (e.key !== 'Tab') return;

      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const current = document.activeElement;

      if (e.shiftKey && (current === first || !dialogRef.current?.contains(current))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, close]);

  return (
    <>
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} tone={tone} onOpen={open} />
        ))}
      </div>

      {/* Portalled to the body: the grid sits inside a stacked section, and a
          theater rendered in there would be trapped under the fixed header. */}
      {mounted && active && createPortal(
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.title}, video player`}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 md:p-8"
        >
          {/* House lights. Clicking anywhere off the player closes it. */}
          <button
            type="button"
            aria-label="Close video"
            onClick={close}
            style={{ transitionDuration: `${shown ? OPEN_MS : CLOSE_MS}ms` }}
            className={`absolute inset-0 h-full w-full bg-[#0C0908]/95 backdrop-blur-sm transition-opacity ease-out motion-reduce:transition-none ${
              shown ? 'opacity-100' : 'opacity-0'
            }`}
          />

          <div
            style={{ transitionDuration: `${shown ? OPEN_MS : CLOSE_MS}ms` }}
            className={`relative z-10 w-full max-w-5xl transition-all ease-out motion-reduce:transition-none ${
              shown ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-3 scale-[0.97] opacity-0'
            }`}
          >
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${active.id}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={active.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full border-0"
              />
            </div>

            <div className="mt-4 flex items-start justify-between gap-6">
              <p className="font-headline text-[18px] uppercase tracking-wide text-brand-cream md:text-[22px]">
                {active.title}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={close}
                className="shrink-0 bg-brand-cream px-5 py-2 font-headline text-[16px] uppercase tracking-wide text-brand-brown transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-cream md:text-[18px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
