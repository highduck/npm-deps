/**
 *
 * @param {Project} project
 */
function setup(project) {
    project.addModule({
        name: "stb",
        path: __dirname,
        cpp: ["src"]
    });
}

module.exports = setup;