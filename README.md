# Turtleboards

Horizontal, ocean-flowing showcase site for the Turtleboards Enjin Matrixchain NFT collection.
Static marketing/info site: no accounts, no saves.

## Dev

```
npm install
npm run dev
npm run build
```

## Layout

Scroll order, left to right: The Pier (edge: spinning logo video), Dry Off, Information Kiosk,
Malecón Plaza, 32 Squared, Visitor Center, **Home**, Beach Dreams, Wave One, Summer Postcards, Wave Two,
Behind the Sunscreen, Wave Three, Add It Up, Wave Four, On the Horizon, Wave Five, Honu (edge: honu fades in at 10s, turtles over it at 15s, honu out at 20s, turtles out at 25s, once per visit).
The order lives in `src/data.ts` (left list is nearest-Home first). Edge panels: `src/components/EdgePanel.tsx`.
The Town: Dry Off's button ("Free Parking") slides down into a little horizontal scroll of its own (Parking,
Souvenirs Squared, Daycare Center, Town Hall), defined under `branches` in `src/data.ts` and built in
`src/components/BranchWorld.tsx` (clouds: `CloudBackground.tsx`). Its cards are asphalt grey, its home button is
`home2button.webp` (leads to Parking), and `/#daycare` etc. deep-link into it (the standalone Daycare page's
"Back to Town" link uses that). Phosphenes can be a single config or an array (Town Hall has two flies).
Back links on the standalone pages read "Back to the Boards" for panels left of Home and "Back to the Beach" for
panels right of Home, "Back to Town" for the Town (the list of left panel ids is at the top of `public/pages.js`).
Panel options in `data.ts`: `phosphene` (a sparse little image that fades in, floats and fades out on the top layer; `src/components/Phosphenes.tsx`), `shape: 'square'` + `cardArt` (1:1 card with a fading-in overlay image after 5s), `cardColor` (card tint, any CSS colour), `shape: 'oval'` (wave cards, water-drop shape), `subtitleItalic`,
`branch` (button slides down into a scene from `branches`, see `BranchWorld.tsx`; Dry Off -> Free Parking), `inactive` (shows `linkLabel` as a disabled button until the page exists).
Site map: the home panel shows the map icon (`beachmapicon.webp`) with the postcard tilted over it; the Town Hall card has the same icon floating above it. Tapping any of them opens `beachmap.webp` as a 2:1 modal (`src/components/SiteMap.tsx`), growing out of the tapped icon and shrinking back into it.
The landing postcard flaps at random every 5-15s (`src/usePaperFlap.ts`). The landing marquee scrolls right and shows
`board401-ui.webp` onward; change `MARQUEE_COUNT` in `src/data.ts` (12 now, 32 = all boards).

## Images

All images are served from Cloudflare R2: `https://assets.chainpaint.app/sites/tbhome/` (see `src/assets.ts`).
Filenames in `src/data.ts` are relative to that base. Any slot whose file isn't uploaded yet shows a numbered placeholder.

- `header.webp`, `homebutton.webp`, `postcard.webp` — UI images (slots 601-603); `logospin.mp4` (slot 604, 1:1 looping video), `honu.webp` (slot 605, 1:1 still), `beachmapicon.webp` (slot 608, home + Town Hall icon), `beachmap.webp` (slot 609, 2:1 site map), `32squared.webp` (used on /32-squared.html); phosphene images `bubble.webp`, `balloon.webp`, `fluff.webp`, `fly.webp`, `enjin.webp`
- Summer Postcards: `board###.webp` (full size, 1:3 tall) and `board###-ui.webp` (thumbnail, 1:1), slots 401–432
- Other sections still use the older placeholder names (`thumb-###.webp`, `board-###.webp`, `featured-###.webm`) until the layout is final

## Deploy (Cloudflare Workers Builds, auto-deploy from git)

Nothing needs to be installed locally. Cloudflare builds and deploys on every push to the production branch.

Dashboard: Workers & Pages → Create → Import a repository → pick this repo, then:

- Worker name: `tbhome` (must match `name` in `wrangler.jsonc`, or the build fails)
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy` (the default)

`wrangler.jsonc` serves `dist/` as static assets with an SPA fallback; `public/_headers` sets cache rules
(hashed `/assets/*` immutable, HTML always revalidated). Commit `package-lock.json` so builds are reproducible.

Icons: `public/favicon.png`, `public/apple-touch-icon.png` (180px, flattened on white), `public/icon-512.png` (unused for now, no PWA).
Social preview image lives on R2: `og-image.jpg` (1200x630).
