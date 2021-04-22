const path = require('path');

module.exports = (ctx) => {
    ctx.addModule({
        name: "doctest",
        cpp: [
            path.join(__dirname, "doctest")
        ]
    });
};