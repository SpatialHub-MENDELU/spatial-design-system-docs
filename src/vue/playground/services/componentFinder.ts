const fs = require('fs');
const path = require('path');
const glob = require('glob');

export class ComponentFinder {
  private libraryPath = 'node_modules/spatial-design-system';

  constructor() {}

  findComponentFiles() {
    return new Promise<string[]>((resolve, reject) => {
      const patterns = [
        path.join(this.libraryPath, 'components', '**/*.js'),
        path.join(this.libraryPath, 'primitives', '**/*.js')
      ];
      
      glob(patterns.join(' '), (err, files) => {
        if (err) {
          reject('Failed to find files: ' + err);
        } else {
          resolve(files);
        }
      });
    });
  }

  extractComponentsFromFile(file: string) {
    const content = fs.readFileSync(file, 'utf-8');
    const regex = /AFRAME\.registerComponent\("([^"]+)"/g;
    const components: string[] = [];
    let match: RegExpExecArray | null;

    while ((match = regex.exec(content)) !== null) {
      components.push(match[1]);
    }

    return components;
  }

  async findComponents() {
    try {
      const files = await this.findComponentFiles() as string[];
      const components: string[] = [];

      for (const file of files) {
        const fileComponents = this.extractComponentsFromFile(file);
        components.push(...fileComponents);
      }

      return components;
    } catch (error) {
      throw new Error('Failed to find components: ' + error);
    }
  }
}
