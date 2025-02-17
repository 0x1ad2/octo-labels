#!/usr/bin/env node

import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { execSync } from "child_process";

const args = process.argv.slice(2);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

if (args.includes("--help")) {
  console.log(`
    ▗▄▖  ▗▄▄▖▗▄▄▄▖▗▄▖ ▗▖    ▗▄▖ ▗▄▄▖ ▗▄▄▄▖▗▖    ▗▄▄▖
    ▐▌ ▐▌▐▌     █ ▐▌ ▐▌▐▌   ▐▌ ▐▌▐▌ ▐▌▐▌   ▐▌   ▐▌   
    ▐▌ ▐▌▐▌     █ ▐▌ ▐▌▐▌   ▐▛▀▜▌▐▛▀▚▖▐▛▀▀▘▐▌    ▝▀▚▖
    ▝▚▄▞▘▝▚▄▄▖  █ ▝▚▄▞▘▐▙▄▄▖▐▌ ▐▌▐▙▄▞▘▐▙▄▄▖▐▙▄▄▖▗▄▄▞▘
                                            
    Usage: octo-labels [options]

    Options:
      --help     Show help
      --version  Show version number
      add        Apply labels from JSON to a repository
      delete     Remove all labels from a repository
      open       Open Vite
      export     Export GitHub labels to a JSON file
      init       Initialize the project by exporting labels and starting the dev server
      list       Display all labels in the repository
      migrate    Clone labels from one repository to another
  `);
  process.exit(0);
}

if (args.includes("--version")) {
  const packageJson = JSON.parse(
    await readFile(new URL("../package.json", import.meta.url))
  );
  console.log(packageJson.version);
  process.exit(0);
}

const commandMap = {
  add: "node scripts/add-github-labels.js",
  delete: "node scripts/delete-github-labels.js",
  open: "vite --open",
  export: "node scripts/export-github-labels.js",
  init: "npm run list && npm run export && npm run open",
  list: "gh label list --limit 100",
  migrate: "node scripts/migrate-github-labels.js",
};

const command = args[0];
if (commandMap[command]) {
  try {
    const output = execSync(commandMap[command], { stdio: "inherit" });
    if (output) {
      console.log(output.toString());
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
} else {
  console.log("Unknown command. Use --help to see available options.");
}
