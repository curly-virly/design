# design

The shared identity for every legi app: one form language (*reduced graphic*), one palette per app, and the
legi mark hidden as an Easter egg.

| File | What |
|---|---|
| `DESIGN.md` | The rules. Start here. |
| `tokens.css` | Shared tokens and classes: line weights, cut-corner button, type, spacing, background techniques. |
| `palettes/` | One file per palette (`--rg-field`, `--rg-ink`, `--rg-paper`, `--rg-accent`). |
| `assets/legi-mark.svg` | The mark, in `currentColor`. |
| `icons/` | The icon set: `svg/` (one file per icon), `icons.css` (how parts take colour), `natural.css` (the default colours), `index.js` (`iconSvg`, `iconParts`, `byReplaces`), `meta.json`. Rebuild with `node scripts/build-icons.mjs`. |
| `specimen/icons.html` | Every icon in its default colours, on paper and on the field, in one colour, with its part names. |
| `specimen/index.html` | Live reference: switch palettes, backgrounds and line weights on a sample screen. Open it in a browser. |
| `research/` | How and why the rules were chosen. |

## Use in an app

```sh
bun add github:curly-virly/design
```

```css
@import "legi-design/tokens.css";
@import "legi-design/palettes/<palette>.css";
@import "legi-design/icons/icons.css";
@import "legi-design/icons/natural.css";
```

```js
import { iconSvg } from "legi-design/icons/index.js";
```

Set `data-palette="<palette>"` on the root.

Apps follow `main`. The app's lockfile records the commit it uses, and `bun update legi-design` moves it to the latest. No tags or releases. Planning and open work: vps-app-hosting issue #60.
