#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import inquirer from 'inquirer';
import fs from 'fs';
import path from 'path';

//path where executed command
const directoryProject = process.cwd();
//path of CLI
const directoryCLI = __dirname;
//path for generationEntity templates regexp
const directoryGenerationEntity = path.join(directoryCLI, 'generation-templates', 'express-js', 'generate-entity');

const templateStringType = path.join(directoryGenerationEntity, 'typeString.js');
const templateNumberType = path.join(directoryGenerationEntity, 'typeNumber.js');
const templateBooleanType = path.join(directoryGenerationEntity, 'typeBoolean.js');
const templateDateType = path.join(directoryGenerationEntity, 'typeDate.js');

const templateGetAttribute = path.join(directoryGenerationEntity, 'getAttribute.js')
const templateSetAttribute = path.join(directoryGenerationEntity, 'setAttributes.js')

const templates = [
  {
    name: 'generateServer',
    source: path.join(directoryGenerationEntity, 'generateServer.js'),
    destination: path.join(directoryProject, 'src', 'server.js')
  },
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
    source: path.join(directoryGenerationEntity, 'generateRoutes.js'),
    destination: path.join(directoryProject, 'src', 'routes', `${entityName}Route.js}`)
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

const insertCodeAtMarker = async (filePath, marker, insert) => {
  const loadGenerationRoute = ora(`Inserting code into ${filePath}`)
  try {
    const content = await fs.promises.readFile(filePath, 'utf8');

    const segmentation = content.split(marker);
    if (segmentation.length < 2) {
      throw new Error(`Marker ${marker}`);
    }

    const beforeMarker = parts[0];
    const afterMarker = parts.slice(1).join(marker);

    const updateContent = `${beforeMarker}${marker}${insert}${afterMarker}`
    await fs.promises.readFile(filePath, updateContent, 'utf8');

    loadGenerationRoute.success(`Code inserted into ${filePath}✅`);
  } catch (error) {
    loadGenerationRoute.fail(`Failed to insert code into ${filePath}`);
    console.log('Error to generate route in server' + error)
  }
};

const generateAttributes = async () => {

  let template = ``;

  attributes.forEach(attr => {
    switch(attr.type) {
      case 'STRING':
        template = fs.promises.readFile(templateStringType, 'utf8');
        template.replace('/{{ENTITY_NAME}}/g', attr.name);
        getTemplate = fs.promises.readFile()
        break;
      case 'NUMBER':
        fs.promises.readFile(templateNumberType, 'utf8')
        template = '';
        break;
      case 'BOOLEAN':
        fs.promises.readFile(templateBooleanType, 'utf8')
        template = '';
        break;
      case 'DATE':
        fs.promises.readFile(templateDateType, 'utf8')
        template = '';
        break;
    };
  });
};

yargs(hideBin(process.argv))
  .command('make entity', 'add new entity(table)', () => {}, async (argv) => {
    const entity = await inquirer.prompt([
      {
        type: 'input',
        name: 'entityName',
        message: 'Enter name of entity:'
      }
    ]);

    const attributes = [];
    let firstAttributeAdded = false;

    while (true) {
      const { attribute, attributeType } = await inquirer.prompt([
        {
          type: 'input',
          name: 'attribute',
          message: firstAttributeAdded 
            ? 'Add new attribute (leave empty to finish):'
            : 'Add first attribute:'
        },
        {
          type: 'list',
          name: 'attributeType',
          message: 'Select the type of the attribute:',
          choices: ['STRING', 'NUMBER', 'BOOLEAN', 'DATE'],
          when: answers => answers.attribute !== ''
        }
      ]);

      // If the attribute input is empty and at least one attribute has been added, break the loop
      if (!attribute && firstAttributeAdded) {
        break;
      }

      // If an attribute is provided, set the flag to true and add to attributes list
      if (attribute) {
        attributes.push({ name: attribute, type: attributeType });
        firstAttributeAdded = true;
      }
    }

    const entityName = entity.entityName;

    const importMarker = '//insert import routes';
    const routesMarker = '// insert routes here';
  })
  .help()
  .argv;
