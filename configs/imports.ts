import type { OxlintConfig } from 'oxlint'

/**
 * Import hygiene rules (cycles, duplicates, ordering).
 * Import sorting is handled by oxfmt, not here.
 *
 * @example
 * ```ts
 * extends: [typescript, imports]
 * ```
 */
export default {
  plugins: ['import'],
  rules: {
    // Ensure all imports appear before other statements
    // https://oxc.rs/docs/guide/usage/linter/rules/import/first
    'import/first': ['error', 'disable-absolute-first'],

    // Disallow duplicate imports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-duplicates
    'import/no-duplicates': [
      'error',
      {
        considerQueryString: false,
        preferInline: false
      }
    ],

    // Disallow circular imports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-cycle
    'import/no-cycle': [
      'error',
      {
        allowUnsafeDynamicCyclicDependency: false,
        ignoreExternal: false,
        ignoreTypes: true,
        maxDepth: 4_294_967_295
      }
    ],

    // Disallow a module from importing itself
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-self-import
    'import/no-self-import': 'error',

    // Disallow mutable exports (export let, export var)
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-mutable-exports
    'import/no-mutable-exports': 'error',

    // Disallow absolute path imports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-absolute-path
    'import/no-absolute-path': [
      'error',
      {
        amd: false,
        commonjs: true,
        esmodule: true
      }
    ]
  }
} satisfies OxlintConfig
