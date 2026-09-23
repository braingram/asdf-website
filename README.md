# asdf-website

ASDF website documentation, migrated from Sphinx toward MkDocs.

## Current status

The repository currently contains:

- the new MkDocs site source in `docs/`
- MkDocs configuration in `mkdocs.yml`
- Material theme overrides in `overrides/`
- a macros file for symbolic external references in `main.py`
- the legacy Sphinx source in `asdf_website/`
- a prebuilt legacy reference site in `old_site/`

The MkDocs site is now the active migration target. The Sphinx source is being retained temporarily for comparison and cleanup planning.

## Local development

Useful commands:

- `make validate-mkdocs-content`
  - repository-side content checks that do not require a Python MkDocs build
- `make mkdocs-build`
  - build the MkDocs site
- `make mkdocs-build-strict`
  - build the MkDocs site with strict warning handling
- `make mkdocs-serve`
  - run the MkDocs live preview server
- `make mkdocs-clean`
  - remove MkDocs build output

Legacy Sphinx commands remain in the `Makefile` only until migration cleanup is complete.

## Validation baseline

Do not rebuild the legacy Sphinx site for migration comparison.

Use the prebuilt site in:

- `old_site/html/`

Use that output as the baseline reference for:

- navigation structure
- page titles
- key URLs
- home page behavior
- announcement bar links
- branding and assets

## Cleanup status

Cleanup planning notes are in:

- `CLEANUP_PREP.md`

The legacy Sphinx files should not be removed until the MkDocs migration is accepted.
