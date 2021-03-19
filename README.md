# npm-deps

C++ modules via NPM

## How to add CMake dependencies via NPM

- Add `@ekx/cli-utils` as devDependency to your package
- Add `include(npm.cmake)` to the top of your `CMakeLists.txt`
- Run `yarn link-cmake-npm` to generate resolved `npm.cmake`

### TODO

- replace `lzma-native` to make initial install faster