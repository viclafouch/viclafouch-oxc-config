/**
 * Oxlint config template for React Native projects.
 *
 * Usage:
 *   oxlint -c oxlint.config.ts
 *
 * Formatting:
 *   See oxfmt.config.ts template
 */
import { defineConfig } from 'oxlint'
import {
  typescript,
  react,
  hooks,
  reactNative,
  imports
} from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, hooks, reactNative, imports],
  ignorePatterns: [
    '**/node_modules/**',
    '**/.expo/**',
    '**/ios/**',
    '**/android/**'
  ]
})
