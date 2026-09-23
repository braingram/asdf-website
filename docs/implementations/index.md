# Implementations

The ASDF specification is supported in several programming languages. See the table and links below for more information about each implementation and what features are supported (`R/W` = reads and writes).

| Implementation | Metadata | Tags | Blocks | Compression | Validation [^val] | Extensions |
| --- | --- | --- | --- | --- | --- | --- |
| [Python](asdf-python.md) | R/W | R/W | R/W | R/W | True | True |
| [C](asdf-c.md) | R/W | R/W | R/W | R/W |  | True |
| [C++](asdf-cpp.md) | R/W | R/W [^cpp] | R [^cpp] | R/W [^cpp] |  |  |
| [Java](asdf-java.md) | R | R | R | R |  |  |
| [Julia](asdf-julia.md) | R/W | R/W | R/W | R/W |  |  |

[^val]: The "Validation" column refers to support for validation of the YAML metadata against the associated schemas.
[^cpp]: The c++ implementation only supports 1.2.0 core schemas and always compresses arrays.
