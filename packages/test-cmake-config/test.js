const {build} = require("cmake-build");

build({
    debug: true
}).catch(_ => process.exit(1));