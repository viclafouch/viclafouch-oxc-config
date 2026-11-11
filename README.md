# @viclafouch/oxc-config

Oxlint and oxfmt configuration for my TypeScript projects.

## Setup

1. Install the packages:

   ```bash
   pnpm add -D @viclafouch/oxc-config oxlint oxfmt oxlint-tsgolint
   ```

2. Set `"type": "module"` in `package.json`.

3. Pick the configs of your stack:

   | Stack                      | Configs                                                               |
   | -------------------------- | --------------------------------------------------------------------- |
   | Next.js                    | `typescript`, `react`, `hooks`, `jsxA11y`, `next`, `imports`          |
   | React Router or Vite React | `typescript`, `react`, `hooks`, `jsxA11y`, `imports`                  |
   | TanStack Start             | `typescript`, `react`, `hooks`, `jsxA11y`, `tanstackStart`, `imports` |
   | React Native               | `typescript`, `react`, `hooks`, `reactNative`, `imports`              |
   | Node.js or a library       | `typescript`, `imports`                                               |

   Add the config of each tool that the project uses, before `imports`:

   | Tool            | Config           | Plugin to install               |
   | --------------- | ---------------- | ------------------------------- |
   | TanStack Query  | `tanstackQuery`  | `@tanstack/eslint-plugin-query` |
   | Paraglide JS    | `paraglide`      | `@inlang/paraglide-js`          |
   | Turborepo       | `turbo`          | `eslint-plugin-turbo`           |
   | Vitest          | `vitest`         |                                 |
   | Testing Library | `testingLibrary` | `eslint-plugin-testing-library` |
   | Playwright      | `playwright`     | `eslint-plugin-playwright`      |

   `tanstackStart` needs `@tanstack/eslint-plugin-router`, and `reactNative` needs `eslint-plugin-react-native`.

4. Create `oxlint.config.ts`, here for Next.js:

   ```typescript
   import { defineConfig } from 'oxlint'
   import {
     typescript,
     react,
     hooks,
     jsxA11y,
     next,
     imports
   } from '@viclafouch/oxc-config'

   export default defineConfig({
     extends: [typescript, react, hooks, jsxA11y, next, imports]
   })
   ```

5. Create `oxfmt.config.ts`:

   ```typescript
   import { defineConfig } from 'oxfmt'
   import { oxfmtConfig } from '@viclafouch/oxc-config/formatting'

   export default defineConfig(oxfmtConfig)
   ```

6. Add the scripts to `package.json`:

   ```json
   {
     "scripts": {
       "lint": "oxlint",
       "lint:fix": "oxlint --fix && oxfmt",
       "format": "oxfmt",
       "format:check": "oxfmt --check"
     }
   }
   ```

Run `pnpm lint` to check the project.

## Requirements

- Node.js >= 24.21
- `oxlint` 1.93 and `oxfmt` 0.78
- `oxlint-tsgolint` 7.0.2006 or later, for the type-aware rules
