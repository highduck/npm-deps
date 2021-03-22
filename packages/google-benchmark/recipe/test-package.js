const {testPackage} = require('@ekx/cli-utils');

testPackage({
    buildTypes: ['Release']
}).then();