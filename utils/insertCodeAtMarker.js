import ora from 'ora';
import fs from 'fs';
import { indentEntityAttribute } from "./indentEntityAttribute.js";

export const insertCodeAtMarker = async (filePath, marker, insert, indentLevel = 8) => {
    const loadGenerationRoute = ora(`Inserting code into ${filePath}`).start();
  
    const content = await fs.promises.readFile(filePath, 'utf8');
  
    const parts = content.split(marker);
    if (parts.length < 2) {
      loadGenerationRoute.fail(`Marker "${marker}" not found in ${filePath}`);
      return;
    }
  
    const beforeMarker = parts[0];
    const afterMarker = parts.slice(1).join(marker);
  
    const indentedInsert = indentEntityAttribute(insert, indentLevel);
    const updatedContent = `${beforeMarker}${marker}\n${indentedInsert}\n${afterMarker}`;
    await fs.promises.writeFile(filePath, updatedContent, 'utf8');
  
    loadGenerationRoute.succeed(`Code inserted into ${filePath} ✅`);
  };