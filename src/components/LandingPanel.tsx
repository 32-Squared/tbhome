import { useRef } from 'react';
import type { CSSProperties } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { UI_IMAGES } from '@/assets';
import type { CollectionData } from '@/types';
import { usePaperFlap } from '@/usePaperFlap';
import ImageSlot from './ImageSlot';

// Copies of the thumbnail strip. The strip scrolls one copy-width per loop, so we need
// enough copies that the viewport is never wider than (copies - 1) strips.
const MARQUEE_COPIES = 4;
const MARQUEE_SECONDS_PER_THUMB = 50 / 12; // the original pace: 12 thumbnails in 50s

interface LandingPanelProps {
  data: CollectionData;
  onGoRight: () => void;
  onGoLeft: () => void;
  /** Open the site map from the tapped element (origin = where it is on screen) */
  onOpenMap: (origin: DOMRect, opener: HTMLElement) => void;
}

function LandingPanel({ data, onGoRight, onGoLeft, onOpenMap }: LandingPanelProps) {
  const postcardRef = useRef<HTMLDivElement>(null);
  usePaperFlap(postcardRef);

  // Keeps the strip's scroll speed constant however many boards are in it
  const marqueeSeconds = data.marqueeThumbs.length * MARQUEE_SECONDS_PER_THUMB;

  return (
    <section className="surf-panel flex flex-col items-center">
      {/* Header image at top */}
      <div className="shrink-0 w-full flex flex-col items-center pt-6 px-4 pointer-events-none">
        <h1 className="sr-only">Turtleboards</h1>
        <ImageSlot
          slot={UI_IMAGES.header.slot}
          kind="board"
          filename={UI_IMAGES.header.filename}
          alt="Turtleboards"
          className="w-full max-w-3xl max-h-[22dvh] object-contain"
        />
        <p className="font-display text-xl md:text-3xl text-white/95 text-shadow-strong font-bold mt-3">
          {data.tagline}
        </p>
      </div>

      {/* Middle: postcard, then the direction labels (BEACH right, BOARDWALK left) */}
      <div className="flex-1 min-h-0 w-full px-4 flex flex-col items-center justify-center gap-5 md:gap-8">
        {/* Map icon on the left; the postcard tilted 30 degrees on the right, overlapping it. Tapping either opens the site map. */}
        <div className="landing-pair">
          <button
            type="button"
            className="landing-map"
            aria-label="Open the site map"
            onClick={(e) => onOpenMap(e.currentTarget.getBoundingClientRect(), e.currentTarget)}
          >
            <ImageSlot
              slot={UI_IMAGES.mapIcon.slot}
              kind="board"
              filename={UI_IMAGES.mapIcon.filename}
              alt="Site map"
              className="landing-map-img w-full h-full object-contain"
              eager
            />
          </button>
          <div ref={postcardRef} className="landing-postcard">
            <button
              type="button"
              className="block w-full h-full"
              aria-label="Open the site map"
              onClick={(e) => onOpenMap(e.currentTarget.getBoundingClientRect(), e.currentTarget)}
            >
              <ImageSlot
                slot={UI_IMAGES.postcard.slot}
                kind="board"
                filename={UI_IMAGES.postcard.filename}
                alt="A Turtleboards summer postcard"
                className="landing-postcard-img w-full h-full object-contain"
                eager
              />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 md:gap-8">
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
      </div>

      {/* Board marquee at bottom: transparent board thumbnails, turned 90° clockwise, with a shadow */}
      <div className="shrink-0 w-full overflow-hidden py-4 bg-gradient-to-t from-sand-300/40 to-transparent">
        <div
          className="marquee-track"
          aria-hidden="true"
          style={
            {
              '--marquee-copies': MARQUEE_COPIES,
              '--marquee-duration': `${marqueeSeconds}s`,
            } as CSSProperties
          }
        >
          {Array.from({ length: MARQUEE_COPIES }, (_, copy) =>
            data.marqueeThumbs.map((thumb) => (
              <div key={`${copy}-${thumb.slot}`} className="marquee-thumb w-16 h-16 md:w-20 md:h-20 mr-3 flex-shrink-0">
                <ImageSlot
                  slot={thumb.slot}
                  kind="thumb"
                  filename={thumb.filename}
                  alt={thumb.alt}
                  className="w-full h-full object-contain rotate-90"
                />
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default LandingPanel;
