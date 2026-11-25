# legi design: shared identity

The rules every legi app follows. Read this before changing an app's UI. It is short on purpose: shared
form language here; layouts, features and palettes stay with each app.

Why each rule exists: `research/README.md`. Live reference: `specimen/index.html`.

## 1. Scope: restyle, don't restructure

- Each app keeps its own layouts and behaviours. Example: Sheriffs vs Chickens' map screen (full-screen
  map, bottom sheet, floating buttons, search, Wanted card) stays as it is.
- The rules apply at the **element** level: how a button, sheet, card, icon, search field, message or empty
  state looks and behaves, wherever it appears.
- An app's own patterns are protected: a rule may change how they look, never how they work.
- **Objects that leave the screen keep their own look.** Things made to be printed, saved or shared as an
  object in their own right (the Wanted poster, printed or as a saved image) are props from the game's world,
  not interface: they follow the style the object evokes, not these rules. Shown inside the app, the object
  itself stays as it is; the frame around it (card, sheet, buttons) follows the rules.

## 2. Principles

1. **Thumb-first.** Built for a phone in one hand. The main action and navigation sit at the bottom.
   Screens are balanced: the main thing up front, related things nearby.
2. **Warm, never corporate.** Made by someone, not a template. No stock dashboard look.
3. **Craft through detail.** Care shows in every state: empty, loading, error, focus.
4. **Play in the moments and the words.** Fun appears when something happens (a win, an empty state, a
   game event) and in what the app says. Interface motion stays quick and functional; scenes may move
   gently (section 3, Scenes).
5. **Siblings, not twins.** Every app shares the form language below; each has its own palette and
   character.
6. **The main subject carries the detail.** One hero per view gets the facets, ornaments and light;
   everything else stays a plain silhouette.
7. **Everything makes physical sense.** Decorations sit where they would in life (lights on branch tips, not
   beside a ribbon); nothing peeks out from behind a subject as a stray shape. Check overlaps at every size.
8. **Phone first.** Compose the phone view on its own and check 375×667, 390×844 and 430×932. Text and the
   subject never touch; on short screens shrink the subject from its base and tighten the title.

A TV dashboard is a mode: large type, readable from across a room. Not a principle of its own.

## 3. The look: *reduced graphic*

Form after Samurai Jack; colour after JoJo's Bizarre Adventure and Persona 5. Take the form and the colour,
never the detail.

- **Shape first, no outlines.** Drawings (icons, illustrations, scenes) are flat filled shapes with no
  outline: a shape ends where its colour ends, never at an ink edge. Shapes that touch are told apart by colour or a gap, not by a border.
- **Ink lines only for detail.** A line sits inside a shape to describe it (a hat band, an eye, a fold), or
  stands alone as emphasis (an orbit round a disc, a horizon). It never traces a shape's edge. Interface
  lines (list rules) are controls, not drawings, and keep their line.
- **One line weight per element.** Never tapered or mixed-thickness strokes. Weights: `--rg-line`
  (default 1.25px), `--rg-line-hair` (0.75px), `--rg-line-bold` (2.5px).
- **Silhouettes read alone.** Every icon and illustration is recognisable as one solid shape.
- **Strong colour, few of them.** Each view uses `field`, `ink`, `paper` and their mixes, plus at most one
  `accent` (optional: drop it if it shouts). The hero subject may use the icons' natural colours (section 7).
  Bold combinations are welcome; busy detail is not.
- **Calm around the subject, never an empty screen.** Space sits around the hero inside a full scene; a
  flat field with a small picture at the edge reads as unfinished.
- **Geometric with a hand.** Hard cuts and simple curves. Never photographic or painterly. One exception:
  light sources (lamps, tree lights, stars, lit windows) may have a small soft glow (`.rg-glow`). Never a
  glow pool on the ground.
- **Calm, then one sharp accent.** One dramatic element per view.

### Elements

| Element | Rule |
|---|---|
| Primary button | Solid `ink` on `paper` (or the reverse), square with the cut bottom-right corner (`.rg-btn`). Uppercase display type. At the bottom of the screen. |
| Secondary button | Solid, never outlined: a `field` shade (`--rg-second`, `field` with 20% `paper`) with `paper` text, no cut corner (`.rg-btn--second`). |
| Titles | Plain display type. Small words inside a title ("vs") stay plain `paper` type: no box, tag or colour of their own. Characters appear as icons at text size beside their word. |
| Lists | Rows divided by lines at `--rg-line`; the first rule full `ink`, the rest softened. No card boxes around rows. |
| Icons | From `icons/` only (section 7). Realistic colours by default; recolour per part where the app chooses. Never outlined. |
| Scenes and headers | Built in layers (below). |
| Big moments | No palette change: the app's palette stays. Mark the moment with scale, layout and the one accent. |

### Scenes

After Samurai Jack, a scene is built in depth, back to front:

1. **Sky:** `field` with a dry-brush wash and grain, plus one light (a moon and its beam, or haze).
2. **Three to five silhouette layers**, darker toward the front (`field` mixed with more `ink` each step).
3. **The clearing:** the hero subject in the middle, the only detailed drawing.
4. **Foreground:** `ink` shapes (pines, boughs, a bank) cropping the edges and framing the view.

The title sits on the sky and the actions on the foreground, inside the scene: no separate bands of page.
Icons stay icon-sized; never scale one up into a scene prop. Ambient motion (snowfall in depth, twinkling,
smoke) is allowed in scenes and stops under `prefers-reduced-motion`. Reference: `specimen/scene.html`.

### Background techniques

All are allowed, and a scene combines them: silhouette layers as the base, one texture (grain, wash) and
one light (haze). Each app narrows them down while designing. Classes in `tokens.css`; the specimen shows
each one.

| Technique | What it is |
|---|---|
| Flat field | The colour alone; the silhouette does the work. |
| Silhouette layers | Flat shapes stacked front to back, paler with distance. |
| Haze | A soft glow behind sharp flat shapes. |
| Stipple | A dot pattern, often fading out. |
| Motif | One small shape repeated. |
| Grain | A faint dry-brush noise over flat colour. |
| Shards | Angular blocks behind the subject. |

## 4. Colour

- Palettes live in `palettes/`, one file each, with four tokens: `--rg-field`, `--rg-ink`, `--rg-paper`,
  `--rg-accent`. There are no flip palettes.
- Each app picks one palette as its own. Two apps shouldn't share a main palette.
- No colours outside the palette: extra shades are mixes of `field`, `ink` and `paper` only, never a new tint.
  The icons' natural colours (`icons/natural.css`) are the one addition, for icons and the hero subject.
- Semantic colours (success, warning, error) are separate and stay legible on `paper` in both themes.
- **Avalanche danger scale** (`scales/avalanche.css`): the standard five levels (green, yellow, orange, red, red and black check) are the one
  colour set allowed outside the palette, only to show a danger level, as a solid tile (`.rg-avalanche[data-level]`).

## 5. Type (draft)

- Display: **Archivo** at a narrow width (`wdth` ≈ 68), weight 850, uppercase for titles and buttons.
- Body: **Familjen Grotesk**.
- Numbers and labels: **JetBrains Mono**, small uppercase with letter-spacing for eyebrows.

## 6. The legi mark

`assets/legi-mark.svg`

- **Use the original, unchanged:** the hook, the eye dot and three spines, all at one stroke weight with
  round caps. Every reworked version (filled body, taper, geometric, one-line, heavier and so on) was tried and rejected.
- **One colour,** `currentColor` (ink, paper or field). Never filled, never multicoloured.
- **An Easter egg, not a header logo.** It doesn't belong in a top corner. Hide it in odd little places,
  small and quiet: among rocks in a scene, peeking over a summit, at the end of a list, in an empty state,
  on a loading screen or a 404 page. Best as an object in the world, e.g. one of the stars in a night sky.
- **At least 16 px.** Smaller, it can't be found.
- legi.nu is the exception: the mark is its hero and favicon.

## 7. Icons

`icons/svg/` holds one drawing per icon (24 grid, one line weight, round caps). They replace emoji and Lucide
in the apps; `icons/meta.json` says which. Drawn after Samurai Jack: flat shapes, no outline. Live reference: `specimen/icons.html`.

- **No outlines.** Icons are flat shapes; ink lines appear only as detail inside a shape. Interface glyphs
  (arrows, check, close) are lines by nature; that line is the glyph, not an edge.
- **One drawing, every part its own colour.** There are no looks to choose from. Each shape and line of an icon
  is a named part (`parts` in `icons/meta.json`, e.g. reindeer: `head`, `antlers`) with a realistic default
  colour: reindeer brown, Santa's hat red, a heart red. Details and dots share one part, `detail` (default
  ink). Things with no real colour (circle, play, mystery) default to the palette `accent`.
- **Lifted, everywhere.** The natural colours in `icons/natural.css` are already brightened (each realistic colour at
  brightness 1.5, saturate 1.15). Every app shows icons with these values: no CSS filters or per-page brightening.
  Tune them there, once.
- **Recolour freely, per part:** `iconSvg(name, { colors: { antlers: "#fff" } })`, or in CSS with
  `--rg-icon-<icon>-<part>` (e.g. `--rg-icon-reindeer-antlers`). Tune the whole set at once by overriding the
  default colours, `--rg-natural-*` in `icons/natural.css`.
- **One colour:** `iconSvg(name, { colors: "currentColor" })` (or any colour) draws the silhouette with details
  cut out (`--rg-icon-cut`, default `paper`). Interface glyphs have no named parts and always draw this way.
- Parts are told apart by colour, never by outline. White parts (snow, Santa's beard) need a coloured field or
  a recolour to show on `paper`.
- The `.svg` files are source drawings; render them through `iconSvg` with `icons/icons.css` and
  `icons/natural.css`.
- Every icon outside the interface glyphs has at least one shape, so it carries colour even when small.
- Each part has a role: `shape` (closed, filled), `line` (a part drawn as a line, e.g. legs), `detail` (a line
  inside a shape) and `dot`. Every shape and line outside the interface glyphs is named in `parts`. Colour
  comes only from `meta.json` and CSS, never from the file.
- A detail stays inside its shape and never follows its edge; if a drawing needs an edge to read, redraw it.
- Interface controls usually stay one colour (`currentColor`), like text.
- Silhouettes read alone: every icon must still be recognisable in one colour.
- Push notifications and other plain text keep emoji; icons are for the UI.
- Adding one: draw `icons/svg/<name>.svg` with the role classes, add it to `icons/meta.json` with its parts and
  their realistic colours (a new colour goes in `icons/natural.css`), run
  `node scripts/build-icons.mjs` (checks the rules, writes `icons/index.js` and the specimen).

## 8. Using this in an app

```sh
bun add github:curly-virly/design
```

```css
@import "legi-design/tokens.css";
@import "legi-design/palettes/stardust.css";
@import "legi-design/icons/icons.css";
@import "legi-design/icons/natural.css"; /* the icons' default colours */
```

```js
import { iconSvg, byReplaces } from "legi-design/icons/index.js";
iconSvg("reindeer"); // SVG markup string, realistic colours
iconSvg("reindeer", { colors: { antlers: "var(--rg-accent)" } }); // one part recoloured
iconSvg("check", { colors: "currentColor" }); // one colour
```

When this repo is checked out in the same workspace (cloud sessions: `/home/user/design`), an app takes the design from
that checkout, not the package. Reference its files, and use the package only where no checkout is present.

Apps follow `main`; the lockfile holds the commit in use, and `bun update legi-design` takes the latest. Each app's `AGENTS.md` points here with one
line.

## 9. In-world UI (XR)

Panels and labels drawn in a WebXR scene (headset or phone AR). Approved by Jens, revisable. Numbers and reasons:
`research/xr-panels.md`. The element rules above still apply; these add what a 3D scene needs.

- **Distance and size.** A head-up panel hangs 1 m ahead of the eye, 0.12 m below the eye line, about 1.0 × 0.74 m.
- **Text size is an angle, not a length.** Every line is at least about 1.7° tall (size ÷ distance). Body 1.9°, small
  1.7°, headline 2.9°. At 1 m that is 0.034, 0.030 and 0.050 m.
- **Follow lazily.** A panel eases to its place (position rate 4/s) and turns only once the head is more than 12° off
  (yaw rate 3/s). Smoothing is frame-rate independent. Looking straight up or down keeps the old heading.
- **Safety content can't be closed.** Whatever the app must always show (danger level, estimate line, stale or demo
  data) is on a panel with no close or hide control. A control may shrink other content, never that.
- **Depth.** Overlays and panel text ignore the depth test and draw last (high `renderOrder`), so the model never
  hides them. The panel swallows pointer rays, so a click on it never reaches the model behind.
- **Labels on a scaled model stay one size.** A label on the model is rescaled each frame to keep its apparent size
  (about 1.75° per line), faces the viewer, and never blocks picking.
- **Colour only from `palettes/`.** Copy the palette's hex values into the scene (three.js can't read CSS variables),
  in one place, labelled with the palette file. Same limits as section 4: mixes and the avalanche scale only.
- **Type.** One legible mono or sans face, served from the app as `.woff` or `.ttf`: SDF text can't read `.woff2`, and
  a CDN font is blocked by CSP. Lay text out on the main thread if CSP forbids workers.
- **Lines.** One weight per element and no tapered strokes, as in section 3. A flat shape is a plane, not an outline.
- **Phone AR card.** On a phone the panel is a smaller card low in the view, fixed to the camera (0.8 m ahead,
  0.2 m below the centre, scale 0.55) so it can't be out of sight. Keep text at or above the angle rule after scaling.
