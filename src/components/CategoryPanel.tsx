import type { CSSProperties } from 'react';
import { useRef, useEffect, useState } from 'react';
import { ChevronRight, Expand } from 'lucide-react';
import type { CategoryPanel as CategoryPanelType } from '@/types';
import { UI_IMAGES, assetUrl } from '@/assets';
import { useDwellReveal } from '@/useDwellReveal';
import ImageSlot from './ImageSlot';
import Phosphenes from './Phosphenes';
import BlinkThumb from './BlinkThumb';

interface CategoryPanelProps {
  panel: CategoryPanelType;
  isLeft: boolean;
  /** Tilt of the home button in degrees (see homeButtonRotation) */
  homeRotation: number;
  /** Tailwind bob animation class for the home button */
  homeBob: string;
  onExpand: () => void;
  onReturn: () => void;
  /** Slide down into a branch scene (panels with `branch` set) */
  onBranch?: (id: string) => void;
  /** Leave the current branch scene (panels with `exit` set) */
  onExit?: () => void;
  /** Home button picture (defaults to the main scroll's) */
  homeImage?: { slot: number; filename: string };
  /** Accessible name for the home button */
  backLabel?: string;
}

// How long a visitor stays on a card before its overlay image fades in
const CARD_ART_DELAY_MS = 3000;

function CategoryPanel({
  panel,
  isLeft,
  homeRotation,
  homeBob,
  onExpand,
  onReturn,
  onBranch,
  onExit,
  homeImage = UI_IMAGES.homeButton,
  backLabel: backLabelProp,
}: CategoryPanelProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const backLabel = backLabelProp ?? (isLeft ? 'Back to the Boards' : 'Back to the Beach');
  const phosphenes = panel.phosphene ? (Array.isArray(panel.phosphene) ? panel.phosphene : [panel.phosphene]) : [];
  const isOval = panel.shape === 'oval';
  const isSquare = panel.shape === 'square';

  // Optional overlay image: starts loading when the panel is first reached, fades in after the
  // delay, then stays
  const [artReady, setArtReady] = useState(false);
  const [artFailed, setArtFailed] = useState(false);
  const art = useDwellReveal(cardRef, {
    mediaReady: artReady,
    dwellMs: CARD_ART_DELAY_MS,
    once: true,
    enabled: Boolean(panel.cardArt),
  });
  const buttonClass =
    'inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/25 hover:bg-white/35 border border-white/40 font-display font-semibold text-white transition-all hover:scale-105 active:scale-95';

  // homeCorner override takes precedence; otherwise left panels show home on right, right panels on left
  const homeCorner = panel.homeCorner ?? (isLeft ? 'right' : 'left');
  const homeCornerClass = {
    left: 'top-12 left-6',
    right: 'top-12 right-6',
    'bottom-left': 'bottom-12 left-6',
    'bottom-right': 'bottom-12 right-6',
  }[homeCorner];

  // Trigger enter animation on the content card when the panel scrolls into view
  useEffect(() => {
    const section = cardRef.current?.closest('.surf-panel');
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            cardRef.current?.classList.add('is-visible');
          } else if (!entry.isIntersecting) {
            cardRef.current?.classList.remove('is-visible');
          }
        });
      },
      { root: section.parentElement, threshold: [0, 0.5, 1] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="surf-panel flex flex-col items-center justify-center px-6 md:px-12 relative">
      {/* Sparse floating image (fades in, drifts, fades out), on the top layer */}
      {phosphenes.map((config) => (
        <Phosphenes key={config.filename} config={config} />
      ))}

      {/* Decorative images */}
      {panel.decorations?.map((dec) => (
        <div
          key={dec.slot}
          className={`absolute ${dec.positionClass} ${dec.centerX ? 'inset-x-0 flex justify-center pointer-events-none' : ''} ${dec.floatAnim ?? ''}`}
          style={
            {
              transform: `rotate(${dec.rotation ?? 0}deg)`,
              zIndex: dec.zIndex ?? 2,
              // Framed thumbnails take the card's colour (wave panels keep the default)
              ...(dec.framed && !isOval && panel.cardColor ? { '--card-bg': panel.cardColor } : {}),
            } as CSSProperties
          }
        >
          {dec.blink ? (
            <BlinkThumb dec={dec} />
          ) : (
            <ImageSlot
              slot={dec.slot}
              kind={dec.kind}
              filename={dec.filename}
              alt={dec.alt}
              className={`${dec.sizeClass} object-contain board-glow${dec.framed ? ' thumb-frame' : ''}${
                dec.spin ? (dec.spin === 'ccw' ? ' spin-ccw-slow' : ' spin-cw-slow') : ''
              }`}
            />
          )}
        </div>
      ))}

      {/* Floating home button: bobs gently (outer), tilted (inner), no frame */}
      {!panel.noHome && (
      <button
        onClick={onReturn}
        className={`absolute z-20 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${homeBob} ${homeCornerClass}`}
        aria-label={backLabel}
      >
        <span className="block transition-transform hover:scale-110 active:scale-95">
          <span className="block" style={{ transform: `rotate(${homeRotation}deg)` }}>
            <ImageSlot
              slot={homeImage.slot}
              kind="thumb"
              filename={homeImage.filename}
              alt={backLabel}
              className="w-14 h-14 md:w-16 md:h-16 object-contain board-glow"
            />
          </span>
        </span>
      </button>
      )}

      {/* Content card — drops down and fades in as panel enters view */}
      <div
        ref={cardRef}
        style={panel.cardColor ? ({ '--card-bg': panel.cardColor } as CSSProperties) : undefined}
        className={`glass-card enter-drop text-center relative z-10 ${
          isOval ? 'glass-card-oval' : isSquare ? 'glass-card-square' : 'p-8 md:p-12 max-w-2xl'
        }`}
      >
        {panel.cardArt && art.entered && !artFailed && (
          <img
            src={assetUrl(panel.cardArt)}
            alt=""
            aria-hidden="true"
            draggable={false}
            decoding="async"
            className={`card-art${art.shown ? ' is-shown' : ''}`}
            onLoad={() => setArtReady(true)}
            onError={() => setArtFailed(true)}
          />
        )}
        {isOval && (
          <svg className="board-outline" viewBox="0 0 100 190" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 0 C72 40 100 90 100 140 A50 50 0 0 1 0 140 C0 90 28 40 50 0 Z" vectorEffect="non-scaling-stroke" />
          </svg>
        )}
        {panel.subtitle && (
          <p
            className={`font-body text-white/70 text-sm md:text-base mb-2 ${
              panel.subtitleItalic ? 'italic' : 'uppercase tracking-wide'
            }`}
          >
            {panel.subtitle}
          </p>
        )}
        <h2
          className={`font-display text-3xl text-white text-shadow-strong font-bold mb-4 ${
            isOval ? '' : isSquare ? 'md:text-4xl' : 'md:text-5xl'
          }`}
        >
          {panel.title}
        </h2>
        {panel.intro && (
          <p className="font-body text-white/85 text-base md:text-lg leading-relaxed mb-6 whitespace-pre-line">
            {panel.intro}
          </p>
        )}

        {/* Expand button */}
        {panel.expansionType && (
          <button
            onClick={onExpand}
            className={buttonClass}
          >
            <Expand className="w-5 h-5" />
            Explore Section
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {/* Link button (opens a separate page in the same tab) */}
        {panel.href && (
          <a
            href={panel.href}
            onClick={() => history.replaceState(null, '', `#${panel.id}`)}
            className={buttonClass}
          >
            {panel.linkLabel ?? 'Open'}
            <ChevronRight className="w-4 h-4" />
          </a>
        )}

        {/* Button that leaves a branch scene (slides back up) */}
        {panel.exit && (
          <button type="button" onClick={onExit} className={buttonClass}>
            {panel.linkLabel ?? 'Back'}
          </button>
        )}

        {/* Button that slides down into a branch scene */}
        {panel.branch && (
          <button type="button" onClick={() => onBranch?.(panel.branch as string)} className={buttonClass}>
            {panel.linkLabel ?? 'Open'}
          </button>
        )}

        {/* Placeholder button for a page that is not built yet: visible, but not clickable */}
        {panel.inactive && (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 border border-white/25 font-display font-semibold text-white/60 cursor-not-allowed"
          >
            {panel.linkLabel}
          </button>
        )}
      </div>
    </section>
  );
}

export default CategoryPanel;
