# josephines-baking

josephinesbaking.com — Next.js pages router, deployed by Vercel on every push to `main`.

Recipes are not in this repo. They live in the Google Sheet `Josephines Baking Recipes`
(tab **Recipes**), which `lib/recipes.js` reads as a public CSV export. Only the photos are
committed here.

## Adding a recipe

**Order matters. Do the sheet row first, the photo push last.**

1. **Add the row to the sheet** — columns A–J are Title, Slug, Post Body, Publish Date, Status,
   Cover Image, Tags, SEO Title, SEO Description, Category. Publish Date drives every "latest
   recipe" position on the site, so it must be the real date and it must parse (`YYYY-MM-DD`).
2. **Add the photo** to `public/photos/recipes/<slug>.jpg`, resized to 1600px on the long edge.
3. **Generate its thumbnail** into `public/photos/thumbs/<slug>.jpg` — always lowercase `.jpg`,
   whatever the original extension was. `scripts/thumbs.sh` regenerates all of them, or do the
   one file with the same `sips` call the script uses.
4. **Commit and push both images.** This is the step that makes the new recipe appear everywhere
   at once, and it is why it goes last — see below.

### Why the order matters

Every page caches its copy of the sheet for an hour (`revalidate: 3600`). A brand-new recipe's
own page is the one exception: `[slug].js` uses `fallback: 'blocking'`, so it builds on first
request and is live the moment the row exists.

Everything else — the homepage and `/recipes` — was already built, so it keeps serving the older
list until either the hour is up or a new deployment rebuilds it. Pushing the photo *after* the
row is what forces that rebuild against a sheet that already contains the recipe, so the whole
site updates together in about the length of a build.

Push the photo first and you get the worst case: the deploy rebuilds the homepage from a sheet
that does not have the recipe yet, then the row lands with nothing left to trigger a rebuild, and
the homepage stays an hour behind. That happened on 2026-09-05.

## Where a new recipe shows up

All of it is automatic, driven by Publish Date, newest first. Nothing is hand-picked.

`pages/index.js` sorts every recipe that has a title, a slug and a cover image, then splits the
list: `featured` is the newest 4, `recent` is the next 6. The homepage spends them like this:

| Section | Recipes | Source |
| --- | --- | --- |
| Welcome hero — tall photo plus the two beside it | newest 3 | `featured.slice(0, 3)` |
| This week / worth making — large card plus three | newest 4 | `featured[0]`, `featured.slice(1, 4)` |
| Keep exploring / more to make | the 6 after those | `recent.slice(0, 6)` |

Every one of those photos links to `/recipes/<slug>`. `pages/recipes/index.js` sorts the same
way, so the recipes page runs newest to oldest.

Because all three homepage sections read one sorted list, a new recipe pushes everything down by
one: it takes the hero, the old hero slides across, and the recipe that was last in "keep
exploring" drops off.

## The Status column is decorative

The site renders every row regardless of what Status says. It is not a draft switch — a row in
the sheet is public.

## Working on it

```bash
npm run dev
npm run build
```
