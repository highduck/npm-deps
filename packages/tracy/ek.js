const path = require('path');

module.exports = (ctx) => {
    ctx.addModule({
        name: "tracy",
        // using stub for export builds
        cpp: [path.join(__dirname, "stub")]
    });
};