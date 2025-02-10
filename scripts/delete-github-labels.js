import { execSync } from "child_process";
import fs from "fs";

console.log(`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
| 🤖 EXECUTING SCRIPT: delete-github-labels |
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
 * Deletes all existing labels in the repository.
 */
const deleteAllLabels = () => {
  const labels = runCommand("gh label list --json name --limit 1000");

  if (labels.length === 0) {
    console.log("✅ No labels to delete.");
    return;
  }

  labels.forEach(({ name }) => {
    try {
      execSync(`gh label delete "${name}" --yes`, { stdio: "inherit" });
      console.log(`~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
    } catch (error) {
      console.error(`❌ Failed to delete label: ${name}`, error.message);
    }
  });
};

deleteAllLabels();
console.log("");
