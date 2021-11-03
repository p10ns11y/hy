import type { Arguments, Argv } from 'yargs';
import { spawnSync } from '../utils';

type Options = {
  action: string;
};

export const command: string = '$0 [action]';
export const desc: string = 'Run git cli commands and show the steps';

export function builder(yargs: Argv<Options>) {
  yargs.positional('action', { type: 'string', demandOption: true });
}

export function handler(argv: Arguments<Options>) {
  const { action } = argv;

  if (action?.includes('rebase')) {
    console.log('Running: git checkout main\n');
    spawnSync('git checkout main');

    console.log('Running: git pull --rebase\n');
    spawnSync('git pull --rebase');

    console.log('Running: git checkout -\n');
    spawnSync('git checkout -');

    console.log('Running: git rebase main\n');
    spawnSync('git rebase main');
  }

  process.exit(0);
}
