import { WebContainer } from '@webcontainer/api';
import { TreeNode } from 'primevue/treenode';
import { FileType } from '../types/fileType';
import { FolderItem } from '../types/fileItem';
import { getFileIcon } from '../utils/FileExtensionsAndIcons';
import { ProjectType } from '../types/projectType';
import { getMessageHandlerCode } from '../utils/MessageHandlerCode';
import { reactive } from 'vue';
import JSZip from 'jszip';
import { fetchWithTimeout } from '../utils/Fetch';

export class WebContainerService {
  private static instance: WebContainerService;
  private webContainerInstance: WebContainer | null = null;
  private isBooting: boolean = false;
  private openedFiles: FolderItem[] = [];

  public state = reactive<{
    isLoading: boolean;
  }>({
    isLoading: false,
  });

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

      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
          reject(new Error('WebContainer booting timed out after 10 seconds.'));
        }, 5000);
      });

      this.webContainerInstance = await Promise.race([
        WebContainer.boot(),
        timeoutPromise,
      ]) as WebContainer;

    } catch (error) {
      this.isBooting = false;
      throw new Error('WebContainer booting failed: ' + error.message);
    }

    try {
      this.webContainerInstance.on('server-ready', (port, url) => {
        const iframeEl = document.querySelector(
          'iframe'
        ) as unknown as HTMLIFrameElement;
        if (iframeEl) {
          iframeEl.src = url;
        }

        iframeEl.onload = function () {
          const iframeDocument =
            iframeEl.contentDocument || iframeEl.contentWindow?.document;
          const head = iframeDocument?.head;

          // Nastavení hlaviček uvnitř iframe (pomocí metadat)
          const metaCOOP = document.createElement('meta');
          metaCOOP.setAttribute('http-equiv', 'Cross-Origin-Opener-Policy');
          metaCOOP.setAttribute('content', 'same-origin');
          head?.appendChild(metaCOOP);

          const metaCOEP = document.createElement('meta');
          metaCOEP.setAttribute('http-equiv', 'Cross-Origin-Embedder-Policy');
          metaCOEP.setAttribute('content', 'require-corp'); // Nebo 'credentialless'
          head?.appendChild(metaCOEP);
        };
      });
    } catch (error) {
      console.error('Error setting up server ready event:', error);
      throw error;
    }

    this.isBooting = false;
    return this.webContainerInstance;
  }

  public async ensureInitialized() {
    if (!this.webContainerInstance) {
      try {
        await this.init();
        if (!this.webContainerInstance) {
          console.error('Failed to initialize WebContainer after init call.');
          throw new Error('Failed to initialize WebContainer.');
        }
      } catch (e) {
        throw new Error(e);
      }
    }
  }

  public async readFile(filePath: string) {
    try {
      await this.ensureInitialized();
      return await this.webContainerInstance?.fs.readFile(filePath, 'utf-8');
    } catch (error) {
      console.log(error);
    }
  }

  public async writeFile(filePath: string, content: string, fetchNodes = true) {
    try {
      await this.ensureInitialized();
      await this.webContainerInstance?.fs.writeFile(filePath, content);

      if (fetchNodes) {
        await this.fetchFolderStructureInTreeNode('/');
      }
    } catch (error) {
      console.log(error);
    }
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
          ...(isDirectory && entry !== 'node_modules'
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

  public async moveFile(
    oldPath: string,
    newPath: string
  ): Promise<{ success: boolean; message: string }> {
    await this.ensureInitialized();
    try {
      await this.webContainerInstance?.fs.rename(oldPath, newPath);

      return {
        success: true,
        message: `Item moved from ${oldPath} to ${newPath}`,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to move file',
      };
    }
  }

  public async removeItem(item: FolderItem): Promise<TreeNode[]> {
    if (this.webContainerInstance) {
      await this.webContainerInstance.fs.rm(String(item.path), {
        recursive: true,
      });
    }

    const folderStructurePromise = this.fetchFolderStructureInTreeNode('/');

    const removeFromArray = (
      arr: TreeNode[],
      itemToRemove: FolderItem
    ): void => {
      for (let i = arr.length - 1; i >= 0; i--) {
        const node = arr[i];
        if (node.data?.path === itemToRemove.path) {
          arr.splice(i, 1);
          return;
        }
        if (node.children) removeFromArray(node.children, itemToRemove);
      }
    };

    const folderStructure = await folderStructurePromise;
    removeFromArray(folderStructure, item);

    return folderStructure;
  }

  private async installFileSystem(
    fileStructure: any,
    zip: JSZip,
    parentPath: string = ''
  ) {
    try {
      for (const item of fileStructure) {
        const currentPath = `${parentPath}${item.name}`;
        if (item.type === FileType.FOLDER && item.name !== 'node_modules') {
          zip.folder(currentPath);
          await this.installFileSystem(
            item.children || [],
            zip,
            `${currentPath}/`
          );
        } else if (
          item.type === FileType.FILE &&
          item.name != 'package-lock.json'
        ) {
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
    const JSZip = (await import('jszip')).default;
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
  }

  public closeFile(file: FolderItem) {
    this.openedFiles.filter((f) => f === file);
  }

  async stopCurrentProject() {
    if (this.webContainerInstance) {
      await this.webContainerInstance.teardown();
      this.webContainerInstance = null;
    }
  }

  async createProject(
    projectType: ProjectType,
    task?: string
  ): Promise<boolean> {
    await this.ensureInitialized();
    if (!this.webContainerInstance) {
      throw new Error('WebContainer instance is not initialized.');
    }

    const mainProjectFile = this.getMainProjectFile(projectType);
    await this.setupMessageHandling(mainProjectFile, projectType);

    await this.stopCurrentProject();

    try {
      const templatePath =
        projectType === ProjectType.VANILLA
          ? '/templates/vanilla'
          : '/templates/vue';

      const copyTemplate = async (srcPath: string, destPath: string) => {
        const response = await fetchWithTimeout(
          `${srcPath}/template-files.json`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch template file list: ${response.statusText}`
          );
        }

        const fileList = await response.json();

        for (const file of fileList) {
          const src = `${srcPath}/${file.path}`;
          const dest = `${destPath}/${file.path}`;

          if (file.isDirectory) {
            await this.createFolder(dest);
          } else {
            const contentResponse = await fetchWithTimeout(src);
            if (!contentResponse.ok) {
              throw new Error(
                `Failed to fetch ${src}: ${contentResponse.statusText}`
              );
            }
            const content = await contentResponse.text();

            const targetPaths = {
              [ProjectType.VANILLA]: 'index.html',
              [ProjectType.VUE]: 'src/App.vue',
            };

            await this.writeFile(
              dest,
              task && file.path === targetPaths[projectType] ? task : content,
              task === null
            );
          }
        }
      };

      await copyTemplate(templatePath, '/');

      // Handle npm install with try-catch
      try {
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
          throw new Error(
            `Dependency installation failed with exit code ${installExitCode}. Output: ${installOutput}`
          );
        }
      } catch (installError) {
        console.error('Error during npm install:', installError);
        throw new Error(`npm install failed: ${installError.message}`);
      }

      const devProcess = await this.webContainerInstance.spawn('npm', [
        'run',
        'dev',
      ]);

      devProcess.output.pipeTo(
        new WritableStream({
          write(chunk: string) {
            console.log(chunk);
          },
        })
      );

      return true;
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error(`Project creation failed: ${error.message}`);
    }
  }

  async checkTask(projectType: ProjectType, code: string) {
    try {
      const mainProjectFile = this.getMainProjectFile(projectType);
      await this.setupMessageHandling(mainProjectFile, projectType);

      const iframe = this.getIframe();
      return await this.handleIframeContent(
        iframe,
        mainProjectFile,
        projectType,
        code
      );
    } catch (error) {
      return { success: false, errors: [error.message] };
    }
  }

  private getMainProjectFile(projectType: ProjectType): string {
    return projectType === ProjectType.VANILLA ? '/index.html' : '/src/App.vue';
  }

  private async setupMessageHandling(
    mainProjectFile: string,
    projectType: ProjectType
  ) {
    try {
      await this.addEventHandling(mainProjectFile, projectType);
    } catch (error) {
      throw new Error(`Error adding message handling: ${error.message}`);
    }
  }

  private getIframe(): HTMLIFrameElement {
    const iframe = document.getElementById(
      'webContainerIframe'
    ) as HTMLIFrameElement;
    if (!iframe) {
      throw new Error('Iframe was not found');
    }
    return iframe;
  }

  private async handleIframeContent(
    iframe: HTMLIFrameElement,
    mainProjectFile: string,
    projectType: ProjectType,
    code: string
  ): Promise<{ success: boolean; errors?: string[] }> {
    return new Promise((resolve, reject) => {
      const onMessageHandler = async (event: MessageEvent) => {
        if (event.data.type === 'iframeContent') {
          const iframeContent = event.data.content;
          try {
            const document = this.parseDocument(iframeContent);
            eval(code);
          } catch (error) {
            window.removeEventListener('message', onMessageHandler);
            return reject(new Error(error.message));
          }

          try {
            await this.removeMessageHandling(mainProjectFile, projectType);
            resolve({ success: true });
          } catch (error) {
            reject(
              new Error(`Error removing message handling: ${error.message}`)
            );
          } finally {
            window.removeEventListener('message', onMessageHandler);
          }
        }
      };

      window.addEventListener('message', onMessageHandler);

      iframe.onload = () => {
        this.requestIframeContent(iframe);
      };

      if (projectType === ProjectType.VUE) {
        const checkIframeWindow = setInterval(() => {
          if (iframe.contentWindow) {
            clearInterval(checkIframeWindow);
            this.requestIframeContent(iframe);
          }
        }, 100);
      }
    });
  }

  private parseDocument(content: string): Document {
    const parser = new DOMParser();
    return parser.parseFromString(content, 'text/html');
  }

  private requestIframeContent(iframe: HTMLIFrameElement) {
    iframe.contentWindow?.postMessage(
      { type: 'getDocument', content: '' },
      '*'
    );
  }

  private async addEventHandling(filePath: string, projectType: ProjectType) {
    try {
      const messageHandlerCode = getMessageHandlerCode(projectType);
      let updatedContent = '';

      let fileContent = await this.readFile(filePath);
      if (!fileContent) return;

      fileContent = fileContent.replace(messageHandlerCode, '');

      if (projectType === ProjectType.VANILLA) {
        updatedContent = fileContent.replace(
          '</body>',
          `${messageHandlerCode}</body>`
        );
      } else if (projectType === ProjectType.VUE) {
        if (fileContent.includes('</script>')) {
          updatedContent = fileContent.replace(
            '</script>',
            `${messageHandlerCode}</script>`
          );
        } else {
          updatedContent = `${fileContent} 
            <script setup>
              ${messageHandlerCode}
            </script>
          `;
        }
      }
      await this.writeFile(filePath, updatedContent, false);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  private async removeMessageHandling(
    filePath: string,
    projectType: ProjectType
  ) {
    try {
      const messageHandlerCode = getMessageHandlerCode(projectType);

      const fileContent = await this.readFile(filePath);
      if (!fileContent) return;

      const updatedContent = fileContent.replace(messageHandlerCode, '');
      if (fileContent === updatedContent) return;

      await this.writeFile(filePath, updatedContent, false);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
