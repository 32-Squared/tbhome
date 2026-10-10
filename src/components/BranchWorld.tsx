import { useCallback, useEffect, useLayoutEffect, useRef } from 'react';
import type { BranchScene } from '@/types';
import { UI_IMAGES } from '@/assets';
import { homeButtonRotation } from '@/homeButtonRotation';
import CategoryPanelComp from './CategoryPanel';
import CloudBackground from './CloudBackground';

interface BranchWorldProps {
  scene: BranchScene | null;
  /** Which of the scene's panels to start on (a deep link); default is the first */
  startPanelId: string | null;
  /** The overlay is showing (fading in, sliding, landed, or sliding back) */
  active: boolean;
  /** Slid one screen down: the lower screen is in view */
  slid: boolean;
  /** Landed: the scene is showing and can be used */
  landed: boolean;
  /** Leave the scene (slides back up to the panel it came from) */
  onExit: () => void;
}

const panelEls = (track: HTMLElement | null) =>
  Array.from(track?.querySelectorAll<HTMLElement>(':scope > .surf-panel') ?? []);

// A scene "below" the main scroll, reached without a second page-scroll axis. It is a two-screen-tall
// overlay: the top half is the light-green start of the gradient, the bottom half is the scene (light
// to dark green into earth brown), which holds its own little horizontal scroll (the Town). App.tsx
// drives the sequence (see BRANCH_* there): fade the panels out and the overlay in, slide it up one
// screen, fade the scene in; and the reverse on the way back.
function BranchWorld({ scene, startPanelId, active, slid, landed, onExit }: BranchWorldProps) {
  const worldRef = useRef<HTMLDivElement>(null);

  // Nothing inside can be tabbed to (or read out) until the scene has landed
  useEffect(() => {
    worldRef.current?.toggleAttribute('inert', !landed);
  }, [landed]);

  return (
    <div
      ref={worldRef}
      className={`branch-world${active ? ' is-on' : ''}${slid ? ' is-slid' : ''}${landed ? ' is-landed' : ''}`}
      aria-hidden={!landed}
    >
      {scene && (
        <section className="branch-screen" aria-label="Town">
          <TownScroll scene={scene} startPanelId={startPanelId} landed={landed} onExit={onExit} />
        </section>
      )}
    </div>
  );
}

function TownScroll({
  scene,
  startPanelId,
  landed,
  onExit,
}: {
  scene: BranchScene;
  startPanelId: string | null;
  landed: boolean;
  onExit: () => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const panels = scene.panels;

  const goTo = useCallback((i: number) => {
    const els = panelEls(trackRef.current);
    const el = els[Math.max(0, Math.min(els.length - 1, i))];
    // scrollTo on the track only (scrollIntoView could also nudge the page's overflow-hidden ancestors)
    if (el) trackRef.current?.scrollTo({ left: el.offsetLeft, behavior: 'smooth' });
  }, []);

  // Start position, instantly (the track has smooth scrolling in CSS)
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.max(0, panels.findIndex((p) => p.id === startPanelId));
    const el = panelEls(track)[i];
    if (el) track.scrollTo({ left: el.offsetLeft, behavior: 'instant' });
    indexRef.current = i;
  }, [panels, startPanelId]);

  // Keep track of which panel is showing; wheel / vertical trackpad swipe steps one panel
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let lockUntil = 0;
    const onScroll = () => {
      indexRef.current = Math.round(track.scrollLeft / Math.max(1, track.clientWidth));
    };
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || Math.abs(e.deltaY) < 4) return;
      const now = performance.now();
      if (now < lockUntil) return;
      lockUntil = now + 600;
      goTo(indexRef.current + (e.deltaY > 0 ? 1 : -1));
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    track.addEventListener('wheel', onWheel, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      track.removeEventListener('wheel', onWheel);
    };
  }, [goTo]);

  // Arrow keys once landed (Escape is handled in App: it leaves the scene)
  useEffect(() => {
    if (!landed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goTo(indexRef.current - 1);
      else if (e.key === 'ArrowRight') goTo(indexRef.current + 1);
      else if (e.key === 'Home') goTo(0);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [landed, goTo]);

  // Move focus into the scene when it lands (a frame later, once BranchWorld has lifted `inert`)
  useEffect(() => {
    if (!landed) return;
    const raf = requestAnimationFrame(() => {
      const el = panelEls(trackRef.current)[indexRef.current];
      el?.querySelector<HTMLElement>('.glass-card button:not([disabled]), .glass-card a')?.focus({ preventScroll: true });
    });
    return () => cancelAnimationFrame(raf);
  }, [landed]);

  return (
    <>
      <CloudBackground trackRef={trackRef} />
      <div ref={trackRef} className="surf-track town-track">
        {panels.map((panel, i) => (
          <CategoryPanelComp
            key={panel.id}
            panel={panel}
            isLeft={false}
            homeRotation={homeButtonRotation(i)}
            homeBob={i % 2 === 0 ? 'animate-float-soft' : 'animate-float-gentle'}
            homeImage={UI_IMAGES.home2Button}
            backLabel="Back to Parking"
            onExpand={() => undefined}
            onReturn={() => goTo(0)}
            onExit={onExit}
          />
        ))}
      </div>
    </>
  );
}

export default BranchWorld;
