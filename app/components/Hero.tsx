// app/components/Hero.tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type HeroProps = {
  images?: string[];
};

// You should replace these with your own production images,
// but these Unsplash URLs are stable enough for development/demo.
const DEFAULT_IMAGES: string[] = [
  '../img/event-location.jpg',
  '../img/event-location-exclusive.jpg',
  '../img/event-location-wedding.jpg',
];

export function Hero({ images = DEFAULT_IMAGES }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-rotate background images
  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % images.length);
    }, 12000); // 12s per slide (matches zoom animation)

    return () => clearInterval(interval);
  }, [images]);

  return (
    <>
      <section className="relative isolate min-h-[90vh] w-full overflow-hidden bg-black">
        {/* Background slideshow */}
        <div className="absolute inset-0">
          {images.map((src, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={src + index}
                className={`hero-slide-wrapper ${
                  isActive ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div
                  className={`hero-slide ${
                    isActive ? 'hero-slide--animate' : ''
                  }`}
                  style={{ backgroundImage: `url(${src})` }}
                />

                {/* Dark gradients for premium / cinematic look */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-black" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
              </div>
            );
          })}
        </div>

        {/* Content */}
        <div className="relative z-10 mx-auto flex min-h-[90vh] max-w-6xl flex-col justify-center px-4 py-20 md:px-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-[#d1b371]">
              Curated event locations worldwide
            </p>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-50 md:text-5xl">
              Exceptional venues
              <span className="block text-neutral-300">
                for brands that host differently.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-[13px] leading-relaxed text-neutral-300 md:text-[14px]">
              EventPlaces verbindet globale Marken mit sorgfältig ausgewählten
              Event-Locations – von ikonischen Stadträumen bis hin zu
              versteckten Signature-Venues. Ein Portal, ein kuratiertes
              Netzwerk, ein Premium-Standard.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/locations"
                className="inline-flex items-center justify-center rounded-full border border-[#d1b371]/70 bg-gradient-to-r from-[#d1b371] via-[#e2c58d] to-[#d1b371] px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#1b1b1b] shadow-[0_18px_45px_rgba(0,0,0,0.9)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
              >
                Locations entdecken
              </Link>

              <Link
                href="/inserieren"
                className="inline-flex items-center justify-center rounded-full border border-neutral-700 bg-black/40 px-5 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-200 shadow-[0_12px_30px_rgba(0,0,0,0.8)] transition hover:border-[#d1b371]/80 hover:bg-black/70 hover:text-[#d1b371]"
              >
                Inserieren
              </Link>
            </div>

            {/* Meta line */}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-[11px] text-neutral-400">
              <span className="inline-flex items-center gap-2">
                <span className="h-[1px] w-6 bg-[#d1b371]" />
                Verified venues
              </span>
              <span>Multi-language inquiries</span>
              <span>EU • US • Middle East</span>
            </div>
          </div>
        </div>

        {/* Slide indicators on the right */}
        {images.length > 1 && (
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center md:right-6">
            <div className="flex flex-col gap-2">
              {images.map((_, index) => {
                const isActive = index === activeIndex;
                return (
                  <span
                    key={index}
                    className={`h-6 w-[2px] rounded-full transition-all ${
                      isActive ? 'bg-[#d1b371]' : 'bg-neutral-600/60'
                    }`}
                  />
                );
              })}
            </div>
          </div>
        )}
      </section>

      {/* Global CSS for hero (zoom-out + fade) */}
      <style jsx global>{`
        .hero-slide-wrapper {
          position: absolute;
          inset: 0;
          transition: opacity 1s ease-in-out;
          will-change: opacity;
        }

        .hero-slide {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transform-origin: center center;
          will-change: transform;
        }

        .hero-slide--animate {
          animation: heroZoomOut 12s ease-out forwards;
        }

        @keyframes heroZoomOut {
          0% {
            transform: scale(1.12);
          }
          100% {
            transform: scale(1.0);
          }
        }
      `}</style>
    </>
  );
}
