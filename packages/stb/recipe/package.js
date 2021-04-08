const {downloadFiles} = require('@ekx/cli-utils');

async function run() {

    console.info("stb");

    await downloadFiles({
        srcBaseUrl: "https://github.com/nothings/stb/raw/master",
        destPath: "src",
        fileList: [
            "stb_image.h",
            "stb_image_write.h",
            "stb_rect_pack.h",
            "stb_textedit.h",
            "stb_truetype.h",
        ]
    });
}

run().catch(() => process.exit(1));