/**
 * Oxlint config template for React projects.
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
  jsxA11y,
  imports
} from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, hooks, jsxA11y, imports],
  ignorePatterns: [
    '**/node_modules/**',
    '**/.output/**',
    '**/.tanstack/**',
    '**/dist/**'
  ]
})
