// Builds icons/index.js and specimen/icons.html from icons/svg/*.svg and icons/meta.json, and checks every icon.
// Run after adding or changing an icon: node scripts/build-icons.mjs
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const meta = JSON.parse(readFileSync(join(root, "icons/meta.json"), "utf8"));
const files = readdirSync(join(root, "icons/svg")).filter((f) => f.endsWith(".svg")).map((f) => f.slice(0, -4)).sort();
const errors = [];
const GROUPS = ["teams", "christmas", "places", "game", "gym", "ui"];
const ROLES = new Set(["shape", "line", "detail", "dot"]);
const NATURAL = [...readFileSync(join(root, "icons/natural.css"), "utf8").matchAll(/--rg-natural-([a-z]+):/g)].map((x) => x[1]);

for (const n of files) if (!meta[n]) errors.push(`${n}.svg has no entry in meta.json`);
for (const n of Object.keys(meta)) if (!files.includes(n)) errors.push(`meta.json lists ${n} but icons/svg/${n}.svg is missing`);

const seen = new Map();
const icons = {};
for (const name of Object.keys(meta)) {
  const m = meta[name];
  if (!/^[a-z][a-z0-9-]*$/.test(name)) errors.push(`${name}: name must be kebab-case`);
  if (!GROUPS.includes(m.group)) errors.push(`${name}: unknown group ${m.group}`);
  for (const r of m.replaces ?? []) {
    if (seen.has(r)) errors.push(`${name}: "${r}" is already replaced by ${seen.get(r)}`);
    seen.set(r, name);
  }
  let src;
  try { src = readFileSync(join(root, `icons/svg/${name}.svg`), "utf8"); } catch { continue; }
  if (!src.includes('viewBox="0 0 24 24"')) errors.push(`${name}: viewBox must be 0 0 24 24`);
  if (!/stroke-width="1\.5"/.test(src)) errors.push(`${name}: stroke-width must be 1.5 on the root (one line weight)`);
  const inner = src.replace(/^[\s\S]*?<svg[^>]*>/, "").replace(/<\/svg>\s*$/, "").trim();
  for (const [, tag] of inner.matchAll(/<([a-z]+)/g)) if (!["path", "circle", "ellipse"].includes(tag)) errors.push(`${name}: <${tag}> not allowed (path, circle, ellipse)`);
  if (/stroke-width=/.test(inner)) errors.push(`${name}: no stroke-width on parts (one line weight)`);
  const parts = [...inner.matchAll(/<(?:path|circle|ellipse)\b[^>]*>/g)].map((x) => x[0]);
  if (!parts.length) errors.push(`${name}: empty`);
  for (const p of parts) {
    const role = p.match(/class="([^"]+)"/)?.[1];
    if (!ROLES.has(role)) errors.push(`${name}: part without a role class: ${p.slice(0, 60)}`);
    if (role === "dot" && !/fill="currentColor"/.test(p)) errors.push(`${name}: dot needs fill="currentColor"`);
  }
  if (role(parts, "detail") && !role(parts, "shape")) errors.push(`${name}: a detail needs a shape to sit in`);
  if (m.group !== "ui" && !role(parts, "shape")) errors.push(`${name}: needs at least one shape so it can carry colour (only interface glyphs may be lines alone)`);
  const painted = parts.filter((p) => /class="(shape|line)"/.test(p)).length;
  const hasDetail = role(parts, "detail") || role(parts, "dot");
  if (m.group !== "ui" && !m.parts) errors.push(`${name}: needs parts in meta.json: a name and a realistic colour for every shape and line`);
  if (m.parts) {
    const names = Object.keys(m.parts);
    if (names.length !== painted) errors.push(`${name}: parts names ${names.length} parts but the drawing has ${painted} shapes and lines`);
    for (const k of names) if (!/^[a-z][a-z0-9-]*$/.test(k) || k === "detail") errors.push(`${name}: part name ${k} must be kebab-case and not "detail"`);
    for (const c of Object.values(m.parts)) if (!NATURAL.includes(c)) errors.push(`${name}: unknown colour ${c} (icons/natural.css)`);
  }
  if (m.detail && !NATURAL.includes(m.detail)) errors.push(`${name}: unknown detail colour ${m.detail} (icons/natural.css)`);
  if (m.detail && !hasDetail) errors.push(`${name}: detail colour set but the drawing has no detail or dot`);
  icons[name] = {
    label: m.label, group: m.group, replaces: m.replaces ?? [],
    ...(m.parts ? { parts: m.parts, detail: hasDetail ? (m.detail ?? "ink") : undefined } : {}),
    body: inner.replace(/\n/g, ""),
  };
}
function role(parts, r) { return parts.some((p) => p.includes(`class="${r}"`)); }

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}

// Writes each part's colour (--rg-c) into the markup. Shared by index.js (serialised) and the specimen.
function paintBody(name, icon, colors) {
  const safe = (v) => {
    if (typeof v !== "string" || !v || /[;"'<>{}]/.test(v)) throw new Error(`Bad colour for ${name}: ${v}`);
    return v;
  };
  if (typeof colors === "string") {
    const c = safe(colors);
    return icon.body.replace(/class="(shape|line)"/g, (m) => `${m} style="--rg-c:${c}"`);
  }
  const over = colors ?? {};
  const names = Object.keys(icon.parts ?? {});
  for (const k of Object.keys(over)) if (k !== "detail" ? !names.includes(k) : !icon.detail) throw new Error(`${name} has no part ${k}`);
  if (!icon.parts) return icon.body;
  let i = 0;
  const value = (part, c) => (over[part] ? safe(over[part]) : `var(--rg-icon-${name}-${part}, var(--rg-natural-${c}))`);
  const detail = icon.detail ? value("detail", icon.detail) : "";
  return icon.body
    .replace(/class="(shape|line)"/g, (m) => { const part = names[i++]; return `${m} style="--rg-c:${value(part, icon.parts[part])}"`; })
    .replace(/class="(detail|dot)"/g, (m) => `${m} style="--rg-c:${detail}"`);
}

const js = `// Generated by scripts/build-icons.mjs from icons/svg and icons/meta.json. Don't edit by hand.
/** @type {Record<string, {label: string, group: string, replaces: string[], parts?: Record<string, string>, detail?: string, body: string}>} */
export const icons = ${JSON.stringify(icons, null, 1)};

/** Icon name for an emoji or a Lucide component name it replaces, e.g. byReplaces["🤠"] === "sheriff". */
export const byReplaces = ${JSON.stringify(Object.fromEntries(seen), null, 1)};

/** Part names of an icon in drawing order, with their default colour names (icons/natural.css), plus "detail". */
export function iconParts(name) {
  const icon = icons[name];
  if (!icon) throw new Error(\`Unknown icon: \${name}\`);
  return { ...(icon.parts ?? {}), ...(icon.detail ? { detail: icon.detail } : {}) };
}

${paintBody.toString()}

/**
 * SVG markup for one icon; needs icons/icons.css (and icons/natural.css for the default colours).
 * colors:
 *   - omitted: every part in its realistic default colour (meta.json), overridable in CSS with
 *     --rg-icon-<name>-<part> (e.g. --rg-icon-reindeer-antlers) or app-wide with --rg-natural-<colour>.
 *   - an object: recolour single parts by name, e.g. { antlers: "#fff", detail: "var(--rg-ink)" }; the rest keep
 *     their defaults. iconParts(name) lists the names.
 *   - a string: the whole icon in one colour as a silhouette, details cut out (e.g. "currentColor").
 * Interface glyphs have no named parts: they take currentColor, or the string given.
 * label: accessible name; pass "" for a decorative icon next to text.
 */
export function iconSvg(name, { colors, label, className = "" } = {}) {
  const icon = icons[name];
  if (!icon) throw new Error(\`Unknown icon: \${name}\`);
  const body = paintBody(name, icon, colors);
  const text = label ?? icon.label;
  const cls = ["rg-icon", className].filter(Boolean).join(" ");
  const a11y = text ? \`role="img" aria-label="\${text.replace(/"/g, "&quot;")}"\` : 'aria-hidden="true"';
  return \`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="\${cls}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" \${a11y}>\${body}</svg>\`;
}
`;
writeFileSync(join(root, "icons/index.js"), js);

// specimen page: every icon in its default colours on paper and on the field, as a one-colour silhouette, and its
// part names; palette switch
const svg = (n, colors) => `<svg viewBox="0 0 24 24" class="rg-icon" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paintBody(n, icons[n], colors)}</svg>`;
const chips = (n) => icons[n].parts ? Object.entries({ ...icons[n].parts, ...(icons[n].detail ? { detail: icons[n].detail } : {}) })
  .map(([k, c]) => `<i style="--sw:var(--rg-natural-${c})" title="${c}">${k}</i>`).join("") : "<i>currentColor</i>";
const GROUP_NAMES = { teams: "Teams and characters", christmas: "Christmas", places: "Places", game: "Game", gym: "Gym", ui: "Interface" };
const sections = GROUPS.map((g) => {
  const names = Object.keys(icons).filter((n) => icons[n].group === g);
  return `<section><h2>${GROUP_NAMES[g]} <span>${names.length}</span></h2><div class="grid">${names
    .map((n) => `<article><div class="trio">${svg(n)}<span class="field">${svg(n)}</span>${svg(n, "currentColor")}</div><div class="parts">${chips(n)}</div><b>${n}</b><small>${icons[n].replaces.map((r) => r.replace(/&/g, "&amp;")).join(" ")}</small></article>`)
    .join("")}</div></section>`;
}).join("\n");
const palettes = readdirSync(join(root, "palettes")).filter((f) => f.endsWith(".css")).map((f) => f.slice(0, -4)).sort();
const html = `<!doctype html>
<!-- Generated by scripts/build-icons.mjs. Don't edit by hand. -->
<html lang="en" data-palette="stardust">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>legi icons</title>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wdth,wght@62..125,400..900&family=Familjen+Grotesk:wght@400;600&family=JetBrains+Mono:wght@500&display=swap">
<link rel="stylesheet" href="../tokens.css">
${palettes.map((p) => `<link rel="stylesheet" href="../palettes/${p}.css">`).join("\n")}
<link rel="stylesheet" href="../icons/icons.css">
<link rel="stylesheet" href="../icons/natural.css">
<style>
  body{margin:0;background:var(--rg-paper);color:var(--rg-ink);font-family:var(--rg-font-body);padding:32px max(16px,4vw) 64px}
  header{display:grid;gap:12px;max-width:70ch;margin-bottom:24px}
  h1,h2{font-family:var(--rg-font-display);font-variation-settings:"wdth" 68;font-weight:850;text-transform:uppercase;line-height:.92;margin:0}
  h1{font-size:var(--rg-text-2xl)} h2{font-size:var(--rg-text-lg);margin:40px 0 12px;border-bottom:var(--rg-line) solid var(--rg-ink);padding-bottom:8px}
  h2 span,small,.legend{font-family:var(--rg-font-mono);font-size:var(--rg-text-xs);letter-spacing:.1em;font-weight:500;opacity:.7}
  .controls{display:flex;flex-wrap:wrap;gap:8px}
  .controls button{font:500 11px var(--rg-font-mono);letter-spacing:.12em;text-transform:uppercase;padding:8px 12px;border:var(--rg-line) solid var(--rg-ink);background:none;color:inherit;cursor:pointer}
  .controls button[aria-pressed=true]{background:var(--rg-ink);color:var(--rg-paper)}
  .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:20px 16px}
  article{display:grid;gap:4px}
  .trio{display:flex;gap:12px;padding:8px 0}
  .trio .rg-icon{width:32px;height:32px}
  .field{display:flex;padding:6px 8px;margin:-6px 0;background:var(--rg-field)}
  .parts{display:flex;flex-wrap:wrap;gap:4px 8px}
  .parts i{font:500 10px var(--rg-font-mono);font-style:normal;letter-spacing:.04em;display:inline-flex;align-items:center;gap:4px}
  .parts i[style]::before{content:"";width:10px;height:10px;background:var(--sw);box-shadow:0 0 0 .5px color-mix(in oklab,var(--rg-ink) 40%,transparent)}
  b{font-weight:600;font-size:var(--rg-text-sm)}
</style>
</head>
<body>
<header>
  <div class="legend">LEGI DESIGN · ICONS · ${Object.keys(icons).length}</div>
  <h1>Icons</h1>
  <p>Samurai Jack style: flat shapes with no outline; ink lines only for detail inside a shape. Every shape and line is a named part with its own colour, by default the realistic one (a brown reindeer). Each icon is shown in its default colours on paper and on the palette field, then as a one-colour silhouette (<code>iconSvg(name, { colors: "currentColor" })</code>). Under it: its parts and their default colours; recolour any of them with <code>iconSvg(name, { colors: { antlers: "#fff" } })</code> or the CSS variable <code>--rg-icon-&lt;icon&gt;-&lt;part&gt;</code>. Then the emoji or Lucide icon it replaces.</p>
  <div class="controls" id="pal">${palettes.map((p) => `<button data-p="${p}" aria-pressed="${p === "stardust"}">${p}</button>`).join("")}</div>
</header>
${sections}
<script>
  document.getElementById("pal").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    document.documentElement.dataset.palette = b.dataset.p;
    for (const x of document.querySelectorAll("#pal button")) x.setAttribute("aria-pressed", x === b);
  });
</script>
</body>
</html>
`;
writeFileSync(join(root, "specimen/icons.html"), html);
console.log(`${Object.keys(icons).length} icons OK: wrote icons/index.js and specimen/icons.html`);
