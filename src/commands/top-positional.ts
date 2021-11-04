import type { Arguments, Argv } from 'yargs';
import { getDefaultBranch, gracefulPush } from '../git';
import { run } from '../run';

type Options = {
  action: string;
};

export const command: string = '$0 <action>';
export const desc: string = 'Run git cli commands and show the steps';

export function builder(yargs: Argv<Options>) {
  yargs.positional('action', { type: 'string', demandOption: true });
}

export async function handler(argv: Arguments<Options>) {
  const { action } = argv;

  const defaultBranch = await getDefaultBranch();

  if (action?.match(/rebase/g)) {
    const steps: Array<string | Function> = [
      `git checkout ${defaultBranch}`,
      `git pull --rebase`,
      `git checkout -`,
      `git rebase ${defaultBranch}`,
    ];

    if (action.match(/push|then push/g)) {
      steps.push(() => gracefulPush({ withForce: true }));
    }

    steps.forEach((step) => run(step));
  }

  process.exit(0);
}
