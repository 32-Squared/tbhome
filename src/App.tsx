import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { collection } from '@/data';
import type { CategoryPanel, ImageKind } from '@/types';
import WaveBackground from '@/components/WaveBackground';
import LandingPanel from '@/components/LandingPanel';
import { homeButtonRotation } from '@/homeButtonRotation';
import CategoryPanelComp from '@/components/CategoryPanel';
import ExpansionOverlay from '@/components/ExpansionOverlay';
import FullscreenViewer from '@/components/FullscreenViewer';
import BackgroundSwell from '@/components/BackgroundSwell';
import EdgePanel from '@/components/EdgePanel';
import BranchWorld from '@/components/BranchWorld';

// Scroll order: [blank edge] [left panels, farthest first] [landing] [right panels] [logo edge].
// `order` counts category panels only, so each home button keeps its own tilt.
type Slot =
  | { type: 'edge'; side: 'left' | 'right' }
  | { type: 'landing' }
  | { type: 'category'; panel: CategoryPanel; isLeft: boolean; order: number };

function buildSlots(): Slot[] {
  const slots: Slot[] = [{ type: 'edge', side: 'left' }];
  let order = 0;
  [...collection.leftPanels].reverse().forEach((panel) => {
    slots.push({ type: 'category', panel, isLeft: true, order: order++ });
  });
  slots.push({ type: 'landing' });
  collection.rightPanels.forEach((panel) => {
    slots.push({ type: 'category', panel, isLeft: false, order: order++ });
  });
  slots.push({ type: 'edge', side: 'right' });
  return slots;
}

const SLOTS = buildSlots();

// Deep link into a branch scene: /#daycare opens the Town on the Daycare panel (the standalone pages'
// "Back to Town" link uses this). The hash is read once, here, before the effect below clears it.
function findDeepLink(): { sceneId: string; panelId: string } | null {
  let hashId = '';
  try {
    hashId = decodeURIComponent(window.location.hash.slice(1));
  } catch {
    return null;
  }
  if (!hashId) return null;
  for (const scene of collection.branches) {
    if (scene.panels.some((p) => p.id === hashId)) return { sceneId: scene.id, panelId: hashId };
  }
  return null;
}
const DEEP_LINK = findDeepLink();

// Branch scene sequence (a panel button with `branch` slides "down" into a scene, and back):
//   enter:  fade-in (panels fade out and freeze, the green overlay fades in)
//        -> slide-down (overlay slides up one screen) -> landed (card and home button fade in)
//   leave:  card-out -> slide-up -> fade-out (overlay fades away, panels fade back in) -> closed
// Times are in ms and match the CSS transitions in index.css (.branch-world, .branch-screen).
type BranchPhase = 'closed' | 'fade-in' | 'slide-down' | 'landed' | 'card-out' | 'slide-up' | 'fade-out';
const BRANCH_FADE_MS = 800;
const BRANCH_SLIDE_MS = 1700;
const BRANCH_CARD_MS = 500;
const LANDING_INDEX = SLOTS.findIndex((s) => s.type === 'landing');

function App() {
  const trackRef = useRef<HTMLDivElement>(null);
  // The site opens on the landing panel.
  const [currentIndex, setCurrentIndex] = useState(LANDING_INDEX);
  const currentIndexRef = useRef(LANDING_INDEX);
  const [progress, setProgress] = useState(0);
  const [expandedPanel, setExpandedPanel] = useState<CategoryPanel | null>(null);
  const [fullscreen, setFullscreen] = useState<{
    slot: number;
    kind: ImageKind;
    filename: string;
    alt: string;
  } | null>(null);

  // ---- Branch scene state machine ----
  const [branchPhase, setBranchPhase] = useState<BranchPhase>(DEEP_LINK ? 'landed' : 'closed');
  const [branchId, setBranchId] = useState<string | null>(DEEP_LINK?.sceneId ?? null);
  const [townStartId, setTownStartId] = useState<string | null>(DEEP_LINK?.panelId ?? null);
  const branchPhaseRef = useRef<BranchPhase>(DEEP_LINK ? 'landed' : 'closed');
  const branchTimers = useRef<number[]>([]);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const goPhase = useCallback((phase: BranchPhase) => {
    branchPhaseRef.current = phase;
    setBranchPhase(phase);
  }, []);

  const later = useCallback((ms: number, fn: () => void) => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    branchTimers.current.push(window.setTimeout(fn, reduce ? ms * 0.05 : ms));
  }, []);

  const openBranch = useCallback(
    (id: string) => {
      if (branchPhaseRef.current !== 'closed') return;
      returnFocusRef.current = document.activeElement as HTMLElement | null;
      setBranchId(id);
      setTownStartId(null); // always land on the first panel
      goPhase('fade-in');
      later(BRANCH_FADE_MS, () => goPhase('slide-down'));
      later(BRANCH_FADE_MS + BRANCH_SLIDE_MS, () => goPhase('landed'));
    },
    [goPhase, later]
  );

  const closeBranch = useCallback(() => {
    if (branchPhaseRef.current !== 'landed') return;
    goPhase('card-out');
    later(BRANCH_CARD_MS, () => goPhase('slide-up'));
    later(BRANCH_CARD_MS + BRANCH_SLIDE_MS, () => goPhase('fade-out'));
    later(BRANCH_CARD_MS + BRANCH_SLIDE_MS + BRANCH_FADE_MS + 100, () => {
      goPhase('closed');
      setBranchId(null);
      setTownStartId(null);
      returnFocusRef.current?.focus({ preventScroll: true });
    });
  }, [goPhase, later]);

  useEffect(() => {
    const timers = branchTimers.current;
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, []);

  const branchActive = branchPhase !== 'closed' && branchPhase !== 'fade-out';
  const branchSlid = branchPhase === 'slide-down' || branchPhase === 'landed' || branchPhase === 'card-out';
  const branchScene = collection.branches.find((b) => b.id === branchId) ?? null;

  // Scroll to a specific panel index
  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(SLOTS.length - 1, index));
    const panels = track.querySelectorAll(':scope > .surf-panel');
    const target = panels[clamped] as HTMLElement;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  }, []);

  // Keep the app exactly as tall as the visible area. After leaving the page and coming back,
  // Android Chrome can keep a stale (taller) dvh for a moment, which clipped the bottom marquee.
  useEffect(() => {
    const root = document.documentElement;
    let timers: number[] = [];
    const measure = () => {
      const h = window.visualViewport?.height ?? window.innerHeight;
      root.style.setProperty('--app-h', `${Math.round(h)}px`);
    };
    // The browser can report the new size a beat late on resume, so measure a few times.
    const remeasure = () => {
      measure();
      timers.forEach((t) => window.clearTimeout(t));
      timers = [100, 300, 800].map((ms) => window.setTimeout(measure, ms));
    };
    const onVisible = () => {
      if (document.visibilityState === 'visible') remeasure();
    };
    measure();
    window.addEventListener('resize', measure);
    window.addEventListener('orientationchange', remeasure);
    window.addEventListener('pageshow', remeasure);
    window.addEventListener('focus', remeasure);
    document.addEventListener('visibilitychange', onVisible);
    window.visualViewport?.addEventListener('resize', measure);
    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      window.removeEventListener('resize', measure);
      window.removeEventListener('orientationchange', remeasure);
      window.removeEventListener('pageshow', remeasure);
      window.removeEventListener('focus', remeasure);
      document.removeEventListener('visibilitychange', onVisible);
      window.visualViewport?.removeEventListener('resize', measure);
    };
  }, []);

  // Open on the landing panel, or on the panel named in the URL hash (e.g. /#summer-postcards,
  // used by the section pages' "Back to the boards" links). Instant: overrides smooth scrolling.
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const ids = SLOTS.map((slot) => (slot.type === 'category' ? slot.panel.id : ''));
    let hashId = '';
    try {
      hashId = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      /* malformed hash: ignore */
    }
    const hashIndex = hashId ? ids.indexOf(hashId) : -1;
    const originId = DEEP_LINK ? collection.branches.find((b) => b.id === DEEP_LINK.sceneId)?.origin : undefined;
    const originIndex = originId ? ids.indexOf(originId) : -1;
    const startIndex = hashIndex >= 0 ? hashIndex : originIndex >= 0 ? originIndex : LANDING_INDEX;
    const start = track.querySelectorAll(':scope > .surf-panel')[startIndex] as HTMLElement | undefined;
    if (start) track.scrollTo({ left: start.offsetLeft, behavior: 'instant' });
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  // Mouse wheel / vertical trackpad swipe steps one panel (native horizontal gestures untouched)
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let lockUntil = 0;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX) || Math.abs(e.deltaY) < 4) return;
      const now = performance.now();
      if (now < lockUntil) return;
      lockUntil = now + 600;
      scrollToIndex(currentIndexRef.current + (e.deltaY > 0 ? 1 : -1));
    };
    track.addEventListener('wheel', onWheel, { passive: true });
    return () => track.removeEventListener('wheel', onWheel);
  }, [scrollToIndex]);

  // Track scroll position
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollLeft = track.scrollLeft;
        const panelWidth = track.clientWidth;
        const idx = Math.round(scrollLeft / panelWidth);
        const maxScroll = track.scrollWidth - track.clientWidth;
        const pct = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
        currentIndexRef.current = idx;
        setCurrentIndex(idx);
        setProgress(pct);
        ticking = false;
      });
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // sync progress/index with the initial landing scroll
    return () => track.removeEventListener('scroll', onScroll);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (expandedPanel || fullscreen || branchPhaseRef.current !== 'closed') return;
      if (e.key === 'ArrowLeft') {
        scrollToIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        scrollToIndex(currentIndex + 1);
      } else if (e.key === 'Home') {
        scrollToIndex(LANDING_INDEX);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex, scrollToIndex, expandedPanel, fullscreen]);

  // Escape closes the topmost layer only: viewer first, then the section overlay
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (fullscreen) setFullscreen(null);
      else if (expandedPanel) setExpandedPanel(null);
      else if (branchPhaseRef.current === 'landed') closeBranch();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreen, expandedPanel, closeBranch]);

  // Prevent context menu (long-press on mobile)
  useEffect(() => {
    const onContext = (e: Event) => e.preventDefault();
    document.addEventListener('contextmenu', onContext);
    return () => document.removeEventListener('contextmenu', onContext);
  }, []);

  const goLanding = () => scrollToIndex(LANDING_INDEX);

  const handleEnlarge = useCallback((slot: number, kind: ImageKind, filename: string, alt: string) => {
    setFullscreen({ slot, kind, filename, alt });
  }, []);

  return (
    <div className={`app-viewport${branchActive ? ' branching' : ''}`}>
      {/* Water-drop outline used to cut the wave cards (see .glass-card-oval in index.css) */}
      <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="board-clip" clipPathUnits="objectBoundingBox">
            <path transform="scale(0.01 0.005263158)" d="M50 0 C72 40 100 90 100 140 A50 50 0 0 1 0 140 C0 90 28 40 50 0 Z" />
          </clipPath>
        </defs>
      </svg>

      <WaveBackground trackRef={trackRef} />

      {/* Horizontal scroll track */}
      <div ref={trackRef} className="surf-track">
        <BackgroundSwell panelCount={SLOTS.length} />
        {SLOTS.map((slot) => {
          if (slot.type === 'edge') {
            return <EdgePanel key={`edge-${slot.side}`} side={slot.side} />;
          }

          if (slot.type === 'landing') {
            return (
              <LandingPanel
                key="landing"
                data={collection}
                onGoLeft={() => scrollToIndex(LANDING_INDEX - 1)}
                onGoRight={() => scrollToIndex(LANDING_INDEX + 1)}
              />
            );
          }

          const { panel, isLeft, order } = slot;
          return (
            <CategoryPanelComp
              key={panel.id}
              panel={panel}
              isLeft={isLeft}
              homeRotation={homeButtonRotation(order)}
              homeBob={order % 2 === 0 ? 'animate-float-soft' : 'animate-float-gentle'}
              onExpand={() => setExpandedPanel(panel)}
              onReturn={goLanding}
              onBranch={openBranch}
            />
          );
        })}
      </div>

      {/* Branch scene: slides up over the main scroll (see BranchWorld.tsx) */}
      <BranchWorld
        scene={branchScene}
        startPanelId={townStartId}
        active={branchActive}
        slid={branchSlid}
        landed={branchPhase === 'landed'}
        onExit={closeBranch}
      />

      {/* Progress wave bar */}
      {!expandedPanel && !fullscreen && branchPhase === 'closed' && (
        <div className="progress-wave" style={{ width: `${progress}%` }} />
      )}

      {/* Expansion overlay */}
      {expandedPanel && (
        <ExpansionOverlay
          panel={expandedPanel}
          onClose={() => setExpandedPanel(null)}
          onEnlarge={handleEnlarge}
        />
      )}

      {/* Fullscreen image viewer */}
      {fullscreen && (
        <FullscreenViewer
          slot={fullscreen.slot}
          kind={fullscreen.kind}
          filename={fullscreen.filename}
          alt={fullscreen.alt}
          onClose={() => setFullscreen(null)}
        />
      )}

    </div>
  );
}

export default App;
