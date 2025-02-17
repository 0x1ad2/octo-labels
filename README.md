# 🐙🔖 OctoLabels - GitHub Label Management Tool

**OctoLabels** is a **React-based application** built with **TypeScript** and **Vite**, designed to streamline **GitHub label management**. It provides an intuitive **UI for visual label comparison** and includes **CLI scripts** to automate label operations, making it an efficient solution for managing labels across repositories.

## 🚀 Features

- 🖥️ **React UI for Label Comparison**  
  Utilize `react-json-view-compare` to visually **compare label sets** and track differences between repositories.

- 📜 **GitHub Label Management Scripts**  
  Automate **exporting, adding, and deleting labels** using **GitHub CLI** for streamlined repository management.

- ⚡ **Vite-Powered Development**  
  Enjoy a **fast development experience** with **hot module replacement (HMR)** and optimized build times.

- 🏗️ **Modular & Configurable Structure**  
  Easily **extend, modify, and manage** labels using **JSON-based label sets**.

## 📂 Project Structure

```
📦 octo-labels
├── 📂 src
│   ├── 📝 App.tsx                 # Main React component for label comparison
├── 📂 scripts
│   ├── 🚀 export-github-labels.js  # Exports GitHub labels to JSON
│   ├── 🚀 add-github-labels.js     # Adds labels from JSON to GitHub
│   ├── 🚀 delete-github-labels.js  # Deletes all labels in a repository
│   ├── 🚀 migrate-github-labels.js # Migrates labels from <owner>/<source-repo> to <owner>/<target-repo>
│   ├── 📂 data/                    # JSON files storing label sets
├── 📄 package.json                 # Project metadata & available scripts
```

## 🛠️ Installation & Setup

### 📌 Prerequisites

Before using OctoLabels, ensure you have:

- **Node.js** (>= `20.x` recommended)
- **Git** installed for version control
- **GitHub CLI (`gh` command-line tool)** installed and authenticated (`gh auth login`)

### 📥 Install & Initialize

1. Clone the repository:

   ```sh
   git clone https://github.com/0x1ad2/octo-labels
   cd octo-labels
   ```

2. Install dependencies:

   ```sh
   npm i --legacy-peer-deps
   ```

3. Initialize the project:

   ```sh
   npm run init
   ```

   This will **export existing GitHub labels** and start the development server.

4. Modify labels as needed:

   - Copy `default-github-labels.json` to `new-github-labels.json`.
   - Edit the JSON file to adjust labels according to your needs.

5. To start fresh, delete all labels using:

   ```sh
   npm run delete
   ```

6. Add the updated labels:

   ```sh
   npm run add
   ```

7. Migrate labels from one repository to another:

   ```sh
   npm run migrate -- --source owner/source-repo --target owner/target-repo
   ```

### 🖥️ Using the CLI

If you prefer to use the CLI directly without cloning the repository, you can run the following commands using `npx`:

> [!WARNING]  
> All commands are executed within the repository context. Make sure that you are in the correct directory before running the commands.

1.  Display help information:

    ```sh
    npx octo-labels --help
    ```

2.  Export GitHub labels to a JSON file:

    ```sh
    npx octo-labels export
    ```

3.  Add labels from a JSON file to a repository:

    ```sh
    npx octo-labels add
    ```

4.  Delete all labels in a repository:

    ```sh
    npx octo-labels delete
    ```

5.  Migrate labels from one repository to another:

    ```sh
    npx octo-labels migrate --source owner/source-repo --target owner/target-repo
    ```

These commands allow you to manage GitHub labels efficiently using the CLI.

## 🔖 Labels

### Type Labels

| NAME             | DESCRIPTION                                   | COLOR   |
| ---------------- | --------------------------------------------- | ------- |
| 🐞 BUG           | Something isn't working                       | #B60205 |
| 🚀 FEATURE       | New feature request                           | #1D76DB |
| 📚 DOCUMENTATION | Documentation updates or fixes                | #0075CA |
| 🔧 IMPROVEMENT   | Enhancement to an existing feature            | #0052CC |
| ❓ QUESTION      | General inquiries or discussions              | #D876E3 |
| 🎨 REFACTOR      | Code cleanup without functionality change     | #8E44AD |
| 🗑️ DEPRECATION   | Features planned for removal                  | #E67E22 |
| ⚠️ SECURITY      | Security vulnerabilities                      | #D93F0B |
| 🚇 CI/CD         | Related to CI/CD pipelines                    | #0E8A16 |
| 🏗️ BUILD         | Build system, dependencies, or config changes | #F9D0C4 |
| 🧪 TESTS         | Testing-related issues or PRs                 | #E4E669 |
| 🛠️ MAINTENANCE   | General upkeep and codebase health            | #BFDADC |
| 🎭 UX/UI         | User experience or interface improvements     | #BFDADC |
| 🌐 LOCALIZATION  | Translation & multi-language support          | #1D76DB |
| ⚙️ CONFIG        | Configuration or environment changes          | #5319E7 |
| 🏴 ACCESSIBILITY | Issues related to A11Y                        | #A2EEEF |
| 📌 META          | Repository-level changes                      | #BFDADC |
| 🚦 TRIAGE        | Needs initial review or categorization        | #D4C5F9 |
| 🤝 CONTRIBUTION  | Contribution guidelines, templates, etc.      | #0E8A16 |

### Priority Labels

| NAME                  | DESCRIPTION                | COLOR   |
| --------------------- | -------------------------- | ------- |
| 🔥 PRIORITY: CRITICAL | Needs urgent attention     | #FF0000 |
| ⏳ PRIORITY: HIGH     | Important but not blocking | #FBCA04 |
| 💤 PRIORITY: LOW      | Can be delayed             | #C2E0C6 |

### Status Labels

| NAME                        | DESCRIPTION                             | COLOR   |
| --------------------------- | --------------------------------------- | ------- |
| 🚧 STATUS: IN PROGRESS      | Work in progress                        | #FF9B00 |
| ✅ STATUS: READY FOR REVIEW | Ready for feedback                      | #0E8A16 |
| 🛑 STATUS: BLOCKED          | Waiting on something before progressing | #E11D21 |
| 🕒 STATUS: PENDING          | Awaiting response or details            | #C2E0C6 |
| 🆕 NEW ISSUE                | Newly created issue                     | #5319E7 |
| 📦 STATUS: DONE             | Completed tasks                         | #6F42C1 |
| 🏷️ DUPLICATE                | Already reported                        | #CCCCCC |
| ❌ WONTFIX                  | Not planned for resolution              | #D4C5F9 |
| 💡 GOOD FIRST ISSUE         | Ideal for newcomers                     | #7057FF |
| 🚸 HELP WANTED              | Needs contributor assistance            | #008672 |

### Release Labels

| NAME              | DESCRIPTION                       | COLOR   |
| ----------------- | --------------------------------- | ------- |
| 🩹 RELEASE: PATCH | Bug fixes only                    | #D4C5F9 |
| 📌 RELEASE: MINOR | Backward-compatible improvements  | #0E8A16 |
| 🔖 RELEASE: MAJOR | Major breaking changes            | #C2E0C6 |
| 🏷️ CHANGELOG      | Notable changes for documentation | #BFDADC |

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
