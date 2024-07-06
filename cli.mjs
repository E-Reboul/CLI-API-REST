#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';
import ora from 'ora';
import { createEntityFiles } from './utils/createEntityFiles.js';
import { fileURLToPath } from 'url';

// path where executed command
const directoryProject = process.cwd();
// path of CLI
const directoryCLI = path.dirname(fileURLToPath(import.meta.url));
// path for generationEntity templates regexp
const directoryGenerationEntity = path.join(directoryCLI, 'generation-templates', 'express-js', 'generate-entity');

const templateStringType = path.join(directoryGenerationEntity, 'typeString.js');
const templateNumberType = path.join(directoryGenerationEntity, 'typeNumber.js');
const templateBooleanType = path.join(directoryGenerationEntity, 'typeBoolean.js');
const templateDateType = path.join(directoryGenerationEntity, 'typeDate.js');

const templateSetAttribute = path.join(directoryGenerationEntity, 'setAttribute.js');
const templateGetAttribute = path.join(directoryGenerationEntity, 'getAttribute.js');

const markerSetProperties = '// Set Properties of the entity';
const markerSetMethod = '// Set method for attributes of entity';
const markerGetMethod = '// Get method for attributes of entity';

const indentCode = (code, indentLevel) => {
  const indent = ' '.repeat(indentLevel);
  return code.split('\n').map(line => indent + line).join('\n');
};

const insertCodeAtMarker = async (filePath, marker, insert, indentLevel = 8) => {
  const loadGenerationRoute = ora(`Inserting code into ${filePath}`).start();

  const content = await fs.promises.readFile(filePath, 'utf8');

  const parts = content.split(marker);
  const beforeMarker = parts[0];
  const afterMarker = parts.slice(1).join(marker);

  const indentedInsert = indentCode(insert, indentLevel);
  const updatedContent = `${beforeMarker}${marker}\n${indentedInsert}\n${afterMarker}`;
  await fs.promises.writeFile(filePath, updatedContent, 'utf8');

  loadGenerationRoute.succeed(`Code inserted into ${filePath} ✅`);
};

const generateAttributes = async (attributes, templates) => {
  for (const attr of attributes) {
    let template;
    switch(attr.type) {
      case 'STRING':
        template = await fs.promises.readFile(templateStringType, 'utf8');
        break;
      case 'NUMBER':
        template = await fs.promises.readFile(templateNumberType, 'utf8');
        break;
      case 'BOOLEAN':
        template = await fs.promises.readFile(templateBooleanType, 'utf8');
        break;
      case 'DATE':
        template = await fs.promises.readFile(templateDateType, 'utf8');
        break;
    }

    const entityDestination = templates.find(t => t.name === 'generateEntity').destination;
    const newAttributeName = `new${attr.name.charAt(0).toUpperCase() + attr.name.slice(1)}`;

    const updatedTemplate = template.replace(/{{ATTRIBUTE_NAME}}/g, attr.name).replace(/new{{ATTRIBUTE_NAME}}/g, newAttributeName);

    await insertCodeAtMarker(entityDestination, markerSetProperties, updatedTemplate);

    const setAttributeTemplate = await fs.promises.readFile(templateSetAttribute, 'utf8');
    const updatedSetAttributeTemplate = setAttributeTemplate
      .replace(/{{ATTRIBUTE_NAME}}/g, attr.name)
      .replace(/new{{ATTRIBUTE_NAME}}/g, newAttributeName);
    await insertCodeAtMarker(entityDestination, markerSetMethod, updatedSetAttributeTemplate);

    const getAttributeTemplate = await fs.promises.readFile(templateGetAttribute, 'utf8');
    const updatedGetAttributeTemplate = getAttributeTemplate.replace(/{{ATTRIBUTE_NAME}}/g, attr.name);
    await insertCodeAtMarker(entityDestination, markerGetMethod, updatedGetAttributeTemplate);
  }
};

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
      createEntityFiles(directoryProject, entityName);
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
          validate: (input) => {
            if (input.trim() === 'Attribute') {
              console.log('')
            }
            return true;
          }
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

    const importMarker = '//insert import routes';
    const routesMarker = '// insert routes here';
  })
  .help()
  .argv;
