# Parity review: MkDocs site vs `old_site/html/`

This review compares the current MkDocs migration inputs against the prebuilt legacy Sphinx output in `old_site/html/`.

## Baseline reviewed

Pages inspected from the legacy site:

- `old_site/html/index.html`
- `old_site/html/overview.html`
- `old_site/html/asdf_fits.html`
- `old_site/html/specification/index.html`
- `old_site/html/extensions/index.html`
- `old_site/html/implementations/index.html`
- `old_site/html/tutorials/index.html`
- `old_site/html/community/index.html`

## Items that now match or are intentionally aligned

- page set and section structure are present in MkDocs
- top announcement links are preserved
- favicon and branding assets are preserved
- major page titles/content headings are preserved in Markdown content
- internal links have been normalized to generated `.html` URLs
- the broken legacy home-page `standard/index` link has been fixed to `specification/index.html`
- extension-page order now matches the legacy sidebar order:
  - ASDF Transform Schemas
  - ASDF Coordinates Schemas
  - ASDF WCS Schemas
- implementations index page now includes the language links shown in the legacy site and the new C/Java content from Sphinx
- sidebar label intent has been brought closer to legacy Sphinx labels:
  - `overview`
  - `specification`
  - `extensions`
  - `implementations`
  - `tutorials`
  - `community`
  - implementation children `Python`, `C`, `C++`, `Java`, `Julia`

## Differences still expected or still needing visual review

### 1) Home entry in nav
Current MkDocs navigation includes:

- `Home: index.md`

The legacy Sphinx sidebar did not expose a separate `Home` item in the left nav.

Reason retained for now:
- MkDocs warned when `index.md` was excluded from navigation.
- Keeping it in nav is the simplest stable configuration.

Impact:
- small navigation mismatch from the legacy sidebar

### 2) Theme/layout differences between Furo and Material
The legacy docs pages use Furo; the migrated site uses Material with custom overrides.

Likely remaining differences include:
- sidebar spacing and typography
- exact header/search layout
- code/admonition styling details
- docs-page chrome around content

Impact:
- visual parity may still need a manual browser review page-by-page

### 3) Home page implementation differs structurally
The legacy home page was a custom Jinja/Bootstrap template.
The migrated home page is Markdown plus custom CSS/HTML inside MkDocs Material.

Expected possible differences:
- exact responsive behavior
- exact nav/dropdown behavior on the landing page
- icon rendering and spacing
- hero section proportions

Impact:
- content/intent are preserved, but visual parity may still need refinement

### 4) Section-index behavior should be checked in a browser
The nav has been adjusted to more closely reflect the legacy sidebar by using section pages for:
- `extensions/index.md`
- `implementations/index.md`

This should be checked in the built MkDocs UI to confirm:
- the section title links behave correctly
- no unwanted duplicate “index/overview” child entry is shown

## Recommended manual review checklist

In a browser, compare the MkDocs build against `old_site/html/` for:

1. left sidebar labels and expansion behavior
2. top announcement links
3. home page hero, CTA buttons, and feature cards
4. extensions section ordering
5. implementations section ordering and labels
6. content headings on:
   - Overview
   - ASDF for FITS users
   - Extensions
   - Applications
   - Community
7. light/dark logo behavior
8. mobile navigation behavior

## Suggested next cleanup gate

If the browser review looks acceptable, the next phase can be:
- remove obsolete Sphinx-only dependencies/configuration
- remove Sphinx Make targets
- archive or remove `asdf_website/` source files if no longer needed

Do not do that until the remaining visual/manual review items above are accepted.
