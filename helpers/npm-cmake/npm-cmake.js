#!/usr/bin/env node

'use strict';

const {collectDependencies, readPkg} = require('./index.js');
const fs = require("fs");

// read current package.json
const pkg = readPkg(process.cwd());
if(pkg == null) {
    process.exit(1);
}
const cmakeModuleParts = [];

const selfPkg = readPkg(__dirname);
if(selfPkg != null && selfPkg.version) {
    cmakeModuleParts.push(`message(STATUS "npm to cmake generator: ${selfPkg.name}@${selfPkg.version}")`);
}

cmakeModuleParts.push(`message(STATUS "package: ${pkg.name}@${pkg.version}")`);

cmakeModuleParts.push("# dependencies\n");
collectDependencies(pkg.dependencies, cmakeModuleParts);

cmakeModuleParts.push("# devDependencies\n");
collectDependencies(pkg.devDependencies, cmakeModuleParts);

fs.writeFileSync('npm.cmake', cmakeModuleParts.join('\n'));