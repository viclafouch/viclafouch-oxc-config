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
    // https://oxc.rs/docs/guide/usage/linter/rules/import/first.md
    'import/first': ['error', 'absolute-first'],

    // Disallow duplicate imports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-duplicates.md
    'import/no-duplicates': ['error', { preferInline: true }],

    // Disallow import { default as X }, write import X
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-default.md
    'import/no-named-default': 'error',

    // Disallow circular imports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-cycle.md
    'import/no-cycle': 'error',

    // Disallow a module from importing itself
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-self-import.md
    'import/no-self-import': 'error',

    // Disallow mutable exports (export let, export var)
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-mutable-exports.md
    'import/no-mutable-exports': 'error',

    // Disallow absolute path imports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-absolute-path.md
    'import/no-absolute-path': 'error',

    // Disallow dynamic require() with expressions
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-dynamic-require.md
    'import/no-dynamic-require': 'error',

    // Disallow side-effect imports without assignment
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-unassigned-import.md
    'import/no-unassigned-import': [
      'error',
      {
        allow: ['server-only', 'client-only', '**/*.css', '**/*.scss']
      }
    ],

    // Disallow namespace (wildcard) imports
    // Radix UI excluded: shadcn convention is import * as XPrimitive from "@radix-ui/react-x"
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-namespace.md
    'import/no-namespace': ['error', { ignore: ['@radix-ui/*'] }],

    // Disallow default exports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-default-export.md
    'import/no-default-export': 'error',

    // Disallow default import using a named export's identifier
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-as-default.md
    'import/no-named-as-default': 'error',

    // Disallow accessing named export as property of default import
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-as-default-member.md
    'import/no-named-as-default-member': 'error',

    // Disallow anonymous default exports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-anonymous-default-export.md
    'import/no-anonymous-default-export': 'error',

    // Limit maximum dependencies per file: too arbitrary
    // https://oxc.rs/docs/guide/usage/linter/rules/import/max-dependencies.md
    'import/max-dependencies': 'off',

    // Disallow relative parent imports (force aliases)
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-relative-parent-imports.md
    'import/no-relative-parent-imports': 'error',

    // Disallow the extension of a script import, and require it on an asset import (styles, images, fonts, JSON), except an import with a Vite suffix such as ?raw or ?url. The extensions sit at the root of the options: under pattern, oxlint drops pathGroupOverrides
    // https://oxc.rs/docs/guide/usage/linter/rules/import/extensions.md
    'import/extensions': [
      'error',
      'never',
      {
        css: 'always',
        json: 'always',
        png: 'always',
        scss: 'always',
        svg: 'always',
        webp: 'always',
        woff2: 'always',
        pathGroupOverrides: [{ pattern: '**/*[?]*', action: 'ignore' }]
      }
    ],

    // Top-level (import type { T }) when only types, inline (import { type T, value }) when mixed
    // https://oxc.rs/docs/guide/usage/linter/rules/import/consistent-type-specifier-style.md
    'import/consistent-type-specifier-style': [
      'error',
      'prefer-top-level-if-only-type-imports'
    ],

    // Disallow empty named import blocks
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-empty-named-blocks.md
    'import/no-empty-named-blocks': 'error',

    // Verify namespace import properties exist
    // https://oxc.rs/docs/guide/usage/linter/rules/import/namespace.md
    'import/namespace': 'error',

    // Disallow webpack loader syntax in imports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-webpack-loader-syntax.md
    'import/no-webpack-loader-syntax': 'error',

    // Allow named exports: coherent with no-default-export
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-named-export.md
    'import/no-named-export': 'off',

    // Prefer default when single export: contradicts no-default-export
    // https://oxc.rs/docs/guide/usage/linter/rules/import/prefer-default-export.md
    'import/prefer-default-export': 'off',

    // Force exports at end of file: colocation is better
    // https://oxc.rs/docs/guide/usage/linter/rules/import/exports-last.md
    'import/exports-last': 'off',

    // Force grouped exports: too restrictive
    // https://oxc.rs/docs/guide/usage/linter/rules/import/group-exports.md
    'import/group-exports': 'off',

    // Disallow CommonJS require/module.exports
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-commonjs.md
    'import/no-commonjs': 'error',

    // Disallow AMD define/require
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-amd.md
    'import/no-amd': 'error',

    // Verify imports exist in package.json: TypeScript checks
    // https://oxc.rs/docs/guide/usage/linter/rules/import/named.md
    'import/named': 'off',

    // Verify default export exists: TypeScript checks
    // https://oxc.rs/docs/guide/usage/linter/rules/import/default.md
    'import/default': 'off',

    // Disallow Node.js built-in module imports: needed in backend/tooling
    // https://oxc.rs/docs/guide/usage/linter/rules/import/no-nodejs-modules.md
    'import/no-nodejs-modules': 'off',

    // Force files to be unambiguously ESM: TS/bundler handles
    // https://oxc.rs/docs/guide/usage/linter/rules/import/unambiguous.md
    'import/unambiguous': 'off',

    // Enforce a blank line after the last import
    // https://oxc.rs/docs/guide/usage/linter/rules/import/newline-after-import.md
    'import/newline-after-import': 'error',

    // The tsc compiler already reports a duplicate export, and the rule is in nursery
    // https://oxc.rs/docs/guide/usage/linter/rules/import/export.md
    'import/export': 'off'
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
