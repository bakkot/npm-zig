# EXPERIMENTAL: zig-for-macos distributed as an npm package

This is just the files from [this tarball](https://ziglang.org/builds/zig-macos-x86_64-0.9.0-dev.1444+e2a2e6c14.tar.xz) wrapped up in an npm package.

See [the Zig github repo](https://github.com/ziglang/zig) and [website](https://ziglang.org/) for further information about Zig.

## TODO

- automate creation of this, maybe
  - see https://github.com/ziglang/zig-pypi/ for inspiration
- make versions of this package for every platform
  - see https://github.com/evanw/esbuild/tree/e608c549df157b1ef344490ecec56b4c4965ab27/npm for inspiration
- expose the `zig` binary as a node binary
  - if so, maybe have a postinstall script to replace it with the actual binary? like [esbuild does](https://github.com/evanw/esbuild/blob/29e8f9d36757141e293c3057d71f7dc1980999b0/lib/npm/node-install.ts)
