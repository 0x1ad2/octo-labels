import { execSync } from "child_process";
import fs from "fs";

console.log(`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
| 🤖 EXECUTING SCRIPT: add-github-labels   |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
console.log("");

/**
 * Executes a shell command and returns the output as a JSON object.
 * @param {string} command - The command to execute.
 * @returns {any} - Parsed JSON output from the command.
 */
const runCommand = (command) => {
  try {
    return JSON.parse(execSync(command, { encoding: "utf8" }));
  } catch (error) {
    console.error(`❌ Error executing command: ${command}`, error.message);
    return [];
  }
};

/**
 * Creates labels from the provided JSON file.
 * @param {string} filePath - Path to the JSON file containing labels.
 */
const createLabelsFromJson = (filePath) => {
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Labels file not found: ${filePath}`);
    process.exit(1);
  }

  const labels = JSON.parse(fs.readFileSync(filePath, "utf8"));

  if (!Array.isArray(labels)) {
    console.error(`❌ Invalid JSON format: ${filePath}`);
    process.exit(1);
  }

  labels.forEach(({ name, description, color }) => {
    try {
      execSync(
        `gh label create "${name}" --description "${description}" --color ${color} --force`,
        { stdio: "inherit" }
      );
      console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    } catch (error) {
      console.error(`❌ Failed to create label: ${name}`, error.message);
    }
  });
};

createLabelsFromJson("scripts/data/new-github-labels.json");
console.log("");
