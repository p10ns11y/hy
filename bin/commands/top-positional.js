"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const git_1 = require("../git");
const run_1 = require("../run");
exports.command = '$0 <action>';
exports.desc = 'Run git cli commands and show the steps';
function builder(yargs) {
    yargs.positional('action', { type: 'string', demandOption: true });
}
exports.builder = builder;
async function handler(argv) {
    const { action } = argv;
    const defaultBranch = await (0, git_1.getDefaultBranch)();
    if (action?.match(/rebase/g)) {
        const steps = [
            `git checkout ${defaultBranch}`,
            `git pull --rebase`,
            `git checkout -`,
            `git rebase ${defaultBranch}`,
        ];
        if (action.match(/push|then push/g)) {
            steps.push(() => (0, git_1.gracefulPush)({ withForce: true }));
        }
        steps.forEach((step) => (0, run_1.run)(step));
    }
    process.exit(0);
}
exports.handler = handler;
