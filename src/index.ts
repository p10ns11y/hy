#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

(async () =>
  await yargs(hideBin(process.argv))
    .scriptName('hy')
    .usage('$0 <action>')
    .strictCommands()
    .strictOptions()
    .alias({ h: 'help' })
    .commandDir('commands').argv)();
