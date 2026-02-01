#!/usr/bin/env node

import { Command } from 'commander';
import { createProject } from './installer.js';

const program = new Command();

interface CLIOptions {
  useNpm?: boolean;
  useYarn?: boolean;
  useBun?: boolean;
  skipGit?: boolean;
  skipInstall?: boolean;
}

program
  .name('create-agentic-app')
  .description('Create a production-ready Next.js 16 app with AI, auth, and database')
  .version('1.0.0')
  .argument('[project-name]', 'Name of the project directory')
  .option('--use-npm', 'Use npm instead of pnpm')
  .option('--use-yarn', 'Use yarn instead of pnpm')
  .option('--use-bun', 'Use bun instead of pnpm')
  .option('--skip-git', 'Skip git initialization')
  .option('--skip-install', 'Skip dependency installation')
  .action(async (projectName: string | undefined, options: CLIOptions) => {
    await createProject(projectName, options);
  });

program.parse(process.argv);
