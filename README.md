# design

The shared identity for every legi app: one form language (*reduced graphic*), one palette per app, and the
legi mark hidden as an Easter egg.

| File | What |
|---|---|
| `DESIGN.md` | The rules. Start here. |
| `tokens.css` | Shared tokens and classes: line weights, cut-corner button, type, spacing, background techniques. |
| `palettes/` | One file per palette (`--rg-field`, `--rg-ink`, `--rg-paper`, `--rg-accent`) with its flip palette noted. |
| `assets/legi-mark.svg` | The mark, in `currentColor`. |
| `icons/` | The icon set: `svg/` (one file per icon), `icons.css` (the four looks), `index.js` (`iconSvg`, `byReplaces`), `meta.json`. Rebuild with `node scripts/build-icons.mjs`. |
| `specimen/icons.html` | Every icon in all four looks. |
| `specimen/index.html` | Live reference: switch palettes, backgrounds and line weights on a sample screen. Open it in a browser. |
| `research/` | How and why the rules were chosen. |

## Use in an app

```sh
bun add github:curly-virly/design#v0.2.0
```

```css
@import "legi-design/tokens.css";
@import "legi-design/palettes/<palette>.css";
@import "legi-design/icons/icons.css";
```

```js
import { iconSvg } from "legi-design/icons/index.js";
```

Set `data-palette="<palette>"` on the root (or on a single screen for a big moment's flip).

Changes reach an app only when it bumps the tag. Planning and open work: vps-app-hosting issue #60.

## Versions

- **v0.2.0**: the icon set (99 icons replacing emoji and Lucide), `icons/icons.css` (solid, line, fill, colour), `specimen/icons.html`.
- **v0.1.0**: rules, tokens, palettes, mark, specimen.
