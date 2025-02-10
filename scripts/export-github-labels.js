import { execSync } from "child_process";
import fs from "fs";

console.log(`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
| 🤖 EXECUTING SCRIPT: export-github-labels |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
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
 * Fetches all labels from the GitHub repository and saves them to a JSON file.
 * @param {string} outputFile - The file to save the labels to.
 */
const exportLabels = (outputFile) => {
  const labels = runCommand(
    "gh label list --json name,description,color --limit 100"
  );

  if (labels.length === 0) {
    console.log("❌ No labels found.");
    return;
  }

  const formattedLabels = labels.map(({ name, description, color }) => ({
    name,
    description: description || "No description provided",
    color,
  }));

  fs.writeFileSync(outputFile, JSON.stringify(formattedLabels, null, 2));
  console.log(`✅ Labels exported to: ${outputFile}`);
};

exportLabels("scripts/data/current-github-labels.json");
console.log("");
