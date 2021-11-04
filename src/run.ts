import chalk from 'chalk';
import { spawnSync } from './utils';

export function run(step: string | Function) {
  try {
    let stdout = '';
    if (typeof step === 'function') {
      step();
    } else {
      console.log(`\nRunning: ${chalk.green.bold(step)}\n`);
      stdout = spawnSync(step);
    }

    console.log(chalk.blue(stdout));
  } catch (error) {
    console.error(error);
  }
}
