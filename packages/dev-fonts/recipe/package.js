const {downloadFiles} = require('@ekx/cli-utils');

async function run() {
    console.info("dev-fonts");

    const branch = "docking";
    const tasks = [
        downloadFiles({
            srcBaseUrl: `https://github.com/ocornut/imgui/raw/${branch}`,
            destPath: "ttf",
            fileMap: {
                "misc/fonts/Cousine-Regular.ttf": "Cousine-Regular.ttf"
            }
        }),
        downloadFiles({
            srcBaseUrl: `https://github.com/FortAwesome/Font-Awesome/raw/master/webfonts`,
            destPath: "ttf",
            fileList: [
                "fa-regular-400.ttf",
                "fa-solid-900.ttf"
            ]
        }),
        downloadFiles({
            srcBaseUrl: `https://github.com/juliettef/IconFontCppHeaders/raw/master`,
            destPath: "src",
            fileList: [
                "IconsFontAwesome5.h"
            ]
        })
    ];
    return Promise.all(tasks);
}

run().then();