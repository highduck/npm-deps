# Link CMake NPM
____
Link CMake projects from NPM packages
```cmake
include(npm.cmake)
```

## Package name convention

- Scoped NPM package name `@scope/package-name` transforms to CMake target `scope::package-name`
- Packages without scope is not transform

## How to add CMake dependencies via NPM

- Add `npm-cmake` to your `package.json` in `dependency` section (not devDependencies because we want to resolve dependencies after install automatically)
- Add `include(npm.cmake)` to the beginning of your `CMakeLists.txt`
- Run `npx npm-cmake` to generate resolved `npm.cmake`

> NOTE: Better package and command naming is `npm-cmake`?