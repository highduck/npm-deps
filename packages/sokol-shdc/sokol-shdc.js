#!/usr/bin/env node

const {spawnSync} = require("child_process");
const path = require("path");

const arguments = process.argv.slice(2);

const executables = {
    darwin: 'bin/osx/sokol-shdc',
    linux: 'bin/linux/sokol-shdc',
    win32: 'bin/win32/sokol-shdc.exe'
};

const executable = executables[process.platform];
if (!executable) {
    throw new Error(`error: platform ${process.platform} is not supported`);
}

const exe = path.join(__dirname, executable);
console.log(exe, ...arguments);
console.log("|cwd", process.cwd());

const status = spawnSync(exe, arguments, {
    stdio:"inherit"
}).status;

process.exit(status);
