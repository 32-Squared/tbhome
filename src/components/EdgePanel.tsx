import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';
import { UI_IMAGES, assetUrl } from '@/assets';

// How long the visitor must stay on an edge panel before its picture fades in.
const DWELL_MS = 5000;
// Honu: how long it stays visible (counted from when it starts to appear) before fading out.
const HONU_HOLD_MS = 10000;

interface EdgePanelProps {
  side: 'left' | 'right';
}

// The two end-of-the-line panels.
//   left  = "Under Construction": only the spinning logo video, no visible title, no home button.
//   right = Honu: only a still image that fades in, then out, once per visit.
function EdgePanel({ side }: EdgePanelProps) {
  return (
    <section className="surf-panel flex items-center justify-center">
      {side === 'left' ? (
        <>
          <h2 className="sr-only">Under Construction</h2>
          <LogoSpin />
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

// Shared timing for both panels. The picture stays hidden until the visitor has been on the
// panel for DWELL_MS (and the file is ready), then `shown` turns true. If holdMs is given,
// `shown` turns false again after that long and stays false until the visitor leaves and returns.
// `entered` becomes true the first time the panel is mostly on screen, so the file is only
// downloaded when someone actually gets there.
function useEdgeReveal(wrapRef: RefObject<HTMLDivElement>, mediaReady: boolean, holdMs?: number) {
  const [entered, setEntered] = useState(false);
  const [inView, setInView] = useState(false);
  const [dwelled, setDwelled] = useState(false);
  const [expired, setExpired] = useState(false);

  // Watch the panel against the horizontal track (same approach as CategoryPanel)
  useEffect(() => {
    const section = wrapRef.current?.closest('.surf-panel');
    if (!section) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
            setInView(true);
            setEntered(true);
          } else if (!entry.isIntersecting) {
            setInView(false);
          }
        });
      },
      { root: section.parentElement, threshold: [0, 0.6, 1] }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, [wrapRef]);

  // Dwell timer: starts on arrival; leaving resets everything for the next visit
  useEffect(() => {
    if (!inView) {
      setDwelled(false);
      setExpired(false);
      return;
    }
    const t = window.setTimeout(() => setDwelled(true), DWELL_MS);
    return () => window.clearTimeout(t);
  }, [inView]);

  const visible = inView && dwelled && mediaReady;

  // Hold timer (Honu only)
  useEffect(() => {
    if (!visible || holdMs === undefined) return;
    const t = window.setTimeout(() => setExpired(true), holdMs);
    return () => window.clearTimeout(t);
  }, [visible, holdMs]);

  return { entered, shown: visible && !expired };
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
  const { entered, shown } = useEdgeReveal(wrapRef, ready || failed);

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

// honu.webp (1:1 still). Same delayed fade-in, no border / background / shadow, then fades out
// HONU_HOLD_MS later and does not come back until the visitor leaves and returns.
function Honu() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const { entered, shown } = useEdgeReveal(wrapRef, ready || failed, HONU_HOLD_MS);

  return (
    <div ref={wrapRef} className={`edge-hero edge-hero--bare${shown ? ' is-shown' : ''}`}>
      {entered && !failed && (
        <img
          src={assetUrl(UI_IMAGES.honu.filename)}
          alt="A honu, the Hawaiian green sea turtle"
          className="w-full h-full object-contain"
          draggable={false}
          decoding="async"
          onLoad={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}
      {failed && <SlotPlaceholder slot={UI_IMAGES.honu.slot} filename={UI_IMAGES.honu.filename} />}
    </div>
  );
}

export default EdgePanel;
