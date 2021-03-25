const {existsSync, mkdirSync, rmSync} = require("fs");
const {spawnSync} = require("child_process");

console.info("sokol-shdc wrapper");

try {
    mkdirSync("build/test-shader", {recursive: true});
}
catch {
    console.error("fail to create output directory");
    process.exit(-1);
}

const r = spawnSync("sokol-shdc", [
    "-i", "test/simple2d.glsl",
    "-o", "build/test-shader/simple2d_shader.h",
    "-l", "glsl330:glsl300es:glsl100:hlsl5:metal_ios:metal_sim:metal_macos",
    // "--bytecode",
    // "--dump"
], {
    stdio: "inherit"
});

if(r.status !== 0 && r.status !== 0xFFFFFFFF) {
    console.warn("sokol-shdc status:", r.status);
    //process.exit(-1);
}

if(!existsSync("build/test-shader/simple2d_shader.h")) {
    console.error("shader header not found");
    process.exit(-1);
}

rmSync("build/test-shader", {recursive: true});

process.exit(0);
