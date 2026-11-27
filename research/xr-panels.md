# In-world (XR) panels

2026-11-25. Source: Fjällripa's XR panels (`src/lib/xr-panel.ts`, `src/components/xr/XrPanel.tsx`, `XrInspect.tsx`,
`src/lib/xr-ar.ts`; fjallripa issue #41, decision approved by Jens, revisable). The rules in `DESIGN.md` section 9
record what shipped there, tested on an emulated runtime and Meta Quest 2 targets, not a user study.

## Numbers

| Thing | Value | Why |
|---|---|---|
| Panel distance | 1 m | Inside comfortable focus for a headset (Quest 2 fixed focus is about 1.3 m), within arm's reach of a ray. |
| Panel drop | 0.12 m below the eye line | Below the horizon so it doesn't cover the model or the view ahead. |
| Panel size | 1.0 × 0.74 m | About 53° wide at 1 m: whole panel in view without turning the head. |
| Text, body | 0.034 m = 1.95° | |
| Text, small | 0.030 m = 1.72° | The floor: legible text in a headset at about 1.5 to 2°. |
| Text, title | 0.050 m = 2.86° | About 1.5× body, enough to read as a headline. |
| Follow, position | rate 4 /s | Eases in about a quarter of a second without feeling stuck to the head. |
| Follow, yaw | rate 3 /s, dead zone 12° | The panel stays put for small glances, then comes round. |
| Label on model | 1.75° per line | Constant apparent size: scale = distance × tan(1.75°) ÷ model scale. |
| Phone AR card | 0.8 m ahead, 0.2 m low, scale 0.55 | Fits a portrait screen. |

Angle in degrees = 2 · atan(size ÷ 2 ÷ distance).

## Reasons

- **Angles, not lengths.** In a model the user scales from 1:1 to a tabletop, a fixed world size is sometimes huge and
  sometimes unreadable. An angle holds at any distance.
- **Dead zone on yaw.** A panel glued to the head causes eye strain and hides what you look at. A panel that never moves is
  lost when you turn. Following only past 12° keeps it reachable and still.
- **No close control.** The apps that use XR show safety information (avalanche danger, estimate, stale data). If it could be
  hidden, someone would. This repeats Fjällripa's FR-XR-2.
- **No depth test.** The model fills the view and its terrain would cut through a panel at 1 m. Panel and labels draw last, ignoring depth.
- **Hex copies of the palette.** Materials in three.js can't read `var(--rg-*)`. The copy lives in one constant that
  names the palette file, so a palette change is one edit.
- **`.woff` or `.ttf`.** troika-three-text (drei `<Text>`) reads ttf, otf and woff, not woff2. Its default is a CDN font, which a strict CSP blocks; its worker uses eval, also blocked, so layout runs on the main thread.
- **Lines.** The repo-wide rules (one weight per element, never tapered) apply in 3D too; minimap swatches and rings are flat planes.

## Where Fjällripa differs from the rules (2026-11-25)

- Phone AR card: text is 0.034 and 0.030 m scaled by 0.55 at 0.8 m, so 1.34° and 1.18°, below the 1.7° floor. Scale readout
  (0.04 m) reaches 1.6°.
- The AR placement hint (`XrArPlacement.tsx` `Hint`) uses fontSize 0.026 m, 1.5° at 1 m: below the floor.
- Minimap north label size depends on the map width (`max(0.03, width × 0.06)`), not on an angle.
- The panel's text and layout heights are hard-coded in metres; button and swatch sizes are not tied to the angle rule.
- `RIPA` hex values are duplicated in `xr-panel.ts` and `XrInspect.tsx` (one copy would do).
- Font: JetBrains Mono for everything, so the XR panel has no display or body face (section 5 draft); acceptable under the rule.
- Fonts are loaded two ways (`/fonts/...woff` in `public/` and a bundled `?url` import).
