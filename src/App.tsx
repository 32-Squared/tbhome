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

function App() {
  const trackRef = useRef<HTMLDivElement>(null);
  // Panel layout: [left panels reversed] [landing] [right panels]; the site opens on landing.
  const [currentIndex, setCurrentIndex] = useState(collection.leftPanels.length);
  const currentIndexRef = useRef(collection.leftPanels.length);
  const [progress, setProgress] = useState(0);
  const [expandedPanel, setExpandedPanel] = useState<CategoryPanel | null>(null);
  const [fullscreen, setFullscreen] = useState<{
    slot: number;
    kind: ImageKind;
    filename: string;
    alt: string;
  } | null>(null);

  // Build the panel order: left panels (reversed so first left is right after landing going left),
  // landing, right panels.
  // Index layout: [leftN-1 ... left0] [landing] [right0 ... rightN-1]
  const leftReversed = [...collection.leftPanels].reverse();
  const allPanels = [...leftReversed, null, ...collection.rightPanels];
  const landingIndex = leftReversed.length;

  // Scroll to a specific panel index
  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(allPanels.length - 1, index));
    const panels = track.querySelectorAll(':scope > .surf-panel');
    const target = panels[clamped] as HTMLElement;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
  }, [allPanels.length]);

  // Open on the landing panel (instant: overrides the track's CSS smooth scrolling)
  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const landing = track.querySelectorAll(':scope > .surf-panel')[landingIndex] as HTMLElement | undefined;
    if (landing) track.scrollTo({ left: landing.offsetLeft, behavior: 'instant' });
  }, [landingIndex]);

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
      if (expandedPanel || fullscreen) return;
      if (e.key === 'ArrowLeft') {
        scrollToIndex(currentIndex - 1);
      } else if (e.key === 'ArrowRight') {
        scrollToIndex(currentIndex + 1);
      } else if (e.key === 'Home') {
        scrollToIndex(landingIndex);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [currentIndex, scrollToIndex, expandedPanel, fullscreen, landingIndex]);

  // Escape closes the topmost layer only: viewer first, then the section overlay
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      if (fullscreen) setFullscreen(null);
      else if (expandedPanel) setExpandedPanel(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [fullscreen, expandedPanel]);

  // Prevent context menu (long-press on mobile)
  useEffect(() => {
    const onContext = (e: Event) => e.preventDefault();
    document.addEventListener('contextmenu', onContext);
    return () => document.removeEventListener('contextmenu', onContext);
  }, []);

  const goLanding = () => scrollToIndex(landingIndex);

  const handleEnlarge = useCallback((slot: number, kind: ImageKind, filename: string, alt: string) => {
    setFullscreen({ slot, kind, filename, alt });
  }, []);

  return (
    <div className="app-viewport">
      <WaveBackground trackRef={trackRef} />

      {/* Horizontal scroll track */}
      <div ref={trackRef} className="surf-track">
        <BackgroundSwell panelCount={allPanels.length} />
        {allPanels.map((panel, i) => {
          if (panel === null) {
            return (
              <LandingPanel
                key="landing"
                data={collection}
                onGoLeft={() => scrollToIndex(landingIndex - 1)}
                onGoRight={() => scrollToIndex(landingIndex + 1)}
              />
            );
          }

          const isLeft = i < landingIndex;
          // position among category panels in scroll order (landing excluded)
          const order = isLeft ? i : i - 1;

          return (
            <CategoryPanelComp
              key={panel.id}
              panel={panel}
              isLeft={isLeft}
              homeRotation={homeButtonRotation(order)}
              homeBob={order % 2 === 0 ? 'animate-float-soft' : 'animate-float-gentle'}
              onExpand={() => setExpandedPanel(panel)}
              onReturn={goLanding}
            />
          );
        })}
      </div>

      {/* Progress wave bar */}
      {!expandedPanel && !fullscreen && (
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
