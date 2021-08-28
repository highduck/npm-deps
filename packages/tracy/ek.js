
/**
 *
 * @param {Project} project
 */
function setup(project) {
    project.addModule({
        name: "tracy",
        path: __dirname,
        cpp: ["stub"]
    });
}

module.exports = setup;