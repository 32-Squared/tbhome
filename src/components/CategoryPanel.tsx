import { useRef, useEffect } from 'react';
import { ChevronRight, Expand } from 'lucide-react';
import type { CategoryPanel as CategoryPanelType } from '@/types';
import { UI_IMAGES } from '@/assets';
import ImageSlot from './ImageSlot';

interface CategoryPanelProps {
  panel: CategoryPanelType;
  isLeft: boolean;
  /** Tilt of the home button in degrees (see homeButtonRotation) */
  homeRotation: number;
  /** Tailwind bob animation class for the home button */
  homeBob: string;
  onExpand: () => void;
  onReturn: () => void;
}

function CategoryPanel({ panel, isLeft, homeRotation, homeBob, onExpand, onReturn }: CategoryPanelProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const backLabel = isLeft ? 'Back to the Boards' : 'Back to the Beach';
  const isOval = panel.shape === 'oval';
  const buttonClass =
    'inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/25 hover:bg-white/35 border border-white/40 font-display font-semibold text-white transition-all hover:scale-105 active:scale-95';

  // homeCorner override takes precedence; otherwise left panels show home on right, right panels on left
  const homeOnLeft = panel.homeCorner ? panel.homeCorner === 'left' : !isLeft;

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
      {/* Decorative images */}
      {panel.decorations?.map((dec) => (
        <div
          key={dec.slot}
          className={`absolute ${dec.positionClass} ${dec.floatAnim ?? ''}`}
          style={{
            transform: `rotate(${dec.rotation ?? 0}deg)`,
            zIndex: dec.zIndex ?? 2,
          }}
        >
          <ImageSlot
            slot={dec.slot}
            kind={dec.kind}
            filename={dec.filename}
            alt={dec.alt}
            className={`${dec.sizeClass} object-contain board-glow`}
          />
        </div>
      ))}

      {/* Floating home button: bobs gently (outer), tilted (inner), no frame */}
      <button
        onClick={onReturn}
        className={`absolute z-20 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${homeBob} ${homeOnLeft ? 'top-12 left-6' : 'top-12 right-6'}`}
        aria-label={backLabel}
      >
        <span className="block transition-transform hover:scale-110 active:scale-95">
          <span className="block" style={{ transform: `rotate(${homeRotation}deg)` }}>
            <ImageSlot
              slot={UI_IMAGES.homeButton.slot}
              kind="thumb"
              filename={UI_IMAGES.homeButton.filename}
              alt={backLabel}
              className="w-14 h-14 md:w-16 md:h-16 object-contain board-glow"
            />
          </span>
        </span>
      </button>

      {/* Content card — drops down and fades in as panel enters view */}
      <div
        ref={cardRef}
        data-tint={panel.tint}
        className={`glass-card enter-drop text-center relative z-10 ${
          isOval ? 'glass-card-oval' : 'p-8 md:p-12 max-w-2xl'
        }`}
      >
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
            isOval ? 'md:text-4xl' : 'md:text-5xl'
          }`}
        >
          {panel.title}
        </h2>
        {panel.intro && (
          <p className="font-body text-white/85 text-base md:text-lg leading-relaxed mb-6">
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
