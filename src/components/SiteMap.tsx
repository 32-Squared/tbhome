import { useEffect, useLayoutEffect, useRef } from 'react';
import { UI_IMAGES } from '@/assets';
import ImageSlot from './ImageSlot';

interface SiteMapProps {
  /** Where the tapped icon is on screen: the map opens from there and closes back into it */
  origin: DOMRect | null;
  /** Called after the closing animation has finished */
  onClosed: () => void;
}

const OPEN_MS = 480;
const CLOSE_MS = 380;

// The site map: a 2:1 picture across the full screen width, floating over a dimmed screen. Static
// (no interaction or animation of its own); tapping anywhere, or Escape, closes it.
// Opening and closing animate the picture between the tapped icon and its full size: it grows out
// of the icon's spot (the icon's centre and width) while fading in, and shrinks back into it. Only
// transform and opacity are animated, so it stays smooth on phones.
function SiteMap({ origin, onClosed }: SiteMapProps) {
  const hitRef = useRef<HTMLButtonElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLSpanElement>(null);
  const closingRef = useRef(false);
  const fromRef = useRef('translate(0px, 0px) scale(0.5)');
  const reduce = useRef(window.matchMedia('(prefers-reduced-motion: reduce)').matches);

  // Open: measure the picture at its final size, then grow it out of the icon
  useLayoutEffect(() => {
    const frame = frameRef.current;
    const dim = dimRef.current;
    if (!frame || !dim) return;
    const r = frame.getBoundingClientRect();
    if (origin && r.width > 0) {
      const scale = origin.width / r.width;
      const dx = origin.left + origin.width / 2 - (r.left + r.width / 2);
      const dy = origin.top + origin.height / 2 - (r.top + r.height / 2);
      fromRef.current = `translate(${dx}px, ${dy}px) scale(${scale})`;
    }
    const duration = reduce.current ? 1 : OPEN_MS;
    frame.animate(
      [
        { transform: fromRef.current, opacity: 0 },
        { opacity: 1, offset: 0.35 },
        { transform: 'translate(0px, 0px) scale(1)', opacity: 1 },
      ],
      { duration, easing: 'cubic-bezier(0.2, 0.8, 0.25, 1)', fill: 'both' }
    );
    dim.animate([{ opacity: 0 }, { opacity: 1 }], { duration, easing: 'ease-out', fill: 'both' });
    hitRef.current?.focus({ preventScroll: true });
  }, [origin]);

  const close = () => {
    const frame = frameRef.current;
    const dim = dimRef.current;
    if (closingRef.current || !frame || !dim) return;
    closingRef.current = true;
    const duration = reduce.current ? 1 : CLOSE_MS;
    const shrink = frame.animate(
      [
        { transform: 'translate(0px, 0px) scale(1)', opacity: 1 },
        { opacity: 1, offset: 0.6 },
        { transform: fromRef.current, opacity: 0 },
      ],
      { duration, easing: 'cubic-bezier(0.4, 0, 0.6, 1)', fill: 'both' }
    );
    dim.animate([{ opacity: 1 }, { opacity: 0 }], { duration, easing: 'ease-in', fill: 'both' });
    shrink.onfinish = onClosed;
  };

  // Escape closes it
  const closeRef = useRef(close);
  closeRef.current = close;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeRef.current();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="sitemap" role="dialog" aria-modal="true" aria-label="Site map">
      <div ref={dimRef} className="sitemap-dim" />
      <button ref={hitRef} type="button" className="sitemap-hit" aria-label="Close the site map" onClick={close} />
      <span ref={frameRef} className="sitemap-frame">
        <ImageSlot
          slot={UI_IMAGES.siteMap.slot}
          kind="board"
          filename={UI_IMAGES.siteMap.filename}
          alt="Map of the whole site"
          className="w-full h-full object-contain"
          eager
        />
      </span>
    </div>
  );
}

export default SiteMap;
