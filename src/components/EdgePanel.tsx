import { useEffect, useRef, useState } from 'react';
import { UI_IMAGES, assetUrl } from '@/assets';
import { useDwellReveal, useVisitTimeline } from '@/useDwellReveal';

// Honu timeline, in ms after arriving on the panel. It plays once per visit (no loop) and starts
// over only after the visitor leaves and comes back.
//   10s honu fades in, 15s turtles fades in (laid exactly over honu), 20s honu fades out,
//   25s turtles fades out.
const HONU_MARKS_MS = [10000, 15000, 20000, 25000];

interface EdgePanelProps {
  side: 'left' | 'right';
}

// The two end-of-the-line panels.
//   left  = "The Pier": the spinning logo video with a title at the top and a closing line at the bottom,
//           no home button.
//   right = Honu: a still image, then a second one over it, fading in and out once per visit.
function EdgePanel({ side }: EdgePanelProps) {
  return (
    <section className="surf-panel flex items-center justify-center">
      {side === 'left' ? (
        <>
          <h2 className="absolute inset-x-0 top-16 px-6 text-center font-display text-3xl md:text-5xl text-white text-shadow-strong font-bold">
            The Pier
          </h2>
          <LogoSpin />
          <p className="absolute inset-x-0 bottom-16 px-6 text-center font-body italic text-lg md:text-xl text-white/85 text-shadow-soft">
            ... end of the line ...
          </p>
        </>
      ) : (
        <>
          <h2 className="sr-only">Honu</h2>
          <Honu />
        </>
      )}
    </section>
  );
}

function SlotPlaceholder({ slot, filename }: { slot: number; filename: string }) {
  return (
    <div className="slot-placeholder w-full h-full" aria-hidden="true">
      <div className="text-center leading-tight">
        <div className="text-xs opacity-70">SLOT</div>
        <div className="text-2xl font-bold">{slot}</div>
        <div className="text-[10px] opacity-60 mt-1 break-all px-2">{filename}</div>
      </div>
    </div>
  );
}

// logospin.mp4 (1:1, looping, rounded border). Plays from the start when it appears and pauses
// whenever it is not shown.
function LogoSpin() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false); // video can play
  const [failed, setFailed] = useState(false); // file missing: show the slot placeholder instead
  const { entered, shown } = useDwellReveal(wrapRef, { mediaReady: ready || failed });

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (shown && !reduceMotion) {
      v.currentTime = 0;
      v.play().catch(() => {
        /* autoplay blocked: leaves the first frame showing */
      });
    } else {
      v.pause();
    }
  }, [shown]);

  return (
    <div ref={wrapRef} className={`edge-hero${shown ? ' is-shown' : ''}`}>
      {entered && !failed && (
        <video
          ref={videoRef}
          src={assetUrl(UI_IMAGES.logoSpin.filename)}
          className="w-full h-full object-cover"
          muted
          loop
          playsInline
          preload="auto"
          role="img"
          aria-label="Turtleboards logo, spinning"
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
      {failed && <SlotPlaceholder slot={UI_IMAGES.logoSpin.slot} filename={UI_IMAGES.logoSpin.filename} />}
    </div>
  );
}

// honu.webp and turtles.webp are the same size and sit exactly on top of each other (turtles was
// made to overlay). No border, background or shadow.
function Honu() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [honuFailed, setHonuFailed] = useState(false);
  const [turtlesFailed, setTurtlesFailed] = useState(false);
  const { entered, passed } = useVisitTimeline(wrapRef, HONU_MARKS_MS);

  const honuShown = passed >= 1 && passed < 3;
  const turtlesShown = passed >= 2 && passed < 4;

  return (
    <div ref={wrapRef} className="honu-stack">
      {entered && (
        <>
          {honuFailed ? (
            <div className={`honu-layer${honuShown ? ' is-shown' : ''}`}>
              <SlotPlaceholder slot={UI_IMAGES.honu.slot} filename={UI_IMAGES.honu.filename} />
            </div>
          ) : (
            <img
              src={assetUrl(UI_IMAGES.honu.filename)}
              alt="A honu, the Hawaiian green sea turtle"
              className={`honu-layer${honuShown ? ' is-shown' : ''}`}
              draggable={false}
              decoding="async"
              onError={() => setHonuFailed(true)}
            />
          )}
          {!turtlesFailed && (
            <img
              src={assetUrl(UI_IMAGES.honuTurtles.filename)}
              alt=""
              aria-hidden="true"
              className={`honu-layer${turtlesShown ? ' is-shown' : ''}`}
              draggable={false}
              decoding="async"
              onError={() => setTurtlesFailed(true)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default EdgePanel;
