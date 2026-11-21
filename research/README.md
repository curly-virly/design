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

## Open

- Type pairing is a draft (from the specimen); not yet reviewed by Jens.
- Which icon parts each app recolours: decided per app in Phase 2.
- Which palette and flip each app gets: decided per app in Phase 2.
