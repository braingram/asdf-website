from markupsafe import Markup


REF_MAP = {
    "asdf-standard:asdf-standard": "https://www.asdf-format.org/projects/asdf-standard/en/latest/",
    "asdf-standard:tags": "https://www.asdf-format.org/projects/asdf-standard/en/latest/asdf/tags.html",
    "asdf-standard:asdf-schemas": "https://www.asdf-format.org/projects/asdf-standard/en/latest/asdf/schemas.html",
    "asdf-standard:tree": "https://www.asdf-format.org/projects/asdf-standard/en/latest/asdf/file_layout.html#the-asdf-tree",
    "asdf-standard:block": "https://www.asdf-format.org/projects/asdf-standard/en/latest/asdf/file_layout.html#blocks",
    "asdf-standard:versioning-conventions": "https://www.asdf-format.org/projects/asdf-standard/en/latest/asdf/versioning.html#versioning-conventions",
    "asdf:asdf": "https://www.asdf-format.org/projects/asdf/en/stable/",
    "asdf-coordinates-schemas:asdf-coordinates-schemas": "https://www.asdf-format.org/projects/asdf-coordinates-schemas/en/latest/",
    "asdf-transform-schemas:asdf-transform-schemas": "https://www.asdf-format.org/projects/asdf-transform-schemas/en/latest/",
    "asdf-wcs-schemas:asdf-wcs-schemas": "https://www.asdf-format.org/projects/asdf-wcs-schemas/en/latest/",
    "astropy:astropy-modeling": "https://docs.astropy.org/en/stable/modeling/",
    "astropy:astropy-coordinates": "https://docs.astropy.org/en/stable/coordinates/",
    "asdf-astropy:asdf-astropy": "https://asdf-astropy.readthedocs.io/en/latest/",
}


def define_env(env):
    @env.macro
    def extref(key, text=None):
        href = REF_MAP.get(key)
        if href is None:
            raise KeyError(f"Unknown external reference: {key}")
        label = text or key
        return Markup(f'[{label}]({href})')
