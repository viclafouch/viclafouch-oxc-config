import type { OxlintConfig } from 'oxlint'

/**
 * React Hooks configuration for oxlint.
 *
 * Migrated from `rules/react-hooks.mjs`.
 * In oxlint, hooks rules are part of the `react` plugin (not a separate `react-hooks` plugin).
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
    'react/exhaustive-deps': 'error'
  }
} satisfies OxlintConfig
