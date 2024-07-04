import fs from 'fs';
import ora from "ora";

export const copyTemplateFile = (src, dest) => {
  const loadFiles = ora(`Copying from ${src} to ${dest}...`).start();

  try {
    if (!fs.existsSync(src)) {
      throw new Error(`Source file ${src} does not exist`);
    }

    fs.copyFileSync(src, dest);
    loadFiles.succeed(`Copied ${src} successfully ✅`);
  } catch (error) {
    loadFiles.fail(`Failed to copy ${src} ❌\n${error}`);
  }
};
