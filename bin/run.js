"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const chalk_1 = __importDefault(require("chalk"));
const utils_1 = require("./utils");
function run(step) {
    try {
        let stdout = '';
        if (typeof step === 'function') {
            step();
        }
        else {
            console.log(`\nRunning: ${chalk_1.default.green.bold(step)}\n`);
            stdout = (0, utils_1.spawnSync)(step);
        }
        console.log(chalk_1.default.blue(stdout));
    }
    catch (error) {
        console.error(error);
    }
}
exports.run = run;
