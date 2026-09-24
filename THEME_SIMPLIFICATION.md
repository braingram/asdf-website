# Theme simplification options

This document proposes ways to reduce the complexity of the current theme customization layer while describing the likely impact on the rendered docs.

## Current theme complexity snapshot

Approximate current custom theme surface area:

- `overrides/main.html`: **183 lines**
- `docs/assets/stylesheets/extra.css`: **172 lines**
- `docs/assets/javascripts/extra.js`: **158 lines**
- vendored legacy Furo/Sphinx assets in `docs/_static/`: **49 files**, about **1.9 MB**

The biggest complexity drivers are:

1. a custom page shell in `overrides/main.html`
2. vendored legacy Furo assets copied from `old_site/html/_static/`
3. custom JavaScript used to recreate parts of Furo behavior
4. custom homepage styling/behavior

---

## Option 1: Remove unused vendored legacy assets, keep the current visual approach

### What changes
Keep the current Furo-emulation strategy, but delete vendored files in `docs/_static/` that are not actually referenced by the custom template.

Likely keep only a minimal subset such as:
- `docs/_static/styles/furo.css`
- `docs/_static/styles/furo-extensions.css`
- `docs/_static/pygments.css`
- `docs/_static/copybutton.css`
- `docs/_static/css/globalnav.css`
- the logo/favicon/image files that are actually used

Likely remove many unused files such as:
- Sphinx JS helpers
- copied search/doctools files
- source maps
- extra copied CSS/JS not referenced by the template
- unused fontawesome bundle pieces if not rendered anywhere

### Estimated reduction
- remove roughly **30–40 files** from `docs/_static/`
- reduce repo size by roughly **1.0–1.5 MB**
- remove **little or no custom code** in `main.html` / `extra.css` / `extra.js`

### Impact on rendered docs
- **Expected impact:** none or very small, if only truly unused files are removed
- **Risk:** a hidden dependency may exist for search or future enhancements, so this should be validated after trimming

### When to choose this
Choose this if the site already looks right enough and you mainly want to reduce maintenance burden from copied legacy assets.

### Example LLM prompt
> Audit `docs/_static/` against the files actually referenced by `overrides/main.html`, `docs/assets/stylesheets/extra.css`, and `docs/assets/javascripts/extra.js`. Remove only unused vendored legacy assets, keeping the rendered docs unchanged.

---

## Option 2: Keep the Furo-like docs shell, but simplify the custom homepage

### What changes
Keep the docs pages visually close to old Furo, but reduce the custom homepage implementation.

Possible simplifications:
- replace the large hero/feature-card layout with a simpler page using normal content blocks
- remove animated background/star layers
- reduce custom CTA/button styling
- rely more on standard content flow and less on bespoke layout CSS

### Estimated reduction
- remove roughly **70–110 lines** from `docs/assets/stylesheets/extra.css`
- potentially remove **20–40 lines** from `docs/index.md`
- possibly remove a few image dependencies used only by the homepage

### Impact on rendered docs
- **Docs pages:** almost none
- **Homepage:** noticeable visual simplification
- branding would remain, but the homepage would no longer look nearly identical to the legacy splash page

### When to choose this
Choose this if the docs pages matter more than the landing page and you want to cut complexity without disturbing the internal docs theme.

### Example LLM prompt
> Simplify the custom homepage while keeping internal docs pages unchanged. Remove the more complex hero/background effects and reduce homepage-specific CSS, but preserve branding, links, and section structure.

---

## Option 3: Drop the JS-generated right-side TOC and use a simpler TOC behavior

### What changes
Remove the JavaScript that constructs a Furo-like nested TOC from headings.

Possible replacements:
- no right-side TOC at all
- a simpler flat heading list
- a smaller TOC block rendered directly from available MkDocs data instead of reconstructing nested structure in JS

### Estimated reduction
- remove roughly **50–90 lines** from `docs/assets/javascripts/extra.js`
- slightly simplify `overrides/main.html`

### Impact on rendered docs
- **Moderate visible impact** on docs pages
- right sidebar would no longer exactly match legacy Furo behavior
- indentation and nested heading behavior would likely be reduced or lost

### When to choose this
Choose this if you want the page chrome to stay Furo-like but can accept a simpler or missing right TOC.

### Example LLM prompt
> Simplify the docs theme by removing the JS-generated Furo-style right TOC. Replace it with the simplest stable TOC behavior available, and delete any now-unused TOC code from the template and JavaScript.

---

## Option 4: Simplify the custom Furo shell while keeping approximate Furo styling

### What changes
Keep a custom docs layout, but stop trying to reproduce all Furo page-shell behavior exactly.

Examples:
- remove mobile drawer behavior that mimics Furo
- remove the Furo-like theme toggle logic
- simplify related-pages footer behavior
- simplify sidebar tree rendering logic
- keep the desktop layout visually similar, but stop matching all responsive/interactive details

### Estimated reduction
- remove roughly **50–90 lines** from `overrides/main.html`
- remove roughly **40–80 lines** from `docs/assets/javascripts/extra.js`

### Impact on rendered docs
- **Desktop view:** can stay fairly close
- **Mobile/responsive behavior:** would diverge more from old Furo
- dark/auto theme behavior may become simpler
- interactive details would be less exact

### When to choose this
Choose this if you want a close-looking desktop docs experience but want to reduce the amount of custom logic you have to maintain.

### Example LLM prompt
> Reduce the complexity of the custom Furo-emulation shell. Keep the desktop docs layout broadly similar, but remove nonessential mobile, toggle, and interactive behaviors that require extra template and JavaScript code.

---

## Option 5: Stop emulating Furo exactly and switch to a lighter “Furo-inspired” MkDocs theme layer

### What changes
Abandon exact structural matching with legacy Furo and move to a simpler MkDocs-native layout that only borrows Furo colors, spacing, and branding.

This would likely mean:
- deleting most or all of `overrides/main.html`
- deleting most vendored `docs/_static/` legacy assets
- using standard MkDocs page structure
- keeping a smaller custom CSS file for branding

### Estimated reduction
- remove **most of `overrides/main.html`**: ~**150–180 lines**
- remove **most of `docs/assets/javascripts/extra.js`**: ~**100–150 lines**
- remove **most of `docs/_static/`**: ~**40+ files**
- likely reduce `extra.css` substantially too

### Impact on rendered docs
- **Large visual impact**
- the site would no longer be an exact or near-exact Furo match
- docs would still be branded and polished, but the shell/layout would visibly differ from `old_site`

### When to choose this
Choose this only if maintainability matters more than close visual parity with the old site.

### Example LLM prompt
> Replace the exact Furo-emulation layer with a lighter Furo-inspired MkDocs theme. Preserve branding, logos, and key navigation structure, but remove the custom shell, vendored Furo assets, and most custom JavaScript.

---

## Option 6: Hybrid approach — keep exact-match docs pages, simplify everything else

### What changes
Keep the current Furo-like docs shell only for internal docs pages, while simplifying ancillary pieces:
- keep `overrides/main.html` for docs pages
- simplify homepage
- trim unused vendored assets
- simplify JS where possible
- leave exact-match behavior only where it most visibly matters

### Estimated reduction
- remove **30–40 vendored files**
- remove **50–100 CSS lines** if homepage is simplified
- remove **20–60 JS lines** depending on what interactions are dropped

### Impact on rendered docs
- internal docs pages stay close to old Furo
- homepage becomes somewhat simpler
- maintenance cost drops without abandoning the strongest visual parity where users spend most time

### When to choose this
Choose this if you want the best balance between parity and maintainability.

### Example LLM prompt
> Keep the exact-match Furo-like shell for internal docs pages, but simplify the rest of the theme layer. Trim unused vendored assets, simplify homepage-specific styling, and remove nonessential JavaScript while preserving the visual parity of docs pages.

---

## Recommendation

If the current priority is to **reduce complexity without noticeably changing the docs pages**, the safest order is:

1. **Option 1** — trim unused vendored assets
2. **Option 6** — hybrid simplification
3. **Option 2** — simplify homepage only

If the priority is instead to **aggressively reduce custom code**, then:

1. **Option 4** — simplify the exact-match shell
2. **Option 5** — move to a lighter Furo-inspired layer

---

## Suggested decision prompt

> Review `THEME_SIMPLIFICATION.md` and implement option [N]. Before changing code, summarize which files and approximately how many lines/files will be removed, and describe the expected visual impact on docs pages versus the homepage.
