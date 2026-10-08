import { useEffect } from 'react';
import type { RefObject } from 'react';

// Every 5-15 seconds (random) adds `is-flapping` to the element for one flap, then removes it
// when the CSS animation ends. The flap direction is randomised per flap through --flap-dir.
// Skipped for people who prefer reduced motion and while the tab is hidden.
const MIN_MS = 5000;
const MAX_MS = 15000;

export function usePaperFlap(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(() => {
        if (!document.hidden) {
          el.style.setProperty('--flap-dir', Math.random() < 0.5 ? '1' : '-1');
          el.classList.remove('is-flapping');
          void el.offsetWidth; // force a reflow so the animation restarts
          el.classList.add('is-flapping');
        }
        schedule();
      }, MIN_MS + Math.random() * (MAX_MS - MIN_MS));
    };
    const onEnd = () => el.classList.remove('is-flapping');

    schedule();
    el.addEventListener('animationend', onEnd);
    return () => {
      window.clearTimeout(timer);
      el.removeEventListener('animationend', onEnd);
    };
  }, [ref]);
}
