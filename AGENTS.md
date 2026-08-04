# Repository Guide

- Static GitHub Pages portfolio: edit `index.html`, `styles.css`, and `script.js` directly. No package manifest, build step, test suite, linter, formatter, or CI config exists.
- Open `index.html` in browser or serve repository with any static HTTP server for visual checks.
- Keep page sections, navigation anchors, and class names aligned between `index.html` and `styles.css`.
- `script.js` is plain browser JavaScript loaded synchronously from `<head>`; DOM bindings must remain safe before DOM readiness. Theme choice persists under `localStorage` key `theme` and uses `<html data-theme>`.
- Site assets use direct paths. Icons and portrait use root-absolute `/img/...` URLs; verify asset paths when testing under non-root hosting. CV link is `Mashuri-Mansur-CV.pdf`.
- `CNAME` configures GitHub Pages custom domain `codehuri.my.id`; preserve it unless changing deployment domain.
