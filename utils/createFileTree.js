import fs from 'fs';
import path from 'path';
import { copyTemplateFile } from './copyTemplateFile.js';
import ora from "ora";
import { fileURLToPath } from 'url';

const filePath = path.dirname(fileURLToPath(import.meta.url));
const cliPath = path.resolve(filePath, '..');

export const createFileTree = (projectPath) => {
  const loadFileTree = ora(`Building file tree...`).start();

  try {
    const files = [
      { src: path.join(cliPath, 'templates/mysql/README.md'), dest: path.join(projectPath, 'README.md') },
      { src: path.join(cliPath, 'templates/mysql/.gitignore'), dest: path.join(projectPath, '.gitignore') },
      { src: path.join(cliPath, 'templates/mysql/.env'), dest: path.join(projectPath, '.env') },
      { src: path.join(cliPath, 'templates/mysql/.env.local'), dest: path.join(projectPath, '.env.local') },
      { src: path.join(cliPath, 'templates/mysql/sql/exampleDatabase.sql'), dest: path.join(projectPath, 'sql', 'exampleDatabase.sql') },
      { src: path.join(cliPath, 'templates/mysql/src/server.js'), dest: path.join(projectPath, 'src', 'server.js') },
      { src: path.join(cliPath, 'templates/mysql/src/configs/database.js'), dest: path.join(projectPath, 'src', 'configs', 'database.js') },
      { src: path.join(cliPath, 'templates/mysql/src/models/exampleModel.js'), dest: path.join(projectPath, 'src', 'models', 'exampleModel.js') },
      { src: path.join(cliPath, 'templates/mysql/src/controllers/exampleController.js'), dest: path.join(projectPath, 'src', 'controllers', 'exampleController.js') },
      { src: path.join(cliPath, 'templates/mysql/src/routes/exampleRoutes.js'), dest: path.join(projectPath, 'src', 'routes', 'exampleRoutes.js') },
      { src: path.join(cliPath, 'templates/mysql/src/entities/exampleEntities.js'), dest: path.join(projectPath, 'src', 'entities', 'exampleEntity.js') },
      { src: path.join(cliPath, 'templates/mysql/src/factories/exampleFactory.js'), dest: path.join(projectPath, 'src', 'factories', 'exampleFactory.js') },
    ];

    files.forEach((file) => {
      console.log(`${file.src} -----> ${file.dest}`);
      if (!fs.existsSync(file.src)) {
        console.error(`Source file does not exist: ${file.src}`);
      } else {
        copyTemplateFile(file.src, file.dest);
      }
    });

    loadFileTree.succeed('File tree complete ✅');
  } catch (error) {
    loadFileTree.fail(`Failed to create file tree ❌ \n ${error}`);
  }
};
