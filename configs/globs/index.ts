import type { OxlintOverride } from 'oxlint'

export const TOOL_CONFIG_FILES = [
  '**/*.config.{ts,mts,cts,tsx,js,mjs,cjs}',
  '**/codegen.ts',
  '**/sanity.cli.ts',
  '**/.storybook/**'
] as const satisfies readonly string[]

export const STORY_FILES = [
  '**/*.stories.{ts,tsx}'
] as const satisfies readonly string[]

export const NEXT_ROUTE_FILES = [
  'app/**',
  'src/app/**',
  'pages/**',
  'src/pages/**'
] as const satisfies readonly string[]

export const COMMONJS_CONFIG_FILES = [
  '**/*.config.{js,cjs}'
] as const satisfies readonly string[]

export const TEST_FILES: OxlintOverride['files'] = [
  '**/*.{test,spec,test-d,fixture}.{ts,tsx,mts,cts}',
  '**/tests/**',
  '**/__tests__/**',
  '**/__mocks__/**'
]
