const {executeAsync} = require('@ekx/cli-utils');

async function run() {
    let args = [];
    if (process.env.USE_CCACHE) {
        args.push("-DCMAKE_C_COMPILER_LAUNCHER=ccache", "-DCMAKE_CXX_COMPILER_LAUNCHER=ccache");
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