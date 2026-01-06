#!/usr/bin/env node

import { Command } from 'commander';
import { sync } from './commands/sync';

export { defineConfig } from './config';

process.on('SIGINT', () => process.exit(0));
process.on('SIGTERM', () => process.exit(0));

require('dotenv').config();

async function main() {
  const packageInfo = { version: '0.0.1' };

  const program = new Command()
    .name('versoly')
    .description('A CLI tool to sync Versoly.')
    .version(packageInfo.version, '-v, --version', 'display the version number');

  program.addCommand(sync);
  program.parse();
}

main();
