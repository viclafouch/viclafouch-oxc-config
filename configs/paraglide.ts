import type { OxlintConfig } from 'oxlint'

/**
 * Paraglide JS rules for the messages of an app.
 * Requires `@inlang/paraglide-js` as a peer dependency. Add the output folder of the compiler, such as `src/paraglide/**`, to `ignorePatterns`.
 *
 * @example
 * ```ts
 * extends: [typescript, react, hooks, jsxA11y, tanstackQuery, tanstackStart, paraglide, imports]
 * ```
 */
export default {
  jsPlugins: [{ name: 'paraglide', specifier: '@inlang/paraglide-js/eslint' }],
  rules: {
    // Call each message by its name: a dynamic access such as m[key]() keeps every message in the bundle
    // https://paraglidejs.com/basics#dynamic-messages
    'paraglide/no-dynamic-message-access': 'error'
  }
} satisfies OxlintConfig
