const {downloadFiles} = require('@ekx/cli-utils');

async function run() {
    console.info("miniaudio");
    //const branch = "master";
    const branch = "dev";
    // const fork = "eliasku";
    const fork = "mackron";
    await downloadFiles({
        srcBaseUrl: `https://github.com/${fork}/miniaudio/raw/${branch}`,
        destPath: "src",
        fileList: [
            "miniaudio.h",
            "research/miniaudio_engine.h"
        ]
    });
}

run().then();