import type { OxfmtConfig } from 'oxfmt'

/**
 * Shared oxfmt configuration (formatting + import sorting).
 *
 * Usage:
 *
 * ```ts
 * // oxfmt.config.ts
 * import { defineConfig } from 'oxfmt'
 * import { oxfmtConfig } from '@viclafouch/oxc-config/formatting'
 *
 * export default defineConfig(oxfmtConfig)
 * ```
 *
 * With overrides:
 *
 * ```ts
 * export default defineConfig({ ...oxfmtConfig, printWidth: 100 })
 * ```
 */
export const oxfmtConfig = {
  semi: false,
  singleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  jsxSingleQuote: false,
  trailingComma: 'none',
  endOfLine: 'lf',
  bracketSpacing: true,
  bracketSameLine: false,
  arrowParens: 'always',
  quoteProps: 'as-needed',
  insertFinalNewline: true,
  sortPackageJson: false,
  sortImports: {
    newlinesBetween: false,
    ignoreCase: true,
    order: 'asc',
    customGroups: [
      {
        groupName: 'react',
        elementNamePattern: ['react', 'react-**']
      },
      {
        groupName: 'frameworks',
        elementNamePattern: ['next', 'next/**', '@remix**', 'expo', 'expo-**']
      },
      {
        groupName: 'builtin',
        elementNamePattern: ['node:*', 'node:**']
      },
      // aliases BEFORE unscoped — prevents alias paths from matching [!@]*
      {
        groupName: 'aliases',
        elementNamePattern: ['@/*', '@/**', '~/*', '~**/*', '#/*', '#/**']
      },
      {
        groupName: 'unscoped',
        selector: 'external',
        elementNamePattern: ['[!@]*', '[!@]*/**']
      },
      {
        groupName: 'scoped',
        selector: 'external',
        elementNamePattern: ['@*/**', '@*']
      }
    ],
    groups: [
      'react',
      'frameworks',
      'builtin',
      'unscoped',
      'scoped',
      'aliases',
      ['value-internal', 'type-internal'],
      [
        'value-parent',
        'value-sibling',
        'value-index',
        'type-parent',
        'type-sibling',
        'type-index'
      ],
      'unknown'
    ]
  }
} satisfies OxfmtConfig
