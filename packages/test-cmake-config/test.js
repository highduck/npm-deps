const {build} = require("cmake-build");

build({
    ninja: true,
    debug: true
}).catch(_ => process.exit(1));