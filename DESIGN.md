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

## 2. Principles

1. **Thumb-first.** Built for a phone in one hand. The main action and navigation sit at the bottom.
   Screens are balanced: the main thing up front, related things nearby.
2. **Warm, never corporate.** Made by someone, not a template. No stock dashboard look.
3. **Craft through detail.** Care shows in every state: empty, loading, error, focus.
4. **Play in the moments and the words.** Fun appears when something happens (a win, an empty state, a
   game event) and in what the app says. Motion stays quick and functional.
5. **Siblings, not twins.** Every app shares the form language below; each has its own palette and
   character.

A TV dashboard is a mode: large type, readable from across a room. Not a principle of its own.

## 3. The look: *reduced graphic*

Form after Samurai Jack; colour after JoJo's Bizarre Adventure and Persona 5. Take the form and the colour,
never the detail.

- **Shape first, line where it counts.** Most things are flat filled shapes with no outline. A thin line
  appears only for detail or emphasis (an orbit round a disc, a horizon, an icon's second part).
- **One line weight per element.** Never tapered or mixed-thickness strokes. Weights: `--rg-line`
  (default 1.25px), `--rg-line-hair` (0.75px), `--rg-line-bold` (2.5px).
- **Silhouettes read alone.** Every icon and illustration is recognisable as one solid shape.
- **Strong colour, few of them.** Each view uses two or three colours from its palette: `field`, `ink`,
  `paper` and one `accent`. Bold combinations are welcome; busy detail is not.
- **Big empty space.** A small subject in a large calm field.
- **Geometric with a hand.** Hard cuts and simple curves. Never photographic or painterly.
- **Calm, then one sharp accent.** One dramatic element per view.

### Elements

| Element | Rule |
|---|---|
| Primary button | Solid `ink` on `paper` (or the reverse), square with the cut bottom-right corner (`.rg-btn`). Uppercase display type. At the bottom of the screen. |
| Secondary button | Outline at `--rg-line`, no cut corner (`.rg-btn--ghost`). |
| Lists | Rows divided by lines at `--rg-line`; the first rule full `ink`, the rest softened. No card boxes around rows. |
| Icons | From `icons/` only (section 7). Solid silhouette by default; line or line-plus-fill where the app chooses. |
| Scenes and headers | Flat silhouettes on a colour field, plus one background technique (below). |
| Big moments | The palette **flips** to the app's sibling palette for that screen (`data-palette` of the flip). |

### Background techniques

All are allowed; each app narrows them down while designing. Classes in `tokens.css`; the specimen shows
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
  `--rg-accent`, plus `flip` (the sibling palette for big moments).
- Each app picks one palette as its own and one flip. Two apps shouldn't share a main palette.
- Semantic colours (success, warning, error) are separate and stay legible on `paper` in both themes.

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
  on a loading screen or a 404 page.
- legi.nu is the exception: the mark is its hero and favicon.

## 7. Icons

`icons/svg/` holds one drawing per icon (24 grid, one line weight, round caps). They replace emoji and Lucide
in the apps; `icons/meta.json` says which. Live reference: `specimen/icons.html`.

- **Drawn once, four looks** (`icons/icons.css`). Two choices: keep the ink outline or not, and what fills
  the inside. Colour comes from `--rg-icon-fill` (default: the palette accent).

  | Look | Class | Outline | Inside | Details |
  |---|---|---|---|---|
  | Solid | `rg-icon--solid` | none | ink | cut out (background colour) |
  | Line | none (also the bare `.svg`) | ink | empty | ink |
  | Fill | `rg-icon--fill` | ink | colour | ink |
  | Colour | `rg-icon--color` | none | colour | ink |

- **Natural colours, per part:** icons of real things (Christmas set first) can list `parts` in
  `icons/meta.json`, one natural colour per shape or line, e.g. Santa: red hat, white trim and beard, skin face.
  `iconSvg(name, { variant: "fill" | "color", natural: true })` applies them from `icons/natural.css`; an app
  can override any `--rg-natural-*`. White parts need the fill look or a dark field to stay visible.
- Every icon outside the interface glyphs has at least one shape, so it carries colour even when small.
- Each part has a role: `shape` (closed, fillable), `line`, `detail` (sits inside a shape, at most one kind
  per icon) and `dot`. Colour comes only from CSS, never from the file.
- One look per kind of thing in an app: e.g. solid for teams and moments, line for interface controls.
- Silhouettes read alone: every icon must still be recognisable in solid.
- Push notifications and other plain text keep emoji; icons are for the UI.
- Adding one: draw `icons/svg/<name>.svg` with the role classes, add it to `icons/meta.json`, run
  `node scripts/build-icons.mjs` (checks the rules, writes `icons/index.js` and the specimen).

## 8. Using this in an app

```sh
bun add github:curly-virly/design
```

```css
@import "legi-design/tokens.css";
@import "legi-design/palettes/stardust.css";
@import "legi-design/icons/icons.css";
@import "legi-design/icons/natural.css"; /* only if you use natural colours */
```

```js
import { iconSvg, byReplaces } from "legi-design/icons/index.js";
iconSvg("sheriff", { variant: "solid" }); // SVG markup string
```

Apps follow `main`; the lockfile holds the commit in use, and `bun update legi-design` takes the latest. Each app's `AGENTS.md` points here with one
line.
