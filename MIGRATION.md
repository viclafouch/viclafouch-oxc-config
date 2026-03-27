# Migration Guide: ESLint + Prettier → oxlint + oxfmt

Guide for migrating applications from `@viclafouch/eslint-config-viclafouch` (v5, ESLint) to `@viclafouch/oxc-config` (v1, oxlint).

---

## 1. Install dependencies

Remove ESLint, Prettier, and all their plugins. Install oxlint, oxfmt, and the new config.

```bash
npm remove eslint prettier @viclafouch/eslint-config-viclafouch
npm add -D oxlint oxfmt @viclafouch/oxc-config
```

> Replace `npm` with your package manager (`pnpm`, `yarn`, `bun`).

You no longer need any ESLint plugin packages (`typescript-eslint`, `eslint-plugin-react`, `eslint-plugin-unicorn`, etc.) — they are all built into `oxlint` natively.

**Exception — jsPlugins:** three configs use ESLint plugins via oxlint's compatibility layer (these plugins are not yet built into oxlint natively). Install only the ones you use:

```bash
npm add -D eslint-plugin-playwright       # only if you use the playwright config
npm add -D eslint-plugin-testing-library   # only if you use the testingLibrary config
npm add -D eslint-plugin-react-native      # only if you use the reactNative config
```

After installation, run a clean install to prune transitive ESLint dependencies from your lockfile:

```bash
rm -rf node_modules && npm install
```

---

## 2. Create oxlint config

Create `oxlint.config.ts` at the project root. Keep your old ESLint config file for now (we will delete it in the last step).

> **Requires Node.js >= 22.18** for `.config.ts` support. If you are on an older Node version, use `.oxlintrc.json` instead (see [oxlint docs](https://oxc.rs/docs/guide/usage/linter/config)).

### Config mapping

| ESLint import          | oxlint import                          | Notes                      |
| ---------------------- | -------------------------------------- | -------------------------- |
| `typescriptConfig`     | `typescript`                           |                            |
| `reactConfig`          | `react`                                |                            |
| `hooksConfig`          | `hooks`                                |                            |
| `jsxA11yConfig`        | `jsxA11y`                              |                            |
| `nextConfig`           | `react` + `hooks` + `jsxA11y` + `next` | Must list all 4 explicitly |
| `reactNativeConfig`    | `reactNative`                          |                            |
| `importsConfig`        | `imports`                              |                            |
| `prettierConfig`       | _(removed)_                            | Replaced by oxfmt          |
| `playwrightConfig`     | `playwright`                           |                            |
| `testingLibraryConfig` | `testingLibrary`                       |                            |

> **Breaking change:** `nextConfig` in ESLint bundled react + hooks + jsx-a11y automatically. In oxlint, you must list them explicitly.

### TypeScript project

```typescript
import { defineConfig } from "oxlint";
import { typescript, imports } from "@viclafouch/oxc-config";

export default defineConfig({
  extends: [typescript, imports],
  ignorePatterns: ["**/dist/**"],
});
```

### React project

```typescript
import { defineConfig } from "oxlint";
import { typescript, react, hooks, jsxA11y, imports } from "@viclafouch/oxc-config";

export default defineConfig({
  extends: [typescript, react, hooks, jsxA11y, imports],
  ignorePatterns: ["**/dist/**"],
});
```

### Next.js project

```typescript
import { defineConfig } from "oxlint";
import {
  typescript,
  react,
  hooks,
  jsxA11y,
  next,
  imports,
} from "@viclafouch/oxc-config";

export default defineConfig({
  extends: [typescript, react, hooks, jsxA11y, next, imports],
  ignorePatterns: ["**/.next/**", "**/dist/**"],
});
```

### React Native project

```typescript
import { defineConfig } from "oxlint";
import {
  typescript,
  react,
  hooks,
  reactNative,
  imports,
} from "@viclafouch/oxc-config";

export default defineConfig({
  extends: [typescript, react, hooks, reactNative, imports],
  ignorePatterns: ["**/.expo/**", "**/ios/**", "**/android/**"],
});
```

> **Note:** oxlint respects `.gitignore` by default. You don't need to repeat paths already in your `.gitignore` (like `node_modules`, `dist`, `.next`). Only add patterns specific to linting that are NOT in `.gitignore`.

### Project-specific rule overrides

Copy your rule overrides from the old ESLint config. See [section 7](#7-handle-rule-name-changes) for rules that changed name.

```typescript
export default defineConfig({
  extends: [typescript, react, hooks, jsxA11y, imports],
  rules: {
    "no-inline-comments": "off",
    "react/no-children-prop": "off",
    "id-length": ["error", { exceptions: ["_", "x", "y"] }],
  },
});
```

---

## 3. Replace Prettier with oxfmt

Create `oxfmt.config.ts` at the project root:

```typescript
import { defineConfig } from 'oxfmt'
import { oxfmtConfig } from '@viclafouch/oxc-config/formatting'

export default defineConfig(oxfmtConfig)
```

That's it. No copy-paste, no duplication. The formatting config (no semicolons, single quotes, 80 char width, import sorting, etc.) comes from the package, same as the linting config.

To override a specific option:

```typescript
import { defineConfig } from 'oxfmt'
import { oxfmtConfig } from '@viclafouch/oxc-config/formatting'

export default defineConfig({
  ...oxfmtConfig,
  printWidth: 100
})
```

> **Requires Node.js >= 22.18** for `.config.ts` support.

### What the shared config includes

- **Formatting:** no semicolons, single quotes, 80 char width, double quotes in JSX, no trailing commas
- **Import sorting:** replaces `simple-import-sort` with oxfmt's built-in sorting (react → frameworks → third-party → aliases → relative, no blank lines between groups)
- **Curly braces:** the `curly: ['error', 'all']` rule in the `typescript` oxlint config replaces `prettier-plugin-curly`

### `endOfLine` behavior change

The Prettier config used `endOfLine: "auto"` (adapt to the OS line endings). oxfmt does not support `"auto"` — it defaults to `"lf"`.

In practice this has no impact: most projects use `.gitattributes` with `* text=auto eol=lf` or Git's `core.autocrlf` to normalize line endings. If your team has Windows developers with `CRLF` files, override with `endOfLine: 'crlf'`.

### Delete Prettier config files

```
.prettierrc
.prettierrc.json
.prettierrc.js
.prettierrc.yaml
.prettierignore
```

### Commit formatting changes separately

Run `oxfmt` immediately after creating the config and **commit the formatting changes in a separate commit** before continuing the migration. Import sorting and formatting changes produce large diffs — isolating them keeps the rest of the migration diff reviewable.

```bash
npx oxfmt '**/*.{ts,tsx,js,jsx}'
git add -A && git commit -m "chore: reformat codebase with oxfmt"
```

### Verify formatting parity (optional)

```bash
npx oxfmt --check '**/*.{ts,tsx,js,jsx}'
```

If the check passes, the migration is safe.

---

## 4. Update package.json scripts

```diff
 "scripts": {
-  "lint": "eslint",
-  "lint:fix": "eslint --fix",
+  "lint": "oxlint",
+  "lint:fix": "oxlint --fix && oxfmt '**/*.{ts,tsx,js,jsx}'",
+  "format": "oxfmt '**/*.{ts,tsx,js,jsx}'",
+  "format:check": "oxfmt --check '**/*.{ts,tsx,js,jsx}'"
 }
```

> **Important:** Specify the file patterns explicitly. Unlike `eslint-plugin-prettier` which only formatted files ESLint processed (JS/TS), `oxfmt .` formats **everything** (Markdown, JSON, YAML, CSS, etc.). Use glob patterns to match the same scope as before.

If your scripts include `tsc`, keep it:

```diff
-  "lint": "tsc && eslint",
-  "lint:fix": "tsc && eslint --fix",
+  "lint": "tsc && oxlint",
+  "lint:fix": "tsc && oxlint --fix && oxfmt '**/*.{ts,tsx,js,jsx}'",
```

> `oxfmt --check` exits with a non-zero code if any file is not formatted — same blocking behavior as `eslint-plugin-prettier`.

---

## 5. Update pre-commit hook

### Husky

`.husky/pre-commit`:

```diff
-npm run lint
+npm run lint && npm run format:check
```

> Replace `npm` with your package manager.

### lint-staged (alternative)

If you prefer auto-fixing on commit instead of blocking, use lint-staged:

```diff
 {
-  "*.{ts,tsx,js,jsx}": ["eslint --fix"]
+  "*.{ts,tsx,js,jsx}": ["oxlint --fix", "oxfmt"]
 }
```

> Husky + `format:check` **blocks** bad commits. lint-staged + `oxfmt` **auto-fixes** on commit. Choose one approach, not both.

---

## 6. Update VS Code settings

Only modify the ESLint and Prettier-related entries. Keep all other project-specific settings intact.

`.vscode/settings.json` — change these entries:

```diff
-  "editor.codeActionsOnSave": {
-    "source.fixAll.eslint": "explicit"
-  },
+  "editor.codeActionsOnSave": {
+    "source.fixAll.oxc": "explicit"
+  },
+  "editor.formatOnSave": true,
```

Replace the default formatter. oxfmt handles all file types (JS, TS, JSON, CSS, Markdown, YAML, HTML) — just like Prettier. A single global setting replaces the per-language block:

```diff
-  "[json][jsonc][typescript][typescriptreact][javascript][javascriptreact][html][css]": {
-    "editor.defaultFormatter": "esbenp.prettier-vscode"
-  }
+  "editor.defaultFormatter": "oxc.oxc-vscode",
```

Install the [Oxc VS Code extension](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode). It handles both linting (oxlint) and formatting (oxfmt) in a single extension.

`.vscode/extensions.json`:

```diff
-    "dbaeumer.vscode-eslint",
-    "esbenp.prettier-vscode",
+    "oxc.oxc-vscode",
```

---

## 7. Handle rule name changes

If your project has rule overrides, update the rule names:

### Renamed rules

| ESLint name                                 | oxlint name              |
| ------------------------------------------- | ------------------------ |
| `@typescript-eslint/no-unused-vars`         | `no-unused-vars`         |
| `@typescript-eslint/no-shadow`              | `no-shadow`              |
| `@typescript-eslint/default-param-last`     | `default-param-last`     |
| `@typescript-eslint/no-empty-function`      | `no-empty-function`      |
| `@typescript-eslint/no-redeclare`           | `no-redeclare`           |
| `@typescript-eslint/no-unused-expressions`  | `no-unused-expressions`  |
| `@typescript-eslint/no-useless-constructor` | `no-useless-constructor` |
| `react-hooks/rules-of-hooks`                | `react/rules-of-hooks`   |
| `react-hooks/exhaustive-deps`               | `react/exhaustive-deps`  |

In oxlint, TypeScript extension rules are **unified** — the base rule name handles both JS and TS. If you override both forms (e.g., `@typescript-eslint/no-unused-vars` AND `no-unused-vars`), collapse them into one.

### React imports: `import * as React` → `import React`

The `no-restricted-imports` rule blocks `import * as React from 'react'` (star imports) in oxlint, which was allowed in ESLint. Replace all star imports with default imports:

```diff
-import * as React from 'react'
+import React from 'react'
```

Both patterns give the same result (`React.useState`, `React.useEffect`, etc.). You can do a project-wide find-and-replace:

```bash
# Find and replace in all .tsx/.ts files
find . -name '*.tsx' -o -name '*.ts' | xargs sed -i '' 's/import \* as React from/import React from/g'
```

### Rules with no oxlint equivalent

These active rules have no oxlint equivalent. Remove any overrides for them — they will have no effect:

| Rule                                   | Impact                                               |
| -------------------------------------- | ---------------------------------------------------- |
| `@typescript-eslint/naming-convention` | High — no replacement exists                         |
| `no-restricted-syntax`                 | High — partially replaced by `no-restricted-imports` |
| `id-denylist`                          | Medium — identifier naming enforcement lost          |
| `object-shorthand`                     | Medium                                               |
| `react/function-component-definition`  | Medium                                               |
| `react/hook-use-state`                 | Medium                                               |
| `react/jsx-no-leaked-render`           | Medium                                               |
| `react/jsx-no-bind`                    | Medium                                               |

See [GAPS.md](./GAPS.md) for the complete list with status per plugin and [known issues & workarounds](./GAPS.md#known-issues--workarounds) for common migration pitfalls (Prisma `globalThis` pattern, etc.).

---

## 8. Convert disable comments (optional)

oxlint supports `// eslint-disable` comments natively, so **nothing breaks**. To convert them for consistency:

```bash
npx @oxlint/migrate --replace-eslint-comments
```

> Run this **before** deleting your ESLint config file (step 9).

This converts:

- `// eslint-disable-next-line rule-name` → `// oxlint-disable-next-line rule-name`
- `/* eslint-disable */` → `/* oxlint-disable */`

### Remove stale disable comments

`oxlint --fix` does **not** auto-remove unused disable comments (e.g., `// eslint-disable-next-line @typescript-eslint/naming-convention` for rules that don't exist in oxlint). You'll see "Unused eslint-disable directive" errors for these.

Remove them manually — this is typically the most time-consuming part of the migration. Search for common patterns:

```bash
# Find all eslint-disable comments
grep -rn "eslint-disable" --include="*.ts" --include="*.tsx" .
```

Common stale comments to look for:
- `@typescript-eslint/naming-convention` (not in oxlint)
- `no-restricted-syntax` (not in oxlint)
- `react-hooks/purity`, `react-hooks/incompatible-library` (not in oxlint)
- `camelcase` (not in oxlint)
- `react/hook-use-state` (not in oxlint)

---

## 9. Update CI

Add `format:check` alongside `lint` in your CI pipeline:

```diff
-run: npm run lint
+run: npm run lint && npm run format:check
```

Or as separate steps:

```yaml
- name: Lint
  run: npm run lint

- name: Format check
  run: npm run format:check
```

---

## 10. Cleanup

Delete these files:

```
eslint.config.js
eslint.config.mjs
.eslintrc.json
.eslintrc.js
.prettierrc
.prettierrc.json
.prettierrc.js
.prettierignore
.eslintignore
```

> If you had an `.eslintignore`, make sure its patterns are either already in your `.gitignore` (oxlint respects it by default) or added to `ignorePatterns` in `oxlint.config.ts`.

---

## Quick reference

| Before                   | After                                  |
| ------------------------ | -------------------------------------- |
| `eslint .`               | `oxlint .`                             |
| `eslint --fix .`         | `oxlint --fix .`                       |
| `prettier --check .`     | `oxfmt --check .`                      |
| `prettier --write .`     | `oxfmt .`                              |
| `eslint.config.js`       | `oxlint.config.ts`                     |
| `.prettierrc`            | `oxfmt.config.ts`                      |
| `dbaeumer.vscode-eslint` | `oxc.oxc-vscode`                       |
| `esbenp.prettier-vscode` | `oxc.oxc-vscode`                       |
| 12+ npm packages         | 3 packages (`oxlint`, `oxfmt`, config) |
