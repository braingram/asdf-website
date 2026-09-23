# asdf-website

ASDF website documentation built with MkDocs.

## Current status

The repository currently contains:

- the MkDocs site source in `docs/`
- MkDocs configuration in `mkdocs.yml`
- custom CSS/JS theme adjustments in `docs/assets/`
- a macros file for symbolic external references in `main.py`
- a prebuilt legacy reference site in `old_site/`

The legacy Sphinx source has been removed after migration cleanup. `old_site/` is retained as the comparison baseline snapshot.

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
- `make clean`
  - remove MkDocs build output

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

## Historical migration notes

Migration planning and review notes remain in:

- `TODO.md`
- `PARITY_REVIEW.md`
- `CLEANUP_PREP.md`
- `LEGACY_SPHINX_INVENTORY.md`
