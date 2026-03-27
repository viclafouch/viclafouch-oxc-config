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

**Exception — jsPlugins:** three configs use ESLint plugins via oxlint's compatibility layer (not yet built into oxlint natively). Install only the ones you use:

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

### Examples

See the [README](./README.md) for full examples (TypeScript, React, Next.js, React Native).

### Project-specific rule overrides

Copy your rule overrides from the old ESLint config. See [section 7](#7-handle-rule-name-changes) for rules that changed name.

```typescript
export default defineConfig({
  extends: [typescript, react, hooks, jsxA11y, imports],
  rules: {
    "react/no-children-prop": "off",
    "id-length": ["error", { exceptions: ["_", "x", "y"] }],
  },
});
```

> oxlint respects `.gitignore` by default. Only add `ignorePatterns` for paths NOT in `.gitignore`.

---

## 3. Replace Prettier with oxfmt

Create `oxfmt.config.ts` at the project root:

```typescript
import { defineConfig } from 'oxfmt'
import { oxfmtConfig } from '@viclafouch/oxc-config/formatting'

export default defineConfig(oxfmtConfig)
```

The formatting config (no semicolons, single quotes, 80 char width, import sorting, etc.) comes from the package. To override a specific option:

```typescript
export default defineConfig({
  ...oxfmtConfig,
  printWidth: 100
})
```

To ignore files (e.g., auto-generated files not idempotent with oxfmt):

```typescript
export default defineConfig({
  ...oxfmtConfig,
  ignorePatterns: ['src/generated/**']
})
```

> `ignorePatterns` works the same as in `oxlint.config.ts`. Do **not** create a `.prettierignore` — oxfmt reads it for backward compatibility but it's deprecated.

### What the shared config includes

- **Formatting:** no semicolons, single quotes, 80 char width, double quotes in JSX, no trailing commas
- **Import sorting:** replaces `simple-import-sort` (react → frameworks → third-party → aliases → relative, no blank lines between groups)
- **Curly braces:** `curly: ['error', 'all']` in the `typescript` oxlint config replaces `prettier-plugin-curly`

### `endOfLine` behavior change

The Prettier config used `endOfLine: "auto"`. oxfmt does not support `"auto"` — it defaults to `"lf"`. In practice this has no impact if you use `.gitattributes` with `* text=auto eol=lf`. If your team has Windows developers with `CRLF` files, override with `endOfLine: 'crlf'`.

### Commit formatting changes separately

Run oxfmt and **commit the result before continuing the migration**. Import sorting produces large diffs — isolating them keeps the rest reviewable.

```bash
npx oxfmt '**/*.{ts,tsx,js,jsx}'
git add -A && git commit -m "chore: reformat codebase with oxfmt"
```

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

> **Important:** Specify file patterns explicitly. `oxfmt .` formats **everything** (Markdown, JSON, YAML, CSS, etc.). Use globs to match only JS/TS files.

If your scripts include `tsc`, keep it:

```diff
-  "lint": "tsc && eslint",
+  "lint": "tsc && oxlint",
+  "lint:fix": "tsc && oxlint --fix && oxfmt '**/*.{ts,tsx,js,jsx}'",
```

---

## 5. Update pre-commit hook

### Husky

`.husky/pre-commit`:

```diff
-npm run lint
+npm run lint && npm run format:check
```

### lint-staged (alternative)

```diff
 {
-  "*.{ts,tsx,js,jsx}": ["eslint --fix"]
+  "*.{ts,tsx,js,jsx}": ["oxlint --fix", "oxfmt"]
 }
```

> Husky + `format:check` **blocks** bad commits. lint-staged + `oxfmt` **auto-fixes** on commit. Choose one, not both.

---

## 6. Update VS Code settings

`.vscode/settings.json`:

```diff
-  "editor.codeActionsOnSave": {
-    "source.fixAll.eslint": "explicit"
-  },
+  "editor.codeActionsOnSave": {
+    "source.fixAll.oxc": "explicit"
+  },
+  "editor.formatOnSave": true,
```

```diff
-  "[json][jsonc][typescript][typescriptreact][javascript][javascriptreact][html][css]": {
-    "editor.defaultFormatter": "esbenp.prettier-vscode"
-  }
+  "editor.defaultFormatter": "oxc.oxc-vscode",
```

`.vscode/extensions.json`:

```diff
-    "dbaeumer.vscode-eslint",
-    "esbenp.prettier-vscode",
+    "oxc.oxc-vscode",
```

---

## 7. Handle rule name changes

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
| `react-hooks/rules-of-hooks`               | `react/rules-of-hooks`   |
| `react-hooks/exhaustive-deps`              | `react/exhaustive-deps`  |

In oxlint, TypeScript extension rules are **unified** — the base rule name handles both JS and TS. Collapse duplicate overrides into one.

### React imports: `import * as React` → `import React`

`no-restricted-imports` blocks star imports in oxlint. Replace project-wide:

```bash
find . -name '*.tsx' -o -name '*.ts' | xargs sed -i '' 's/import \* as React from/import React from/g'
```

### Rules with no oxlint equivalent

Remove overrides for these — they have no effect:

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

See [GAPS.md](./GAPS.md) for the complete list.

---

## 8. Convert disable comments

oxlint supports `// eslint-disable` natively, so nothing breaks. Convert for consistency:

**Step 1 — Convert all `eslint-disable` → `oxlint-disable`** (including generated/vendor files):

```bash
find . -type f \( -name '*.ts' -o -name '*.tsx' -o -name '*.js' \) \
  ! -path '*/node_modules/*' \
  -exec sed -i '' 's/eslint-disable/oxlint-disable/g' {} +
```

**Step 2 — Update renamed rules** in disable comments (see [section 7](#renamed-rules)):

```diff
-// oxlint-disable-next-line react-hooks/exhaustive-deps
+// oxlint-disable-next-line react/exhaustive-deps
```

**Step 3 — Remove stale comments** for rules that don't exist in oxlint. `oxlint --fix` does **not** auto-remove them — you'll see "Unused oxlint-disable directive" errors. This is the most time-consuming part of the migration. Common stale rules:

`@typescript-eslint/naming-convention`, `no-restricted-syntax`, `react-hooks/purity`, `react-hooks/incompatible-library`, `camelcase`, `react/hook-use-state`, `@typescript-eslint/consistent-type-definitions`

---

## 9. Update CI

```diff
-run: npm run lint
+run: npm run lint && npm run format:check
```

---

## 10. Cleanup

Delete these files:

```
eslint.config.js   .eslintrc.json   .eslintrc.js   .eslintignore
.prettierrc        .prettierrc.json .prettierrc.js  .prettierrc.yaml  .prettierignore
```

> `.eslintignore` patterns → `ignorePatterns` in `oxlint.config.ts`. `.prettierignore` patterns → `ignorePatterns` in `oxfmt.config.ts`.

---

## Path aliases and import sorting

The shared config sorts: **react → frameworks → builtin → unscoped external → scoped external → aliases → internal → relative**.

### Non-idempotent formatting on generated files

Some auto-generated files (route trees, Prisma Client, Drizzle migrations, GraphQL codegen, etc.) may not be idempotent with oxfmt — `oxfmt --check` fails even after formatting. Add them to `ignorePatterns` in `oxfmt.config.ts`.

### `interface` → `type` in `declare module`

oxfmt may convert `interface` to `type` inside `declare module` blocks, breaking TypeScript declaration merging. **Workaround:** add `// oxfmt-ignore` before the `declare module` block.

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
| `.prettierignore`        | `ignorePatterns` in `oxfmt.config.ts`  |
| `dbaeumer.vscode-eslint` | `oxc.oxc-vscode`                       |
| `esbenp.prettier-vscode` | `oxc.oxc-vscode`                       |
| 12+ npm packages         | 3 packages (`oxlint`, `oxfmt`, config) |
