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

## GitHub access

- If the GitHub MCP tools (`mcp__github__*`) fail or are missing, don't stop: use `gh api` instead (e.g. `gh api repos/curly-virly/<repo>/issues -f title=... -f body=...`, `-X PATCH .../issues/N`, `.../issues/N/comments`, `.../pulls`). `gh auth status` may report an invalid token; ignore it, the API calls still work. Project-board (GraphQL) work stays local-only, see `vps-app-hosting/PROJECTS.md`.
