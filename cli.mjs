#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import ora from 'ora';
import { createEntityFiles } from './utils/createEntityFiles.js';
import { generateAttributes } from './utils/generateAttributes.js';
import { fileURLToPath } from 'url';

// Path where executed command
const directoryProject = process.cwd();
// Path of CLI
const directoryCLI = path.dirname(fileURLToPath(import.meta.url));
// Path for generationEntity templates regexp
const directoryGenerationEntity = path.join(directoryCLI, 'generation-templates', 'express-js', 'generate-entity');

yargs(hideBin(process.argv))
  .command('make entity', 'add new entity(table)', () => {}, async (argv) => {
    const entity = await inquirer.prompt([
      {
        type: 'input',
        name: 'entityName',
        message: 'Enter name of entity:',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Entity name cannot be empty❌';
          }
          if (!/^[A-Z]/.test(input)) {
            return 'Entity name must start with an uppercase letter❌';
          }
          return true;
        }
      }
    ]);

    const entityName = entity.entityName;
    const entityFilePath = path.join(directoryProject, 'src', 'entities', `${entityName}Entity.js`);
    
    if (!fs.existsSync(entityFilePath)) {
      await createEntityFiles(directoryProject, entityName);
      console.log(directoryProject);
    }

    const entityFileContent = await fs.promises.readFile(entityFilePath, 'utf8');

    const attributes = [];
    let firstAttributeAdded = false;

    while (true) {    
      const { attribute, attributeType } = await inquirer.prompt([
        {
          type: 'input',
          name: 'attribute',
          message: firstAttributeAdded 
            ? 'Add new attribute (leave empty to finish):'
            : 'Add first attribute:',
        },
        {
          type: 'list',
          name: 'attributeType',
          message: 'Select the type of the attribute:',
          choices: ['STRING', 'NUMBER', 'BOOLEAN', 'DATE'],
          when: answers => answers.attribute !== ''
        }
      ]);

      if (!attribute && firstAttributeAdded) {
        break;
      }

      if (attribute) {
        const attributeExistsInFile = entityFileContent.includes(attribute);
        const attributeExistsInSession = attributes.some(attr => attr.name === attribute);

        if (attributeExistsInFile || attributeExistsInSession) {
          console.log(`Attribute "${attribute}" already exists. Please choose another name.❌`);
        } else {
          attributes.push({ name: attribute, type: attributeType });
          firstAttributeAdded = true;
        }
      }
    }

    const templates = [
      {
        name: 'generateModel',
        source: path.join(directoryGenerationEntity, 'generateModel.js'),
        destination: path.join(directoryProject, 'src', 'models', `${entityName}Model.js`)
      },
      {
        name: 'generateController',
        source: path.join(directoryGenerationEntity, 'generateController.js'),
        destination: path.join(directoryProject, 'src', 'controllers', `${entityName}Controller.js`)
      },
      {
        name: 'generateRoute',
        source: path.join(directoryGenerationEntity, 'generateRoute.js'),
        destination: path.join(directoryProject, 'src', 'routes', `${entityName}Route.js`)
      },
      {
        name: 'generateEntity',
        source: path.join(directoryGenerationEntity, 'generateEntity.js'),
        destination: path.join(directoryProject, 'src', 'entities', `${entityName}Entity.js`)
      },
      {
        name: 'generateFactory',
        source: path.join(directoryGenerationEntity, 'generateFactory.js'),
        destination: path.join(directoryProject, 'src', 'factories', `${entityName}Factory.js`)
      }
    ];

    await generateAttributes(attributes, templates);

    console.log('Attributes generated successfully!');
  })
  .help()
  .argv;
