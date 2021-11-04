import { spawnSync } from 'node:child_process';
import chalk from 'chalk';
import inquier from 'inquirer';

export function isBranchExist(branchName: string): boolean {
  const result = spawnSync(`git show-ref --verify refs/heads/${branchName}`, {
    shell: true,
    stdio: 'pipe',
  });
  return result.status === 0;
}

export async function getDefaultBranch() {
  if (isBranchExist('master')) {
    return 'master';
  }

  if (isBranchExist('main')) {
    return 'main';
  }

  const { branch } = await inquier.prompt([
    {
      type: 'input',
      name: 'branch',
      message: 'Enter the default branch name',
      default: 'main',
    },
  ]);

  return branch;
}

export function getCurrentBranch() {
  const result = spawnSync('git branch --show-current', {
    shell: true,
    stdio: 'pipe',
  });

  return result.stdout?.toString().trim();
}

export function gracefulPush({
  withForce = false,
}: { withForce?: boolean } = {}) {
  const currentBranch = getCurrentBranch();

  const pushCommand = `git push${withForce ? ' --force-with-lease' : ''}`;
  console.log(`\nRunning: ${chalk.green.bold(pushCommand)}\n`);
  const result = spawnSync(pushCommand, {
    shell: true,
    stdio: 'pipe',
  });

  if (result.status === 0) {
    console.log(`Branch ${currentBranch} pushed successfully`);
    return;
  }

  console.log(
    `\n${chalk.red.bold('Push failed since remote tracking is not set')}\n`
  );
  const firstTimePushCommand = `git push --set-upstream origin ${currentBranch}`;
  console.log(`\nRunning: ${chalk.green.bold(firstTimePushCommand)}\n`);
  const { status } = spawnSync(firstTimePushCommand, {
    shell: true,
    stdio: 'pipe',
  });

  if (status === 0) {
    console.log(
      `Branch ${currentBranch} pushed successfully for the first time`
    );
  } else {
    console.log(`Branch ${currentBranch} push failed`);
  }
}
