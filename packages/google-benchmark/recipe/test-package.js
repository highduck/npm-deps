const {testPackage} = require('@ekx/cli-utils');

testPackage({
    buildType: ['Release'],
    expectExitCode: null
}).then();