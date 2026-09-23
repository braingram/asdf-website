# Documentation makefile
#

MKDOCS        = mkdocs
MKDOCSCONFIG  = mkdocs.yml
MKDOCSSITE    = site

.PHONY: validate-mkdocs-content
validate-mkdocs-content: ## Run repository-side MkDocs content checks that do not require Python
	./scripts/validate-mkdocs-content.sh

.PHONY: mkdocs-build
mkdocs-build: validate-mkdocs-content ## Build the MkDocs site
	$(MKDOCS) build --config-file $(MKDOCSCONFIG)

.PHONY: mkdocs-build-strict
mkdocs-build-strict: validate-mkdocs-content ## Build the MkDocs site with strict warning handling
	$(MKDOCS) build --strict --config-file $(MKDOCSCONFIG)

.PHONY: mkdocs-serve
mkdocs-serve: validate-mkdocs-content ## Serve the MkDocs site locally with live reload
	$(MKDOCS) serve --config-file $(MKDOCSCONFIG)

.PHONY: clean mkdocs-clean
clean mkdocs-clean: ## Remove the MkDocs build output
	-rm -rf $(MKDOCSSITE)
