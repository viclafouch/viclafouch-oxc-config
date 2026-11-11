# @viclafouch/oxc-config

Oxlint and oxfmt configuration for a TanStack Start project.

## Setup

1. Install the packages:

   ```bash
   npm install -D @viclafouch/oxc-config oxlint oxfmt oxlint-tsgolint @tanstack/eslint-plugin-query @tanstack/eslint-plugin-router @inlang/paraglide-js
   ```

2. Set `"type": "module"` in `package.json`.

3. Create `oxlint.config.ts`:

   ```typescript
   import { defineConfig } from 'oxlint'
   import {
     typescript,
     react,
     hooks,
     jsxA11y,
     tanstackQuery,
     tanstackStart,
     paraglide,
     imports,
     vitest
   } from '@viclafouch/oxc-config'

   export default defineConfig({
     extends: [
       typescript,
       react,
       hooks,
       jsxA11y,
       tanstackQuery,
       tanstackStart,
       paraglide,
       imports,
       vitest
     ],
     options: { typeAware: true },
     ignorePatterns: ['src/routeTree.gen.ts', 'src/paraglide/**']
   })
   ```

4. Create `oxfmt.config.ts`:

   ```typescript
   import { defineConfig } from 'oxfmt'
   import { oxfmtConfig } from '@viclafouch/oxc-config/formatting'

   export default defineConfig(oxfmtConfig)
   ```

5. Add the scripts to `package.json`:

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

Run `npm run lint` to check the project.

## Requirements

- Node.js >= 24.21
- `oxlint` 1.90 and `oxfmt` 0.75
