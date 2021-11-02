"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.spawnSync = void 0;
const child_process_1 = __importDefault(require("child_process"));
function spawnSync(command, options = {}) {
    const result = child_process_1.default.spawnSync(command, {
        shell: true,
        stdio: 'pipe',
        ...options,
    });
    result.stdout = result.stdout || '';
    result.stderr = result.stderr || '';
    if (result.status === 0) {
        return result.stdout.toString().trim();
    }
    else {
        throw new Error(`\n\nError executing command: ${command}\n\nERROR CODE: ${result.status}\n\nSTDERR:\n${result.stderr}\n\nSTDOUT:\n${result.stdout}`);
    }
}
exports.spawnSync = spawnSync;
