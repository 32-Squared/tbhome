import { useEffect, useRef, useState } from 'react';
import { UI_IMAGES, assetUrl } from '@/assets';

// How long the visitor must stay on the right edge panel before the logo fades in.
const DWELL_MS = 5000;

interface EdgePanelProps {
  side: 'left' | 'right';
}

// The two end-of-the-line panels. Left: intentionally empty for now. Right: the spinning logo.
function EdgePanel({ side }: EdgePanelProps) {
  return (
    <section
      className="surf-panel flex items-center justify-center"
      aria-hidden={side === 'left' ? true : undefined}
    >
      {side === 'right' && <LogoSpin />}
    </section>
  );
}

// logospin.mp4 (1:1, looping). The panel stays blank until the visitor has stayed DWELL_MS; then the
// video fades in slowly. The file only starts downloading once the panel is mostly on screen, and
// it plays only while it is visible. Each new visit starts the 5 seconds over.
function LogoSpin() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [entered, setEntered] = useState(false); // panel has been seen: mount the video (sticky)
  const [inView, setInView] = useState(false); // panel is on screen right now
  const [dwelled, setDwelled] = useState(false); // stayed long enough
  const [ready, setReady] = useState(false); // video can play
  const [failed, setFailed] = useState(false); // file missing: show the slot placeholder instead

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
  }, []);

  // Dwell timer: starts on arrival, resets on leaving
  useEffect(() => {
    if (!inView) {
      setDwelled(false);
      return;
    }
    const t = window.setTimeout(() => setDwelled(true), DWELL_MS);
    return () => window.clearTimeout(t);
  }, [inView]);

  const shown = inView && dwelled && (ready || failed);

  // Play from the start when it appears; pause whenever it is not shown
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
      {failed && (
        <div className="slot-placeholder w-full h-full" aria-hidden="true">
          <div className="text-center leading-tight">
            <div className="text-xs opacity-70">SLOT</div>
            <div className="text-2xl font-bold">{UI_IMAGES.logoSpin.slot}</div>
            <div className="text-[10px] opacity-60 mt-1 break-all px-2">{UI_IMAGES.logoSpin.filename}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EdgePanel;
