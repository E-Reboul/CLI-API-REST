import fs from 'fs';
import ora from 'ora';

export const copyAndReplaceRegexpFile = (src, dest, regexp, replacement) => {
  const loadFiles = ora(`Copying from ${src} to ${dest}...`).start();

  try {
    if (!fs.existsSync(src)) {
      throw new Error(`Source file ${src} does not exist`);
    }

    // Readn content source
    const content = fs.readFileSync(src, 'utf8');
    // Remplacement regpexp
    const updatedContent = content.replace(regexp, replacement);
    // Write file in dest with content updated
    fs.writeFileSync(dest, updatedContent, 'utf8');

    loadFiles.succeed(`Copied ${src} successfully ✅`);
  } catch (error) {
    loadFiles.fail(`Failed to copy ${src} ❌\n${error}`);
  }
};