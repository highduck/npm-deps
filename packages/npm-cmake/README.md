# Link CMake NPM
____
Link CMake projects from NPM packages
```cmake
include(npm.cmake)
```

## How to add CMake dependencies via NPM

- Add `@ekx/link-cmake-npm` to your `package.json` in `dependency` section (not devDependencies because we want to resolve dependencies after install automatically)
- Add `include(npm.cmake)` to the beginning of your `CMakeLists.txt`
- Run `npx @ekx/npm-cmake` to generate resolved `npm.cmake`

> NOTE: Better package and command naming is `npm-cmake`?