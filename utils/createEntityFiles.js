import fs from 'fs';
import path from 'path';
import ora from "ora";
import { fileURLToPath } from 'url';
import { copyAndReplaceRegexpFile } from './copyAndReplaceRegexpFile.js';

const filePath = path.dirname(fileURLToPath(import.meta.url));

export const createEntityFiles = (projectPath, entityName) => {
  const generateEntityPath = path.join(filePath, '..', 'generation-templates', 'express-js', 'generate-entity');
  const entityNameRegexp = /{{ENTITY_NAME}}/g
  const loadFileTree = ora(`Building file tree...`).start();

  console.log('generateEntityPath:', generateEntityPath); 

  try {
    const files = [
      { src: path.join(generateEntityPath, 'generateModel.js'), dest: path.join(projectPath, 'src', 'models', `${entityName}Model.js`) },
      { src: path.join(generateEntityPath, 'generateController.js'), dest: path.join(projectPath, 'src', 'controllers', `${entityName}Controller.js`) },
      { src: path.join(generateEntityPath, 'generateRoute.js'), dest: path.join(projectPath, 'src', 'routes', `${entityName}Route.js`) },
      { src: path.join(generateEntityPath, 'generateEntity.js'), dest: path.join(projectPath, 'src', 'entities', `${entityName}Entity.js`) },
      { src: path.join(generateEntityPath, 'generateFactory.js'), dest: path.join(projectPath, 'src', 'factories', `${entityName}Factory.js`) }
    ];

    files.forEach((file) => {
      console.log('Processing file:', file); 
      if (!fs.existsSync(file.dest)) {
        copyAndReplaceRegexpFile(file.src, file.dest, entityNameRegexp, entityName);
      }
    });

    loadFileTree.succeed('File tree complete ✅');
  } catch (error) {
    loadFileTree.fail(`Failed to create file tree ❌ \n ${error}`);
  }
};
