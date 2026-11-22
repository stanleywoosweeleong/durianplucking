# 树熟 · 割果 · 决策 · 榴梿成熟学 (Durian Ripening & Harvest-Timing PWA)

An offline-capable Progressive Web App that helps durian growers decide **tree-drop vs cut**
harvest timing per clone, track farms/trees across seasons, and see calibration insights.
Three languages (中文 / English / Bahasa Melayu), chosen on first launch and switchable from the header. No backend, no dependencies — a single self-contained page.

## Host on GitHub Pages

1. Create a new repository and add **all files in this folder** to its root
   (`index.html`, `manifest.json`, `sw.js`, the `icon-*.png` files, and `.nojekyll`).
2. Push to the `main` branch.
3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.
4. Wait ~1 minute; your app is live at `https://<username>.github.io/<repo>/`.

All paths are relative, so it works under the `/<repo>/` sub-path with no changes.

## PWA / install

- **Android / Chrome:** open the site → menu → *Install app* / *Add to Home screen*.
- **iOS / Safari:** open the site → Share → *Add to Home Screen* (uses the 180×180 icon).
- Works offline after the first load (service worker caches the app shell).

## Sharing

The share button in the header (and the "Share this app" button in the footer) opens a
dialog with a QR code for the address the app is served from, plus **WhatsApp** and
**Copy link** buttons. The QR code is generated inside the app, so it works offline and
follows the app to whatever address you host it at. The separate QR code in the Science
tab points to the source video, not to the app.

## Files

| File | Purpose |
|------|---------|
| `index.html` | The entire app (UI + logic, single file) |
| `manifest.json` | Web app manifest (name, icons, theme, standalone display) |
| `sw.js` | Service worker (offline cache; same-origin only) |
| `icon-192.png`, `icon-512.png` | Standard PWA icons (`purpose: any`) |
| `icon-192-maskable.png`, `icon-512-maskable.png` | Android maskable icons |
| `icon-180.png`, `icon-167.png`, `icon-152.png` | iOS / iPad home-screen icons |
| `.nojekyll` | Tells GitHub Pages to serve files as-is (no Jekyll processing) |

## Updating

Just push your changes to `main` — there is no version number to bump. GitHub Pages takes a
minute or two to publish.

The app always opens instantly from its saved copy, then checks for changes in the background
(on every launch and whenever it returns to the foreground). If `index.html` has changed,
users see a "new version is ready" toast; tapping **Refresh** loads it. If they dismiss the
toast, the new version appears the next time they open the app.
