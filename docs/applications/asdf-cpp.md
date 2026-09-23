# ASDF for C++

[asdf-cxx](https://github.com/eschnett/asdf-cxx) is an open-source prototype implementation of the ASDF Specification in C++ authored by [Erik Schnetter](https://github.com/eschnett). Although not yet feature-complete, the library supports ASDF's core capabilities of storing metadata in YAML and serializing n-dimensional numerical data arrays.

## Installation Requirements

- C++ 17-capable C++ compiler (tested with [Clang](https://clang.llvm.org/) and [GCC](https://gcc.gnu.org/))
- [cmake](https://cmake.org/)
- [pkg-config](https://www.freedesktop.org/wiki/Software/pkg-config/)
- [yaml-cpp](https://github.com/jbeder/yaml-cpp)

**Optional libraries for compression and MD5:**

- [OpenSSL](https://www.openssl.org/) (MD5 checksums)
- [bzip2](http://bzip.org/) (compression)
- [c-blosc](https://www.blosc.org/) (compression)
- [c-blosc2](https://www.blosc.org/) (compression)
- [lz4](https://lz4.org/) (compression)
- [zlib](http://zlib.net/) (compression)
- [zstd](https://github.com/facebook/zstd) (compression)

## Build Instructions

```bash
$ git clone https://github.com/eschnett/asdf-cxx
$ cd asdf-cxx
$ cmake -B build -S .
$ cmake --build build
$ ctest --test-dir build
$ cmake --install build
```
