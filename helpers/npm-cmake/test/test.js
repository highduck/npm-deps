'use strict';

const {resolveFrom, convertPackageName, dependencyBlock, collectDependencies} = require('../index.js');
const path = require("path");
const fs = require("fs");

function expectEquals(a, b) {
    console.assert(a === b, `${a} should be ${b}`);
}

expectEquals(convertPackageName("@ekx/library-name"), "ekx::library-name");
expectEquals(convertPackageName("simple-library-name"), "simple-library-name");

expectEquals(fs.realpathSync(resolveFrom(__dirname, "npm-cmake/package.json")), path.resolve(__dirname, "../package.json"));