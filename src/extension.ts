import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs-extra';

export function activate(context: vscode.ExtensionContext) {

    const disposable = vscode.commands.registerCommand(
        'extension.copyWithStructure',
        async (uri: vscode.Uri, uris: vscode.Uri[]) => {

            try {
                const selectedItems = uris && uris.length ? uris : [uri];

                if (!selectedItems || selectedItems.length === 0) {
                    vscode.window.showErrorMessage('No files selected');
                    return;
                }

                const folderName = await vscode.window.showInputBox({
                    prompt: 'Enter new folder name'
                });

                if (!folderName) return;

                const workspace = vscode.workspace.workspaceFolders;

                if (!workspace) {
                    vscode.window.showErrorMessage('Open a workspace first');
                    return;
                }

                const rootPath = workspace[0].uri.fsPath;
                const targetRoot = path.join(rootPath, folderName);

                await fs.ensureDir(targetRoot);

                const ignore = ['node_modules', '.git'];

                for (const item of selectedItems) {

                    const sourcePath = item.fsPath;

                    if (ignore.some(i => sourcePath.includes(i))) {
                        continue;
                    }

                    const relativePath = path.relative(rootPath, sourcePath);
                    const destinationPath = path.join(targetRoot, relativePath);

                    const exists = await fs.pathExists(destinationPath);

                    if (exists) {
                        const overwrite = await vscode.window.showQuickPick(
                            ['Yes', 'No'],
                            { placeHolder: `${relativePath} already exists. Overwrite?` }
                        );

                        if (overwrite !== 'Yes') continue;
                    }

                    const stat = await fs.stat(sourcePath);

                    if (stat.isDirectory()) {
                        await fs.copy(sourcePath, destinationPath);
                    } else {
                        await fs.ensureDir(path.dirname(destinationPath));
                        await fs.copyFile(sourcePath, destinationPath);
                    }
                }

                vscode.window.showInformationMessage('✅ TreeSnap completed!');

            } catch (error: any) {
                vscode.window.showErrorMessage(`Error: ${error.message}`);
            }
        }
    );

    context.subscriptions.push(disposable);
}

export function deactivate() {}