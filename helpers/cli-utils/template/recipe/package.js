const {downloadAndUnpackArtifact, copyFolderRecursiveSync} = require('@ekx/cli-utils');
const fs = require("fs");
const rimraf = require("rimraf");

async function run() {
    //const artifact = "freetype-2.10.4.tar.gz";
    // await downloadAndUnpackArtifact("https://download.savannah.gnu.org/releases/freetype/freetype-2.10.4.tar.gz", "_dist");
    // copyFolderRecursiveSync("_dist/include", "include");
    // copyFolderRecursiveSync("_dist/src", "src");
    // fs.copyFileSync("recipe/ftoption.h", "include/freetype/config/ftoption.h");
    // fs.copyFileSync("recipe/ft2build.h", "include/ft2build.h");
    // rimraf.sync("src/**/*.mk");
    // rimraf.sync("src/**/README");
}

run().catch(() => process.exit(1));