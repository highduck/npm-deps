import {copyFolderRecursiveSync} from "./index";
import * as path from "path";
import * as fs from "fs";
{
    const i = process.argv.indexOf("create");
    if (i >= 0) {
        const name = process.argv[i + 1];
        const templatePackagePath = path.join(__dirname, "../template");
        const destPath = path.join(process.cwd(), "packages", name);
        copyFolderRecursiveSync(templatePackagePath, destPath);

        {
            const filePath = path.join(destPath, "CMakeLists.txt");
            let a = fs.readFileSync(filePath, "utf-8");
            a = a.replace("project(package-template)", `project(${name})`);
            fs.writeFileSync(filePath, a);
        }

        {
            const filePath = path.join(destPath, "package.json");
            let a = fs.readFileSync(filePath, "utf-8");
            a = a.replace("@ekx/package-template", `@ekx/${name}`);
            fs.writeFileSync(filePath, a);
        }

        {
            const filePath = path.join(destPath, "README.md");
            let a = fs.readFileSync(filePath, "utf-8");
            a = a.replace("# package template", `# ${name}`);
            fs.writeFileSync(filePath, a);
        }

        {
            const filePath = path.join(destPath, "test/CMakeLists.txt");
            let a = fs.readFileSync(filePath, "utf-8");
            a = a.replace("# add_subdirectory(.. library)", `add_subdirectory(.. ${name})`);
            a = a.replace("# target_link_libraries(${PROJECT_NAME} PUBLIC library)",
                `target_link_libraries(\${PROJECT_NAME} PUBLIC ${name})`);
            fs.writeFileSync(filePath, a);
        }


    }
}