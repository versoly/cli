import { glob, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { registryItemSchema } from 'src/registry/schema';
import { VersolyFile } from 'src/types';
import { KSON } from 'src/utils/kson';

// https://ui.shadcn.com/r/registries.json
// https://github.com/WINOFFRG/limeplay/blob/dev/apps/www/registry/collection/registry-lib.ts

export const getRegistryFiles = async () => {
  let files: VersolyFile[] = [];

  for await (const path of glob('src/registry/**/*.kson')) {
    let fileContent = await readFile(path, 'utf8');
    let parsedFileContent = KSON.parse(fileContent);

    parsedFileContent.files.forEach((i: any) => (i.content = i.content?.embedContent || ''));

    const item = registryItemSchema.parse(parsedFileContent);

    for (const file of item.files || []) {
      let { type, path, content } = file;

      if (!content) {
        const fileItemPath = join(`src/registry`, path);
        content = await readFile(fileItemPath, 'utf8');

        if (!content) {
          continue;
        }
      }

      files.push({ type: 'file', path, content, extension: 'ts' });
    }
  }

  return files;
};
