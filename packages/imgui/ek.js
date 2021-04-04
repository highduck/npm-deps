const path = require('path');

module.exports = (ctx) => {
    ctx.addModule({
        name: "imgui",
        cpp: [path.join(__dirname, "src")]
    });
    ctx.importModule("@ekx/freetype", __dirname);
    ctx.importModule("@ekx/stb", __dirname);
};