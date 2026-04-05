# TreeSnap

TreeSnap is a VS Code extension that copies selected files and folders into a new destination folder while preserving their original relative structure from your workspace root.

## What Problem It Solves

When you need to share a small part of a project, prepare a handoff, build a reproducible bug package, or collect files for AI/code review tools, copying files manually usually breaks the original folder hierarchy.

TreeSnap solves that by letting you select files or folders in the VS Code Explorer and recreate them inside a new folder without flattening the structure.

## How It Works

TreeSnap adds a context menu action in the Explorer:

`TreeSnap: Copy with Folder Structure`

When you run it, the extension:

1. Reads the selected files and folders from the Explorer.
2. Asks for a new folder name.
3. Creates that folder at the workspace root.
4. Copies the selected items into it while keeping their original relative paths.
5. Skips common heavy/internal folders such as `node_modules` and `.git`.
6. Prompts before overwriting existing files.

## Example

If your workspace contains:

```text
src/components/Button.tsx
src/utils/format.ts
README.md
```

and you select `Button.tsx` and `format.ts`, then enter `share-pack` as the folder name, TreeSnap creates:

```text
share-pack/
  src/components/Button.tsx
  src/utils/format.ts
```

## Features

- Preserves folder structure automatically
- Works with multiple selected files and folders
- Creates a clean export folder inside the workspace
- Shows overwrite confirmation when a file already exists
- Ignores `.git` and `node_modules`

## Install The Extension

### Option 1: Install from VSIX

If you already have the packaged file:

1. Open VS Code.
2. Open the Extensions view.
3. Click the `...` menu in the top-right of the Extensions panel.
4. Choose `Install from VSIX...`
5. Select the `tree-snap-0.0.1.vsix` file from this project folder.

### Option 2: Run It Locally for Development

1. Open this project in VS Code.
2. Install dependencies:

```bash
npm install
```

3. Compile the extension:

```bash
npm run compile
```

4. Press `F5` in VS Code to launch an Extension Development Host window.
5. Open any workspace in that new window and use the Explorer context menu.

## How To Use

1. Open a folder or workspace in VS Code.
2. In the Explorer, select one or more files/folders.
3. Right-click the selection.
4. Click `TreeSnap: Copy with Folder Structure`.
5. Enter the destination folder name.
6. Find the generated folder at the root of your workspace.

## Notes

- The destination folder is created inside the first opened workspace folder.
- If no workspace is open, the extension shows an error.
- If you cancel the folder-name prompt, nothing is copied.

## Development

Useful commands:

```bash
npm run compile
npm run watch
npm run lint
npm test
```

## Icon

The editable source icon is stored at `assets/tree-snap-icon.svg` and the packaged icon is `assets/tree-snap-icon.png`.
