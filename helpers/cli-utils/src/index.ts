import {https} from 'follow-redirects';
import * as fs from 'fs';
import * as path from 'path';
import * as zlib from "zlib";
import {ExtractOptions} from "tar";
import {spawn} from "child_process";
import * as crypto from 'crypto';

const lzma = require('lzma-native');
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
    // destination path, `process.cwd` if not defined
    destPath?: string;
    fileMap?: { [key: string]: string };
    fileList?: string[];
}

export function downloadFiles(props: DownloadOptions) {
    const srcBaseUrl = props.srcBaseUrl;
    const destPath = props.destPath ?? process.cwd();
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

export function unpackTgz(packageTgz: string, unpackTarget: string) {
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

export function unpackTarXZ(packageTar: string, unpackTarget: string) {

    // "@types/lzma-native": "^4.0.0"
    // "lzma-native": "^7.0.1"
    // TODO: package build flow with separated dev module
    // throw new Error("LZMA is disabled temporary, unable to unpack XZ archive");

    const extractOpts: ExtractOptions = {cwd: unpackTarget, strip: 1};
    tar.extract(extractOpts);
    return new Promise((resolve, reject) => {
        fs.createReadStream(packageTar)
            .on('error', function (err) {
                reject('Unable to open tarball ' + packageTar + ': ' + err);
            })
            .pipe(lzma.createDecompressor())
            .on('error', function (err) {
                reject('Error during unzip for ' + packageTar + ': ' + err);
            })
            .pipe(tar.extract(extractOpts))
            .on('error', function (err) {
                reject('Error during untar for ' + packageTar + ': ' + err);
            })
            .on('end', function (result) {
                resolve(result)
            });
    });
}

export async function downloadAndUnpackArtifact(url: string, destDir: string) {
    const name = path.basename(url);
    const archivePath = path.join(destDir, name);
    await downloadFile(url, archivePath);
    await unpackTgz(archivePath, "./" + destDir);
    await fs.rmSync(archivePath);
}

export async function downloadCheck(url: string, destDir: string, sha1: string) {
    const name = path.basename(url);
    const archivePath = path.join(destDir, name);
    if (fs.existsSync(archivePath)) {
        const file = fs.readFileSync(archivePath);
        const sha1sum = crypto.createHash('sha1').update(file).digest("hex");
        if (sha1sum === sha1) {
            console.info("Check SHA1 verified, skip downloading", name);
            return;
        }
    }
    await downloadFile(url, archivePath);
}

const UtilityConfig = {
    verbose: true
};

export type ExecuteOptions = {
    cwd?: string,
    verbose?: boolean,
    passExitCode?: boolean
};

export function executeAsync(bin: string, args: string[], options?: ExecuteOptions): Promise<number> {
    return new Promise((resolve, reject) => {
        const child = spawn(bin, args, {
            //detached: true,
            stdio: (options?.verbose ?? UtilityConfig.verbose) ? "inherit" : "ignore",
            cwd: options?.cwd
        });
        child.on('close', (code) => {
            if (code === 0 || !!(options?.passExitCode)) {
                resolve(code);
            } else {
                reject('exit code: ' + code);
            }
        });
    });
}

/** Test Package **/
export interface TestPackageOptions {
    target?: string | string[];
    buildType?: string | string[];
    // set null to ignore
    expectExitCode?: number | null
}

function resolveTestPackageOptions(optionsOrBuildTypes: [TestPackageOptions] | string[]) {
    let options: TestPackageOptions = {};

    if (optionsOrBuildTypes.length > 0) {
        if (typeof optionsOrBuildTypes[0] === 'string') {
            options.buildType = optionsOrBuildTypes as string[];
        } else {
            options = optionsOrBuildTypes[0] as TestPackageOptions;
        }
    }

    if (options.buildType === undefined) {
        options.buildType = ['Debug', 'Release'];
    } else if (typeof options.buildType === 'string') {
        options.buildType = [options.buildType];
    }

    if (options.target === undefined) {
        options.target = ['test-package'];
    } else if (typeof options.target === 'string') {
        options.target = [options.target];
    }

    if (options.expectExitCode === undefined) {
        options.expectExitCode = 0;
    }

    return options;
}

function getBuildDir(project: string, buildType?: string): string {
    return path.join(process.cwd(), 'build', project, buildType?.toLowerCase());
}

export async function testPackage(...optionsOrBuildTypes: [TestPackageOptions] | string[]) {
    const options = resolveTestPackageOptions(optionsOrBuildTypes);
    const optionsTargets = options.target as string[];

    // 1. clean
    for (const buildType of options.buildType) {
        const buildDir = getBuildDir('test-package', buildType);
        try {
            await fs.promises.rm(buildDir, {recursive: true});
        } catch (e) {

        }
    }

    // 2. configure
    for (const buildType of options.buildType) {
        const buildDir = getBuildDir('test-package', buildType);
        const args = [];
        if(process.env.USE_CCACHE) {
            args.push("-DCMAKE_C_COMPILER_LAUNCHER=ccache", "-DCMAKE_CXX_COMPILER_LAUNCHER=ccache");
        }
        await executeAsync("cmake", [
            "./test",
            "-B", buildDir,
            "-G", "Ninja",
            `-DCMAKE_BUILD_TYPE=${buildType}`,
            ...args
        ]);
    }

    // 3. build targets
    for (const buildType of options.buildType) {
        const buildDir = getBuildDir('test-package', buildType);
        await executeAsync("cmake", [
            "--build", buildDir,
            "--target", ...optionsTargets
        ]);
    }

    let totalRun = 0;
    let totalOK = 0;
    let totalFailed = 0;
    // 4. execute targets
    for (const buildType of options.buildType) {
        const buildDir = getBuildDir('test-package', buildType);
        for (const target of optionsTargets) {
            const result = await executeAsync("./" + target, [], {
                cwd: buildDir,
                passExitCode: true
            });
            console.info("Test run exit code:", result);
            if (options.expectExitCode !== null &&
                result != options.expectExitCode) {
                console.error("Test run FAILED: exit code should be", options.expectExitCode);
                ++totalFailed;
            } else {
                ++totalOK;
            }
            ++totalRun;
        }
    }

    console.info("SUCCESSFUL TESTS:", totalOK, "/", totalRun);
    console.warn("FAILED TESTS", totalFailed, "/", totalRun);

    // 5. clean
    try {
        const projectBuildDir = getBuildDir('test-package');
        await fs.promises.rm(projectBuildDir, {recursive: true});
    } catch {
        // mute
    }
}