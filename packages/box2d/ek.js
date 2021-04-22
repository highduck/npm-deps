const path = require('path');

module.exports = (ctx) => {
    ctx.addModule({
        name: "box2d",
        cpp: [
            path.join(__dirname, "src"),
            path.join(__dirname, "include")
        ]
    });
};