import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

// Is the panel (the nearest .surf-panel above `ref`) mostly on screen?
//   entered: it has been mostly on screen at least once (a good moment to start downloading files)
//   inView:  it is mostly on screen right now
function usePanelPresence(ref: RefObject<HTMLElement>, enabled: boolean) {
  const [entered, setEntered] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const section = ref.current?.closest('.surf-panel');
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
  }, [ref, enabled]);

  return { entered, inView };
}

interface DwellRevealOptions {
  /** The picture has finished loading (or failed), so it is OK to reveal */
  mediaReady: boolean;
  /** How long the visitor must stay on the panel before the picture appears (default 5s) */
  dwellMs?: number;
  /** Once the picture has appeared it stays for the rest of the session */
  once?: boolean;
  /** Pass false to skip all the watching for panels that have no picture */
  enabled?: boolean;
}

// Timing for a "picture appears after a pause" element.
//   entered: the panel has been reached (start downloading the file now)
//   shown:   fade the picture in (true) or out (false)
// The pause counts from the moment the panel is mostly on screen and starts over if the visitor
// leaves before it is up. Leaving also hides the picture again unless `once` is set.
export function useDwellReveal(
  ref: RefObject<HTMLElement>,
  { mediaReady, dwellMs = 5000, once = false, enabled = true }: DwellRevealOptions
) {
  const { entered, inView } = usePanelPresence(ref, enabled);
  const [dwelled, setDwelled] = useState(false);
  const [latched, setLatched] = useState(false);

  useEffect(() => {
    if (!inView) {
      setDwelled(false);
      return;
    }
    const t = window.setTimeout(() => setDwelled(true), dwellMs);
    return () => window.clearTimeout(t);
  }, [inView, dwellMs]);

  const visible = inView && dwelled && mediaReady;

  // Keep it once it has appeared
  useEffect(() => {
    if (once && visible) setLatched(true);
  }, [once, visible]);

  return { entered, shown: visible || latched };
}

// A timeline that starts when the panel is reached. `passed` is how many of the marks (ms after
// arrival) have gone by. It runs once per visit and does not loop; leaving the panel resets it.
export function useVisitTimeline(ref: RefObject<HTMLElement>, marksMs: readonly number[]) {
  const { entered, inView } = usePanelPresence(ref, true);
  const [passed, setPassed] = useState(0);

  useEffect(() => {
    if (!inView) {
      setPassed(0);
      return;
    }
    const timers = marksMs.map((ms, i) => window.setTimeout(() => setPassed(i + 1), ms));
    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [inView, marksMs]);

  return { entered, passed };
}
