# ukunconferences.org

A static site, served by Apache straight from this repo at
`/var/www/ukunconferences` via the Cloudflare Tunnel (see
`server-scripts/CLOUDFLARE-TUNNEL.md`). Changes are live once built.

## Editing

1. Edit or add `data/events/<id>.json` (series are in `data/series.json`).
2. Run `./build.py` (needs python3-jinja2; `--check` validates only).

Never edit `index.html`, `js/data.js`, `sitemap.xml` or the `<series>/` folders
by hand: they are generated. Design lives in `templates/` and `css/`.

`path` is the event's public URL: don't change it once people may have linked.

## Event fields

Required: `id` (same as the file name), `series`, `path`, `year`, `date`,
`location`, `blurb`, `source` (fact-checking note, not shown).

Optional; each section appears only when filled in:

- `committee`: `[{name, role?, source}]`. `source` is the public page that
  already names them.
- `sponsors`, `notes` (notes taken), `writeups`, `media` (photos and video),
  `links`: `[{title, url, publisher?, date?}]`
- `sessions`, `rooms`, `sessionGrid`: see `govcampcymru2026.json`. Topics only:
  the build refuses pitchers' names.
- `attendees`, `website` (instead of the series site), `label` (replaces the
  year in the title), `order` (position within its year on the home page).

Link to notes on the organisers' own pages; don't copy them into this public repo.
