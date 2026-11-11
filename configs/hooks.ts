import type { OxlintConfig } from 'oxlint'
import { TEST_FILES } from './globs/index.ts'
import { VICLAFOUCH_PLUGIN } from './js-plugins/index.ts'

/**
 * React Hooks rules, powered by the React Compiler since oxlint 1.79.0.
 * In oxlint, hooks rules are part of the `react` plugin.
 *
 * The legacy ESLint ports (`rules-of-hooks`, `exhaustive-deps`) are off:
 * the React Compiler equivalents supersede them and running both would
 * report every violation twice.
 *
 * @example
 * ```ts
 * extends: [typescript, react, hooks, imports]
 * ```
 */
export default {
  plugins: ['react'],
  jsPlugins: [VICLAFOUCH_PLUGIN],
  rules: {
    // Enforce rules of hooks: unconditional calls, stable order, top level
    // https://oxc.rs/docs/guide/usage/linter/rules/react/hooks.md
    'react/hooks': 'error',

    // Verify the list of dependencies for effects
    // https://oxc.rs/docs/guide/usage/linter/rules/react/exhaustive-effect-dependencies.md
    'react/exhaustive-effect-dependencies': 'error',

    // Verify the list of dependencies for useMemo and useCallback
    // https://oxc.rs/docs/guide/usage/linter/rules/react/memo-dependencies.md
    'react/memo-dependencies': 'error',

    // Disallow deriving state in an effect: compute during render instead
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-deriving-state-in-effects.md
    'react/no-deriving-state-in-effects': 'error',

    // Disallow a `use` function that calls no hook: rename it to a plain function
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#no-hookless-use-function
    'viclafouch/no-hookless-use-function': 'error',

    // Give useSyncExternalStore a subscribe that registers its listener, never a no-op
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#no-noop-subscribe
    'viclafouch/no-noop-subscribe': 'error',

    // Derive the next state from the previous one: setCount((previous) => previous + 1), never setCount(count + 1)
    // https://github.com/viclafouch/viclafouch-oxc-config/blob/main/plugins/viclafouch/README.md#functional-update
    'viclafouch/functional-update': 'error',

    // Superseded by react/hooks (React Compiler), off upstream too
    // https://oxc.rs/docs/guide/usage/linter/rules/react/rules-of-hooks.md
    'react/rules-of-hooks': 'off',

    // Superseded by react/exhaustive-effect-dependencies and react/memo-dependencies
    // https://oxc.rs/docs/guide/usage/linter/rules/react/exhaustive-deps.md
    'react/exhaustive-deps': 'off'
  },
  overrides: [
    {
      // A mock keeps the name of the hook it replaces, and calls no hook
      files: [...TEST_FILES],
      rules: {
        'viclafouch/no-hookless-use-function': 'off'
      }
    }
  ]
} satisfies OxlintConfig
