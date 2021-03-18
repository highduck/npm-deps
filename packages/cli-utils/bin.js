#!/usr/bin/env node

// install stage check :(
// TODO: move cli utils

const main = "./dist/main.js";

try {
    require.resolve(main);
} catch (_) {
    console.warn("main.js not found, need to build package...")
    require("child_process").spawnSync("tsc", {
        stdio: "inherit"
    });
}

require(main);