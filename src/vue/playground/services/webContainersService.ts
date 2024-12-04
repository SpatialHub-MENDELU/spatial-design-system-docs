import { WebContainer } from '@webcontainer/api';
import { TreeNode } from 'primevue/treenode';
import { FileType } from '../types/fileType';
import { FolderItem } from '../types/fileItem';
import JSZip from 'jszip';
import { getFileIcon } from '../utils/FileExtensionsAndIcons';
import { packageJsonVanilla, MainFile, packageJsonVue } from '../components/editor/files';
import { ProjectType } from '../types/projectType';

export class WebContainerService {
  private static instance: WebContainerService;
  private webContainerInstance: WebContainer | null = null;
  private isBooting: boolean = false;
  private openedFiles: FolderItem[] = [];

  private constructor() {}

  public static getInstance(): WebContainerService {
    if (!this.instance) {
      this.instance = new WebContainerService();
    }
    return this.instance;
  }

  private async init() {
    if (this.webContainerInstance) {
      return this.webContainerInstance;
    }

    if (this.isBooting) {
      return new Promise((resolve, reject) => {
        const checkInstance = setInterval(() => {
          if (this.webContainerInstance) {
            clearInterval(checkInstance);
            resolve(this.webContainerInstance);
          }
        }, 100);
      });
    }

    this.isBooting = true;

    try {
      this.webContainerInstance = await WebContainer.boot();
    } catch (error) {
      console.error('Failed to boot WebContainer:', error);
      this.isBooting = false;
      throw new Error('WebContainer booting failed: ' + error.message);
    }

    this.webContainerInstance.on('server-ready', (port, url) => {
      const iframeEl = document.querySelector('iframe') as unknown as HTMLIFrameElement;
        if (iframeEl) {
          iframeEl.src = url;
        }
      });

    this.isBooting = false;
    return this.webContainerInstance;
  }

  public async ensureInitialized() {
    if (!this.webContainerInstance) {
      await this.init();
      if (!this.webContainerInstance) {
        console.error('Failed to initialize WebContainer after init call.');
        throw new Error('Failed to initialize WebContainer.');
      }
    }
  }

  public async readFile(filePath: string) {
    await this.ensureInitialized();
    return await this.webContainerInstance?.fs.readFile(filePath, 'utf-8');
  }

  public async writeFile(filePath: string, content: string) {
    await this.ensureInitialized();
    await this.webContainerInstance?.fs.writeFile(filePath, content);
    await this.fetchFolderStructureInTreeNode('/');
  }

  public async createFolder(folderPath: string) {
    await this.ensureInitialized();
    await this.webContainerInstance?.fs.mkdir(folderPath);
  }

  public async listFiles(directory: string) {
    await this.ensureInitialized();
    return await this.webContainerInstance?.fs.readdir(directory);
  }

  public async fetchFolderStructure(directory: string): Promise<any[]> {
    await this.ensureInitialized();
    const entries = await this.listFiles(directory);

    const structure = await Promise.all(
      (entries ?? []).map(async (entry) => {
        const path = `${directory}/${entry}`;
        const isDirectory = await this.checkIfDirectory(path);
        return {
          name: entry,
          type: isDirectory ? 'folder' : 'file',
          ...(isDirectory
            ? { children: await this.fetchFolderStructure(path) }
            : {}),
        };
      })
    );

    return structure;
  }

  private async checkIfDirectory(path: string): Promise<boolean> {
    await this.ensureInitialized();
    try {
      const entries = await this.webContainerInstance?.fs.readdir(path);
      return Array.isArray(entries);
    } catch (error) {
      return false;
    }
  }

  public async fetchFolderStructureInTreeNode(
    directory: string
  ): Promise<TreeNode[]> {
    const data = await this.fetchFolderStructure(directory);

    return Promise.all(
      data.map(async (folder) => {
        const currentPath = `${directory}/${folder.name}`;
        const pathWithoutLeadingSlash = currentPath.startsWith('/')
          ? currentPath.slice(1)
          : currentPath;

        const children = folder.children
          ? await this.fetchFolderStructureInTreeNode(
              `${directory}/${folder.name}`
            )
          : [];

        return {
          key: pathWithoutLeadingSlash,
          label: folder.name,
          icon: getFileIcon(folder),
          data: {
            name: folder.name,
            type: folder.type,
            path: pathWithoutLeadingSlash,
          },
          children: children,
          type: folder.type,
          parent: folder,
        } as TreeNode;
      })
    );
  }

  public async renameItem(
    oldPath: string,
    newName: string
  ): Promise<{ success: boolean; message: string }> {
    await this.ensureInitialized();

    try {
      const dirPath = oldPath.substring(0, oldPath.lastIndexOf('/'));
      const newPath = `${dirPath}/${newName}`;

      await this.webContainerInstance?.fs.rename(oldPath, newPath);

      return {
        success: true,
        message: `Item renamed from ${oldPath} to ${newPath}`,
      };
    } catch (error) {
      return {
        success: false,
        message: `Failed to rename item from ${oldPath} to ${newName}: ${error.message}`,
      };
    }
  }

  public async removeItem(item: FolderItem): Promise<TreeNode[]> {
    const folderStructure = await this.fetchFolderStructureInTreeNode('/');
    const removeFromArray = (
      arr: TreeNode[],
      itemToRemove: { name: string }
    ): TreeNode[] => {
      const index = arr.findIndex(
        (node) => node.data?.name === itemToRemove.name
      );
      if (index !== -1) {
        arr.splice(index, 1);
        return arr;
      } else {
        arr.forEach((node) => {
          if (node.children) {
            const updatedChildren = removeFromArray(
              node.children,
              itemToRemove
            );
            if (updatedChildren.length < node.children.length) {
              node.children = updatedChildren;
            }
          }
        });
      }
      return arr;
    };

    return removeFromArray(folderStructure, item);
  }

  private async installFileSystem(
    fileStructure: any,
    zip: JSZip,
    parentPath: string = ''
  ) {
    try {
      for (const item of fileStructure) {
        const currentPath = `${parentPath}${item.name}`;
        if (item.type === FileType.FOLDER) {
          zip.folder(currentPath);
          await this.installFileSystem(
            item.children || [],
            zip,
            `${currentPath}/`
          );
        } else if (item.type === FileType.FILE) {
          const fileContent = await this.readFile(currentPath);
          if (fileContent !== undefined) {
            zip.file(currentPath, fileContent);
          } else {
            console.error(`Failed to read file: ${currentPath}`);
          }
        }
      }
      return { success: true };
    } catch (error) {
      console.error('Error installing file system:', error);
      return { success: false, error };
    }
  }

  private async downloadZip(fileStructure: any) {
    const zip = new JSZip();
    await this.installFileSystem(fileStructure, zip);

    zip.generateAsync({ type: 'blob' }).then((content) => {
      const a = document.createElement('a') as unknown as HTMLAnchorElement;
      const url = URL.createObjectURL(content);
      a.href = url;
      a.download = 'file_structure.zip';

      document.body.appendChild(a);
      a.click();

      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 0);
    });
  }

  public async installAllFiles() {
    const structure = await this.fetchFolderStructure('/');
    await this.downloadZip(structure);
  }

  public getAllOpenedFiles() {
    return this.openedFiles;
  }

  public openFile(file: FolderItem) {
    if (this.openedFiles.indexOf(file) < 0) this.openedFiles.push(file);
    console.log(this.getAllOpenedFiles());
  }

  public closeFile(file: FolderItem) {
    this.openedFiles.filter((f) => f === file);
  }

  async createProject(projectType: ProjectType) {
    await this.ensureInitialized();
    if (!this.webContainerInstance) return;

    try {
      const initProcess = await this.webContainerInstance.spawn('npm', [
        'create',
        'vite@latest',
        '.'
      ]);

      const inputStream = initProcess.input.getWriter();

      let output = '';
      initProcess.output.pipeTo(
        new WritableStream({
          write(chunk: string) {
            output += chunk;
            if (chunk.includes('Current directory is not empty')) {
              inputStream.write('\u001B[B\u001B[B\n');
            } else if (chunk.includes('Select a framework:') && chunk.includes('Use arrow-keys')) {
              if (projectType === ProjectType.VANILLA) inputStream.write('\n');
              else if (projectType === ProjectType.VUE) inputStream.write('\u001B[B\n');
            } else if (chunk.includes('Select a variant:') && chunk.includes('Use arrow-keys')) {
              inputStream.write('\u001B[B\n');
            } else if (chunk.includes('Project name')) {
              inputStream.write('sds-project\n');
            } else if (chunk.includes('Ok to proceed?')) {
              inputStream.write('y\n');
            }
          },
        })
      );

      const initExitCode = await initProcess.exit;

      if (initExitCode !== 0) {
        throw new Error(
          `Project initialization failed with exit code ${initExitCode}`
        );
      }

      await this.webContainerInstance.fs.writeFile(
        '/package.json',
        projectType === ProjectType.VANILLA ? packageJsonVanilla : packageJsonVue
      );

      await this.webContainerInstance.fs.writeFile(
        '/src/main.js',
        MainFile
      );

      const installProcess = await this.webContainerInstance.spawn('npm', [
        'install',
      ]);

      let installOutput = '';
      installProcess.output.pipeTo(
        new WritableStream({
          write(chunk: string) {
            installOutput += chunk;
          },
        })
      );

      const installExitCode = await installProcess.exit;
      if (installExitCode !== 0) {
        console.error(
          'Error during npm install: ',
          installOutput || 'Unknown error'
        );
        throw new Error(
          `Dependency installation failed with exit code ${installExitCode}`
        );
      }

      const devProcess = await this.webContainerInstance.spawn('npm', [
        'run',
        'dev',
      ]);

      devProcess.output.pipeTo(
        new WritableStream({
          write(chunk: string) {
            console.log(chunk)
          },
        })
      );
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  }

  public async findAFrameComponents(filePath: string): Promise<string[]> {
    try {
      const fileContent = await this.readFile(filePath);
      if (!fileContent) {
        return [];
      }

      const componentNames: string[] = [];
      const aFrameComponentRegex = /AFRAME\.registerComponent\(['"`](.+?)['"`]/g;
      const aFramePrimitiveRegex = /AFRAME\.registerPrimitive\(['"`](.+?)['"`]/g;

      let match;
      while ((match = aFrameComponentRegex.exec(fileContent)) !== null) {
        componentNames.push(match[1]);
      }

      while ((match = aFramePrimitiveRegex.exec(fileContent)) !== null) {
        componentNames.push(match[1]);
      }

      return componentNames;
    } catch (error) {
      console.error('Error reading file:', error.message);
      return [];
    }
  }

  public async findAFrameComponentsInDirectory(directory: string) {
    try {
      const files = await this.listFiles(directory);

      const results: string[] = [];

      for (const file of files as string[]) {
        const filePath = `${directory}/${file}`;
        const isDirectory = await this.checkIfDirectory(filePath);

        if (!isDirectory && file.endsWith('.js')) {
          const components = await this.findAFrameComponents(filePath);
          if (components.length > 0) {
            results.push(...components);
          }
        }

        if (isDirectory) {
          const subDirectoryResults = await this.findAFrameComponentsInDirectory(
            `${directory}/${file}`
          );
          results.push(...subDirectoryResults);
        }
      }

      return results;
    } catch (error) {
      console.error(`Chyba při zpracování adresáře ${directory}:`, error);
      return [];
    }
  }
}
