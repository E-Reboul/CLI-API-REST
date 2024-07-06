import fs from 'fs/promises';
import path from 'path';
import ora from 'ora';
import { fileURLToPath } from 'url';
import { copyAndReplaceRegexpFile } from './copyAndReplaceRegexpFile.js';
import { convertToCamelCase } from './convertInCamelCase.js';

const filePath = path.dirname(fileURLToPath(import.meta.url));

export const createEntityFiles = async (projectPath, entityName) => {
  const generateEntityPath = path.join(filePath, '..', 'generation-templates', 'express-js', 'generate-entity');
  const camelCaseNameFile = convertToCamelCase(`${entityName}`);
  const entityNameRegexp = /{{ENTITY_NAME}}/g;
  const loadFileTree = ora(`Building file tree...`).start();

  console.log('generateEntityPath:', generateEntityPath);

  try {
    const files = [
      { src: path.join(generateEntityPath, 'generateModel.js'), dest: path.join(projectPath, 'src', 'models', `${camelCaseNameFile}Model.js`) },
      { src: path.join(generateEntityPath, 'generateController.js'), dest: path.join(projectPath, 'src', 'controllers', `${camelCaseNameFile}Controller.js`) },
      { src: path.join(generateEntityPath, 'generateRoute.js'), dest: path.join(projectPath, 'src', 'routes', `${camelCaseNameFile}Route.js`) },
      { src: path.join(generateEntityPath, 'generateEntity.js'), dest: path.join(projectPath, 'src', 'entities', `${camelCaseNameFile}Entity.js`) },
      { src: path.join(generateEntityPath, 'generateFactory.js'), dest: path.join(projectPath, 'src', 'factories', `${camelCaseNameFile}Factory.js`) }
    ];

    for (const file of files) {
      console.log('Processing file:', file);
      try {
        await fs.access(file.dest); 
      } catch {
        await copyAndReplaceRegexpFile(file.src, file.dest, entityNameRegexp, entityName);
      }
    }

    loadFileTree.succeed('File tree complete ✅');
  } catch (error) {
    loadFileTree.fail(`Failed to create file tree ❌ \n ${error}`);
  }
};
