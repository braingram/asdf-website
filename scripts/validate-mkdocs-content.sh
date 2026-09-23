#!/usr/bin/env bash
set -euo pipefail

fail() {
  echo "ERROR: $*" >&2
  exit 1
}

warn() {
  echo "WARN: $*" >&2
}

ROOT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)"
cd "$ROOT_DIR"

[ -f mkdocs.yml ] || fail "mkdocs.yml not found"
[ -d docs ] || fail "docs/ directory not found"

# Check that nav-referenced markdown files exist.
while IFS= read -r path; do
  [ -n "$path" ] || continue
  [ -f "$path" ] || fail "Nav file missing: $path"
done < <(grep -E '^[[:space:]]*-[[:space:]].*:[[:space:]]+[^[:space:]]+\.md$' mkdocs.yml | sed -E 's/^[[:space:]]*-[[:space:]].*:[[:space:]]+([^[:space:]]+\.md)$/docs\/\1/')

# Fail on obvious leftover Sphinx syntax in MkDocs content.
if rg -n '(:ref:|:doc:|^\.\. _|^\.\. toctree::|^\.\. note::|^\.\. admonition::)' docs >/tmp/mkdocs_validation_sphinx.txt 2>/dev/null; then
  cat /tmp/mkdocs_validation_sphinx.txt >&2
  fail "Leftover Sphinx syntax found in docs/"
fi

# Fail on known placeholder text.
if rg -n '(Scaffold placeholder|Markdown migration pending)' docs >/tmp/mkdocs_validation_placeholder.txt 2>/dev/null; then
  cat /tmp/mkdocs_validation_placeholder.txt >&2
  fail "Placeholder migration text found in docs/"
fi

# Warn on .rst references that may indicate incomplete cleanup.
if rg -n '\.rst\b' docs >/tmp/mkdocs_validation_rst.txt 2>/dev/null; then
  cat /tmp/mkdocs_validation_rst.txt >&2
  warn "Found .rst references in docs/; review whether they should remain"
fi

# Validate local asset references used in docs/index.md.
if [ -f docs/index.md ]; then
  while IFS= read -r asset; do
    [ -n "$asset" ] || continue
    asset_path="docs/${asset}"
    [ -f "$asset_path" ] || fail "Referenced asset missing: $asset_path"
  done < <(grep -oE '(src|href)="assets/[^"]+"' docs/index.md | sed -E 's/^(src|href)="([^"]+)"$/\2/')
fi

# Validate configured override exists if declared.
custom_dir=$(grep -E '^  custom_dir:' mkdocs.yml | awk '{print $2}' || true)
if [ -n "$custom_dir" ] && [ ! -d "$custom_dir" ]; then
  fail "Configured theme override directory missing: $custom_dir"
fi

echo "MkDocs content validation checks passed."
