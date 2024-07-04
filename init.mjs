#!/usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fs from 'fs';
import inquirer from "inquirer";
import path from "path";
import { execSync } from "child_process";
import ora from "ora";

import { installDependency } from './utils/installDependency.js';
import { createDirectoryTree } from './utils/createDirectoryTree.js';
import { createFileTree } from './utils/createFileTree.js';

yargs(hideBin(process.argv))
  .command('init', 'Initializing new API project...', () => { }, async (argv) => {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'Enter the project name:',
        validate: (input) => {
          if (input.trim() === '') {
            return 'Project name cannot be empty❌';
          }
          return true;
        }
      },
      {
        type: 'list',
        name: 'framework',
        message: 'Choose your stack:',
        choices: ['Express', 'NextJS'],
      },
      {
        type: 'list',
        name: 'language',
        message: 'Select language used:',
        choices: ['JavaScript', 'TypeScript'],
      },
      {
        type: 'input',
        name: 'directoryPath',
        message: `Enter the path of the directory :`,
        //delete Onedrive if u dont using
        default: path.join(process.env.HOME || process.env.USERPROFILE, 'OneDrive', 'Bureau' || 'Desktop'),
        validate: (input) => {
          if (!fs.existsSync(input.trim())) {
            return 'This path does not exist locally';
          }
          return true;
        }
      },
    ]);

    /*
    ** Directory path validation
    */
    const directoryPath = answers.directoryPath.trim();

    if (!fs.existsSync(directoryPath)) {
      console.log('This path does not exist locally❌');
      return;
    } else {
      console.log(`Path ${directoryPath} is valid✅`);
    }

    /*
    ** Generation project path
    */
    const projectPath = path.join(directoryPath, answers.projectName.trim());
    console.log(`Project will be created in ${projectPath}`);

    try {
      // If directory does not already exist, create it
      if (!fs.existsSync(projectPath)) {
        fs.mkdirSync(projectPath);
        console.log(`Project directory created successfully at ${projectPath}✅`);
      } else {
        console.log('Project already exists❌');
        return;
      }
    } catch (error) {
      console.error(`Failed to create project directory: ${error}❌`);
      return;
    }

    createDirectoryTree(projectPath);
    createFileTree(projectPath);

    /*
    ** Initializing packet manager in project
    */
    console.log(`Initializing packet manager in ${projectPath}...`);
    const loadNpm = ora('Initializing packet manager...').start();

    try {
      execSync('npm init -y', { cwd: projectPath, stdio: 'inherit' });
      loadNpm.succeed('npm has been initialized successfully ✅');
    } catch (error) {
      loadNpm.fail(`npm initialization failed ❌ \n ${error}`);
      return;
    }

    /*
    ** Installing core dependencies
    */
    const coreDepsExpress = ['express', 'mysql2', 'util', 'cors', 'dotenv', 'compression', 'jsonwebtoken', 'bcrypt', 'nodemon --save-dev'];
    const loadCoreDeps = ora('Installing core packages...').start();

    for (const dep of coreDepsExpress) {
      await installDependency(dep, projectPath);
    }
    loadCoreDeps.succeed('Core dependencies installed successfully ✅');

    /*
    ** Additional dependencies prompt
    */
    let addMoreDep = true;
    while (addMoreDep) {
      const moreDep = await inquirer.prompt([
        {
          type: 'input',
          name: 'dependency',
          message: 'Add another dependency? (leave blank to finish):',
        }
      ]);
      if (moreDep.dependency) {
        await installDependency(moreDep.dependency, projectPath);
      } else {
        addMoreDep = false;
      }
    }
  })
  .help()
  .argv;
