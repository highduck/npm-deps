#!/usr/bin/env node

'use strict';

const {collectDependencies} = require('./index.js');
const fs = require("fs");
const path = require("path");

// read current package.json
let pkg = null;
try {
    const p = path.join(process.cwd(), "package.json");
    const text = fs.readFileSync(p, 'utf8');
    pkg = JSON.parse(text);
}
catch {
    console.error("error reading package.json");
    return;
}

const cmakeModuleParts = [];

cmakeModuleParts.push("# dependencies\n");
collectDependencies(pkg.dependencies, cmakeModuleParts);

cmakeModuleParts.push("# devDependencies\n");
collectDependencies(pkg.devDependencies, cmakeModuleParts);

fs.writeFileSync('npm.cmake', cmakeModuleParts.join('\n'));