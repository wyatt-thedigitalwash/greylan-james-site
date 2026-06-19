'use client';

import { useRef, useEffect } from 'react';

export default function ParallaxVideo({ src }: { src: string }) {
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
          const offset = (clamped - 0.5) * -80;
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
      className="relative w-full overflow-hidden md:w-[45%] md:max-w-none md:shrink-0 h-[500px] md:h-[700px]"
    >
      <video
        ref={videoRef}
        src={src}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-[120%] object-cover object-right will-change-transform"
      />
    </div>
  );
}
