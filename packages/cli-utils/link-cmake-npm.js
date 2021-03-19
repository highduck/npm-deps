#!/usr/bin/env node

'use strict';

const fs = require("fs");
const path = require("path");
const Module = require("module");

// want to not have any dependencies, so just copy approach from `resolve-from` package
function resolveFrom(fromDirectory, moduleId) {
    try {
        fromDirectory = fs.realpathSync(fromDirectory);
    } catch (error) {
        if (error.code === 'ENOENT') {
            fromDirectory = path.resolve(fromDirectory);
        } else {
            return null;
        }
    }

    const fromFile = path.join(fromDirectory, 'noop.js');
    const resolveFileName = () => Module._resolveFilename(moduleId, {
        id: fromFile,
        filename: fromFile,
        paths: Module._nodeModulePaths(fromDirectory)
    });

    try {
        return resolveFileName();
    } catch (error) {
        return null;
    }
}

// read current package.json
const pkg = JSON.parse(fs.readFileSync(path.join(process.cwd(), "package.json"), 'utf-8'));

if(pkg.dependencies != null) {
    let cmakeModule = ``;
    for (const dep of Object.keys(pkg.dependencies)) {
        const cmakePath = resolveFrom(process.cwd(), dep + "/CMakeLists.txt");
        if (cmakePath != null) {
            const name = path.basename(dep);
            const where = path.dirname(cmakePath);
            const rel = path.relative(process.cwd(), where);
            cmakeModule += `
if(NOT TARGET ${name})
add_subdirectory(${rel} ${name})
endif()
`;
        }
    }

    if(cmakeModule.length > 0) {
        fs.writeFileSync('npm.cmake', cmakeModule);
    }
}