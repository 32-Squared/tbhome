import { useEffect } from 'react';
import type { RefObject } from 'react';

// Every few seconds (random, never less than MIN_MS apart) adds `is-blinking` to the element for
// one quick blink, then removes it when the CSS animation ends. Skipped for people who prefer
// reduced motion and while the tab is hidden.
const MIN_MS = 3000;
const MAX_MS = 8000;

export function useRandomBlink(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = 0;
    const schedule = () => {
      timer = window.setTimeout(() => {
        if (!document.hidden) {
          el.classList.remove('is-blinking');
          void el.offsetWidth; // force a reflow so the animation restarts
          el.classList.add('is-blinking');
        }
        schedule();
      }, MIN_MS + Math.random() * (MAX_MS - MIN_MS));
    };
    const onEnd = () => el.classList.remove('is-blinking');

    schedule();
    el.addEventListener('animationend', onEnd);
    return () => {
      window.clearTimeout(timer);
      el.removeEventListener('animationend', onEnd);
    };
  }, [ref]);
}
