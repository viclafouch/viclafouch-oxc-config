# @viclafouch/oxc-config

Oxlint + Oxfmt configuration for modern TypeScript projects.

## Installation

```bash
npm install -D @viclafouch/oxc-config oxlint oxfmt oxlint-tsgolint
```

## Quick Setup (React Web)

```typescript
// oxlint.config.ts
import { defineConfig } from 'oxlint'
import {
  typescript,
  react,
  hooks,
  jsxA11y,
  imports,
  tanstackQuery
} from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, hooks, jsxA11y, imports, tanstackQuery],
  // Turns on the type-aware rules, which need oxlint-tsgolint
  options: { typeAware: true }
})
```

```typescript
// oxfmt.config.ts
import { defineConfig } from 'oxfmt'
import { oxfmtConfig } from '@viclafouch/oxc-config/formatting'

export default defineConfig(oxfmtConfig)
```

## Stack Examples

### Pure TypeScript (Node.js, lib)

```typescript
// oxlint.config.ts
import { defineConfig } from 'oxlint'
import { typescript, imports } from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, imports],
  // Turns on the type-aware rules, which need oxlint-tsgolint
  options: { typeAware: true }
})
```

### Next.js

```typescript
// oxlint.config.ts
import { defineConfig } from 'oxlint'
import {
  typescript,
  react,
  hooks,
  jsxA11y,
  next,
  imports,
  tanstackQuery
} from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, hooks, jsxA11y, next, imports, tanstackQuery],
  // Turns on the type-aware rules, which need oxlint-tsgolint
  options: { typeAware: true }
})
```

### React Native (Expo)

> Requires `eslint-plugin-react-native`: `npm install -D eslint-plugin-react-native`

```typescript
// oxlint.config.ts
import { defineConfig } from 'oxlint'
import {
  typescript,
  react,
  hooks,
  reactNative,
  imports,
  tanstackQuery
} from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, hooks, reactNative, imports, tanstackQuery],
  // Turns on the type-aware rules, which need oxlint-tsgolint
  options: { typeAware: true }
})
```

## Available Configurations

| Config           | Description                                                                             |
| ---------------- | --------------------------------------------------------------------------------------- |
| `typescript`     | **Required base.** TypeScript, core, unicorn, oxc, node, promise and `viclafouch` rules |
| `react`          | React rules (JSX, components, patterns), `viclafouch` rules and React Doctor            |
| `hooks`          | React Hooks, powered by the React Compiler                                              |
| `jsxA11y`        | Web accessibility (jsx-a11y) — for web projects                                         |
| `next`           | Next.js specific rules, and React Doctor rules for the App Router                       |
| `reactNative`    | React Native rules (via jsPlugins)                                                      |
| `imports`        | Import rules (no-cycle, no-duplicates, etc.)                                            |
| `tanstackQuery`  | TanStack Query rules (via jsPlugins)                                                    |
| `turbo`          | Turborepo env-var validation (via jsPlugins)                                            |
| `vitest`         | Vitest rules on the test files (native plugin)                                          |
| `testingLibrary` | Testing Library rules (via jsPlugins)                                                   |
| `playwright`     | Playwright e2e testing (via jsPlugins)                                                  |
| `TEST_FILES`     | The globs of the test files that `vitest` covers                                        |
| `OxlintConfig`   | The type of an oxlint config, from `oxlint`                                             |

### `@viclafouch/oxc-config/plugins/viclafouch`

The jsPlugin that the `typescript` and `react` configs load. It ships with this package, so you install nothing more. Read [its README](plugins/viclafouch/README.md).

### React Doctor

The `react` and `next` configs load [`oxlint-plugin-react-doctor`](https://www.react.doctor), a dependency of this package. It catches the Effects that the React Compiler rules do not see (data passed to a parent, Effect chains, state adjusted on a prop change), the secrets that ship to the browser, and the Next.js routes that break (`useSearchParams` without Suspense, `redirect()` in a `try`).

React Doctor skips a file under a `scripts`, `tools`, `tooling`, `cli` or `bin` folder: set `settings['react-doctor'].rootDirectory` to change it.

## Playwright E2E Testing

Add `playwright` scoped to your e2e test files:

```typescript
import { defineConfig } from 'oxlint'
import {
  typescript,
  react,
  hooks,
  jsxA11y,
  imports,
  playwright
} from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, hooks, jsxA11y, imports, playwright]
})
```

## Vitest

`vitest` turns its rules on in the test files only (`TEST_FILES`): `*.test.ts`, `*.spec.ts`, `*.test-d.ts`, `*.fixture.ts` and the files under `tests/`, `__tests__/` and `__mocks__/`. To configure a vitest rule, reuse `TEST_FILES` in your own override, for example `consistent-test-filename` with a regex that matches your project convention:

```typescript
import { defineConfig } from 'oxlint'
import { typescript, imports, vitest, TEST_FILES } from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, imports, vitest],
  overrides: [
    {
      files: TEST_FILES,
      rules: {
        'vitest/consistent-test-filename': [
          'error',
          {
            // *.test.ts(x) only
            pattern: '.*\\.test\\.tsx?$',
            allTestPattern: '.*\\.(test|spec)\\.tsx?$'
          }
        ]
      }
    }
  ]
})
```

## Testing Library

Add `testingLibrary` for your test files:

```typescript
import { defineConfig } from 'oxlint'
import {
  typescript,
  react,
  hooks,
  jsxA11y,
  imports,
  testingLibrary
} from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, hooks, jsxA11y, imports, testingLibrary]
})
```

## TanStack Query

> Requires `@tanstack/eslint-plugin-query`: `npm install -D @tanstack/eslint-plugin-query`

```typescript
import { defineConfig } from 'oxlint'
import {
  typescript,
  react,
  hooks,
  jsxA11y,
  imports,
  tanstackQuery
} from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, hooks, jsxA11y, imports, tanstackQuery]
})
```

## Formatting (oxfmt)

```typescript
// oxfmt.config.ts
import { defineConfig } from 'oxfmt'
import { oxfmtConfig } from '@viclafouch/oxc-config/formatting'

export default defineConfig(oxfmtConfig)
```

To override a specific option:

```typescript
import { defineConfig } from 'oxfmt'
import { oxfmtConfig } from '@viclafouch/oxc-config/formatting'

export default defineConfig({
  ...oxfmtConfig,
  printWidth: 100
})
```

## Scripts

```json
{
  "type": "module",
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix && oxfmt",
    "format": "oxfmt",
    "format:check": "oxfmt --check"
  }
}
```

> `oxfmt` formats everything (JS, TS, JSON, CSS, MD, etc.). To exclude files, use `ignorePatterns` in `oxfmt.config.ts` — not globs in the CLI.

## VS Code

1. Install the [Oxc extension](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode)
2. Add to `.vscode/settings.json`:

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.oxc": "explicit"
  },
  "editor.defaultFormatter": "oxc.oxc-vscode",
  "editor.formatOnSave": true
}
```

## Configuration Hierarchy

1. `typescript` (always first — base rules)
2. `react` / `hooks` / `jsxA11y` / `next` / `reactNative` / `tanstackQuery`
3. `imports`
4. `turbo`
5. `vitest` / `playwright` / `testingLibrary` (testing)

Only `typescript` declares `categories`. `extends` merges them left to right, so a later preset that set one would win on every file.

## Requirements

| Dependency        | Minimum version | Notes                                                       |
| ----------------- | --------------- | ----------------------------------------------------------- |
| `oxlint`          | >= 1.88         | `allowWithVariables` option                                 |
| `oxfmt`           | >= 0.73         | `sortImports` support                                       |
| `oxlint-tsgolint` | >= 7.0.2004     | Type-aware rules (`typeAware: true`); bundles its TS engine |
| `typescript`      | >= 5            |                                                             |
| Node.js           | >= 22.18        | For `.config.ts` support                                    |

> Ensure your `package.json` has `"type": "module"` to avoid ESM warnings with `.config.ts` files.

## jsPlugins

Five configs use external plugins (install only the ones you need):

```bash
npm install -D @tanstack/eslint-plugin-query                 # for tanstackQuery
npm install -D eslint-plugin-react-native                    # for reactNative
npm install -D eslint-plugin-turbo                           # for turbo
npm install -D eslint-plugin-playwright                      # for playwright
npm install -D eslint-plugin-testing-library                 # for testingLibrary
```

These are listed as optional `peerDependencies`.
