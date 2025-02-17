#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Parses command-line arguments and extracts the `--filePath` value.
 * @returns {string} The resolved file path if provided, otherwise the package default.
 */
const parseArguments = () => {
  const args = process.argv.slice(2);
  const filePathIndex = args.indexOf("--filePath");

  if (filePathIndex !== -1 && args[filePathIndex + 1]) {
    return path.resolve(args[filePathIndex + 1]);
  }

  return path.resolve(__dirname, "../data/default-github-labels.json");
};

/**
 * Executes a shell command.
 * @param {string} command - The command to execute.
 */
const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`❌ Error executing command: ${command}`, error.message);
  }
};

/**
 * Creates GitHub labels from the provided JSON file.
 * @param {string} filePath - Path to the JSON file containing labels.
 */
const createLabelsFromJson = (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Labels file not found: ${filePath}`);
    process.exit(1);
  }

  try {
    const labels = JSON.parse(fs.readFileSync(filePath, "utf8"));

    if (!Array.isArray(labels)) {
      console.error(`❌ Invalid JSON format: ${filePath}`);
      process.exit(1);
    }

    labels.forEach(({ name, description, color }) => {
      runCommand(
        `gh label create "${name}" --description "${description}" --color ${color} --force`
      );
      console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    });

    console.log(`✅ All labels processed successfully.`);
  } catch (error) {
    console.error(`❌ Error reading JSON file: ${filePath}`, error.message);
    process.exit(1);
  }
};

const filePath = parseArguments();

console.log(`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
| 🤖 EXECUTING SCRIPT: add-github-labels   |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
📂 Using labels file: ${filePath}
`);

createLabelsFromJson(filePath);
