import {https} from 'follow-redirects';
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from "zlib";
import {ExtractOptions} from "tar";
import {spawn} from "child_process";

const tar = require('tar');

export function makeDirs(dir: string) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
}

export function ensureFileDir(dest: string) {
    makeDirs(path.dirname(dest));
}

export function copyFolderRecursiveSync(source: string, target: string) {
    makeDirs(target);

    if (fs.lstatSync(source).isDirectory()) {
        fs.readdirSync(source).forEach((file) => {
            const curSource = path.join(source, file);
            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, path.join(target, file));
            } else {
                fs.copyFileSync(curSource, path.join(target, file));
            }
        });
    }
}


function downloadFile(url: string, dest: string) {
    return new Promise<void>((resolve, reject) => {
        ensureFileDir(dest);
        const file = fs.createWriteStream(dest);
        console.info("download: " + url);
        https.get(url, function (response) {
            response.pipe(file);
            file.on('finish', () => {
                console.info("saved: ", dest);
                resolve();
            }).on('error', (e) => {
                console.error("file save error:", e);
                reject(e);
            })
        }).on('error', (e) => {
            console.error("https request error:", e);
            reject(e);
        });
    });
}

export interface DownloadOptions {
    srcBaseUrl: string;
    destPath: string;
    fileMap?: { [key: string]: string };
    fileList?: string[];
}

export function downloadFiles(props: DownloadOptions) {
    const srcBaseUrl = props.srcBaseUrl;
    const destPath = props.destPath;
    const fileMap = props.fileMap ?? {};
    const fileList = props.fileList ?? [];

    const tasks = [];

    for (const src of Object.keys(fileMap)) {
        const dest = fileMap[src] ?? src;
        const destFilePath = path.join(destPath, dest);
        const url = path.join(srcBaseUrl, src);
        tasks.push(downloadFile(url, destFilePath));
    }

    for (const src of fileList) {
        const destFilePath = path.join(destPath, src);
        const url = path.join(srcBaseUrl, src);
        tasks.push(downloadFile(url, destFilePath));
    }

    return Promise.all(tasks);
}

function unpackTgz(packageTgz: string, unpackTarget: string) {
    const extractOpts: ExtractOptions = {cwd: unpackTarget, strip: 1};

    return new Promise((resolve, reject) => {
        fs.createReadStream(packageTgz)
            .on('error', function (err) {
                reject('Unable to open tarball ' + packageTgz + ': ' + err);
            })
            .pipe(zlib.createUnzip())
            .on('error', function (err) {
                reject('Error during unzip for ' + packageTgz + ': ' + err);
            })
            .pipe(tar.extract(extractOpts))
            .on('error', function (err) {
                reject('Error during untar for ' + packageTgz + ': ' + err);
            })
            .on('end', function (result) {
                resolve(result)
            });
    })
}

export async function downloadAndUnpackArtifact(url: string, destDir: string) {
    const name = path.basename(url);
    const archivePath = path.join(destDir, name);
    await downloadFile(url, archivePath);
    await unpackTgz(archivePath, "./" + destDir);
    await fs.rmSync(archivePath);
}

const UtilityConfig = {
    verbose: true
};

export type ExecuteOptions = {
    cwd?: string,
    verbose?: boolean
};

export function executeAsync(bin: string, args: string[], options?: ExecuteOptions): Promise<number> {
    return new Promise((resolve, reject) => {
        const child = spawn(bin, args, {
            //detached: true,
            stdio: (options?.verbose ?? UtilityConfig.verbose) ? "inherit" : "ignore",
            cwd: options?.cwd
        });
        child.on('close', (code) => {
            if (code === 0) {
                resolve(code);
            } else {
                reject('exit code: ' + code);
            }
        });
    });
}

export async function testPackage(...buildTypes: string[]) {
    for (const buildType of buildTypes) {
        const buildDir = path.join(process.cwd(), 'cmake-test-' + buildType);

        try {
            await fs.promises.rm(buildDir, {recursive: true});
        } catch (e) {

        }
        await fs.promises.mkdir(buildDir);

        // Ubuntu-latest: https://github.com/actions/virtual-environments/blob/main/images/linux/Ubuntu1804-README.md
        // includes clang 9.0
        // disable ninja :(
        //"-GNinja",
        await executeAsync("cmake", [
            "-B", buildDir,
            `-DCMAKE_BUILD_TYPE=${buildType}`,
            '-DCMAKE_C_COMPILER=clang',
            '-DCMAKE_CXX_COMPILER=clang++'
        ]);

        await executeAsync("cmake", ["--build", buildDir, "--target", "test-package"]);

        // fs.chmodSync(path.join(buildDir, "test-package"), 0o755);
        await executeAsync("./test-package", [], {
            cwd: buildDir
        });

        await fs.promises.rm(buildDir, {recursive: true});
    }
}