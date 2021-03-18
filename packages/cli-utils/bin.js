#!/usr/bin/env node

// install stage check :(
// TODO: move cli utils
const fs = require("fs");
const main = "./dist/main.js";
if(!fs.existsSync(main)) {
    require("child_process").spawnSync("tsc");
}
require(main);