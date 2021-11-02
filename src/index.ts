#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .scriptName('hy')
  .usage('$0 [cmd] [args]')
  .strictCommands()
  .strictOptions()
  .alias({ h: 'help' })
  .commandDir('commands').argv;
