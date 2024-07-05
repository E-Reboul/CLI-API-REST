import fs from 'fs';
import path from 'path';
import { copyTemplateFile } from './copyTemplateFile.js';
import ora from "ora";

export const createEntityFiles = (projectPath, entityName, entityAttribute) => {
  const generateEntityPath = ('generation-templates', 'express-js', 'generate-entity');
  const loadFileTree = ora(`Building file tree...`).start();

  try {
    const files = [
      { src: path.join(generateEntityPath, 'generateModel.js'), dest: path.join(projectPath, 'src', 'models', `${entityName}Model.js`) },
      { src: path.join(generateEntityPath, 'generateController.js'), dest: path.join(projectPath, 'src', 'controllers', `${entityName}Controller.js`) },
      { src: path.join(generateEntityPath, 'generateRoute.js'), dest: path.join(projectPath, 'src', 'routes', `${entityName}Route.js`) },
      { src: path.join(generateEntityPath, 'generateEntity.js'), dest: path.join(projectPath, 'src', 'entities', `${entityName}Entity.js`) },
      { src: path.join(generateEntityPath, 'generateFactory.js'), dest: path.join(projectPath, 'src', 'factories', `${entityName}Factory.js`) },
    ];

    files.forEach((file) => {
      if (!fs.existsSync(file.dest)) {
        file.src.replace('/{{ENTITY_NAME}}/g', entityAttribute)
        copyTemplateFile(file.src, file.dest);
      }
    });
    loadFileTree.succeed('File tree complete ✅');
  } catch (error) {
    loadFileTree.fail(`Failed to create file tree ❌ \n ${error}`);
  }
};
