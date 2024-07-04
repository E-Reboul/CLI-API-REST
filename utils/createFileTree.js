import fs from 'fs';
import path from 'path';
import { copyTemplateFile } from './copyTemplateFile.js';
import ora from "ora";


export const createFileTree = (projectPath) => {
  const loadFileTree = ora(`Building file tree...`).start();

  try {
    const files = [
      { src: 'templates/mysql/README.md', dest: path.join(projectPath, 'README.md') },
      { src: 'templates/mysql/.gitignore', dest: path.join(projectPath, '.gitignore') },
      { src: 'templates/mysql/.env', dest: path.join(projectPath, '.env') },
      { src: 'templates/mysql/.env.local', dest: path.join(projectPath, '.env.local') },
      { src: 'templates/mysql/sql/exampleDatabase.sql', dest: path.join(projectPath, 'sql', 'exampleDatabase.sql') },
      { src: 'templates/mysql/src/server.js', dest: path.join(projectPath, 'src', 'server.js') },
      { src: 'templates/mysql/src/configs/database.js', dest: path.join(projectPath, 'src', 'configs', 'database.js') },
      { src: 'templates/mysql/src/models/exampleModel.js', dest: path.join(projectPath, 'src', 'models', 'exampleModel.js') },
      { src: 'templates/mysql/src/controllers/exampleController.js', dest: path.join(projectPath, 'src', 'controllers', 'exampleController.js') },
      { src: 'templates/mysql/src/routes/exampleRoutes.js', dest: path.join(projectPath, 'src', 'routes', 'exampleRoutes.js') },
      { src: 'templates/mysql/src/entities/exampleEntities.js', dest: path.join(projectPath, 'src', 'entities', 'exampleEntity.js') },
      { src: 'templates/mysql/src/factories/exampleFactory.js', dest: path.join(projectPath, 'src', 'factories', 'exampleFactory.js') },
    ];

    files.forEach((file) => {
      if (!fs.existsSync(file.dest)) {
        copyTemplateFile(file.src, file.dest);
      }
    });
    loadFileTree.succeed('File tree complete ✅');
  } catch (error) {
    loadFileTree.fail(`Failed to create file tree ❌ \n ${error}`);
  }
};
