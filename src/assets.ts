// Single source of truth for where images live.
// Filenames in data.ts are relative to ASSET_BASE; full http(s) URLs pass through unchanged.
export const ASSET_BASE = 'https://assets.chainpaint.app/sites/tbhome/';

export function assetUrl(filename: string): string {
  if (/^https?:\/\//.test(filename)) return filename;
  return ASSET_BASE + filename.replace(/^\/+/, '');
}

// Non-collection UI images (slot numbers are for the placeholder label only).
export const UI_IMAGES = {
  header: { slot: 601, filename: 'header.webp' },
  homeButton: { slot: 602, filename: 'homebutton.webp' },
} as const;
