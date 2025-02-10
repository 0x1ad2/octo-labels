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

## 📦 Available Scripts in `package.json`

| Script     | Description                                                             |
| ---------- | ----------------------------------------------------------------------- |
| `dev`      | Start the development server with hot reloading.                        |
| `build`    | Build the application for production.                                   |
| `preview`  | Preview the production build.                                           |
| `export`   | Export GitHub labels to a JSON file.                                    |
| `add`      | Apply labels from JSON to a repository.                                 |
| `delete`   | Remove all labels from a repository.                                    |
| `init`     | Initialize the project by exporting labels and starting the dev server. |
| `list`     | Display all labels in the repository.                                   |
| `migrate ` | Clone labels from one repository to another.                            |

## 🏆 Contributing

Contributions are welcome! 🚀 To contribute:

1. **Fork the repository** on GitHub.
2. **Create a new branch** for your feature or fix.
3. **Commit your changes** with a clear message.
4. **Submit a Pull Request (PR)** with a detailed description.

We appreciate all contributions! 🎉

## 📄 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.
