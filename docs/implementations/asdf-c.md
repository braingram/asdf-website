# ASDF for C (libasdf)

[libasdf](https://github.com/asdf-format/libasdf) is an officially supported implementation of the ASDF Standard in C. Although not yet fully feature-complete, the library supports ASDF's core capabilities of reading and writing metadata from/to YAML and reading/writing from n-dimensional numerical arrays (tabular arrays are not yet supported).

libasdf is currently installable via two packaging systems:

- via Conda, on the [conda-forge channel](https://anaconda.org/channels/conda-forge/packages/libasdf/overview):

  ```console
  $ conda install -c conda-forge libasdf
  ```

- via Homebrew, currently available on our [Homebrew tap](https://github.com/asdf-format/homebrew-tap):

  ```console
  $ brew tap asdf-format/tap
  $ brew install libasdf
  ```

A source-only releases can be found on the GitHub [releases](https://github.com/asdf-format/libasdf/releases) page.

Build instructions, usage, and API documentation can be found in the official [libasdf documentation](https://libasdf.readthedocs.io/en/latest/).

Additionally, there is an officially-supported plugin to libasdf, [libasdf-gwcs](https://github.com/asdf-format/libasdf-gwcs), for reading and evaluating WCS stored in ASDF files. Its first release is coming soon and will be available through the same installation channels as libasdf.
