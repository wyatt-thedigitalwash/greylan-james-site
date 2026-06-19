'use client';

import { useRef, useEffect } from 'react';

export default function ParallaxBanner({
  src,
  height = 'h-[280px] md:h-[400px]',
}: {
  src: string;
  height?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    if (!container || !video) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container!.getBoundingClientRect();
          const windowH = window.innerHeight;
          const progress = (windowH - rect.top) / (windowH + rect.height);
          const clamped = Math.max(0, Math.min(1, progress));
          const offset = (clamped - 0.5) * -60;
          video!.style.transform = `translate3d(0, ${offset}px, 0)`;
          ticking = false;
        });
        ticking = true;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden bg-brand-black ${height}`}
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-0 right-0 -top-[5%] w-full h-[130%] object-cover will-change-transform"
      />
    </div>
  );
}
