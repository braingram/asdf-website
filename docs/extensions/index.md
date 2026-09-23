# Extensions

In addition to the core schemas defined in the ASDF Specification, there are several additional schemas available as extensions. These schemas are based upon the schemas in {{ extref("asdf-standard:asdf-standard", "ASDF Specification") }} and are packaged for use by the {{ extref("asdf:asdf", "asdf") }} library.

## Transforms

The [ASDF Transform Schemas](asdf-transform-schemas.md) define a set of schemas for serializing the models defined by {{ extref("astropy:astropy-modeling", "astropy.modeling") }} for the ASDF file format.

## Coordinates

The [ASDF Coordinates Schemas](asdf-coordinates-schemas.md) define a set of schemas for serializing the astronomical coordinate systems defined by {{ extref("astropy:astropy-coordinates", "astropy.coordinates") }} for the ASDF file format.

## WCS

The [ASDF WCS Schemas](asdf-wcs-schemas.md) define a set of schemas for serializing WCS objects for the [GWCS](https://gwcs.readthedocs.io/en/latest/index.html#gwcs) package.
