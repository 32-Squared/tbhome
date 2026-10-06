// A single flowing swell that runs behind every panel (rendered inside the scrolling track,
// under all UI). Five contour lines share one wave shape; each trails the one above it and
// settles slightly, which reads as a ribbon of water. A soft gradient fill gives the top line volume.
//
// Geometry is in "units": 1000 units = one panel width (100vw). Strokes use
// vector-effect: non-scaling-stroke so line weight stays constant however the SVG is stretched.
interface BackgroundSwellProps {
  panelCount: number;
}

const UNITS_PER_PANEL = 1000;
const BOX_HEIGHT = 400;
const STEP = 40; // sample spacing in units (smoothed with quadratic curves)

// Tweak the look here.
const LINES = [
  { opacity: 0.5, width: 2.2 },
  { opacity: 0.36, width: 1.7 },
  { opacity: 0.26, width: 1.4 },
  { opacity: 0.18, width: 1.2 },
  { opacity: 0.12, width: 1 },
];
const LINE_GAP = 34; // vertical spacing between lines
const LINE_LAG = 55; // how far each line trails the previous, horizontally
const SWELL = { base: 150, long: 58, short: 20, longLength: 1500, shortLength: 620 };

function swellY(x: number, k: number): number {
  const xs = x - k * LINE_LAG;
  const settle = 1 - k * 0.1;
  const wave =
    SWELL.long * Math.sin((2 * Math.PI * xs) / SWELL.longLength + 0.6) +
    SWELL.short * Math.sin((2 * Math.PI * xs) / SWELL.shortLength + 2.1);
  return SWELL.base + k * LINE_GAP + settle * wave;
}

function smoothPath(points: [number, number][]): string {
  let d = `M ${points[0][0]},${points[0][1].toFixed(1)}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x, y] = points[i];
    const [nx, ny] = points[i + 1];
    d += ` Q ${x},${y.toFixed(1)} ${((x + nx) / 2).toFixed(1)},${((y + ny) / 2).toFixed(1)}`;
  }
  const last = points[points.length - 1];
  return `${d} L ${last[0]},${last[1].toFixed(1)}`;
}

function BackgroundSwell({ panelCount }: BackgroundSwellProps) {
  const width = panelCount * UNITS_PER_PANEL;
  const xs: number[] = [];
  for (let x = 0; x < width; x += STEP) xs.push(x);
  xs.push(width);

  const linePoints = LINES.map((_, k) => xs.map((x): [number, number] => [x, swellY(x, k)]));
  const linePaths = linePoints.map(smoothPath);
  const fillPath = `${linePaths[0]} L ${width},${BOX_HEIGHT} L 0,${BOX_HEIGHT} Z`;

  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${width} ${BOX_HEIGHT}`}
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        width: `${panelCount * 100}vw`,
        height: '30dvh',
        pointerEvents: 'none',
        zIndex: -1, // behind every panel's content (the track is its own stacking context)
        overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient id="swell-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff4e6" stopOpacity="0.14" />
          <stop offset="1" stopColor="#fff4e6" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fillPath} fill="url(#swell-fill)" />
      <g fill="none" stroke="#fff4e6" strokeLinecap="round" strokeLinejoin="round">
        {linePaths.map((d, k) => (
          <path
            key={k}
            d={d}
            strokeWidth={LINES[k].width}
            opacity={LINES[k].opacity}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>
    </svg>
  );
}

export default BackgroundSwell;
