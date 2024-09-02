import fs from 'fs';
import path from 'path';
import { capitalizeEachWords } from "./capitalizeEachWords.js";
import { insertCodeAtMarker } from "./insertCodeAtMarker.js";
import { fileURLToPath } from 'url';

const directoryCLI = path.dirname(fileURLToPath(import.meta.url));
const directoryGenerationEntity = path.join(directoryCLI, '..', 'generation-templates', 'express-js', 'generate-entity');

const templateStringType = path.join(directoryGenerationEntity, 'typeString.js');
const templateNumberType = path.join(directoryGenerationEntity, 'typeNumber.js');
const templateBooleanType = path.join(directoryGenerationEntity, 'typeBoolean.js');
const templateDateType = path.join(directoryGenerationEntity, 'typeDate.js');

const templateSetAttribute = path.join(directoryGenerationEntity, 'setAttribute.js');
const templateGetAttribute = path.join(directoryGenerationEntity, 'getAttribute.js');

const markerSetProperties = '// Set Properties of the entity';
const markerSetMethod = '// Set method for attributes of entity';
const markerGetMethod = '// Get method for attributes of entity';

export const generateAttributes = async (attributes, templates) => {
    for (const attr of attributes) {
      let template;
      switch (attr.type) {
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
        default:
          console.log(`Unknown attribute type: ${attr.type}`);
          continue;
      }
  
      const entityDestination = templates.find(t => t.name === 'generateEntity').destination;
      const newAttributeName = `new${capitalizeEachWords(attr.name)}`;
  
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