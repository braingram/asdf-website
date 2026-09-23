# MkDocs migration cleanup prep

This file captures the next validation and cleanup steps for the Sphinx → MkDocs migration.

## Validation workflow

Run these in order once Python and MkDocs are available:

1. Repository-side checks that do not require Python:
   - `make validate-mkdocs-content`
2. Strict MkDocs build:
   - `make mkdocs-build-strict`
3. Local preview:
   - `make mkdocs-serve`
4. Compare against the prebuilt legacy site in `old_site/html/`:
   - home page
   - overview page
   - extensions pages
   - applications pages
   - community page
   - announcement bar links
   - logo/light-dark behavior
   - navigation structure and labels

## What `validate-mkdocs-content` checks

- every Markdown file referenced in `mkdocs.yml` exists
- leftover Sphinx syntax is not present in `docs/`
- placeholder migration text is gone
- home-page asset references exist
- configured theme override directories exist

## Likely cleanup candidates after validation passes

See also:

- `LEGACY_SPHINX_INVENTORY.md`

Do not remove these until the MkDocs site is reviewed and accepted:

- `asdf_website/conf.py`
- `asdf_website/_templates/index.html`
- Sphinx-only dependencies in `pyproject.toml`
- Sphinx-oriented targets in `Makefile`
- Sphinx build artifacts no longer needed once `old_site/` remains the accepted baseline reference

## Acceptance checklist before Sphinx cleanup

- MkDocs builds successfully in strict mode
- Read the Docs builds successfully with MkDocs
- key pages visually reviewed against `old_site/html/`
- internal links reviewed
- external symbolic references reviewed
- home page links reviewed
- no remaining required content in `asdf_website/*.rst`
- maintainers agree the MkDocs site is the new source of truth
