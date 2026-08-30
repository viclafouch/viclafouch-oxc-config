import type { OxlintConfig } from 'oxlint'

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
  categories: {
    correctness: 'error'
  },
  rules: {
    // Enforce rules of hooks — unconditional calls, stable order, top level
    // https://oxc.rs/docs/guide/usage/linter/rules/react/hooks
    'react/hooks': 'error',

    // Verify the list of dependencies for effects
    // https://oxc.rs/docs/guide/usage/linter/rules/react/exhaustive-effect-dependencies
    'react/exhaustive-effect-dependencies': 'error',

    // Verify the list of dependencies for useMemo and useCallback
    // https://oxc.rs/docs/guide/usage/linter/rules/react/memo-dependencies
    'react/memo-dependencies': 'error',

    // Disallow deriving state in an effect — compute during render instead
    // https://oxc.rs/docs/guide/usage/linter/rules/react/no-deriving-state-in-effects
    'react/no-deriving-state-in-effects': 'error',

    // Superseded by react/hooks (React Compiler), off upstream too
    // https://oxc.rs/docs/guide/usage/linter/rules/react/rules-of-hooks
    'react/rules-of-hooks': 'off',

    // Superseded by react/exhaustive-effect-dependencies and react/memo-dependencies
    // https://oxc.rs/docs/guide/usage/linter/rules/react/exhaustive-deps
    'react/exhaustive-deps': ['off', { additionalHooks: '' }]
  }
} satisfies OxlintConfig
