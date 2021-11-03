"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const git_info_1 = require("../git-info");
const utils_1 = require("../utils");
exports.command = '$0 [action]';
exports.desc = 'Run git cli commands and show the steps';
function builder(yargs) {
    yargs.positional('action', { type: 'string', demandOption: true });
}
exports.builder = builder;
async function handler(argv) {
    const { action } = argv;
    const defaultBranch = await (0, git_info_1.getDefaultBranch)();
    if (action?.includes('rebase')) {
        const steps = [
            `git checkout ${defaultBranch}`,
            `git pull --rebase`,
            `git checkout -`,
            `git rebase ${defaultBranch}`,
        ];
        console.log(`Running: ${steps[0]}\n`);
        (0, utils_1.spawnSync)(steps[0]);
        console.log(`Running: ${steps[1]}\n`);
        (0, utils_1.spawnSync)(steps[1]);
        console.log(`Running: ${steps[2]}\n`);
        (0, utils_1.spawnSync)(steps[2]);
        console.log(`Running: ${steps[3]}\n`);
        (0, utils_1.spawnSync)(steps[3]);
    }
    process.exit(0);
}
exports.handler = handler;
