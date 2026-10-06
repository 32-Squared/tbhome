import type { CSSProperties } from 'react';

function WaveBackground() {
  // Each wave layer is a repeating SVG data-URI tile (1200x200). The layer is wider than the
  // viewport by exactly one tile and translated by exactly one tile per loop (see .wave-layer),
  // so it loops seamlessly on the compositor. Each tile's left and right edges match
  // (same y-value, same tangent).

  const wave1 = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 200' preserveAspectRatio='none'>
    <path d='M0,100 C200,170 500,20 900,100 C1100,150 1150,60 1200,100 L1200,200 L0,200 Z' fill='#0a4a68'/>
  </svg>`;
  const wave2 = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 200' preserveAspectRatio='none'>
    <path d='M0,115 C150,185 450,30 800,115 C1050,175 1120,50 1200,115 L1200,200 L0,200 Z' fill='#155a7a'/>
  </svg>`;
  const wave3 = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 200' preserveAspectRatio='none'>
    <path d='M0,135 C250,195 550,45 900,135 C1050,170 1130,70 1200,135 L1200,200 L0,200 Z' fill='#2a7a9e'/>
  </svg>`;
  const wave4 = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 200' preserveAspectRatio='none'>
    <path d='M0,155 C200,185 500,115 800,155 C1000,185 1100,125 1200,155 L1200,200 L0,200 Z' fill='#4a98b8'/>
  </svg>`;

  const url1 = `url("data:image/svg+xml,${encodeURIComponent(wave1)}")`;
  const url2 = `url("data:image/svg+xml,${encodeURIComponent(wave2)}")`;
  const url3 = `url("data:image/svg+xml,${encodeURIComponent(wave3)}")`;
  const url4 = `url("data:image/svg+xml,${encodeURIComponent(wave4)}")`;

  const layers = [
    { url: url1, opacity: 0.14, duration: 26 },
    { url: url2, opacity: 0.17, duration: 18 },
    { url: url3, opacity: 0.2, duration: 12 },
    { url: url4, opacity: 0.22, duration: 9 },
  ];

  return (
    <div className="wave-bg" aria-hidden="true">
      {/* Sun glow — sunset orange/red */}
      <div className="sun-glow" />

      {/* Deepest + slowest first, lightest + fastest last */}
      {layers.map((layer, i) => (
        <div
          key={i}
          className="wave-layer"
          style={
            {
              backgroundImage: layer.url,
              opacity: layer.opacity,
              '--wave-duration': `${layer.duration}s`,
            } as CSSProperties
          }
        />
      ))}

      {/* Sandy bottom edge — warmer sunset sand */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '15%',
          background: 'linear-gradient(180deg, transparent 0%, rgba(210, 160, 110, 0.3) 50%, rgba(190, 140, 95, 0.55) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

export default WaveBackground;
