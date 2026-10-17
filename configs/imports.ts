import type { OxlintConfig } from 'oxlint'
import {
  COMMONJS_CONFIG_FILES,
  STORY_FILES,
  TOOL_CONFIG_FILES
} from './globs/index.ts'

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
    'import/first': ['error', 'absolute-first'],

    // Disallow duplicate imports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-duplicates
    'import/no-duplicates': [
      'error',
      {
        considerQueryString: false,
        preferInline: true
      }
    ],

    // Disallow import { default as X }, write import X
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-default
    'import/no-named-default': 'error',

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

    // Disallow dynamic require() with expressions
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-dynamic-require
    'import/no-dynamic-require': ['error', { esmodule: false }],

    // Disallow side-effect imports without assignment
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-unassigned-import
    'import/no-unassigned-import': [
      'error',
      {
        allow: ['server-only', '**/*.css', '**/*.scss']
      }
    ],

    // Allow namespace imports — Sentry.captureException() is more readable than captureException()
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-namespace
    'import/no-namespace': 'off',

    // Disallow default exports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-default-export
    'import/no-default-export': 'error',

    // Disallow default import using a named export's identifier
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-as-default
    'import/no-named-as-default': 'error',

    // Disallow accessing named export as property of default import
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-as-default-member
    'import/no-named-as-default-member': 'error',

    // Disallow anonymous default exports
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

    // Limit maximum dependencies per file — too arbitrary
    // https://oxc.rs/docs/guide/usage/linter/rules/import/max-dependencies
    'import/max-dependencies': 'off',

    // Disallow relative parent imports (../) — not all projects have aliases
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-relative-parent-imports
    'import/no-relative-parent-imports': 'off',

    // File extensions in imports — too dependent on bundler/runtime (Vite, node16, etc.)
    // https://oxc.rs/docs/guide/usage/linter/rules/import/extensions
    'import/extensions': 'off',

    // Top-level (import type { T }) when only types, inline (import { type T, value }) when mixed
    // https://oxc.rs/docs/guide/usage/linter/rules/import/consistent-type-specifier-style
    'import/consistent-type-specifier-style': [
      'error',
      'prefer-top-level-if-only-type-imports'
    ],

    // Disallow empty named import blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-empty-named-blocks
    'import/no-empty-named-blocks': 'error',

    // Verify namespace import properties exist
    // https://oxc.rs/docs/guide/usage/linter/rules/import/namespace
    'import/namespace': ['error', { allowComputed: false }],

    // Disallow webpack loader syntax in imports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-webpack-loader-syntax
    'import/no-webpack-loader-syntax': 'error',

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

    // Disallow CommonJS require/module.exports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-commonjs
    'import/no-commonjs': 'error',

    // Disallow AMD define/require
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-amd
    'import/no-amd': 'error',

    // Verify imports exist in package.json — TypeScript checks
    // https://oxc.rs/docs/guide/usage/linter/rules/import/named
    'import/named': 'off',

    // Verify default export exists — TypeScript checks
    // https://oxc.rs/docs/guide/usage/linter/rules/import/default
    'import/default': 'off',

    // Disallow Node.js built-in module imports — needed in backend/tooling
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-nodejs-modules
    'import/no-nodejs-modules': 'off',

    // Force files to be unambiguously ESM — TS/bundler handles
    // https://oxc.rs/docs/guide/usage/linter/rules/import/unambiguous
    'import/unambiguous': 'off',

    // Enforce a blank line after the last import
    // https://oxc.rs/docs/guide/usage/linter/rules/import/newline-after-import
    'import/newline-after-import': [
      'error',
      {
        count: 1,
        exactCount: false,
        considerComments: false
      }
    ]
  },
  overrides: [
    {
      // A tool loads its config file, and Storybook loads a story, through the default export
      files: [...TOOL_CONFIG_FILES, ...STORY_FILES],
      rules: {
        'import/no-default-export': 'off'
      }
    },
    {
      // A tool still loads some JavaScript config files as CommonJS
      files: [...COMMONJS_CONFIG_FILES],
      rules: {
        'import/no-commonjs': 'off'
      }
    }
  ]
} satisfies OxlintConfig
