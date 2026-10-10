import { useEffect, useRef } from 'react';
import type { CSSProperties } from 'react';
import type { BranchScene } from '@/types';
import { UI_IMAGES } from '@/assets';
import ImageSlot from './ImageSlot';

interface BranchWorldProps {
  scene: BranchScene | null;
  /** The overlay is showing (fading in, sliding, landed, or sliding back) */
  active: boolean;
  /** Slid one screen down: the lower screen is in view */
  slid: boolean;
  /** Landed: the card and home button are showing */
  landed: boolean;
  onClose: () => void;
}

// A screen "below" the main scroll, reached without a second scroll axis. It is a two-screen-tall
// overlay: the top half is the light-green start of the gradient, the bottom half (light to dark
// green into earth brown) is the scene. App.tsx drives the sequence (see BRANCH_* there):
//   fade the panels out and the overlay in -> slide it up one screen -> fade the card in,
// and the reverse on the way back.
function BranchWorld({ scene, active, slid, landed, onClose }: BranchWorldProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (landed) buttonRef.current?.focus({ preventScroll: true });
  }, [landed]);

  const tab = landed ? 0 : -1;

  return (
    <div
      className={`branch-world${active ? ' is-on' : ''}${slid ? ' is-slid' : ''}${landed ? ' is-landed' : ''}`}
      aria-hidden={!landed}
    >
      {scene && (
        <section className="branch-screen" aria-label={scene.title}>
          <button
            type="button"
            onClick={onClose}
            tabIndex={tab}
            aria-label="Back"
            className="absolute z-20 top-12 left-6 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white animate-float-soft"
          >
            <ImageSlot
              slot={UI_IMAGES.homeButton.slot}
              kind="thumb"
              filename={UI_IMAGES.homeButton.filename}
              alt="Back"
              className="w-14 h-14 md:w-16 md:h-16 object-contain board-glow"
            />
          </button>

          <div className="branch-fade">
            <div
              className="glass-card text-center p-8 md:p-12 max-w-2xl"
              style={{ '--card-bg': scene.cardColor } as CSSProperties}
            >
              <h2 className="font-display text-3xl md:text-5xl text-white text-shadow-strong font-bold mb-4">
                {scene.title}
              </h2>
              <p className="font-body text-white/85 text-base md:text-lg leading-relaxed mb-6">{scene.intro}</p>
              <button
                ref={buttonRef}
                type="button"
                onClick={onClose}
                tabIndex={tab}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/25 hover:bg-white/35 border border-white/40 font-display font-semibold text-white transition-all hover:scale-105 active:scale-95"
              >
                {scene.linkLabel}
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default BranchWorld;
