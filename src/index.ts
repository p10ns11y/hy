#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

yargs(hideBin(process.argv))
  .scriptName('hy')
  .usage('$0 <action>')
  .strictCommands()
  .strictOptions()
  .alias({ h: 'help' })
  .commandDir('commands')
  .showHelp('log').argv;
