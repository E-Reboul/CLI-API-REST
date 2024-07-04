import fs from 'fs';
import path from 'path';
import ora from "ora";

export const createDirectoryTree = (projectPath) => {
  const loadDirectoryTree = ora('Creating the directory tree...').start();

  try {
    const directories = [
      path.join(projectPath, 'src'),
      path.join(projectPath, 'src', 'configs'),
      path.join(projectPath, 'src', 'controllers'),
      path.join(projectPath, 'src', 'models'),
      path.join(projectPath, 'src', 'routes'),
      path.join(projectPath, 'src', 'interfaces'),
      path.join(projectPath, 'src', 'entities'),
      path.join(projectPath, 'src', 'middleware'),
      path.join(projectPath, 'src', 'factories'),
      path.join(projectPath, 'sql')
    ];

    directories.forEach((dir) => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });

    loadDirectoryTree.succeed('Directory tree created successfully ✅');
  } catch (error) {
    loadDirectoryTree.fail(`Failed to create directory tree ❌\n${error}`);
  }
};
