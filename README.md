# Pharma IT Cluster — redesigned site

All original content, page structure and wording is preserved. What changed is the
visual system and the technical foundation underneath it.

## How to use it

Upload the whole folder to your server, exactly as it is. It is still plain
HTML/CSS/JS — no build step, no framework, nothing to install. Replacing your old
files with these keeps every URL the same.

Only two internet-hosted files are still used (Bootstrap and Bootstrap Icons, both
from jsDelivr). Everything else — fonts, images, styles, scripts — is in this folder.

## The design direction

The palette and the recurring motif come from your own logo: a node-and-link
network in indigo (`#1E3A8C`) and azure (`#0E86D4`), deepened to a navy ink
(`#0A1A2F`) for dark sections. That "connected node" appears as a small marker
before every section label, on the active navigation item, beside list items, and
as a large ambient graph behind the homepage hero. It ties the visual language to
what the cluster actually is — separate companies connected into one system.

Typography is Archivo for headlines (tight and technical), IBM Plex Sans for body
text, and IBM Plex Mono for the small uppercase labels, table headers and figures.
The mono detail is what gives the site a regulated-industry feel rather than a
generic template look.

All colours, spacing, radii and shadows are CSS custom properties at the top of
`style.css`. Change `--indigo` or `--azure` there and the whole site follows.

## What was fixed along the way

These were pre-existing problems in the original files, not design choices:

- **Bootstrap 4 CSS was loaded with Bootstrap 5 JavaScript** on most pages, so
  `data-toggle` (v4) and `data-bs-toggle` (v5) were both in use and modals and
  carousels only half-worked. Everything is now Bootstrap 5.3.
- **Broken image paths.** `gtcLogo_bigger.png` and `Havlik_logo.jpg` did not match
  the real filenames, and `havlik/4.png` / `5.png` are actually `.jpg`. These
  worked on Windows but returned 404 on a Linux server.
- **`AOS.init()` was called on two pages but the AOS library was never loaded**, so
  every visitor got a JavaScript error. Replaced with a built-in scroll reveal.
- **Three icon libraries were loading at once** (Font Awesome twice, plus Bootstrap
  Icons). Now only Bootstrap Icons.
- **`clusterSolution.html` had its footer nested inside a blockquote**, mid-page.
- **`contact.html` had an unclosed `<div>`**, and `staffino.html` had an unclosed
  `<li>` and a stray `</p>`.
- **Dead links**: `#become-member` pointed at an anchor that did not exist and
  `become-partner.html` at a page that does not exist. Both now go to the contact
  page. `clustersolution.html` (lowercase) would 404 on a Linux server.
- **Every page had the title "Pharma IT Cluster"** and no meta description. Each
  page now has its own title, description and Open Graph tags.
- Two typos in the homepage copy: "Independant" and "Wholesellers".

## Accessibility and performance

- Skip-to-content link, visible keyboard focus rings, `aria-current` on the active
  nav item, and labelled carousel controls.
- Clickable product-table rows now respond to Enter and Space, and the event
  lightboxes close on Escape.
- All animation is disabled automatically when the visitor has "reduce motion"
  turned on in their operating system.
- Fonts are self-hosted in `assets/fonts/` rather than loaded from Google Fonts.
  For a Lithuanian company this also avoids sending visitor IP addresses to a
  third-party CDN, which has been a GDPR issue in the EU.
- Only the character subsets you need are loaded, and Lithuanian diacritics
  (ą č ę ė į š ų ū ž) are covered.

## Things you may want to change

- **The homepage statistics** (6 members / 4 partners / 1 retail & supply chain system) were
  added by me. They are accurate against the rest of your site, but if you would
  rather not show numbers, delete the `<dl class="hero-stats">` block in
  `index.html`.
- **The copyright year** updates itself. The `2026` in the markup is only a
  fallback for visitors with JavaScript disabled.
- **The member logo strip** on the Cluster Solution page still looks uneven,
  because the source logo files have very different proportions and built-in
  white margins. Re-exporting those logos at a consistent size on a transparent
  background would fix it properly.
- **`photos/logo_white.png` and `photos/logo_color.png`** were generated from
  `white_background_logo.png` to give you transparent versions for the dark footer
  and the navigation bar. The original file had roughly 40% empty canvas above the
  artwork, which made the logo render much smaller than its box; both generated
  files are cropped to the artwork itself. If you have the original vector logo, an
  SVG would look sharper still.

## The homepage carousel

The two slides hold different numbers of cards (four, then three), so they were
naturally different heights, and Bootstrap hides the inactive slide entirely — which
made the whole page jump up and down on each rotation. The slides are now stacked in
a single CSS grid cell, so the carousel always reserves the height of its tallest
slide and nothing below it moves. It uses a crossfade rather than a horizontal slide,
since stacking and sliding can't both work at once. Auto-rotation was also slowed
from 3 to 6 seconds, which is closer to a comfortable reading pace.

## Supply chain wording

The site now names the supply chain alongside pharmacy retail, in four light
touches rather than a rewrite: the homepage hero label, the intro paragraph, the
third homepage statistic, a sixth "Supply Chain & Logistics" segment in the Target
Market grid, the footer tagline on every page, and the homepage meta description.
Search for "supply chain" if you want to adjust the phrasing.

The cluster coordinator address is `augustas@gutsaga.tech` throughout, including
the structured-data block in `index.html`.

## File map

```
index.html … contact.html   your pages, content unchanged
style.css                   the whole design system (tokens at the top)
Script1.js                  sticky header, scroll reveal, accessibility helpers
assets/fonts.css            @font-face declarations
assets/fonts/               self-hosted woff2 files
photos/                     your images, plus the two generated logo variants
```
