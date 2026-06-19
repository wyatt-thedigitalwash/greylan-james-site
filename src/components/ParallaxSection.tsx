'use client';

import { useRef, useEffect, type ReactNode } from 'react';
import Image from 'next/image';

export default function ParallaxSection({
  src,
  mobileSrc,
  alt,
  children,
  className = '',
  overlay = 'bg-black/15',
  objectPosition = 'center',
}: {
  src: string;
  mobileSrc?: string;
  alt: string;
  children: ReactNode;
  className?: string;
  overlay?: string;
  objectPosition?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    if (!container || !img) return;

    let ticking = false;

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          const rect = container!.getBoundingClientRect();
          const windowH = window.innerHeight;
          const progress = (windowH - rect.top) / (windowH + rect.height);
          const clamped = Math.max(0, Math.min(1, progress));
          const offset = (clamped - 0.5) * -60;
          img!.style.transform = `translate3d(0, ${offset}px, 0)`;
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
    <div ref={containerRef} className={`relative overflow-hidden bg-brand-black ${className}`}>
      <div ref={imgRef} className="absolute left-0 right-0 -top-[15%] h-[130%] will-change-transform">
        <Image
          src={src}
          alt={alt}
          fill
          style={{ objectPosition }}
          className={`object-cover ${mobileSrc ? 'hidden md:block' : ''}`}
        />
        {mobileSrc && (
          <Image
            src={mobileSrc}
            alt={alt}
            fill
            style={{ objectPosition }}
            className="object-cover md:hidden"
          />
        )}
      </div>
      <div className={`absolute inset-0 ${overlay}`} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
