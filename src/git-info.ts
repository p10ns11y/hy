import { spawnSync } from 'child_process';
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
