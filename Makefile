# Documentation makefile
#

# You can set these variables from the command line.
SPHINXOPTS    =
SPHINXBUILD   = sphinx-build
SOURCEDIR     = asdf_website
BUILDDIR      = build
MKDOCS        = mkdocs
MKDOCSCONFIG  = mkdocs.yml
MKDOCSSITE    = site

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: help Makefile

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

clean:
	-rm -rf $(BUILDDIR)
	-rm -rf $(MKDOCSSITE)
	-rm -rf asdf_website/api
	-rm -rf asdf_website/generated

.PHONY: livehtml
livehtml: ## Serve Sphinx documentation on localhost:8000, with live-reload
	sphinx-autobuild "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

.PHONY: mkdocs-build
mkdocs-build: ## Build the MkDocs site
	$(MKDOCS) build --config-file $(MKDOCSCONFIG)

.PHONY: mkdocs-serve
mkdocs-serve: ## Serve the MkDocs site locally with live reload
	$(MKDOCS) serve --config-file $(MKDOCSCONFIG)

.PHONY: mkdocs-clean
mkdocs-clean: ## Remove the MkDocs build output
	-rm -rf $(MKDOCSSITE)