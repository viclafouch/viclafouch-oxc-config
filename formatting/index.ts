import type { OxfmtConfig } from 'oxfmt'

/**
 * Shared oxfmt configuration.
 *
 * Mirrors the Prettier configuration from eslint-plugin-prettier exactly.
 * sortImports and sortPackageJson are disabled by default to keep
 * formatting output stable and predictable.
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
 * // oxfmt.config.ts
 * import { defineConfig } from 'oxfmt'
 * import { oxfmtConfig, sortImportsConfig } from '@viclafouch/oxc-config/formatting'
 *
 * export default defineConfig({ ...oxfmtConfig, sortImports: sortImportsConfig })
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
  sortPackageJson: false
} satisfies OxfmtConfig

/**
 * Import sorting configuration (opt-in).
 *
 * Replaces simple-import-sort with oxfmt's built-in sorting.
 * Order: react → frameworks → external → aliases → relative → side-effects.
 * No blank lines between groups (matches simple-import-sort behavior).
 *
 * Enable by spreading into the config:
 *
 * ```ts
 * export default defineConfig({ ...oxfmtConfig, sortImports: sortImportsConfig })
 * ```
 */
export const sortImportsConfig = {
  newlinesBetween: false,
  ignoreCase: true,
  order: 'asc' as const,
  internalPattern: ['@/', '~/'],
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
      groupName: 'aliases',
      elementNamePattern: ['@/*', '~/*']
    }
  ],
  groups: [
    'react',
    'frameworks',
    'external',
    'aliases',
    'internal',
    ['parent', 'sibling', 'index'],
    'side_effect',
    'unknown'
  ]
}
