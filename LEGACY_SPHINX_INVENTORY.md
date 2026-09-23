# Legacy Sphinx inventory

This file records what remains from the Sphinx-era site after cleanup.

## Retained legacy artifact

The retained legacy comparison artifact is:

- `old_site/`

This is kept as a reference snapshot for parity review and regression checking.

## Removed in cleanup

The cleanup pass removed:

- legacy Sphinx configuration
- legacy Sphinx `.rst` source files
- the legacy template override in `asdf_website/_templates/index.html`
- legacy Sphinx-only dependencies from `pyproject.toml`
- Sphinx-specific targets from `Makefile`

## Current source of truth

The MkDocs site is now the only active documentation source in this repository:

- `docs/`
- `mkdocs.yml`
- `main.py`
