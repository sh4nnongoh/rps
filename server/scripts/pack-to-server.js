const fs = require("fs-extra");
const path = require("path");

const appDist = "../dist";
const serverDist = "dist";

// eslint-disable-next-line security/detect-non-literal-fs-filename
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

function copyDistFolder() {
    fs.copySync(resolveApp(appDist), resolveApp(serverDist));
}

copyDistFolder();