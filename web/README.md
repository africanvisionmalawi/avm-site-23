# AVM charity web site built with Eleventy

A static site built with [Eleventy](https://www.11ty.dev/). All content lives in
the repo: page text and structure in markdown under `web/content/`, images in
`web/public/images/` and PDFs/downloads in `web/public/files/`. There is no CMS.

## Editing content

| What | Where |
| --- | --- |
| Home page | `web/content/home.md` |
| Our Work page | `web/content/our-work.md` |
| Site pages | `web/content/pages/<section>/<page>.md` (`index.md` = the section page). The file path is the URL. |
| News posts | `web/content/news/*.md` — the URL is `/news/<slug>` (the file name if there's no `slug:`) |
| Events | `web/content/events/*.md` — the URL is `/events/<slug>` (the file name if there's no `slug:`) |
| Shop products | `web/content/shop/*.md` — `hide: true` hides a product; a product needs a `slug:` to appear |
| Shop categories | `shopTags` in `web/content/site-settings.json` (a product's first tag decides its category) |
| Old news archive | `web/newsposts/` |

Each file has YAML frontmatter (title, description, hero, page sections, etc.)
followed by the markdown body. Fields ending in `Markdown` (e.g.
`excerptMarkdown`, `linkTextMarkdown`) are markdown strings.

Pages in `content/pages/_uncategorized/` are not published.

Links between pages (page-link cards, breadcrumbs) store their target in the
linking file's frontmatter, so if you rename or move a page file, update the
links that point to it too.

A news post can link to an event with
`event: { slug: <event-slug>, title: <title> }`; the event's date, location and
contact details are then shown on the post.

### Images

Put the file in `web/public/images/` and reference it from frontmatter:

```yaml
photo:
  src: /images/my-photo.jpg
  width: 1200        # the file's real pixel size
  height: 800
  alt: Children at Sam's Village
  caption: Optional caption
  focus: 50% 30%     # optional: which part to keep when the image is cropped
```

Resized WebP versions are generated at build time, so upload a reasonably large
original (around 2400px on the long edge is plenty). In markdown bodies use
normal markdown: `![alt text](/images/my-photo.jpg)` (these are served as-is).

### Files

Put PDFs etc. in `web/public/files/` and link to them: `[Annual Report](/files/annual-report.pdf)`.

## Development

```sh
cd web
yarn
yarn dev     # build + local dev server with live reload
yarn build   # build the site into web/_site
yarn start   # serve the built _site with Netlify-style URLs (/about-us/team -> about-us/team.html)
```

Code layout (all under `web/`):

| Path | What |
| --- | --- |
| `eleventy.config.mjs` | Eleventy config: filters, CSS bundling, image generation |
| `site/_data/` | Data for templates: `db.js` (all content), `newsEvents.js`, `navLinks.js`, `site.js` |
| `site/_lib/` | `content.js` (reads `content/`), `image.js` (responsive images) |
| `site/_includes/` | Layout and macros (`components/*.njk`) |
| `site/pages`, `site/news`, `site/events`, `site/shop`, `site/misc`, `site/home.njk` | Page templates |
| `site/css/` | `global.css` + one file per component; bundled by Lightning CSS into `/css/site.css` |
| `site/js/` | Small browser scripts (menu, search, gallery, videos, shop carousel) |
| `public/` | Static files copied to the site root (images, PDFs, favicons) |

## Deployment (Netlify)

`web/netlify.toml` builds with `yarn build` and publishes `web/_site`. Builds run
in UK time (`TZ=Europe/London`).

- Which events count as upcoming or past is decided when the site is built, so
  schedule a daily build (Netlify build hook) to keep the events lists current.
- Environment variables: `NEXT_PUBLIC_SNIPCART_API_KEY` (Snipcart public key)
  and `NEXT_PUBLIC_BASE_URL` (used for canonical links; defaults to
  `https://www.africanvision.org.uk`). The names are kept from the old Next.js
  site so the existing Netlify settings keep working.
- The Gift Aid form uses Netlify Forms (`data-netlify="true"`).
