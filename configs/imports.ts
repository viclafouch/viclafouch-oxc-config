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
    ],

    // Enforce blank line after the last import statement
    // https://oxc.rs/docs/guide/usage/linter/rules/import/newline-after-import
    'import/newline-after-import': [
      'error',
      {
        count: 1,
        exactCount: false,
        considerComments: false
      }
    ],

    // Disallow default import named after a named export of the same module
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-as-default
    'import/no-named-as-default': 'error',

    // Disallow accessing named export via default import property
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-as-default-member
    'import/no-named-as-default-member': 'error',

    // Disallow empty named import blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-empty-named-blocks
    'import/no-empty-named-blocks': 'error',

    // Verify namespace import properties exist
    // https://oxc.rs/docs/guide/usage/linter/rules/import/namespace
    'import/namespace': ['error', { allowComputed: false }],

    // Disallow webpack loader syntax in imports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-webpack-loader-syntax
    'import/no-webpack-loader-syntax': 'error',

    // Disallow anonymous default exports (grepability)
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-anonymous-default-export
    'import/no-anonymous-default-export': [
      'error',
      {
        allowAnonymousClass: false,
        allowAnonymousFunction: false,
        allowArray: false,
        allowArrowFunction: false,
        allowCallExpression: true,
        allowLiteral: false,
        allowNew: false,
        allowObject: false
      }
    ],

    // Disallow default exports — named exports only
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-default-export
    'import/no-default-export': 'error',

    // Allow named exports — coherent with no-default-export
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-export
    'import/no-named-export': 'off',

    // Prefer default when single export — contradicts no-default-export
    // https://oxc.rs/docs/guide/usage/linter/rules/import/prefer-default-export
    'import/prefer-default-export': 'off',

    // Force exports at end of file — colocation is better
    // https://oxc.rs/docs/guide/usage/linter/rules/import/exports-last
    'import/exports-last': 'off',

    // Force grouped exports — too restrictive
    // https://oxc.rs/docs/guide/usage/linter/rules/import/group-exports
    'import/group-exports': 'off',

    // Allow namespace imports — Sentry.captureException() is more readable than captureException()
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-namespace
    'import/no-namespace': 'off',

    // File extensions in imports — too dependent on bundler/runtime (Vite, node16, etc.)
    // https://oxc.rs/docs/guide/usage/linter/rules/import/extensions
    'import/extensions': 'off',

    // Disallow CommonJS require/module.exports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-commonjs
    'import/no-commonjs': 'error',

    // Disallow AMD define/require
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-amd
    'import/no-amd': 'error',

    // Limit number of imports per file — too arbitrary
    // https://oxc.rs/docs/guide/usage/linter/rules/import/max-dependencies
    'import/max-dependencies': 'off',

    // Disallow dynamic require()
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-dynamic-require
    'import/no-dynamic-require': 'error',

    // Verify imports exist in package.json — TypeScript + bundler check
    // https://oxc.rs/docs/guide/usage/linter/rules/import/named
    'import/named': 'off',

    // Verify default export exists — TypeScript checks
    // https://oxc.rs/docs/guide/usage/linter/rules/import/default
    'import/default': 'off',

    // Disallow Node.js built-in module imports — needed in backend/tooling
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-nodejs-modules
    'import/no-nodejs-modules': 'off',

    // Disallow relative parent imports (../) — not all projects have aliases
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-relative-parent-imports
    'import/no-relative-parent-imports': 'off',

    // Disallow side-effect imports — CSS/polyfills need them
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-unassigned-import
    'import/no-unassigned-import': 'off',

    // Both inline (import { type T }) and top-level (import type { T }) are valid
    // https://oxc.rs/docs/guide/usage/linter/rules/import/consistent-type-specifier-style
    'import/consistent-type-specifier-style': 'off',

    // Force files to be unambiguously ESM — TS/bundler handles
    // https://oxc.rs/docs/guide/usage/linter/rules/import/unambiguous
    'import/unambiguous': 'off'
  },
  overrides: [
    {
      // Config files require default exports by convention
      files: ['**/*.config.*', '**/vite.config.*', '**/vitest.config.*'],
      rules: {
        'import/no-default-export': 'off'
      }
    }
  ]
} satisfies OxlintConfig
