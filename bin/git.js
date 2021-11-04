"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gracefulPush = exports.getCurrentBranch = exports.getDefaultBranch = exports.isBranchExist = void 0;
const node_child_process_1 = require("node:child_process");
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
function isBranchExist(branchName) {
    const result = (0, node_child_process_1.spawnSync)(`git show-ref --verify refs/heads/${branchName}`, {
        shell: true,
        stdio: 'pipe',
    });
    return result.status === 0;
}
exports.isBranchExist = isBranchExist;
async function getDefaultBranch() {
    if (isBranchExist('master')) {
        return 'master';
    }
    if (isBranchExist('main')) {
        return 'main';
    }
    const { branch } = await inquirer_1.default.prompt([
        {
            type: 'input',
            name: 'branch',
            message: 'Enter the default branch name',
            default: 'main',
        },
    ]);
    return branch;
}
exports.getDefaultBranch = getDefaultBranch;
function getCurrentBranch() {
    const result = (0, node_child_process_1.spawnSync)('git branch --show-current', {
        shell: true,
        stdio: 'pipe',
    });
    return result.stdout?.toString().trim();
}
exports.getCurrentBranch = getCurrentBranch;
function gracefulPush({ withForce = false, } = {}) {
    const currentBranch = getCurrentBranch();
    const pushCommand = `git push${withForce ? ' --force-with-lease' : ''}`;
    console.log(`\nRunning: ${chalk_1.default.green.bold(pushCommand)}\n`);
    const result = (0, node_child_process_1.spawnSync)(pushCommand, {
        shell: true,
        stdio: 'pipe',
    });
    if (result.status === 0) {
        console.log(`Branch ${currentBranch} pushed successfully`);
        return;
    }
    console.log(`\n${chalk_1.default.red.bold('Push failed since remote tracking is not set')}\n`);
    const firstTimePushCommand = `git push --set-upstream origin ${currentBranch}`;
    console.log(`\nRunning: ${chalk_1.default.green.bold(firstTimePushCommand)}\n`);
    const { status } = (0, node_child_process_1.spawnSync)(firstTimePushCommand, {
        shell: true,
        stdio: 'pipe',
    });
    if (status === 0) {
        console.log(`Branch ${currentBranch} pushed successfully for the first time`);
    }
    else {
        console.log(`Branch ${currentBranch} push failed`);
    }
}
exports.gracefulPush = gracefulPush;
