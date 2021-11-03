import type { Arguments, Argv } from 'yargs';
import { getDefaultBranch } from '../git-info';
import { spawnSync } from '../utils';

type Options = {
  action: string;
};

export const command: string = '$0 [action]';
export const desc: string = 'Run git cli commands and show the steps';

export function builder(yargs: Argv<Options>) {
  yargs.positional('action', { type: 'string', demandOption: true });
}

export async function handler(argv: Arguments<Options>) {
  const { action } = argv;

  const defaultBranch = await getDefaultBranch();

  if (action?.includes('rebase')) {
    const steps = [
      `git checkout ${defaultBranch}`,
      `git pull --rebase`,
      `git checkout -`,
      `git rebase ${defaultBranch}`,
    ];

    console.log(`Running: ${steps[0]}\n`);
    spawnSync(steps[0]);

    console.log(`Running: ${steps[1]}\n`);
    spawnSync(steps[1]);

    console.log(`Running: ${steps[2]}\n`);
    spawnSync(steps[2]);

    console.log(`Running: ${steps[3]}\n`);
    spawnSync(steps[3]);
  }

  process.exit(0);
}
