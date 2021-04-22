const {testPackage} = require('@ekx/cli-utils');

async function run() {
    await testPackage('Debug', 'Release');
}

run().catch(() => process.exit(1));