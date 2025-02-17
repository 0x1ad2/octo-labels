import { execSync } from "child_process";
import fs from "fs";
import path from "path";

/**
 * Parses command-line arguments and extracts the `--filePath` value.
 * @returns {string} The file path if provided, otherwise the default.
 */
const parseArguments = () => {
  const args = process.argv.slice(2);
  const filePathIndex = args.indexOf("--filePath");

  if (filePathIndex !== -1 && args[filePathIndex + 1]) {
    return args[filePathIndex + 1];
  }

  return "data/default-github-labels.json";
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
  const resolvedPath = path.resolve(filePath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(`❌ Labels file not found: ${resolvedPath}`);
    process.exit(1);
  }

  try {
    const labels = JSON.parse(fs.readFileSync(resolvedPath, "utf8"));

    if (!Array.isArray(labels)) {
      console.error(`❌ Invalid JSON format: ${resolvedPath}`);
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
    console.error(`❌ Error reading JSON file: ${resolvedPath}`, error.message);
    process.exit(1);
  }
};

const filePath = parseArguments();

console.log(`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
| 🤖 EXECUTING SCRIPT: add-github-labels   |
| 📂 Using labels file: ${filePath}        |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
`);

createLabelsFromJson(filePath);
console.log("");
