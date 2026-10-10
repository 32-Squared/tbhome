import { useEffect, useRef } from 'react';
import type { CSSProperties, RefObject } from 'react';

// The Town's version of the waves: faint puffy clouds drifting left to right along the top of the
// scroll, built the same way as WaveBackground (repeating SVG tiles that loop seamlessly on the
// compositor, plus a small scroll offset per layer so they shift a little as you swipe between
// panels). Farthest = smallest, faintest, slowest.
const SCROLL_OFFSET: number = 1; // multiplies the per-layer scroll shifts below; 0 turns it off

const TILE_W = 1200;
const TILE_H = 240;

// [x, y, scale] of each cloud in a tile. Keep clouds away from the tile's left/right edges so the
// loop has no seam.
type Cloud = [number, number, number];

function puff(cx: number, cy: number, s: number): string {
  const c = (x: number, y: number, r: number) =>
    `<circle cx='${(cx + x * s).toFixed(1)}' cy='${(cy + y * s).toFixed(1)}' r='${(r * s).toFixed(1)}'/>`;
  // a flat-bottomed puff: a base ellipse with overlapping circles on top
  return (
    `<ellipse cx='${cx}' cy='${(cy + 14 * s).toFixed(1)}' rx='${(74 * s).toFixed(1)}' ry='${(16 * s).toFixed(1)}'/>` +
    c(-42, 2, 24) +
    c(-12, -14, 32) +
    c(24, -6, 28) +
    c(52, 6, 20)
  );
}

function tile(clouds: Cloud[]): string {
  const body = clouds.map(([x, y, s]) => puff(x, y, s)).join('');
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${TILE_W} ${TILE_H}'><g fill='#ffffff'>${body}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

const LAYERS = [
  // far
  {
    url: tile([[90, 70, 0.6], [330, 40, 0.55], [560, 100, 0.6], [800, 55, 0.5], [1040, 90, 0.6]]),
    opacity: 0.18,
    duration: 110,
    offset: 0.02,
  },
  // middle
  {
    url: tile([[150, 110, 0.9], [450, 60, 0.85], [760, 120, 0.9], [1050, 80, 0.8]]),
    opacity: 0.24,
    duration: 75,
    offset: 0.04,
  },
  // near
  {
    url: tile([[260, 90, 1.3], [700, 130, 1.2], [1010, 70, 1.3]]),
    opacity: 0.3,
    duration: 50,
    offset: 0.07,
  },
];

function CloudBackground({ trackRef }: { trackRef: RefObject<HTMLDivElement> }) {
  const rootRef = useRef<HTMLDivElement>(null);

  // Scroll position -> CSS variable on this element only (the shift itself is a compositor transform)
  useEffect(() => {
    const track = trackRef.current;
    const root = rootRef.current;
    if (!track || !root || SCROLL_OFFSET === 0) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      root.style.setProperty('--scroll-x', String(track.scrollLeft));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => {
      track.removeEventListener('scroll', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [trackRef]);

  return (
    <div ref={rootRef} className="cloud-bg" aria-hidden="true">
      {LAYERS.map((layer, i) => (
        <div key={i} className="cloud-shift" style={{ '--cloud-offset': layer.offset * SCROLL_OFFSET } as CSSProperties}>
          <div
            className="cloud-layer"
            style={
              {
                backgroundImage: layer.url,
                opacity: layer.opacity,
                '--cloud-duration': `${layer.duration}s`,
              } as CSSProperties
            }
          />
        </div>
      ))}
    </div>
  );
}

export default CloudBackground;
