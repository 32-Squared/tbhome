import type { CSSProperties } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UI_IMAGES } from '@/assets';
import type { CollectionData } from '@/types';
import ImageSlot from './ImageSlot';

// Copies of the thumbnail strip. The strip scrolls one copy-width per loop, so we need
// enough copies that the viewport is never wider than (copies - 1) strips.
const MARQUEE_COPIES = 4;

interface LandingPanelProps {
  data: CollectionData;
  onGoRight: () => void;
  onGoLeft: () => void;
}

function LandingPanel({ data, onGoRight, onGoLeft }: LandingPanelProps) {
  return (
    <section className="surf-panel flex flex-col items-center justify-center px-4">
      {/* Header image at top */}
      <div className="absolute top-0 left-0 right-0 flex flex-col items-center pt-6 px-4 pointer-events-none">
        <h1 className="sr-only">Turtleboards</h1>
        <ImageSlot
          slot={UI_IMAGES.header.slot}
          kind="board"
          filename={UI_IMAGES.header.filename}
          alt="Turtleboards"
          className="w-full max-w-3xl object-contain"
        />
        <p className="font-display text-xl md:text-3xl text-white/95 text-shadow-strong font-bold mt-3">
          {data.tagline}
        </p>
      </div>

      {/* Direction labels — BEACH (right) and BOARDWALK (left) */}
      <div className="flex flex-col items-center gap-6 md:gap-10 mt-12">
        <button
          onClick={onGoRight}
          className="group flex items-center gap-4 md:gap-6 transition-all hover:scale-105 active:scale-95"
          aria-label="Go to Beach"
        >
          <span className="font-display text-3xl md:text-5xl text-white/90 text-shadow-strong font-bold tracking-wide">
            BEACH
          </span>
          <ArrowRight
            className="w-9 h-9 md:w-14 md:h-14 text-white/90 group-hover:text-white group-hover:translate-x-1 transition-all [filter:drop-shadow(0_2px_8px_rgba(4,41,58,0.4))]"
            strokeWidth={3.8}
          />
        </button>

        <button
          onClick={onGoLeft}
          className="group flex items-center gap-4 md:gap-6 transition-all hover:scale-105 active:scale-95"
          aria-label="Go to Boardwalk"
        >
          <ArrowLeft
            className="w-9 h-9 md:w-14 md:h-14 text-white/90 group-hover:text-white group-hover:-translate-x-1 transition-all [filter:drop-shadow(0_2px_8px_rgba(4,41,58,0.4))]"
            strokeWidth={3.8}
          />
          <span className="font-display text-3xl md:text-5xl text-white/90 text-shadow-strong font-bold tracking-wide">
            BOARDWALK
          </span>
        </button>
      </div>

      {/* Thumbnail marquee at bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-4 bg-gradient-to-t from-sand-300/40 to-transparent">
        <div
          className="marquee-track"
          aria-hidden="true"
          style={{ '--marquee-copies': MARQUEE_COPIES } as CSSProperties}
        >
          {Array.from({ length: MARQUEE_COPIES }, (_, copy) =>
            data.marqueeThumbs.map((thumb) => (
              <ImageSlot
                key={`${copy}-${thumb.slot}`}
                slot={thumb.slot}
                kind="thumb"
                filename={thumb.filename}
                alt={thumb.alt}
                className="w-16 h-16 md:w-20 md:h-20 mr-3 rounded-xl object-cover flex-shrink-0 border-2 border-white/30"
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default LandingPanel;
