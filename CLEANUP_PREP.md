# MkDocs migration cleanup prep

Cleanup pass status: completed for the legacy Sphinx source/configuration. `old_site/` is intentionally retained.

## Validation workflow

Run these in order when validating future changes:

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
   - implementations pages
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

## Cleanup result

Completed in the cleanup pass:

- removed legacy Sphinx dependencies from `pyproject.toml`
- removed Sphinx-specific targets from `Makefile`
- removed the legacy `asdf_website/` source tree
- retained `old_site/` as the accepted comparison baseline snapshot

## Ongoing acceptance checklist

- MkDocs builds successfully in strict mode
- key pages remain visually acceptable against `old_site/html/`
- internal links remain valid
- external symbolic references remain valid
- home page links remain valid
