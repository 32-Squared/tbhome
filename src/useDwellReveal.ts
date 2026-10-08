import { useEffect, useState } from 'react';
import type { RefObject } from 'react';

interface DwellRevealOptions {
  /** The picture has finished loading (or failed), so it is OK to reveal */
  mediaReady: boolean;
  /** How long the visitor must stay on the panel before the picture appears (default 5s) */
  dwellMs?: number;
  /** If set, the picture fades out again this long after it appears, and stays gone until the
   *  visitor leaves the panel and returns */
  holdMs?: number;
  /** Once the picture has appeared it stays for the rest of the session */
  once?: boolean;
  /** Pass false to skip all the watching for panels that have no picture */
  enabled?: boolean;
}

// Timing shared by every "picture appears after a pause" element.
//   entered: the panel has been mostly on screen at least once (start downloading the file now)
//   shown:   fade the picture in (true) or out (false)
// The pause is counted from the moment the panel is mostly on screen and starts over if the
// visitor leaves before it is up.
export function useDwellReveal(
  ref: RefObject<HTMLElement>,
  { mediaReady, dwellMs = 5000, holdMs, once = false, enabled = true }: DwellRevealOptions
) {
  const [entered, setEntered] = useState(false);
  const [inView, setInView] = useState(false);
  const [dwelled, setDwelled] = useState(false);
  const [expired, setExpired] = useState(false);
  const [latched, setLatched] = useState(false);

  // Watch the panel against the horizontal track
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

  // Pause timer: starts on arrival; leaving resets it for the next visit
  useEffect(() => {
    if (!inView) {
      setDwelled(false);
      setExpired(false);
      return;
    }
    const t = window.setTimeout(() => setDwelled(true), dwellMs);
    return () => window.clearTimeout(t);
  }, [inView, dwellMs]);

  const visible = inView && dwelled && mediaReady;

  // Hold timer (fade-out)
  useEffect(() => {
    if (!visible || holdMs === undefined) return;
    const t = window.setTimeout(() => setExpired(true), holdMs);
    return () => window.clearTimeout(t);
  }, [visible, holdMs]);

  // Keep it once it has appeared
  useEffect(() => {
    if (once && visible) setLatched(true);
  }, [once, visible]);

  return { entered, shown: (visible && !expired) || latched };
}
