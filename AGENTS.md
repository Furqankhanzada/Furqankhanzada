# Notes for coding agents

This is a hand-written static site. There is **no framework, no build step, no package manager**.
Do not add one, and do not introduce `package.json`, a bundler, TypeScript, or a CSS framework
unless the owner explicitly asks.

## Rules

- Everything in the repo root is served verbatim by GitHub Pages. A file you add is a file that
  ships.
- Reference assets with root-relative paths (`/styles.css`), not relative ones.
- Keep `index.html`, `styles.css` and `main.js` as the only three page files. New styles go in
  `styles.css`, not in `<style>` blocks or inline `style=` attributes.
- `README.md` is the GitHub **profile** README for `Furqankhanzada/Furqankhanzada` and renders on
  the profile page. Do not edit it for site reasons — this site's docs live in `SITE.md`.
- `main.js` is plain ES5-compatible script in an IIFE, loaded with `defer`. No modules, no imports,
  no dependencies.
- Design tokens are CSS custom properties at the top of `styles.css`. Use them; never hardcode a
  hex value in a rule.
- The inline script in `<head>` sets `data-theme` before first paint. Do not move it to `main.js` —
  that reintroduces the theme flash.
- The two Consent Mode `default` blocks must stay **above** the GTM snippet in `<head>`, in order:
  the `region`-scoped denied one first, the global granted one second. Tags that fire before those
  defaults land would set cookies without consent, and swapping the order makes the global grant
  win everywhere. The stored-choice replay must stay in the `<head>` too — in `main.js` it would
  run after GTM and lose the first pageview, and a stored "denied" would be briefly overridden.
- The banner in `main.js` only decides whether to *ask*; enforcement is Google's region default.
  It appears on European timezones only, so a wrong guess costs analytics, never a cookie set
  without permission. Don't "fix" it by adding a geo-IP lookup — that's a tracking request of its
  own, made before consent.

## Content lives in three places

When you change a fact (a role, a project, a date, a link), update all three or the page and the
structured data disagree:

1. The visible markup in `index.html`
2. The `application/ld+json` block in `index.html` (Person, ProfilePage, ItemList)
3. `about.md` and `llms.txt`

## Verifying a change

Open `index.html` in a browser and check:

- Both themes (click the toggle), at desktop and ~400px width
- The console is clean
- The canvas background still animates and survives a window resize
- If you touched JSON-LD: paste it into the Google Rich Results Test or Schema Markup Validator

## Deployment

Push to `main`. GitHub Pages serves its root. `CNAME` holds the custom domain and `.nojekyll`
stops Jekyll processing — do not delete either.
