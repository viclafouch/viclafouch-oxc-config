# @viclafouch/oxc-config

Oxlint + Oxfmt configuration for modern TypeScript projects.

## Installation

```bash
npm install -D @viclafouch/oxc-config oxlint oxfmt
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
  extends: [typescript, react, hooks, jsxA11y, imports, tanstackQuery]
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
  extends: [typescript, imports]
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
  extends: [typescript, react, hooks, jsxA11y, next, imports, tanstackQuery]
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
  extends: [typescript, react, hooks, reactNative, imports, tanstackQuery]
})
```

## Available Configurations

| Config           | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `typescript`     | **Required base.** TypeScript, core, unicorn, oxc rules |
| `react`          | React rules (JSX, components, patterns)                 |
| `hooks`          | React Hooks (rules-of-hooks, exhaustive-deps)           |
| `jsxA11y`        | Web accessibility (jsx-a11y) — for web projects         |
| `next`           | Next.js specific rules                                  |
| `reactNative`    | React Native rules (via jsPlugins)                      |
| `imports`        | Import rules (no-cycle, no-duplicates, etc.)            |
| `tanstackQuery`  | TanStack Query rules (via jsPlugins)                    |
| `playwright`     | Playwright e2e testing (via jsPlugins)                  |
| `testingLibrary` | Testing Library rules (via jsPlugins)                   |
| `vitest`         | Vitest testing rules (native plugin)                    |

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

Add `vitest` and configure `consistent-test-filename` with a regex that matches your project convention:

```typescript
import { defineConfig } from 'oxlint'
import { typescript, imports, vitest } from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, imports, vitest],
  rules: {
    'vitest/consistent-test-filename': [
      'error',
      {
        // *.test.ts(x) only
        pattern: '.*\\.test\\.tsx?$'
        // *.spec.ts(x) only
        // pattern: '.*\\.spec\\.tsx?$'
        // Both *.test.ts(x) and *.spec.ts(x)
        // pattern: '.*\\.(test|spec)\\.tsx?$'
      }
    ]
  }
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

If your project also runs `tsc`:

```json
{
  "scripts": {
    "lint": "tsc --noEmit && oxlint",
    "lint:fix": "tsc --noEmit && oxlint --fix && oxfmt"
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
4. `vitest` / `playwright` / `testingLibrary` (testing)

## Requirements

| Dependency   | Minimum version | Notes                      |
| ------------ | --------------- | -------------------------- |
| `oxlint`     | >= 1.59         | Flat config, `extends` API |
| `oxfmt`      | >= 0.44         | `sortImports` support      |
| `typescript` | >= 5            |                            |
| Node.js      | >= 22.18        | For `.config.ts` support   |

> Ensure your `package.json` has `"type": "module"` to avoid ESM warnings with `.config.ts` files.

## Gaps

See [GAPS.md](./GAPS.md) for rules not available in oxlint.

## jsPlugins

Four configs use external plugins (install only the ones you need):

```bash
npm install -D @tanstack/eslint-plugin-query    # for tanstackQuery
npm install -D eslint-plugin-react-native       # for reactNative
npm install -D eslint-plugin-playwright         # for playwright
npm install -D eslint-plugin-testing-library    # for testingLibrary
```

These are listed as optional `peerDependencies`.
