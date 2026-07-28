# Zyrex

laboratory-material storefront for **www.zyrexbioau.com**. Next.js 16 (App
Router) + React 19 + Tailwind v4, exported as static HTML and served from
GitHub Pages.

Light theme throughout, heavy motion, aimed at a young audience — and every
animation drops out under `prefers-reduced-motion`.

---

## Before you go live

Three things in the repo are placeholders. Nothing else needs touching.

| What | Where | Why it matters |
| --- | --- | --- |
| Address, ABN, email | [`src/lib/site.ts`](src/lib/site.ts) | Shown in the footer, contact page, every policy and the JSON-LD. Currently plausible-looking dummy values. |
| Web3Forms key | repo secret `WEB3FORMS_KEY` | Where orders and contact messages are emailed. Without it the checkout still issues a reference and asks the customer to email it in. |
| Domain | [`public/CNAME`](public/CNAME) | Delete this file if you are not using a custom domain (see below). |

`src/lib/site.ts` is the single source of truth — change it once and the whole
site follows.

## Running it

```bash
npm install
npm run dev
```

```bash
npm run build
```

`npm run build` writes the whole site to `out/`. Serve that folder to see
exactly what GitHub Pages will serve.

## Deploying

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every
push to `main`. In the repo, set **Settings → Pages → Source** to *GitHub
Actions*, and add `WEB3FORMS_KEY` under **Settings → Secrets and variables →
Actions**.

**Live at https://sylrix.github.io/zyrex/** (GitHub Pages) and on Netlify. The
Pages workflow sets `NEXT_PUBLIC_BASE_PATH=/zyrex` and `NEXT_PUBLIC_SITE_URL` to
match, so assets resolve under the subpath and canonicals point at the real URL.
Netlify serves from the domain root and sets its own URL in `netlify.toml`.

**Attaching a custom Zyrex domain** once you own one and DNS points at the host:

1. On Netlify, set the domain in the UI and update `NEXT_PUBLIC_SITE_URL` in
   `netlify.toml` to it. On GitHub Pages, set `NEXT_PUBLIC_BASE_PATH: ''` and
   `NEXT_PUBLIC_SITE_URL` to the domain in `deploy.yml`, and add `public/CNAME`.
2. Whichever host you keep as primary, update the feed URL, return-policy URL
   and site verification inside Merchant Center to the new address.

Those two env vars must always agree with where the site is served. If they
disagree, either every asset 404s or every canonical points at a dead URL.

## How the checkout works

There is no payment server, because there is no server at all.

1. The customer fills in delivery details, picks a **payment preference** —
   card, bank transfer / PayID, Apple Pay or Google Pay — and ticks the
   lab-use and terms declarations.
2. The order is emailed to you via Web3Forms and the customer gets a reference
   (`ZB-YYMMDD-XXXX`).
3. You send an invoice with a secure payment link for the method they chose.
4. Once it clears, you pack and post.

**No card number, expiry, CVC or bank credential is collected anywhere on this
site.** There is no field for one. That is deliberate: a static site cannot
protect payment data, so it never touches it. The same rule applies to the
contact form.

If the Web3Forms key is missing or the request fails, the customer still gets
their reference plus a clear prompt to email it in — an order is never
silently lost.

## SEO

- Per-page `title`, `description`, canonical, Open Graph and Twitter cards
- JSON-LD: `OnlineStore` + `WebSite` site-wide, plus `Product` (with offers,
  shipping and return policy), `BreadcrumbList`, `FAQPage`, `ItemList` and
  `ContactPage` per page
- `sitemap.xml` and `robots.txt` generated at build; cart, checkout and
  order-confirmed are `noindex` **and** disallowed
- `product-feed.xml` — a Google Merchant Center RSS feed, regenerated on every
  build, with the lab-use notice inside every description
- Semantic headings, real breadcrumbs on every interior page, descriptive alt
  text

## Compliance

Everything is sold as **laboratory use only**. The notice lives in one constant
(`RUO_NOTICE` in `src/lib/site.ts`) and appears on the home page, every product
page, the cart, the checkout, the feed and the footer. `/lab-use` is the
full policy, and the checkout will not submit without an explicit declaration.

Zyrex is written throughout as **a sole trader — one individual, not a
company**. There is no "we", no team page, no "our labs", and nothing implying
an incorporated entity. Keep it that way when editing copy.

## Layout

```
src/
  app/            routes — one folder per page, plus sitemap/robots/manifest/feed
  components/
    cart/         provider (localStorage as an external store), drawer, cart page
    checkout/     3-step form, fields, payment preference, confirmation
    home/         hero, stats, featured grid, why, how it works, FAQ, CTA
    layout/       header, footer, logo, announcement ticker, page masthead
    motion/       reveal, marquee, magnetic, tilt, count-up, scroll progress, blobs
    legal/        shared policy-page template
  lib/            site config, catalogue, cart maths, schemas, SEO helpers
```

## Checks

```bash
npm run lint
```

```bash
npx tsc --noEmit
```
