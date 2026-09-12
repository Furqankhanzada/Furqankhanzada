# furqan.codes

Personal site for Muhammad Furqan — a single static page, no framework, no build step.

## Serving it

GitHub Pages serves this branch's root directly. Every file here is what ships; there is nothing
to compile and no `node_modules`.

- `CNAME` — custom domain (`furqan.codes`)
- `.nojekyll` — tells Pages to serve files as-is

To point Pages at this branch: **Settings → Pages → Source: Deploy from a branch**, then pick this
branch and the `/ (root)` folder.

## Working on it

Open `index.html` in a browser. That's the whole loop. For a local server (so that root-relative
paths like `/styles.css` resolve):

```
python3 -m http.server 8080
```

## Files

| File | What it is |
| --- | --- |
| `index.html` | The page — markup, meta, JSON-LD |
| `styles.css` | Design tokens + all layout |
| `main.js` | Theme toggle, earlier-roles expander, canvas background |
| `404.html` | Not-found page in the same palette |
| `og.png` | 1200×630 social share image |
| `favicon.ico` | Favicon |
| `robots.txt` | Crawl directives, incl. AI crawlers |
| `sitemap.xml` | One-URL sitemap |
| `llms.txt` | Site summary for LLM agents |
| `about.md` | Full profile as Markdown, for agents that prefer text |

## Design

Implemented from the Claude Design handoff (`design_handoff_personal_site`). Tokens live at the top
of `styles.css`; light mode overrides them under `[data-theme="light"]`. The theme is written to
`localStorage["fc-theme"]` and applied before first paint by an inline script in `<head>`, so
there's no flash.

The background is a 2D canvas drifting tokenized-prompt fragments upward. It respects
`prefers-reduced-motion`. Speed is the `MOTION` constant at the top of that section in `main.js`
(`"calm"` or `"lively"`).

## Editing content

Content lives in three places and all three should move together:

1. `index.html` — what people see
2. `index.html` JSON-LD block — what search engines and LLMs parse
3. `about.md` and `llms.txt` — what agents read

## History

Before this, the site was a Next.js 16 app that exported to static and published to a `gh-pages`
branch. That was more machinery than a one-page site needs. See the `main` branch for that version.
