/**
 * Oxlint config template for pure TypeScript projects.
 *
 * Usage:
 *   oxlint -c oxlint.config.ts
 *
 * Formatting:
 *   See oxfmt.config.ts template
 */
import { defineConfig } from 'oxlint'
import { typescript, imports } from '@viclafouch/oxc-config'

export default defineConfig({
  extends: [typescript, imports],
  ignorePatterns: ['**/node_modules/**', '**/dist/**']
})
