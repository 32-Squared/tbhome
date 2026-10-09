import { useEffect, useRef } from 'react';
import type { PhospheneConfig, PhospheneMotion } from '@/types';
import { assetUrl } from '@/assets';

// "Phosphenes": a very sparse little image that fades in somewhere on the panel, floats, and
// fades out. Only while the panel is on screen, at most MAX_AT_ONCE at a time, never when the tab
// is hidden or the visitor prefers reduced motion. Each one gets a random size, position,
// rotation and path, shaped by the image's motion type.

const MAX_AT_ONCE = 2;
const FIRST_DELAY_MS: [number, number] = [2500, 5000]; // after arriving on the panel
const GAP_MS: [number, number] = [5000, 12000]; // between appearances
const SIZE_PX: [number, number] = [28, 60]; // on-screen size (the files are 3x that or more)

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const sign = () => (Math.random() < 0.5 ? -1 : 1);

interface Flight {
  durationMs: number;
  /** Evenly spaced transform frames, relative to the start position */
  frames: { x: number; y: number; rot: number }[];
  /** Where it starts, as a fraction of the panel */
  start: { x: number; y: number };
  /** Opacity ramp: fraction of the flight spent fading in / out */
  fadeIn: number;
  fadeOut: number;
  peak: number;
}

function steps(n: number, fn: (t: number, i: number) => { x: number; y: number; rot: number }) {
  return Array.from({ length: n }, (_, i) => fn(i / (n - 1), i));
}

function planFlight(motion: PhospheneMotion): Flight {
  const dir = sign();
  const phase = rand(0, Math.PI * 2);
  const rot0 = rand(-40, 40);

  switch (motion) {
    case 'bubble': {
      // Rises with a lively wobble
      const rise = rand(140, 240);
      const amp = rand(8, 16);
      return {
        durationMs: rand(7000, 10000),
        frames: steps(8, (t) => ({
          x: amp * Math.sin(phase + t * Math.PI * 3),
          y: -rise * t,
          rot: rot0 + 8 * Math.sin(phase + t * Math.PI * 2),
        })),
        start: { x: rand(0.08, 0.92), y: rand(0.5, 0.9) },
        fadeIn: 0.22,
        fadeOut: 0.32,
        peak: rand(0.5, 0.85),
      };
    }
    case 'balloon': {
      // Rises slowly, swaying and tilting
      const rise = rand(120, 200);
      const amp = rand(10, 20);
      return {
        durationMs: rand(9000, 12000),
        frames: steps(7, (t) => ({
          x: amp * Math.sin(phase + t * Math.PI * 1.5),
          y: -rise * t,
          rot: 12 * Math.sin(phase + t * Math.PI * 1.5),
        })),
        start: { x: rand(0.08, 0.92), y: rand(0.5, 0.9) },
        fadeIn: 0.22,
        fadeOut: 0.32,
        peak: rand(0.5, 0.85),
      };
    }
    case 'fluff': {
      // Drifts sideways on the breeze, swaying and slowly turning
      const run = rand(160, 280) * dir;
      const amp = rand(10, 22);
      const lift = rand(-30, 30);
      const spin = rand(60, 160) * dir;
      return {
        durationMs: rand(9000, 13000),
        frames: steps(8, (t) => ({
          x: run * t,
          y: amp * Math.sin(phase + t * Math.PI * 2.4) + lift * t,
          rot: rot0 + spin * t,
        })),
        start: { x: dir > 0 ? rand(0, 0.35) : rand(0.65, 1), y: rand(0.15, 0.85) },
        fadeIn: 0.22,
        fadeOut: 0.32,
        peak: rand(0.5, 0.85),
      };
    }
    case 'fly': {
      // Quick, jittery hops with a little pause between each
      let x = 0;
      let y = 0;
      let heading = rot0;
      const frames = steps(9, (_, i) => {
        if (i > 0) {
          const dx = rand(-36, 36);
          const dy = rand(-36, 36);
          x += dx;
          y += dy;
          heading = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
        }
        return { x, y, rot: heading };
      });
      return {
        durationMs: rand(5000, 7000),
        frames,
        start: { x: rand(0.1, 0.9), y: rand(0.15, 0.85) },
        fadeIn: 0.1,
        fadeOut: 0.15,
        peak: rand(0.6, 0.85),
      };
    }
    case 'spin':
    default: {
      // Hardly moves: a slow fade, a lazy turn and a gentle lift
      const turn = rand(90, 200) * dir;
      const lift = rand(20, 50);
      return {
        durationMs: rand(9000, 13000),
        frames: steps(5, (t) => ({ x: 8 * Math.sin(phase + t * Math.PI), y: -lift * t, rot: rot0 + turn * t })),
        start: { x: rand(0.1, 0.9), y: rand(0.15, 0.85) },
        fadeIn: 0.28,
        fadeOut: 0.35,
        peak: rand(0.45, 0.8),
      };
    }
  }
}

function Phosphenes({ config }: { config: PhospheneConfig }) {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const layer = layerRef.current;
    const section = layer?.closest('.surf-panel');
    if (!layer || !section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const url = assetUrl(config.filename);
    const live = new Set<HTMLImageElement>();
    let timer = 0;
    let active = false;
    let loaded = false;
    let probeStarted = false;

    const spawn = () => {
      const { width, height } = layer.getBoundingClientRect();
      if (!loaded || width === 0 || live.size >= MAX_AT_ONCE) return;

      const flight = planFlight(config.motion);
      const size = rand(SIZE_PX[0], SIZE_PX[1]);
      const img = document.createElement('img');
      img.src = url;
      img.alt = '';
      img.draggable = false;
      img.className = 'phosphene';
      img.style.width = `${size}px`;
      img.style.height = `${size}px`;
      img.style.left = `${flight.start.x * width - size / 2}px`;
      img.style.top = `${flight.start.y * height - size / 2}px`;
      layer.appendChild(img);
      live.add(img);

      const last = flight.frames.length - 1;
      const move = img.animate(
        flight.frames.map((f, i) => ({
          transform: `translate(${f.x}px, ${f.y}px) rotate(${f.rot}deg)`,
          offset: i / last,
          easing: 'ease-in-out',
        })),
        { duration: flight.durationMs, fill: 'both' }
      );
      img.animate(
        [
          { opacity: 0, offset: 0, easing: 'ease-in-out' },
          { opacity: flight.peak, offset: flight.fadeIn },
          { opacity: flight.peak, offset: 1 - flight.fadeOut, easing: 'ease-in-out' },
          { opacity: 0, offset: 1 },
        ],
        { duration: flight.durationMs, fill: 'both' }
      );
      move.onfinish = () => {
        img.remove();
        live.delete(img);
      };
    };

    const schedule = (first: boolean) => {
      const [min, max] = first ? FIRST_DELAY_MS : GAP_MS;
      timer = window.setTimeout(() => {
        if (active && !document.hidden) spawn();
        schedule(false);
      }, rand(min, max));
    };

    const start = () => {
      if (active) return;
      active = true;
      if (!probeStarted) {
        // Make sure the picture is downloaded before the first one appears
        probeStarted = true;
        const probe = new Image();
        probe.onload = () => {
          loaded = true;
        };
        probe.src = url;
      }
      schedule(true);
    };

    const stop = () => {
      active = false;
      window.clearTimeout(timer);
      live.forEach((el) => el.remove());
      live.clear();
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) start();
          else if (!entry.isIntersecting) stop();
        });
      },
      { root: section.parentElement, threshold: [0, 0.5, 1] }
    );
    observer.observe(section);

    return () => {
      observer.disconnect();
      stop();
    };
  }, [config.filename, config.motion]);

  return <div ref={layerRef} className="phosphene-layer" aria-hidden="true" />;
}

export default Phosphenes;
