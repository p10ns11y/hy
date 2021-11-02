#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const helpers_1 = require("yargs/helpers");
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
    .strict()
    .alias({ h: 'help' })
    .option('t', {
    alias: 'teach',
    describe: 'Display step by step git cli commands.',
    type: 'boolean',
    demandOption: false,
})
    .option('d', {
    alias: 'do',
    describe: 'Display step by step git cli commands and run them in that order.',
    type: 'boolean',
    demandOption: false,
    default: true,
}).argv;
console.log(argv);
