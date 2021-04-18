const {testPackage} = require('@ekx/cli-utils');

testPackage().catch(() => process.exit(1));