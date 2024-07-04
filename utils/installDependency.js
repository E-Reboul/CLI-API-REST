import inquirer from "inquirer";
import { execSync } from "child_process";
import ora from "ora";

export const installDependency = async (dep, projectPath) => {
  let installed = false;
  const loadDependency = ora(`Installing ${dep}...`).start();

  while (!installed) {
    try {
      execSync(`npm install ${dep}`, { cwd: projectPath, stdio: 'inherit' });
      loadDependency.succeed(`Successfully installed ${dep} ✅`);
      installed = true;
    } catch (error) {
      loadDependency.fail(`Failed to install ${dep}.❌ Please check the name and retry.`);
      const dependencyAnswer = await inquirer.prompt([
        {
          type: 'input',
          name: 'dependency',
          message: 'Enter the name of the dependency to install in the project:',
          validate: (input) => {
            if (input.trim() === '') {
              return 'Dependency name cannot be empty';
            }
            return true;
          }
        }
      ]);
      if (!dependencyAnswer.dependency) {
        break;
      }
      dep = dependencyAnswer.dependency;
      loadDependency.start(`Installing ${dep}...`);
    }
  }
};
