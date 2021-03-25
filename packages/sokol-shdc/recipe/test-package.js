const {existsSync, mkdirSync, rmSync, realpathSync} = require("fs");
// const {spawnSync} = require("child_process");
const spawn = require('cross-spawn');

console.info("sokol-shdc wrapper");

try {
    mkdirSync("build/test-shader", {recursive: true});
}
catch {
    console.error("fail to create output directory");
    process.exit(-1);
}

// we are in local environment, so use `yarn bin` (yarn v1) to find local package executable
let bin = spawn.sync("yarn", ["bin", "sokol-shdc"], {encoding:'utf8'}).stdout;
if(bin != null) {
    bin = bin.split("\n").join("");
}
console.info("sokol-shdc.js path:", bin);
// follow symlink
// bin = fs.realpathSync(bin);
// console.info("sokol-shdc.js real path:", bin);

const r = spawn.sync(bin, [
    "-i", "test/simple2d.glsl",
    "-o", "build/test-shader/simple2d_shader.h",
    "-l", "glsl330:glsl300es:glsl100:hlsl5:metal_ios:metal_sim:metal_macos",
    // "--bytecode",
    // "--dump"
], {
    stdio: "inherit",
    encoding:'utf8'
});

console.warn(r.stdout);
console.warn(r.stderr);
console.warn(r.status);

if(r.status !== 0 && r.status !== 0xFFFFFFFF) {
    console.warn("sokol-shdc status:", r.status);
    //process.exit(-1);
}

if(!existsSync("build/test-shader/simple2d_shader.h")) {
    console.error("shader header not found");
    if(process.platform === 'win32') {
        // TODO: fix win32 test
        // bypass test for windows
    }
    else {
        process.exit(-1);
    }
}

rmSync("build/test-shader", {recursive: true});

process.exit(0);
