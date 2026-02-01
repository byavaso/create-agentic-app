# Contributing to create-agentic-app

## Monorepo Structure

This is a monorepo containing:
- `packages/cli` - The NPM package (`create-agentic-app`)
- `packages/template` - The Next.js app template

## Development Workflow

### Working on Template

```bash
cd packages/template
pnpm dev
```

Make your changes, test them locally.

### Working on CLI

```bash
cd packages/cli
pnpm dev  # Watch mode
```

### Testing Installation

After making changes:

```bash
# From root
pnpm build

# Test locally
cd /tmp
node /path/to/packages/cli/dist/index.js test-app
cd test-app
pnpm install
pnpm dev
```

### Before Publishing

1. **Update Template:**
   ```bash
   cd packages/cli
   rm -rf template
   cp -r ../template template
   rm -rf template/node_modules template/.next
   ```

2. **Build CLI:**
   ```bash
   pnpm build
   ```

3. **Test Installation:**
   ```bash
   cd /tmp
   node /path/to/cli/dist/index.js test-final
   cd test-final && pnpm install && pnpm dev
   ```

4. **Bump Version:**
   ```bash
   cd packages/cli
   npm version patch  # or minor/major
   ```

5. **Publish:**
   ```bash
   npm publish
   ```

## Pull Request Guidelines

- Update both template and CLI if needed
- Test the full install flow
- Update documentation
- Follow conventional commits

## Questions?

Open an issue or discussion on GitHub.
