"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDefaultBranch = exports.isBranchExist = void 0;
const child_process_1 = require("child_process");
const inquirer_1 = __importDefault(require("inquirer"));
function isBranchExist(branchName) {
    const result = (0, child_process_1.spawnSync)(`git show-ref --verify refs/heads/${branchName}`, {
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
