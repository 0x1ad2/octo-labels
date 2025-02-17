#!/usr/bin/env node

import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import { execSync } from "child_process";

const args = process.argv.slice(2);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Display Help Menu
if (args.includes("--help")) {
  console.log(`
    ▗▄▖  ▗▄▄▖▗▄▄▄▖▗▄▖ ▗▖    ▗▄▖ ▗▄▄▖ ▗▄▄▄▖▗▖    ▗▄▄▖
    ▐▌ ▐▌▐▌     █ ▐▌ ▐▌▐▌   ▐▌ ▐▌▐▌ ▐▌▐▌   ▐▌   ▐▌   
    ▐▌ ▐▌▐▌     █ ▐▌ ▐▌▐▌   ▐▛▀▜▌▐▛▀▚▖▐▛▀▀▘▐▌    ▝▀▚▖
    ▝▚▄▞▘▝▚▄▄▖  █ ▝▚▄▞▘▐▙▄▄▖▐▌ ▐▌▐▙▄▞▘▐▙▄▄▖▐▙▄▄▖▗▄▄▞▘
                                            
    Usage: octo-labels [options] <command>

    Options:
      --help        Show help
      --version     Show version number

    Commands:
      init          Initialize the project by exporting labels and starting the dev server
      list          Display all labels in the repository
      add           Apply labels from JSON to a repository
        --filePath  Path to the JSON file containing labels (optional)
      delete        Remove all labels from a repository
      open          Open dev server to compare labels
      export        Export GitHub labels to a JSON file
      migrate       Clone labels from one repository to another
  `);
  process.exit(0);
}

// Display Version Number
if (args.includes("--version")) {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url))
  );
  console.log(packageJson.version);
  process.exit(0);
}

// Extract --filePath argument (if provided)
let filePath = null;
const filePathIndex = args.indexOf("--filePath");
if (filePathIndex !== -1 && args[filePathIndex + 1]) {
  filePath = resolve(args[filePathIndex + 1]);
}

// Define available commands
const commandMap = {
  init: "npm run list && npm run export && npm run open",
  add: filePath
    ? `node ${__dirname}/../scripts/add-github-labels.js --filePath "${filePath}"`
    : `node ${__dirname}/../scripts/add-github-labels.js`,
  delete: `node ${__dirname}/../scripts/delete-github-labels.js`,
  export: `node ${__dirname}/../scripts/export-github-labels.js`,
  list: "gh label list --limit 100",
  migrate: `node ${__dirname}/../scripts/migrate-github-labels.js`,
  open: "vite --open",
};

// Execute the selected command
const command = args[0];
if (commandMap[command]) {
  try {
    const output = execSync(commandMap[command], { stdio: "inherit" });
    if (output) {
      console.log(output.toString());
    }
    process.exit(0);
  } catch (error) {
    console.error(`❌ Error executing command: ${command}`, error.message);
    process.exit(1);
  }
} else {
  console.log("❌ Unknown command. Use --help to see available options.");
  process.exit(1);
}
