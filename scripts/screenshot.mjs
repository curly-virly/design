// Phone screenshot helper for the legi apps: opens a URL at phone size, optionally runs a recipe, and writes a
// webp at landing-page size. Needs only Playwright (resolved from the app you run it in, else global).
//
//   node /home/user/design/scripts/screenshot.mjs --url http://127.0.0.1:8080/ --out shots/home.webp
//     [--recipe scripts/landing-shot.mjs]  module whose default export is async (page) => {...}: click, fill, wait
//     [--phone 390x844] [--width 540] [--quality 85] [--theme dark|light] [--wait 1500] [--live]
//
// A recipe is where an app seeds its demo state; it should be a few lines. Local URLs only, unless --live is given:
// that is for read-only public pages (e.g. Fjällripa); never use it on an app that writes (The Hunt, Verflick, Igel Gym).
// Also importable: `import { shoot } from ".../screenshot.mjs"; await shoot({ url, out, recipe })`.
import { createRequire } from "node:module";
import { mkdirSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { pathToFileURL } from "node:url";

function loadPlaywright() {
  for (const name of ["playwright", "@playwright/test", "playwright-core"]) {
    for (const base of [process.cwd() + "/", import.meta.url]) {
      try { return createRequire(base)(name); } catch {}
    }
    try { return createRequire(process.env.NODE_PATH ? process.env.NODE_PATH + "/x" : "/x")(name); } catch {}
  }
  throw new Error("Playwright not found: install it in the app or set NODE_PATH.");
}

function chromiumPath() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  try {
    const d = readdirSync("/opt/pw-browsers").find((x) => x.startsWith("chromium-"));
    if (d) return ["chrome-linux", "chrome-linux64"].map((s) => `/opt/pw-browsers/${d}/${s}/chrome`).find((p) => { try { readdirSync(dirname(p)); return true; } catch { return false; } });
  } catch {}
}

export async function shoot({ url, out, recipe, phone = "390x844", width = 540, quality = 85, theme = "dark", wait = 1500, live = false }) {
  if (!live && !/^(http:\/\/(127\.0\.0\.1|localhost)[:/]|file:)/.test(url)) throw new Error("Local URLs only (or file:); --live allows a public page.");
  const [w, h] = phone.split("x").map(Number);
  const { chromium } = loadPlaywright();
  const proxy = process.env.HTTPS_PROXY && live ? { server: process.env.HTTPS_PROXY } : undefined;
  const browser = await chromium.launch({ executablePath: chromiumPath(), proxy, args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  try {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: theme });
    const page = await ctx.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto(url, { waitUntil: "load" });
    if (recipe) await (await import(pathToFileURL(resolve(recipe)).href)).default(page);
    await page.waitForTimeout(wait);
    const png = (await page.screenshot()).toString("base64");
    // webp without a dependency: the browser's own encoder, scaled to the landing-page width
    const b64 = await page.evaluate(async ({ png, width, quality }) => {
      const img = new Image(); img.src = "data:image/png;base64," + png; await img.decode();
      const c = document.createElement("canvas"); c.width = width; c.height = Math.round(img.height * width / img.width);
      const g = c.getContext("2d"); g.imageSmoothingQuality = "high"; g.drawImage(img, 0, 0, c.width, c.height);
      return c.toDataURL("image/webp", quality / 100).split(",")[1];
    }, { png, width, quality });
    mkdirSync(dirname(resolve(out)), { recursive: true });
    writeFileSync(out, Buffer.from(b64, "base64"));
    if (errors.length) console.warn("page errors:", errors.join(" | "));
    console.log("wrote", out);
  } finally { await browser.close(); }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const a = process.argv.slice(2), get = (n) => { const i = a.indexOf("--" + n); return i >= 0 ? a[i + 1] : undefined; };
  if (!get("url") || !get("out")) { console.error("Usage: screenshot.mjs --url <local url> --out <file.webp> [--recipe f] [--phone WxH] [--width 540] [--quality 85] [--theme dark|light] [--wait ms] [--live]"); process.exit(1); }
  await shoot({ url: get("url"), out: get("out"), recipe: get("recipe"), phone: get("phone"), width: get("width") && +get("width"), quality: get("quality") && +get("quality"), theme: get("theme"), wait: get("wait") && +get("wait"), live: a.includes("--live") });
}
