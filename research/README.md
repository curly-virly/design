# How the identity was chosen

Started 2026-11-21. The full discussion is in vps-app-hosting issue #60; this is the record that matters for
later decisions. Swipe decks ran in Verflick (series `ui-identity`).

## Phase 1, step 1: questions → principles

- **Where the apps are used:** phone on the move, phone settled, occasionally a dashboard on a TV.
- **Feel:** crafted and playful. **Never:** cold or sterile, corporate SaaS.
- **Density:** balanced.
- **Where play shows:** moments, wording, the look itself (not motion).
- **What "crafted" means:** typography and polished details; mostly flat.
- **Main action:** at the bottom, always.
- **Family:** subtle siblings.

These answers became the five principles in `DESIGN.md`.

## Phase 1, step 2: swipe rounds

| Deck | Content | Result |
|---|---|---|
| `ui-identity-1` | Big-company apps (Airbnb, Duolingo, Slack…) | Dropped: "big corporations, inherently not that interesting" |
| `ui-identity-2` | Indie apps (Not Boring, Halide, Tot, Mela…) | 1/15 liked: (Not Boring) Habits, for its icons. "None have character; very generic." App Store apps all converge on the standard iOS look. |
| `ui-identity-3` | Objects, posters, signage (Braun, Teenage Engineering, Müller-Brockmann, Otl Aicher, Memphis…) | Liked: Müller-Brockmann *Beethoven* and *Musica Viva*, Otl Aicher's pictograms, Nothing's light patterns. Rejected: everything quirky, handmade or tactile, and Memphis. The posters "made me think of Samurai Jack". |
| `ui-identity-4` | Samurai Jack, JoJo, Persona 5 | Samurai Jack 5/6 liked (the painterly frame was the no). JoJo and Persona rejected fast **for their detail**; Jens likes their **colour schemes**. |
| `ui-identity-5` | Samurai Jack backgrounds | Jens: allow all of the background techniques and narrow them down while designing. |

Across rounds: bold colour on busy objects 0/6, quirky 0/7, handmade or tactile 0/7. Lean-ins: flat,
silhouette, negative space, limited forms.

**Key quote:** "Samurai Jack is very strong, simple line drawings … but it's not only line drawings. It
elegantly mixes in non-line-drawing elements," including very simple texture in the backgrounds.

## Phase 1, step 3: specimen and the mark

- The specimen (`specimen/index.html`) was well received: "a lot of this works, and it will depend on the app."
- **The legi mark:** tried a filled hedgehog body (after a reference of a solid silhouette character with
  ring eyes), a tapered brush stroke, nine decorated versions and eleven structural rebuilds. All
  rejected. **Rejected outright: lines of different thickness.** Decision: keep the original mark and
  hide it in odd places as an Easter egg instead of a header logo.

## Phase 1, step 4: icons (2026-11-21)

- Inventory: Sheriffs vs Chickens 56 emoji plus about 50 Lucide icons, Igel Gym 13 emoji, Fjällripa and
  Verflick Lucide only. Push texts keep emoji.
- Jens wanted icons in black and white or as line drawings, so an agent can add its own colours or leave
  them. The rule said solid only, no outline sets.
- Round 1 (20 samples, design issue #1) showed one drawing three ways: solid, line, line plus fill. Jens:
  "we're getting there"; only the fox's mouth was too wide. He then asked for the full set in the design
  system. **Decision:** the rule became "one drawing, three looks", with role classes so the look is pure CSS.
  Solid stays the default because silhouettes read best at small sizes.
- Full set review: the dragon read as a horse and the diver as a webcam (now a snorkel). Line-only icons
  (snowflake, swords, rope, bell off) took almost no colour, so they were redrawn with shapes, and a fourth
  look, **colour**, fills the whole icon and keeps details in ink. The build now refuses a non-interface icon
  without a shape.
- Christmas colour test: one colour per icon made Santa all red and the reindeer's antlers brown. Jens chose
  a colour per part (natural colours), and Santa's face became its own shape so it can be skin-coloured
  instead of white like the beard.

## Phase 1, step 5: no outlines (2026-11-21)

- Jens: rework the icons to follow Samurai Jack more closely, "no black boundaries, only for detailing".
  Samurai Jack draws flat colour shapes with no outline; dark lines appear only inside a shape (a fold, a
  face), and shapes are separated by colour.
- **Decision:** no ink outlines on drawings (icons, illustrations, scenes); interface lines such as list rules and the ghost button stay. Section 3 now says shapes end where their colour
  ends and ink lines are for detail only. The icons' line look (ink outline, empty) and fill look (ink
  outline, coloured) are retired (step 6 then replaced the remaining looks with per-part colours). No app used the package yet,
  so nothing breaks.
- The drawings already read without outlines (the solid look was the default and every icon had to read as a
  silhouette), so no icon needed redrawing. White natural parts (snowman, candle, beard) lose their edge on
  `paper`; they belong on a coloured field.

## Phase 1, step 6: every part its own colour (design #11, 2026-11-21)

- Jens: the icons had too many versions; give the designer full control instead. Every line and area can be
  coloured separately, with a default colour, and the default is the realistic one (reindeer are brown).
- **Decision:** no looks. Each shape and line is a named part in `meta.json` with a realistic default colour
  (`natural.css`, now 19 colours including `ink` and `accent`); details and dots are one more part, `detail`.
  `iconSvg(name, { colors })` takes per-part overrides, or one colour for a silhouette; CSS can recolour with
  `--rg-icon-<icon>-<part>`. The solid, colour and natural options and the `rg-icon--*` classes are gone. The
  build refuses a non-interface icon without parts. Abstract shapes (circle, play, mystery) default to the
  palette accent, since they have no real colour.
- Edge-line sweep: Jens flagged Santa's line along the face and beard edge, the candle's line on its top edge
  and the present's ribbon. **Decision**, applied to every icon: an ink line that traces an edge goes, and a
  line that stands for a coloured thing (ribbon, hat band, cuff, window, header, ferrule, flame core) becomes
  its own coloured part. Touching parts get a small gap so the one-colour silhouette still separates them.

## Phase 1, step 7: Christmas landing test (2026-11-21)

- Test of the system on the Sheriffs vs Chickens Christmas landing (a mockup only, not issue work).
- Round 1 (a flat `aku` field with stipple and a small scene at the bottom): Jens felt it wasn't working. Too much
  empty space, and it lost the charm of the old landing. Samurai Jack "plays more with layers".
- Round 2 uses many silhouette layers that darken toward the front, a dry-brush sky with grain, a moonbeam, and
  black foreground pines and boughs cropping the edges, with the title and buttons inside the scene. It combines
  three background techniques, while §3 says one, so that rule may need changing (`decision`).
- Jens prefers `night` (blue) over `aku` for this, with the tree kept its natural green instead of the palette accent.
- Tested green and snowy trees; Jens kept the black (ink) tree silhouettes. The starry sky from the old landing came back (flat dots and a few four-point sparkles).
- The detailed layered snowfall from the old landing came back (specks and crystals behind, big tumbling crystals in front).
- Jens: no lines on buttons, only solids. The secondary button became a solid field tone. That clashes with §3, which says the secondary button is an outline (`decision`).
- Tightened the colours: the tree was removed, and the secondary buttons and the "vs" tag reuse a sky shade (`field` mixed with 20% `paper`) instead of the bright cyan `accent` or a lighter blue of its own. The page now uses only `field`, `ink` and `paper` plus their mixes.
- The reindeer and snowman moved into the title, icon-sized, each beside its own word. To fill the clearing, the tree from the app's Christmas logo came back as a large flat drawing: green tiers with a band of snow on each, a gold star and coloured lights.
- Jens wanted the old page's light effect back: a soft glow on the lights, star and windows, and a warm pool on the snow. A blur like this is against "hard cuts, never painterly" (`decision`).
- Jens's reference (a flat Samurai Jack-style tree under a moon) shaped a more detailed hero tree: a dark spruce of jagged drooping tiers, lighter facets on the moonlit side, a red ribbon spiral, red baubles on hairline strings, warm lights and a tall two-tone star. The rule it suggests: **the main subject carries the detail; the rest of the scene stays plain silhouettes.**
- The warm pool of light under the tree went ("looks like the tree peed itself"). The lights moved off the ribbon to the branch tips, because lights next to a ribbon band read as doubled. The legi mark at 10 px in the snow was too small; it now hides in the sky as one of the stars, at about 16 px in `paper`, twinkling with the rest.

**Decision (design #13, approved by Jens):** the lessons became rules. In `DESIGN.md`:
- principles 6–8 (the hero carries the detail, physical sense, phone first);
- calm space around the subject instead of big empty space;
- a glow on light sources only;
- at most one accent, which is optional;
- solid secondary buttons (`.rg-btn--second`, `--rg-second`), replacing the outlined `.rg-btn--ghost`;
- plain words inside titles, with icons at text size;
- a Scenes section (layers back to front, combined techniques, ambient motion);
- no colours outside palette mixes, apart from the icons' natural colours;
- the legi mark at least 16 px, best as an object in the world.

`specimen/scene.html` keeps the test page as the reference scene. No app used the package yet, so the removed
`.rg-btn--ghost` breaks nothing.

## Phase 2, step 1: Sheriffs vs Chickens Christmas player view (draft, 2026-11-21)

- First real screen restyled with the rules, as the template for the rest of the app. Draft canvas:
  https://claude.ai/artifact/HU7xNdTZGsNUwtjCvob5dF (hunt map with a hideout picked, checked-in visit, hunting circle).
- Layout and behaviour unchanged (§1); `night` palette, no accent. The map is the scene: flat `field`, water and streets
  as `field`/`ink`/`paper` mixes, outside the play area dimmed with no edge line. The bottom sheet is the `ink`
  foreground with a `paper` snowbank along its top. Hideouts are `ink` tiles with the cut corner; the picked one gets
  one bold orbit, which closes as the visit counts. The hunting circle is a small night-sky scene with the legi mark
  as a star.
- Review 1: the floating buttons (re-center and Wanted) were different sizes; both are now 64 px squares. Navigate's text was
  tight in a three-button row, so Navigate and Address share a row and the main action (Arrived, Leave) runs full width below.
- The caught team's button is a statement in the players' voice: "Santas caught us", not "Santas caught you?".
- Built in Sheriffs vs Chickens (the-hunt PR #98) as drafted, with one change: the draft's hideout markers showed
  category icons, but the app's markers show the last visitor (yours, a rival's, nobody's), and changing what players
  see is a game-rule change. The build keeps that information: your team's tile is framed in `paper`, a rival's is
  `ink`, an unvisited one a sky shade (`--rg-second`). The zone circle uses a thin, softened line so the picked
  hideout's ring stays the one bold element.
- Open for Jens: everything else is a proposal until he reviews it.

## Objects that leave the screen (2026-11-22)

- A legi version of the Wanted poster was considered and dropped: Jens finds the current Western poster (Rye, aged
  paper) good as it is. It gets printed and pinned up, so its context is different: it should evoke a Wild West
  handbill, not the app.

**Decision (approved by Jens):** §1 now exempts objects made to be printed, saved or shared (the Wanted poster, printed
or as a saved image). Inside the app the poster stays as drawn; the card and buttons around it follow the rules.

## Igel Gym palette (2026-11-22)

Jens likes Igel Gym's existing colours (dark slate, one green), so the app gets its own palette `igel`, formalised from
`public/styles.css`, instead of the recommended `checker`. field `#0f1115`, ink `#060709`, paper `#eef0f4`, accent
`#4ade80`. Card, card2 and line become field/paper mixes; warn, bad and info stay semantic and outside
the palette. The app's light theme (green on `#f5f6f8`) doesn't fit one palette per app and is dropped or handled in the app.
Jens doesn't want the big-moment flip in this app: no flip palette, `igel` on every screen.
**Decision (approved by Jens).**

## Fjällripa palette: `ripa` (2026-11-22)

- Built from a photo of a rock ptarmigan in winter plumage, sampling the bird only (not the ground): feather shadow
  `#a09386` (field), beak/tail `#2b2a28` (ink), plumage `#ece8e3` (paper), eye comb `#db341a` (accent).
- Replaces the earlier `morioh` suggestion. Quiet on purpose: most of the app is white paper; the field is the
  feather shadow, so there is no loud colour block.
- Contrast: ink on field 4.8:1, ink on paper 11.8:1, accent on paper 3.8:1 (large text and icons only, not body text).
- **Decision (approved by Jens):** Fjällripa has no flip palette. Hazard colours stay semantic (open question 3).

## No flip palettes (2026-11-23)

**Decision (approved by Jens):** big-moment palette flips are removed for every app. Each app uses its own palette on every
screen; a big moment is marked with layout, scale and the one accent, not a palette change.

## Avalanche danger scale (2026-11-23)

Fjällripa's orange avalanche box broke the palette rule, and Jens wanted the standard danger colours for the level number
anyway. **Decision (approved by Jens):** the European Avalanche Danger Scale is allowed outside the palette, only to show a
danger level: 1 green `#ccff66`, 2 yellow `#ffff00`, 3 orange `#ff9900`, 4 red `#ff0000`, 5 red and black check. A solid tile with an
ink numeral (paper on 5), `scales/avalanche.css`. Nothing else in the chrome takes warning or hazard colours.

## Icons lifted everywhere (2026-11-23)

The rules page had its icons brightened with a filter (brightness 1.5, saturate 1.15), which read better on the classic sand and night fields. Jens wants the same everywhere, so the rule moves into the design: `icons/natural.css` holds the lifted values and apps draw them unfiltered. Colours that clip (tan, gold, snow, grey, stone) go to near-white or yellow; tune them in `natural.css` if they are too hot.

**Decision (approved by Jens).**

## Crumb Radar palette: `radar` (2026-11-24)

Crumb Radar's old look (white/teal-grey, coral-red, light and dark themes, rounded cards) broke most of the rules. Proposal: its own palette
`radar`, "Phosphor": field `#0f3d3a`, ink `#041211`, paper `#e8f2e6`, accent `#ff4f9a`. Reasons: a radar scope is the app's
idea; the hot pink ping is the colour the specks are already painted in, so the accent *is* the hero (specks); no other app is
green-teal (`night` is blue, `igel` near-black). No flip palette, no light theme. **Decision (approved by Jens).**

## In-world UI (XR) (2026-11-25)

Fjällripa's XR views (VR tabletop, phone AR) needed rules for panels in 3D: distance, text size, following, depth.
**Decision (approved by Jens, revisable; fjallripa issue #41):** `DESIGN.md` section 9 records what Fjällripa's panels use. Measured numbers and reasons are in `research/xr-panels.md`. No tokens changed.

## Open

- Type pairing is a draft (from the specimen); not yet reviewed by Jens.
- Which icon parts each app recolours: decided per app in Phase 2.
- Which palette each app gets: decided per app in Phase 2 (Igel Gym: `igel`; Fjällripa: `ripa`).
