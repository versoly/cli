import { defineConfig } from 'tsdown';

export default defineConfig([
  {
    entry: './src/index.ts',
    exports: true,
  },
  {
    entry: './src/cli.ts',
    exports: true,
  },
]);
