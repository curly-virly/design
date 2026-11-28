# Notes for coding agents

This repo is the shared design system for the legi apps. It has no build and doesn't deploy; apps install
it as a pinned Git dependency.

- `DESIGN.md` is the source of truth. Keep it short: rules, not essays. Put the reasoning in `research/`.
- Every rule change needs Jens's approval first (`decision`). Record the reason in `research/README.md`.
- The legi mark (`assets/legi-mark.svg`) is final: don't redraw it. One stroke weight, one colour.
- Never mix line weights within one element, and never use tapered strokes.
- `tokens.css` sets no colours; colours come only from `palettes/`.
- No tags or releases: apps follow `main` and take changes with `bun update legi-design`. Keep `main` usable;
  a change that breaks how apps use the package needs a note in the PR saying what apps must change.
- Keep `specimen/index.html` in step with the tokens: it's how Jens reviews changes. Check it renders after
  each change.
- Icons: edit `icons/svg/` and `icons/meta.json`, then run `node scripts/build-icons.mjs`; never edit `icons/index.js`
  or `specimen/icons.html` by hand. Check `specimen/icons.html` renders after each change.
- **Use this checkout, not the package, when it's present.** If this repo is checked out next to your app (in cloud
  sessions it's at `/home/user/design`), take tokens, palettes, icons and `DESIGN.md` from it, and point the app at
  it. Pull `legi-design` from `github:curly-virly/design` only when no checkout is there. Don't copy files by hand.
- **Phone screenshots** (landing pages, reviews): `scripts/screenshot.mjs` opens a local URL at phone size, runs an optional
  per-app recipe (a few lines that seed state) and writes a 540 px webp. Needs only Playwright. Each app keeps its own recipe
  and a `bun run screenshots` line; legi.nu's images are refreshed by hand from them.

## Repo map (same text in every repo; canonical copy in `vps-app-hosting/README.md`)

Every repo under `curly-virly` is one of three kinds. In cloud sessions they are checked out side by side at `/home/user/<name>`.

| Kind | What it is | Repos | Deploys? |
|---|---|---|---|
| **App** | A live site or service; users see it | `crumb-radar`, `fjallripa`, `taskmaster`, `the-hunt`, `verflick`, `workout` | Yes: push to `main` |
| **Supporting** | Serves the apps; not an app | `design` (shared design system), `legi-nu` (the legi.nu showcase site: points to the things we want to show off; deploys on push to `main` like an app), `vps-app-hosting` (the server `jolly-dragon`: Caddy, deploy pipeline, logs, issue labels) | `legi-nu`: yes; others no |
| **Project** | Things we make and keep; no users, no server | `3d` (OpenSCAD/STL models), `dnd` (printable paper props), `Circuits` (electronics builds) | No |

- Work in the repo that owns the thing. If a task needs a change in another repo, say so (or open an issue there); don't edit it from here.
- Apps follow `design` for looks and `vps-app-hosting` for anything about the server. Apps only need to know "push to `main` deploys".
- Project repos have no deploy, CI or server: a README per project folder is the documentation. Anything shared across repos (design, server) is not duplicated into them.

## GitHub access

- If the GitHub MCP tools (`mcp__github__*`) fail or are missing, don't stop: use `gh api` instead (e.g. `gh api repos/curly-virly/<repo>/issues -f title=... -f body=...`, `-X PATCH .../issues/N`, `.../issues/N/comments`, `.../pulls`). `gh auth status` may report an invalid token; ignore it, the API calls still work. Project-board (GraphQL) work stays local-only, see `vps-app-hosting/PROJECTS.md`.
- **Issues and branches:** every branch links to its issue. Before starting, find or open the issue (no issue, no branch); comment on it with the branch name when work starts and again when pushed. Put `Refs #N` (or `Fixes #N`) in every commit and PR. When the branch merges or is dropped, say so on the issue.
