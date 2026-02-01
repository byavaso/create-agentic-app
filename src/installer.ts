import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import inquirer from 'inquirer';
import ora from 'ora';
import chalk from 'chalk';
import { execa } from 'execa';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface ProjectOptions {
  useNpm?: boolean;
  useYarn?: boolean;
  useBun?: boolean;
  skipGit?: boolean;
  skipInstall?: boolean;
}

export async function createProject(
  projectName: string | undefined,
  options: ProjectOptions
) {
  console.log(chalk.bold.cyan('\n🚀 create-agentic-app\n'));

  // Get project name if not provided
  if (!projectName) {
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project named?',
        default: 'my-agentic-app',
        validate: (input: string) => {
          if (!input || input.trim() === '') {
            return 'Project name is required';
          }
          if (!/^[a-z0-9-_]+$/i.test(input)) {
            return 'Project name can only contain letters, numbers, hyphens, and underscores';
          }
          return true;
        },
      },
    ]);
    projectName = answers.projectName;
  }

  const projectPath = path.resolve(process.cwd(), projectName);

  // Check if directory exists
  try {
    await fs.access(projectPath);
    console.log(chalk.red(`\n✖ Directory ${projectName} already exists\n`));
    process.exit(1);
  } catch {
    // Directory doesn't exist, good to proceed
  }

  // Determine package manager
  let packageManager = 'pnpm';
  if (options.useNpm) packageManager = 'npm';
  else if (options.useYarn) packageManager = 'yarn';
  else if (options.useBun) packageManager = 'bun';

  // Prompt for features (optional)
  // TODO: Add feature selection in future versions
  // const features = await inquirer.prompt([
  //   {
  //     type: 'confirm',
  //     name: 'includeExamples',
  //     message: 'Include example pages and components?',
  //     default: false,
  //   },
  // ]);

  // Create project directory
  const spinner = ora('Creating project directory...').start();
  try {
    await fs.mkdir(projectPath, { recursive: true });
    spinner.succeed('Project directory created');
  } catch (error) {
    spinner.fail('Failed to create project directory');
    console.error(error);
    process.exit(1);
  }

  // Copy template files
  spinner.start('Copying template files...');
  try {
    const templatePath = path.join(__dirname, '../template');
    await copyDirectory(templatePath, projectPath);
    spinner.succeed('Template files copied');
  } catch (error) {
    spinner.fail('Failed to copy template files');
    console.error(error);
    process.exit(1);
  }

  // Create .env.example
  spinner.start('Creating .env.example...');
  try {
    const envExample = `# Database
POSTGRES_URL=postgresql://user:password@localhost:5432/dbname

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# OpenRouter AI
OPENROUTER_API_KEY=
OPENROUTER_MODEL=openai/gpt-4o-mini

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# File Storage (optional - leave empty for local storage in dev)
BLOB_READ_WRITE_TOKEN=
`;
    await fs.writeFile(path.join(projectPath, '.env.example'), envExample);
    spinner.succeed('.env.example created');
  } catch (error) {
    spinner.fail('Failed to create .env.example');
    console.error(error);
  }

  // Install dependencies
  if (!options.skipInstall) {
    spinner.start(`Installing dependencies with ${packageManager}...`);
    try {
      await execa(packageManager, ['install'], {
        cwd: projectPath,
        stdio: 'inherit',
      });
      spinner.succeed('Dependencies installed');
    } catch (error) {
      spinner.fail('Failed to install dependencies');
      console.error(error);
      process.exit(1);
    }
  }

  // Initialize git
  if (!options.skipGit) {
    spinner.start('Initializing git repository...');
    try {
      await execa('git', ['init'], { cwd: projectPath });
      await execa('git', ['add', '.'], { cwd: projectPath });
      await execa('git', ['commit', '-m', 'Initial commit'], {
        cwd: projectPath,
      });
      spinner.succeed('Git repository initialized');
    } catch (error) {
      spinner.warn('Failed to initialize git repository (optional)');
    }
  }

  // Success message
  console.log(chalk.green.bold('\n✔ Success!\n'));
  console.log(chalk.white(`Created ${chalk.cyan(projectName)} at ${projectPath}\n`));
  console.log(chalk.white('Inside that directory, you can run:\n'));
  console.log(chalk.cyan(`  ${packageManager} run dev`));
  console.log(chalk.white('    Starts the development server\n'));
  console.log(chalk.cyan(`  ${packageManager} run build`));
  console.log(chalk.white('    Builds the app for production\n'));
  console.log(chalk.cyan(`  ${packageManager} run db:push`));
  console.log(chalk.white('    Pushes database schema changes\n'));
  console.log(chalk.white('We suggest that you begin by typing:\n'));
  console.log(chalk.cyan(`  cd ${projectName}`));
  console.log(chalk.cyan('  cp .env.example .env'));
  console.log(chalk.cyan(`  ${packageManager} run dev\n`));
  console.log(chalk.white('Happy coding! 🎉\n'));
}

async function copyDirectory(src: string, dest: string) {
  await fs.mkdir(dest, { recursive: true });
  const entries = await fs.readdir(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    // Skip node_modules, .next, .git, etc.
    if (
      entry.name === 'node_modules' ||
      entry.name === '.next' ||
      entry.name === '.git' ||
      entry.name === 'dist' ||
      entry.name === '.env' ||
      entry.name === '.env.local'
    ) {
      continue;
    }

    if (entry.isDirectory()) {
      await copyDirectory(srcPath, destPath);
    } else {
      await fs.copyFile(srcPath, destPath);
    }
  }
}
