const {executeAsync} = require('@ekx/cli-utils');

async function run() {
    let args = [];
    if (0 | process.env.USE_CCACHE) {
        args.push("-DCMAKE_C_COMPILER_LAUNCHER=ccache", "-DCMAKE_CXX_COMPILER_LAUNCHER=ccache");
    }
    else {
        if (process.env.CC) {
            args.push(`-DCMAKE_C_COMPILER_LAUNCHER=${process.env.CC}`);
        }
        if (process.env.CXX) {
            args.push(`-DCMAKE_CXX_COMPILER_LAUNCHER=${process.env.CXX}`);
        }
    }
    await executeAsync("cmake", [
        "-S", ".",
        "-B", "build",
        "-G", "Ninja",
        `-DCMAKE_BUILD_TYPE=Debug`,
        ...args
    ]);
}

run().catch(() => process.exit(1));