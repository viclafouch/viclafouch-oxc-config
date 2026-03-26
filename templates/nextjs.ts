/**
 * Oxlint config template for Next.js projects.
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
  next,
  imports
} from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, react, hooks, jsxA11y, next, imports],
  ignorePatterns: ['**/node_modules/**', '**/.next/**', '**/dist/**']
})
