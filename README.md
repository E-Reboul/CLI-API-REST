# CLI-API-REST

A CLI tool to initialize and manage your API projects with ease.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [CLI Commands](#cli-commands)
- [Contributing](#contributing)
- [License](#license)

## Installation

To install the CLI globally from GitHub, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/cli-api-rest.git
    cd cli-api-rest
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Link the CLI globally:

    ```bash
    npm link
    ```

This will make the `api` command available globally on your system.

## Usage

Once installed, you can use the CLI to initialize a new API project, install dependencies, and manage your project structure.

### Detailed CLI Commands

  ```bash
  api init
  ```

This command initializes a new API project. It performs the following actions:

- Prompts the user for project details (name, framework, language, directory path).
- Creates the project directory structure.
- Initializes npm in the project directory.
- Installs core dependencies.

  ```bash
  api make entity
  ```

This command adds a new entity to the project. It performs the following actions:

- Prompts the user for the entity name and attributes.
- Creates entity-related files (`Model`, `Controller`, `Route`, `Entity`, `Factory`).
- Inserts attribute-related code snippets into the entity file.

### Utility Functions

#### `createEntityFiles(projectPath, entityName)`

This function creates the necessary files for a new entity. It performs the following actions:

- Defines the source and destination paths for the entity files.
- Copies template files to the destination paths.
- Replaces placeholder values in the template files with the actual entity name.

#### `copyTemplateFile(src, dest, entityName)`

This function copies a template file from the source path to the destination path and replaces placeholder values with the actual entity name.

#### `installDependency(dependency, projectPath)`

This function installs a given npm dependency in the specified project directory.

#### `createDirectoryTree(projectPath)`

This function creates the directory structure for a new project.

#### `createFileTree(projectPath)`

This function creates the necessary files for a new project based on the specified project structure.


## Project Structure

```plaintext
CLI-API-REST/
├── In working ├
