const {testPackage} = require('@ekx/cli-utils');

async function run() {
    await testPackage({
        target: ['test-package', 'test-benchmark']
    });
}

run().then();