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

function convertPackageName(name) {
    if (name.length > 0 && name[0] === "@" && name.indexOf("/") > 0) {
        const parts = name.split("/");
        const scope = parts[0].substr(1);
        return scope + "::" + parts[1];
    }
    return name;
}

function dependencyBlock(name, dep, rel, dir) {
    return `# ${dep} => ${name}
if(NOT TARGET ${name})
    file(TO_NATIVE_PATH "${rel}" MODULE_PATH_CONVERTED)
    add_subdirectory(\${MODULE_PATH_CONVERTED} ${dir})
endif()`
}

function collectDependencies(dependencies, output) {
    if (!dependencies) {
        return;
    }
    for (const dep of Object.keys(dependencies)) {
        const cmakePath = resolveFrom(process.cwd(), dep + "/CMakeLists.txt");
        if (cmakePath != null) {
            const name = convertPackageName(dep);
            const dir = path.basename(dep);
            const where = path.dirname(cmakePath);
            const rel = path.relative(process.cwd(), where);
            output.push(dependencyBlock(name, dep, rel, dir));
        }
    }
}

module.exports = {
    resolveFrom,
    convertPackageName,
    dependencyBlock,
    collectDependencies
};