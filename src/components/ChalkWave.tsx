interface ChalkWaveProps {
  panelCount: number;
}

function ChalkWave({ panelCount }: ChalkWaveProps) {
  // Polynesian-inspired decorative wave. Four distinct layers — a bold main
  // crest, an inner highlight trace, a counter-phase secondary swell, and
  // fine surface ripples — plus foam curls and spray dots at each crest.
  // Tile is 720×200; all paths use period 360 (or a divisor) so endpoints
  // and tangents match exactly at tile boundaries for seamless repeating.
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='720' height='200' viewBox='0 0 720 200' preserveAspectRatio='none'>
  <defs>
    <filter id='chalk' x='-5%' y='-15%' width='110%' height='130%'>
      <feTurbulence type='fractalNoise' baseFrequency='0.01 0.07' numOctaves='3' seed='29' result='noise'/>
      <feDisplacementMap in='SourceGraphic' in2='noise' scale='4.5' xChannelSelector='R' yChannelSelector='G'/>
    </filter>
  </defs>

  <!-- Main wave: bold crest-and-trough, period 360, amplitude 42, center y=95 -->
  <g fill='none' stroke='#fff' stroke-linecap='round' stroke-linejoin='round' filter='url(#chalk)'>
    <path d='M 0,95 C 60,48 120,48 180,95 C 240,142 300,142 360,95 C 420,48 480,48 540,95 C 600,142 660,142 720,95' stroke-width='14' opacity='0.95'/>

    <!-- Inner highlight: follows main wave, thinner, offset up 5px -->
    <path d='M 0,90 C 60,52 120,52 180,90 C 240,130 300,130 360,90 C 420,52 480,52 540,90 C 600,130 660,130 720,90' stroke-width='4' opacity='0.7'/>

    <!-- Counter-phase secondary swell: amplitude 22, center y=128 -->
    <path d='M 0,128 C 60,158 120,158 180,128 C 240,98 300,98 360,128 C 420,158 480,158 540,128 C 600,98 660,98 720,128' stroke-width='6.5' opacity='0.5'/>

    <!-- Surface ripples: amplitude 8, period 120, center y=172 -->
    <path d='M 0,172 C 15,166 30,166 45,172 C 60,178 75,178 90,172 C 105,166 120,166 135,172 C 150,178 165,178 180,172 C 195,166 210,166 225,172 C 240,178 255,178 270,172 C 285,166 300,166 315,172 C 330,178 345,178 360,172 C 375,166 390,166 405,172 C 420,178 435,178 450,172 C 465,166 480,166 495,172 C 510,178 525,178 540,172 C 555,166 570,166 585,172 C 600,178 615,178 630,172 C 645,166 660,166 675,172 C 690,178 705,178 720,172' stroke-width='2.5' opacity='0.32'/>

    <!-- Foam curl at crest 1 (~90,48) — small breaking-wave spiral -->
    <path d='M 82,42 C 75,31 93,26 100,35 C 105,42 97,49 87,44' stroke-width='5' opacity='0.85'/>
    <!-- Trailing line from crest 1 into the face of the wave -->
    <path d='M 92,52 C 106,66 126,76 148,86' stroke-width='2.5' opacity='0.45'/>

    <!-- Foam curl at crest 2 (~450,48) -->
    <path d='M 442,42 C 435,31 453,26 460,35 C 465,42 457,49 447,44' stroke-width='5' opacity='0.85'/>
    <path d='M 452,52 C 466,66 486,76 508,86' stroke-width='2.5' opacity='0.45'/>

    <!-- Spray dots above each crest -->
    <circle cx='66' cy='34' r='3' fill='#fff' stroke='none' opacity='0.7'/>
    <circle cx='112' cy='38' r='2.2' fill='#fff' stroke='none' opacity='0.55'/>
    <circle cx='426' cy='34' r='3' fill='#fff' stroke='none' opacity='0.7'/>
    <circle cx='472' cy='38' r='2.2' fill='#fff' stroke='none' opacity='0.55'/>

    <!-- Tiny accent tick between trough and next crest -->
    <path d='M 230,118 C 238,112 250,112 258,118' stroke-width='2' opacity='0.35'/>
    <path d='M 590,118 C 598,112 610,112 618,118' stroke-width='2' opacity='0.35'/>
  </g>
</svg>`;

  const bgUrl = `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: '28%',
        left: 0,
        width: `${panelCount * 100}vw`,
        height: '34dvh',
        backgroundImage: bgUrl,
        backgroundRepeat: 'repeat-x',
        backgroundSize: '720px 200px',
        backgroundPosition: '0 center',
        pointerEvents: 'none',
        zIndex: 5,
        opacity: 0.22,
      }}
    />
  );
}

export default ChalkWave;
