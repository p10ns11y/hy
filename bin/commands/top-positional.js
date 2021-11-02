"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = exports.builder = exports.desc = exports.command = void 0;
const utils_1 = require("../utils");
exports.command = '$0 [action]';
exports.desc = 'Run git cli commands and show the steps';
function builder(yargs) {
    yargs.positional('action', { type: 'string', demandOption: true });
}
exports.builder = builder;
function handler(argv) {
    const { action } = argv;
    if (action?.includes('rebase')) {
        console.log('Running: git checkout main\n');
        (0, utils_1.spawnSync)('git checkout main');
        console.log('Running: git pull --rebase\n');
        (0, utils_1.spawnSync)('git pull --rebase');
        console.log('Running: git checkout -\n');
        (0, utils_1.spawnSync)('git checkout -');
        console.log('Running: git rebase main\n');
        (0, utils_1.spawnSync)('git rebase main');
    }
    process.exit(0);
}
exports.handler = handler;
