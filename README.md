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

Scroll order: blank left edge panel, left panels, landing, right panels, right edge panel (spinning logo).
Edge panels live in `src/components/EdgePanel.tsx`. The landing postcard flaps at random every 5-15s
(`src/usePaperFlap.ts`). The landing marquee shows `board401-ui.webp` onward; change `MARQUEE_COUNT` in
`src/data.ts` (12 now, 32 = all boards).

## Images

All images are served from Cloudflare R2: `https://assets.chainpaint.app/sites/tbhome/` (see `src/assets.ts`).
Filenames in `src/data.ts` are relative to that base. Any slot whose file isn't uploaded yet shows a numbered placeholder.

- `header.webp`, `homebutton.webp`, `postcard.webp` — UI images (slots 601-603); `logospin.mp4` (slot 604, 1:1 looping video)
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
