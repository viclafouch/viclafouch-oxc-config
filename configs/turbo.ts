import type { OxlintConfig } from 'oxlint'

/**
 * Turborepo rules via jsPlugin.
 * Verifies that env vars used in code are declared in turbo.json.
 *
 * Requires `eslint-plugin-turbo` as a peer dependency.
 *
 * @example
 * ```ts
 * extends: [typescript, imports, turbo]
 * ```
 */
export default {
  jsPlugins: ['eslint-plugin-turbo'],
  rules: {
    // Ensure env vars are declared in turbo.json
    // https://github.com/vercel/turborepo/tree/main/packages/eslint-plugin-turbo/docs/rules/no-undeclared-env-vars.md
    'turbo/no-undeclared-env-vars': 'error'
  }
} satisfies OxlintConfig
