# Legacy Sphinx inventory

This file records the legacy Sphinx-era files that remain in the repository while the MkDocs migration is finalized.

## Legacy source tree still present

These files remain as migration references and cleanup candidates:

- `asdf_website/conf.py`
- `asdf_website/_templates/index.html`
- `asdf_website/index.rst`
- `asdf_website/overview.rst`
- `asdf_website/asdf_fits.rst`
- `asdf_website/specification/index.rst`
- `asdf_website/extensions/index.rst`
- `asdf_website/extensions/asdf-coordinates-schemas.rst`
- `asdf_website/extensions/asdf-transform-schemas.rst`
- `asdf_website/extensions/asdf-wcs-schemas.rst`
- `asdf_website/implementations/index.rst`
- `asdf_website/implementations/asdf-python.rst`
- `asdf_website/implementations/asdf-c.rst`
- `asdf_website/implementations/asdf-cpp.rst`
- `asdf_website/implementations/asdf-java.rst`
- `asdf_website/implementations/asdf-julia.rst`
- `asdf_website/tutorials/index.rst`
- `asdf_website/community/index.rst`

## Legacy static assets still present

Some assets have already been copied into `docs/assets/`, but the original Sphinx-side copies still remain:

- `asdf_website/_static/css/custom.css`
- `asdf_website/_static/css/globalnav.css`
- `asdf_website/_static/js/custom.js`
- `asdf_website/_static/images/*`

## Legacy build/config references still present

These are likely cleanup candidates after final acceptance:

- Sphinx dependencies in `pyproject.toml`
  - `sphinx`
  - `sphinx-autobuild`
  - `sphinx-copybutton`
  - `sphinx-tabs`
  - `furo`
- Sphinx targets in `Makefile`
  - `help`
  - catch-all `%` Sphinx routing
  - `livehtml`
- legacy build directory ignore/use
  - `build/`

## Keep for now

Do not remove the above until all of the following are true:

- MkDocs output is accepted as the source of truth
- Read the Docs MkDocs build is confirmed
- maintainers no longer need the Sphinx source for comparison
- any missing styling/content parity issues are resolved
