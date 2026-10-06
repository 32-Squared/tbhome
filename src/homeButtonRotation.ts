// Home-button tilt: a fixed pseudo-random angle of 5-30 degrees, alternating
// clockwise / counter-clockwise by panel order (0 = first category panel in scroll order).
// Deterministic, so every visit and every render gets the same tilts.
export function homeButtonRotation(order: number): number {
  const r = Math.abs(Math.sin((order + 1) * 12.9898) * 43758.5453) % 1;
  const magnitude = 5 + Math.round(r * 25);
  return order % 2 === 0 ? magnitude : -magnitude;
}
