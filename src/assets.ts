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
  postcard: { slot: 603, filename: 'postcard.webp' },
  logoSpin: { slot: 604, filename: 'logospin.mp4' },
  honu: { slot: 605, filename: 'honu.webp' },
  mapIcon: { slot: 608, filename: 'beachmapicon.webp' }, // small map icon (home panel and Town Hall)
  siteMap: { slot: 609, filename: 'beachmap.webp' }, // the 2:1 site map shown in the modal
  home2Button: { slot: 607, filename: 'home2button.webp' }, // home button used inside the Town (leads to Parking)
  honuTurtles: { slot: 606, filename: 'turtles.webp' }, // overlays honu.webp exactly
} as const;
