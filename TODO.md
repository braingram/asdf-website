# TODO: Migrate `asdf_website` from Sphinx to MkDocs

Status: in progress. The MkDocs scaffold, initial theme override, external reference macro layer, and first-pass Markdown migration have been added. The original Sphinx source remains in place for comparison and cleanup later.

## Goal

Replace the current Sphinx-based documentation site with a MkDocs-based site **while keeping the theme, structure, links, and content as unchanged as practical**.

Because there are several implementation choices that affect compatibility and maintenance, this migration should **not proceed past planning until those choices are confirmed**.

---

## Current repo inventory

### Build/config
- `asdf_website/conf.py` — Sphinx configuration
- `.readthedocs.yaml` — Read the Docs build config using Sphinx
- `pyproject.toml` — Python package metadata + Sphinx/Furo dependencies
- `Makefile` — Sphinx build targets

### Content
- Source format is currently **reStructuredText** (`.rst`)
- Top-level document tree in `asdf_website/index.rst`
- Section directories:
  - `asdf_website/specification/`
  - `asdf_website/extensions/`
  - `asdf_website/applications/`
  - `asdf_website/tutorials/`
  - `asdf_website/community/`

### Theme/custom UI behavior
- Sphinx theme: **Furo**
- Custom landing page template: `asdf_website/_templates/index.html`
- Custom CSS:
  - `asdf_website/_static/css/globalnav.css`
  - `asdf_website/_static/css/custom.css`
- Custom JS:
  - `asdf_website/_static/js/custom.js`
- Static assets/images/logos under `asdf_website/_static/`

### Sphinx-specific behavior in current site
- `intersphinx` external cross-references
- `sphinx_copybutton`
- `sphinx_tabs.tabs`
- `:doc:` and `:ref:` roles throughout `.rst`
- Furo announcement bar / top links
- Custom home page replacing the normal Sphinx page shell

---

## Important migration constraints

1. **Visual parity matters**
   - Preserve overall layout and branding.
   - Keep logos, colors, favicon, nav labels, and section order.
   - Preserve the custom landing page experience as closely as possible.

2. **URL/link parity matters**
   - Existing internal links should keep working.
   - External links should remain unchanged unless explicitly approved.
   - If MkDocs changes output paths, redirects/aliases may be needed.

3. **Content parity matters**
   - Avoid rewriting content unless required by the tooling change.
   - Preserve headings, prose, lists, code blocks, notes, and references.

4. **No assumptions on open decisions**
   - Decisions listed below require your confirmation before implementation.

---

## Open decisions requiring confirmation

### 1) Source format strategy
Current docs are written in `.rst`. MkDocs is primarily Markdown-oriented.

Possible approaches:
- **A. Keep `.rst` sources where possible** via a MkDocs plugin/tooling layer.
- **B. Convert all `.rst` files to Markdown** and maintain them as Markdown going forward.
- **C. Hybrid approach**: preserve `.rst` initially, then optionally convert later.

This affects:
- migration effort
- fidelity of cross-references
- long-term maintenance
- plugin complexity

**Need your decision.**

Example prompt for an LLM after you choose:
> Migrate this site to MkDocs using the confirmed source-format strategy: [A/B/C]. Preserve page titles, heading hierarchy, internal links, and existing prose exactly unless conversion requires a minimal syntax change.

---

### 2) MkDocs theme strategy
Current site uses **Furo** in Sphinx plus a heavily custom home page.

Possible approaches:
- **A. Use a standard MkDocs theme with custom overrides/CSS to mimic the existing site**
- **B. Use `mkdocs-material` and customize it to match the current site**
- **C. Use another theme chosen by you**
- **D. Build a highly customized theme layer to preserve the current appearance as closely as possible**

This affects:
- visual parity
- implementation time
- maintainability
- how close the docs pages can remain to current Furo styling

**Need your decision.**

Example prompt for an LLM after you choose:
> Set up MkDocs with the confirmed theme strategy: [A/B/C/D]. Reproduce the current branding, announcement links, light/dark logos, favicon, and sidebar/nav structure as closely as possible.

---

### 3) Home page migration strategy
The current `index` page is not a normal content page; it is a custom template (`asdf_website/_templates/index.html`) with Bootstrap, custom imagery, CTA buttons, and dropdown nav.

Possible approaches:
- **A. Recreate it as a fully custom MkDocs home page override**
- **B. Recreate it as a Markdown page with custom theme components/CSS**
- **C. Simplify it slightly while preserving branding and information architecture**

**Need your decision.**

Example prompt for an LLM after you choose:
> Recreate the existing custom landing page in MkDocs using strategy [A/B/C]. Preserve the hero section, CTA buttons, navigation groups, logos, imagery, and footer links.

---

### 4) External cross-reference behavior
Current docs use Sphinx `intersphinx` references such as:
- `asdf-standard`
- `asdf`
- `astropy`
- `asdf-astropy`
- extension packages

MkDocs does not support Sphinx `intersphinx` in the same way out of the box.

Possible approaches:
- **A. Replace them with explicit hard-coded links**
- **B. Introduce a plugin/macro layer to preserve symbolic external references**
- **C. Mixed strategy: hard-code only the currently used references**

**Need your decision.**

Example prompt for an LLM after you choose:
> Replace Sphinx intersphinx references using strategy [A/B/C]. Preserve rendered link text and destinations. Do not alter surrounding prose.

---

### 5) URL compatibility policy
MkDocs may produce different URLs depending on configuration and source file naming.

Possible approaches:
- **A. Match current URLs exactly where feasible**
- **B. Allow URL changes if redirects are added**
- **C. Allow small URL changes without redirects**

**Need your decision.**

Example prompt for an LLM after you choose:
> Configure MkDocs to follow URL policy [A/B/C]. Preserve current navigation labels and avoid broken internal links.

---

### 6) Read the Docs deployment target
Current RTD config is Sphinx-based.

Possible approaches:
- **A. Keep deploying on Read the Docs, now using MkDocs**
- **B. Change deployment target/platform**
- **C. Support both local MkDocs and RTD MkDocs builds**

**Need your decision.**

Example prompt for an LLM after you choose:
> Update the deployment/build configuration for strategy [A/B/C]. Ensure local development and CI/hosted builds remain documented and reproducible.

---

### 7) Known content/link anomalies: preserve or fix?
There appears to be at least one item worth reviewing during migration:
- `asdf_website/_templates/index.html` links “Schemas” to `pathto('standard/index')`, while the actual section directory appears to be `specification/`.

Before implementation, decide whether migration should:
- **A. Preserve current behavior exactly, including possible mistakes**
- **B. Fix clearly broken links encountered during migration**
- **C. Fix only with explicit approval per issue**

**Need your decision.**

Example prompt for an LLM after you choose:
> During migration, apply broken-link policy [A/B/C]. Report each discovered issue before changing it unless the policy explicitly permits automatic fixes.

---

## Proposed migration plan

## Phase 1 — Baseline capture and parity audit
- [ ] Do not build the old docs. Instead, inspect the prebuilt site in `old_site/` as the baseline reference.
- [ ] Record current navigation structure, page titles, and major URLs from `old_site/`.
- [ ] Record current theme elements:
  - logos
  - favicon
  - announcement bar links
  - sidebar behavior
  - home page hero layout
  - footer behavior
- [ ] Inventory all Sphinx-specific syntax used in `.rst` files.
- [ ] Identify any existing broken links/templates before migration.

Example LLM prompt:
> Audit the prebuilt documentation site in `old_site/` and the current Sphinx sources, then produce a migration inventory for MkDocs. Do not build the old docs. List page structure, Sphinx-only features in use, custom assets, template overrides, and all likely compatibility risks.

---

## Phase 2 — Choose the MkDocs stack
- [ ] Confirm source format strategy.
- [ ] Confirm theme strategy.
- [ ] Confirm home page strategy.
- [ ] Confirm external cross-reference strategy.
- [ ] Confirm URL compatibility policy.
- [ ] Confirm deployment target.

Example LLM prompt:
> Based on the confirmed decisions, create a minimal MkDocs architecture plan covering theme choice, plugin list, content handling, nav generation, asset migration, and deployment updates.

---

## Phase 3 — Create MkDocs configuration scaffold
Expected work after approval:
- [ ] Add `mkdocs.yml`
- [ ] Define `site_name`, `site_url`, repo links if desired, nav order, theme settings, extra CSS/JS, and markdown/extensions/plugins as needed.
- [ ] Preserve section ordering from the current `toctree`.
- [ ] Recreate announcement bar / top-level global links.

Potential files:
- `mkdocs.yml`
- `docs/` or an approved alternative content directory
- theme override templates if needed

Example LLM prompt:
> Create `mkdocs.yml` for this site using the approved decisions. Keep navigation order aligned with `asdf_website/index.rst`, preserve branding, and wire in the existing static assets where possible.

---

## Phase 4 — Migrate content sources
Expected work after approval:
- [ ] Move/copy docs into the MkDocs content directory.
- [ ] Either preserve `.rst` handling or convert `.rst` to `.md`, depending on your decision.
- [ ] Maintain heading hierarchy and visible text.
- [ ] Preserve code blocks and admonitions.
- [ ] Preserve note callouts and section anchors where feasible.
- [ ] Keep page names and nav labels aligned with current docs.

Repo-specific concerns to handle carefully:
- `:doc:` roles
- `:ref:` roles
- labels like `.. _overview:`
- admonitions / notes
- code blocks with language labels
- links to external docs previously handled by intersphinx

Example LLM prompt:
> Migrate the documentation content into the MkDocs format agreed on earlier. Preserve headings, paragraph text, list structure, code block languages, and note/admonition semantics. Rewrite only the syntax necessary for MkDocs compatibility.

---

## Phase 5 — Recreate the visual theme and assets
Expected work after approval:
- [ ] Port logos, favicon, and static images.
- [ ] Port CSS/JS required for parity.
- [ ] Recreate announcement/global nav links.
- [ ] Recreate light/dark logo behavior if required by the chosen theme.
- [ ] Ensure docs pages and landing page feel substantially unchanged.

Repo-specific assets to preserve:
- `asdf_website/_static/images/logo-light-mode.png`
- `asdf_website/_static/images/logo-dark-mode.png`
- `asdf_website/_static/images/favicon.ico`
- `asdf_website/_static/css/globalnav.css`
- `asdf_website/_static/css/custom.css`
- `asdf_website/_static/js/custom.js`
- `asdf_website/_templates/index.html`

Example LLM prompt:
> Recreate the current site styling in MkDocs using theme overrides plus custom CSS/JS. Preserve logos, favicon, announcement links, color palette, and major layout patterns. Keep the result as close as practical to the current site.

---

## Phase 6 — Rebuild the custom home page
Expected work after approval:
- [ ] Recreate the existing home page hero section.
- [ ] Preserve CTA buttons, nav groups, footer links, and background imagery.
- [ ] Decide how to handle Bootstrap dependencies in MkDocs.
- [ ] Ensure all home page links resolve correctly in the MkDocs build.

Specific current home page behaviors to preserve if approved:
- fixed top nav
- docs/get-started/community dropdowns
- hero image and text
- three-column feature section
- footer links
- optional ad-hiding JS, if still relevant in the new hosting context

Example LLM prompt:
> Port the current custom `asdf_website/_templates/index.html` landing page into MkDocs. Preserve structure and content, but adapt path resolution, assets, and navigation to MkDocs conventions.

---

## Phase 7 — Update local development and hosted build config
Expected work after approval:
- [ ] Replace Sphinx-specific dependencies in `pyproject.toml` if appropriate.
- [ ] Update `.readthedocs.yaml` for MkDocs if RTD remains the host.
- [ ] Update `Makefile` targets for MkDocs build/serve commands.
- [ ] Document local developer workflow.

Example LLM prompt:
> Update project configuration from Sphinx to MkDocs: dependencies, Makefile, and hosted build config. Remove Sphinx-only setup only after the MkDocs build is working.

---

## Phase 8 — Link validation and parity review
Expected work after approval:
- [ ] Validate internal links.
- [ ] Validate external links.
- [ ] Compare navigation labels and ordering with the Sphinx site.
- [ ] Review styling differences page-by-page.
- [ ] Review home page behavior on desktop and mobile.
- [ ] Confirm whether any remaining mismatches are acceptable.

Example LLM prompt:
> Compare the MkDocs output against the current Sphinx site and list all differences in URLs, page titles, nav structure, visible content, and styling. Propose only minimal changes required to close the gaps.

---

## Phase 9 — Cleanup and handoff
Expected work after approval:
- [ ] Remove obsolete Sphinx files only when MkDocs parity is accepted.
- [ ] Keep or archive old templates/assets if requested.
- [ ] Add migration notes for maintainers.
- [ ] Summarize decisions taken and any known deviations from parity.

Example LLM prompt:
> Finalize the migration by removing obsolete Sphinx configuration only where safe, then write maintainer notes describing the new MkDocs workflow, remaining caveats, and any intentional deviations from the original site.

---

## Files likely to change after approval

Implementation is pending, but these files are likely candidates:
- `mkdocs.yml` (new)
- `.readthedocs.yaml`
- `pyproject.toml`
- `Makefile`
- `asdf_website/` content files or a new `docs/` directory
- theme override templates under an MkDocs-compatible location
- migrated static assets and CSS/JS references

Files that may become obsolete after successful migration:
- `asdf_website/conf.py`
- `asdf_website/_templates/index.html` (if replaced by MkDocs override equivalents)

---

## Recommended implementation order

1. Confirm decisions in **Open decisions requiring confirmation**.
2. Generate a baseline/parity report from the current Sphinx site.
3. Scaffold MkDocs configuration.
4. Migrate content syntax.
5. Recreate styling and theme behavior.
6. Rebuild the custom landing page.
7. Update build/deploy tooling.
8. Validate links and visual parity.
9. Remove obsolete Sphinx pieces only after acceptance.

---

## Confirmed decisions

The following decisions have been confirmed:

1. Source format strategy: **B** — convert all `.rst` files to Markdown and maintain them as Markdown going forward.
2. Theme strategy: **B** — use `mkdocs-material` and customize it to match the current site.
3. Home page strategy: **B** — recreate the landing page as a Markdown page with custom theme components/CSS.
4. External cross-reference strategy: **B** — introduce a plugin/macro layer to preserve symbolic external references.
5. URL compatibility policy: **C** — allow small URL changes without redirects.
6. Deployment target: **C** — support both local MkDocs and Read the Docs MkDocs builds.
7. Broken-link policy during migration: **B** — fix clearly broken links encountered during migration.

---

## Concrete implementation plan based on confirmed decisions

## Phase 1 — Add MkDocs build scaffold alongside the existing Sphinx site
- [ ] Add `mkdocs.yml` configured for `mkdocs-material`.
- [ ] Keep the existing Sphinx files in place until MkDocs parity is reviewed.
- [ ] Point MkDocs at a new docs content tree, likely `docs/`, so the migration is easy to review without mutating the original `.rst` tree in place.
- [ ] Configure Material theme basics:
  - site name/title
  - repo/site URL
  - favicon
  - logos/branding
  - navigation order matching the current `toctree`
  - extra CSS/JS includes
- [ ] Recreate the current top announcement/global links in a Material-compatible way.

Example LLM prompt:
> Create a non-destructive MkDocs scaffold for this repository using `mkdocs-material`. Add `mkdocs.yml`, preserve branding, reuse existing static assets, and do not remove the Sphinx configuration yet.

---

## Phase 2 — Convert content from reStructuredText to Markdown
- [ ] Create Markdown equivalents for all current `.rst` source files under `docs/`.
- [ ] Preserve page titles, heading levels, prose, list structure, and code block languages.
- [ ] Convert Sphinx syntax carefully:
  - `.. toctree::` → MkDocs nav config
  - `:doc:` → normal Markdown links
  - `:ref:` internal references → explicit anchors/links
  - `:ref:` intersphinx references → macro/plugin-backed symbolic links
  - `.. note::` → Material admonitions
  - `.. code-block::` → fenced code blocks
  - explicit labels like `.. _overview:` → stable Markdown anchors where needed
- [ ] Preserve section directory structure where practical so content remains recognizable.

Current files that will need conversion:
- `asdf_website/index.rst`
- `asdf_website/overview.rst`
- `asdf_website/asdf_fits.rst`
- `asdf_website/specification/index.rst`
- `asdf_website/extensions/index.rst`
- `asdf_website/extensions/asdf-coordinates-schemas.rst`
- `asdf_website/extensions/asdf-transform-schemas.rst`
- `asdf_website/extensions/asdf-wcs-schemas.rst`
- `asdf_website/applications/index.rst`
- `asdf_website/applications/asdf-python.rst`
- `asdf_website/applications/asdf-cpp.rst`
- `asdf_website/applications/asdf-julia.rst`
- `asdf_website/tutorials/index.rst`
- `asdf_website/community/index.rst`

Example LLM prompt:
> Convert the Sphinx `.rst` documentation in this repository to MkDocs-compatible Markdown under `docs/`. Preserve headings, prose, navigation labels, admonitions, code blocks, and link intent as closely as possible.

---

## Phase 3 — Implement symbolic external cross-references
- [ ] Add a macro/plugin mechanism so Markdown content can use symbolic external references instead of raw repeated URLs.
- [ ] Define mappings equivalent to the current Sphinx `intersphinx_mapping` for:
  - `asdf-standard`
  - `asdf`
  - `asdf-coordinates-schemas`
  - `asdf-transform-schemas`
  - `asdf-wcs-schemas`
  - `astropy`
  - `asdf-astropy`
- [ ] Replace current Sphinx intersphinx-style references with whichever macro syntax is chosen for MkDocs.
- [ ] Keep rendered text and destinations as close as possible to the Sphinx site.

Example LLM prompt:
> Add a reusable MkDocs macro or plugin-based external reference system that replaces the current Sphinx intersphinx usage while keeping the content readable and maintainable.

---

## Phase 4 — Recreate the documentation structure in `mkdocs.yml`
- [ ] Mirror the current top-level structure from `asdf_website/index.rst`:
  - Overview
  - ASDF for FITS users
  - Specification
  - Extensions
  - Applications
  - Tutorials
  - Community
- [ ] Mirror subpage ordering from the current section index files.
- [ ] Keep labels and human-facing page names largely unchanged.

Example LLM prompt:
> Build the MkDocs navigation from the current Sphinx `toctree` files, keeping labels, hierarchy, and ordering as unchanged as possible.

---

## Phase 5 — Recreate the home page as Markdown plus Material customizations
- [ ] Rebuild the custom landing page as `docs/index.md` instead of a pure template replacement.
- [ ] Port the existing visual sections from `asdf_website/_templates/index.html`:
  - top nav intent
  - hero/logo section
  - call-to-action buttons
  - three feature columns
  - footer links
- [ ] Reuse the current assets from `_static/images/`.
- [ ] Recreate missing layout behavior with Material theme overrides, Markdown extensions, custom partials, and CSS as needed.
- [ ] Avoid a full raw-HTML-only landing page unless necessary for parity.
- [ ] Fix clearly broken links encountered during this step, including the apparent `standard/index` vs `specification/index` issue.

Example LLM prompt:
> Rebuild the current custom Sphinx landing page as a MkDocs Markdown home page enhanced with Material theme overrides and custom CSS, keeping the visual structure and calls to action largely unchanged.

---

## Phase 6 — Port styling and behavior to MkDocs Material
- [ ] Move or adapt current custom CSS into MkDocs-friendly asset locations.
- [ ] Preserve branding colors, logos, favicon, and major layout details.
- [ ] Recreate the current announcement link styling.
- [ ] Decide whether light/dark logo switching can be done with Material features alone or needs small overrides.
- [ ] Review whether `custom.js` ad-hiding behavior is still relevant under Read the Docs MkDocs hosting; keep only if still useful.
- [ ] Replace Bootstrap-dependent pieces only where Markdown/Material cannot cover them.

Current assets likely to be reused:
- `asdf_website/_static/css/globalnav.css`
- `asdf_website/_static/css/custom.css`
- `asdf_website/_static/js/custom.js`
- `asdf_website/_static/images/*`
- `asdf_website/_static/fontawesome/*`

Example LLM prompt:
> Port the current Sphinx custom CSS/JS/assets into MkDocs Material, minimizing visual drift while avoiding unnecessary complexity.

---

## Phase 7 — Update project configuration and developer workflow
- [ ] Update `pyproject.toml` dependencies from Sphinx-first to MkDocs-first.
- [ ] Add the necessary MkDocs packages, likely including:
  - `mkdocs`
  - `mkdocs-material`
  - any chosen macro/plugin package(s)
- [ ] Update `.readthedocs.yaml` from Sphinx to MkDocs while preserving local + RTD support.
- [ ] Update `Makefile` targets for:
  - local build
  - local serve/live reload
  - clean
- [ ] Keep local development simple and documented.

Example LLM prompt:
> Replace the Sphinx build workflow with a MkDocs workflow in `pyproject.toml`, `.readthedocs.yaml`, and `Makefile`, while keeping both local development and Read the Docs builds working.

---

## Phase 8 — Validate migration and fix clearly broken links
- [ ] Build the MkDocs site locally.
- [ ] Check that navigation renders correctly.
- [ ] Validate internal Markdown links.
- [ ] Validate symbolic external reference expansion.
- [ ] Compare page titles and visible text against the Sphinx version.
- [ ] Compare major styling/layout behavior.
- [ ] Fix clearly broken links discovered during migration, per confirmed policy **B**.
- [ ] Document any intentional URL changes allowed by policy **C**.

Example LLM prompt:
> Validate the MkDocs migration end to end. Report and fix clear broken links, content regressions, and major visual mismatches while keeping the new implementation minimal and maintainable.

---

## Phase 9 — Remove obsolete Sphinx-specific files after acceptance
- [ ] Remove or archive Sphinx-only configuration once MkDocs is accepted.
- [ ] Remove obsolete template wiring if replaced by MkDocs overrides.
- [ ] Keep any still-useful static assets.
- [ ] Add final maintainer notes describing the new Markdown + MkDocs workflow.

Likely cleanup candidates after acceptance:
- `asdf_website/conf.py`
- `asdf_website/_templates/index.html`
- Sphinx-only dependencies in `pyproject.toml`
- Sphinx-specific Make targets

Example LLM prompt:
> After the MkDocs site is confirmed working, remove obsolete Sphinx configuration and write maintainer notes for the new documentation workflow.

---

## Immediate next step

The next safe implementation step is:
- create the MkDocs scaffold (`mkdocs.yml`, docs directory, initial dependency/build config updates),
- without deleting the Sphinx setup yet,
- then migrate content and styling incrementally for review.

If you want, I can proceed with that implementation now.