import type { OxlintConfig } from 'oxlint'

/**
 * React Hooks rules: rules-of-hooks and exhaustive-deps.
 * In oxlint, hooks rules are part of the `react` plugin.
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
    // Enforce rules of hooks
    // https://oxc.rs/docs/guide/usage/linter/rules/react/rules-of-hooks
    'react/rules-of-hooks': 'error',

    // Verify the list of dependencies for hooks
    // https://oxc.rs/docs/guide/usage/linter/rules/react/exhaustive-deps
    'react/exhaustive-deps': ['error', { additionalHooks: '' }]
  }
} satisfies OxlintConfig
