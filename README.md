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
  imports
} from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, hooks, jsxA11y, imports]
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
  imports
} from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, hooks, jsxA11y, next, imports]
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
  imports
} from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, hooks, reactNative, imports]
})
```

## Available Configurations

| Config           | Description                                      |
| ---------------- | ------------------------------------------------ |
| `typescript`     | **Required base.** TypeScript, core, unicorn, oxc rules |
| `react`          | React rules (JSX, components, patterns)          |
| `hooks`          | React Hooks (rules-of-hooks, exhaustive-deps)    |
| `jsxA11y`        | Web accessibility (jsx-a11y) — for web projects  |
| `next`           | Next.js specific rules                           |
| `reactNative`    | React Native rules (via jsPlugins)               |
| `imports`        | Import rules (no-cycle, no-duplicates, etc.)     |
| `playwright`     | Playwright e2e testing (via jsPlugins)            |
| `testingLibrary` | Testing Library rules (via jsPlugins)             |

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

Import sorting is opt-in:

```typescript
import { defineConfig } from 'oxfmt'
import {
  oxfmtConfig,
  sortImportsConfig
} from '@viclafouch/oxc-config/formatting'

export default defineConfig({
  ...oxfmtConfig,
  sortImports: sortImportsConfig
})
```

## Scripts

```json
{
  "type": "module",
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix && oxfmt '**/*.{ts,tsx,js,jsx}'",
    "format": "oxfmt '**/*.{ts,tsx,js,jsx}'",
    "format:check": "oxfmt --check '**/*.{ts,tsx,js,jsx}'"
  }
}
```

If your project also runs `tsc`:

```json
{
  "scripts": {
    "lint": "tsc --noEmit && oxlint",
    "lint:fix": "tsc --noEmit && oxlint --fix && oxfmt '**/*.{ts,tsx,js,jsx}'"
  }
}
```

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
2. `react` / `hooks` / `jsxA11y` / `next` / `reactNative`
3. `imports`
4. `playwright` / `testingLibrary` (testing)

## Requirements

- `oxlint` >= 1.57
- `oxfmt` >= 1.0
- `typescript` >= 5
- Node.js >= 22.18 (for `.config.ts` support)

## Gaps

See [GAPS.md](https://github.com/viclafouch/oxc-config/blob/main/GAPS.md) for rules not available in oxlint.

## jsPlugins

Three configs use external plugins (install only the ones you need):

```bash
npm install -D eslint-plugin-react-native      # for reactNative
npm install -D eslint-plugin-playwright         # for playwright
npm install -D eslint-plugin-testing-library    # for testingLibrary
```

These are listed as optional `peerDependencies`.
