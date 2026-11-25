# PWA rollout: issue drafts

Goal: legi.nu and every app installable as a PWA. Each app is its own origin, so each is its own PWA.
Drafted 2026-11-25; GitHub tools weren't available in that session, so these wait to be filed.

State: crumb-radar done (crumb-radar#11). the-hunt and workout install already, with small gaps. legi-nu,
fjallripa and verflick have only favicon/apple-touch-icon. Caddy needs no change (legi.nu/crumb CSP has no
default-src, so manifest and worker load; fjallripa/verflick CSPs have `default-src 'self'`, which covers both).

---

## design — PWA conventions for legi apps (umbrella + `decision`)
Labels: `enhancement`, `decision`

Tracks: legi-nu, fjallripa, verflick, workout, the-hunt issues below; crumb-radar#11 (done).

Open questions (recommendation first):
1. **Icon**: app's own mark on a full tile in its palette `field`, mark in `paper`; maskable variant with the
   mark inside the 80 % safe zone; separate `any` and `maskable` files (never `"any maskable"`). Sizes 192, 512,
   maskable 512, apple-touch 180.
2. **Colours**: `theme_color` and `background_color` = palette `field`.
3. **Manifest**: `id`, `start_url`, `scope` `/`, `display: standalone`, `lang`, `name`/`short_name` (≤12 chars).
4. **Service worker**: at least an offline notice page; cache the app shell only; never cache API, auth or
   MCP responses; new release picked up on next open (versioned cache).
5. **Shared tooling**: `scripts/build-app-icons.mjs` here (SVG + palette → PNG set), like `build-icons.mjs`.

Done when: rule added to `DESIGN.md` (short) with the reason in `research/README.md`, and the script exists.

---

## legi-nu — Installable PWA
Labels: `enhancement`

- `site/manifest.webmanifest` + icons per design conventions (white mark on dark tile, as the favicon).
- `site/sw.js`: cache `index.html`, fonts, `img/`; versioned cache per deploy; registered from an inline script
  (CSP: scripts from the site only).
- `<link rel="manifest">`, `theme-color` meta.

Done when: installs on Android (Chrome) and iOS (Add to Home Screen), opens standalone, loads in airplane mode.

## fjallripa — Installable PWA
Labels: `enhancement`

- Manifest (served from `public/`), icons from `fjallripa-mark.svg` on the `ripa` field; `<link rel="manifest">`
  and `theme-color` in `__root.tsx`.
- Service worker: app shell + offline notice (EN/SV in `i18n.ts`). Don't cache bulletin/model API responses or
  map tiles (stale avalanche data is a safety risk); show "offline, data may be out of date" instead.
- CSP: `worker-src 'self' blob:` already allows it; add `manifest-src 'self'` only if needed.

Done when: installs on Android and iOS, opens standalone, offline shows the notice, not the browser error.

## verflick — Installable PWA
Labels: `enhancement`

- Manifest + icons in the `wind` palette, `<link rel="manifest">`; update the `theme-color` meta to the palette.
- Service worker: app shell offline (progress is already in the browser, so built-in decks can work offline);
  never cache `/api/mcp`, `/oauth/**` or auth.
- Must keep working when embedded in Claude (`frame-ancestors` open): don't register the worker inside a frame.

Done when: installs on Android and iOS, opens standalone, a built-in deck works in airplane mode.

## workout — PWA polish
Labels: `enhancement`

- Split `"any maskable"` into separate `any` and `maskable` icons (maskable with safe zone).
- Add `id` and `lang` to the manifest; colours from the `igel` palette.

Done when: Chrome DevTools → Application → Manifest shows no warnings; offline test still passes.

## the-hunt — PWA polish
Labels: `enhancement`

- Add `id` to `webManifest` (`src/lib/manifest.ts`, test in `manifest.test.ts`); URL stays `/manifest.json`.
- Add an offline notice page to `public/sw.js` (navigation fallback only; still no caching of game data, the game
  is online-only).

Done when: no manifest warnings in DevTools; offline launch shows the notice instead of the browser error.
