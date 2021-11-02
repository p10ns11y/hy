#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
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
    describe:
      'Display step by step git cli commands and run them in that order.',
    type: 'boolean',
    demandOption: false,
    default: true,
  }).argv;

console.log(argv);
