import { execSync } from "child_process";

console.log(`
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
| 🤖 EXECUTING SCRIPT: migrate-github-labels |
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`);
console.log("");

/**
 * Runs a shell command and handles errors.
 * @param {string} command - The command to execute.
 */
const runCommand = (command) => {
  try {
    execSync(command, { stdio: "inherit" });
  } catch (error) {
    console.error(`❌ Error executing command: ${command}`, error.message);
    process.exit(1);
  }
};

/**
 * Parses command-line arguments and extracts values for source and target repositories.
 * @returns {{ source: string, target: string }}
 */
const parseArguments = () => {
  const args = process.argv.slice(2);
  let sourceRepo = null;
  let targetRepo = null;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--source" && args[i + 1]) {
      sourceRepo = args[i + 1];
    }
    if (args[i] === "--target" && args[i + 1]) {
      targetRepo = args[i + 1];
    }
  }

  if (!sourceRepo || !targetRepo) {
    console.error(
      "❌ Usage: npm run migrate --source owner/source-repo --target owner/target-repo"
    );
    process.exit(1);
  }

  return { source: sourceRepo, target: targetRepo };
};

/**
 * Migrates labels from a source repository to a target repository.
 * @param {string} sourceRepo - The source repository (owner/source-repo).
 * @param {string} targetRepo - The target repository (owner/target-repo).
 */
const migrateLabels = (sourceRepo, targetRepo) => {
  runCommand(`gh label clone ${sourceRepo} --repo ${targetRepo} --force`);
};

const { source, target } = parseArguments();
migrateLabels(source, target);
console.log("");
