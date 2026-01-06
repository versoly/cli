import { join } from 'node:path';

import { configDotenv } from 'dotenv';
import { createJiti } from 'jiti';
import { z } from 'zod';

configDotenv();

const versolyUserConfigSchema = z.object({
  token: z.string(),
  siteId: z.uuid(),
  rootDir: z.string().default('./'),
  srcDir: z.string().default('./src'),
  publicDir: z.string().default('./public'),
  componentsDir: z.string().default('./components'),
  pagesDir: z.string().default('./pages'),
  pluginsDir: z.string().default('./scripts/plugins'),
  exclude: z.array(z.string()).default([]), // ['public/robots.txt', 'src/pages/*']
});

const partialVersolyUserConfigSchema = versolyUserConfigSchema.partial().required({
  token: true,
  siteId: true,
});

export const defineConfig = (config: z.infer<typeof partialVersolyUserConfigSchema>) => {
  let { token, siteId, rootDir, srcDir, publicDir, componentsDir, pagesDir, pluginsDir, exclude } =
    versolyUserConfigSchema.parse(config);

  if (!token) {
    throw new Error('Versoly Access Token is required. Please set VERSOLY_ACCESS_TOKEN in your environment variables.');
  }

  if (!siteId) {
    throw new Error('Versoly Site ID is required in the configuration.');
  }

  rootDir = join(rootDir);
  if (!join(componentsDir).includes(join(srcDir))) {
    srcDir = join(rootDir, srcDir);
    publicDir = join(rootDir, publicDir);

    componentsDir = join(srcDir, componentsDir);
    pagesDir = join(srcDir, pagesDir);
    pluginsDir = join(srcDir, pluginsDir);
  }

  console.log({ siteId, rootDir, srcDir, publicDir, componentsDir, pagesDir, pluginsDir, exclude });
  return {
    token,
    siteId,
    rootDir,
    srcDir,
    publicDir,
    componentsDir,
    pagesDir,
    pluginsDir,
    exclude,
  } as z.infer<typeof versolyUserConfigSchema>;
};

const jiti = createJiti(import.meta.url);

// ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json', '']
export async function getLocalSyncSettings(path: string) {
  try {
    const filePath = join(
      process.cwd(),
      // '/examples/astro',
      path,
    );

    const importedModule = await jiti.import(filePath);

    return defineConfig((importedModule as any).default);
  } catch (e) {
    console.error('Config load error:', e);
    return null;
  }
}
