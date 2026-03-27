import { defineConfig } from 'oxfmt'
import { oxfmtConfig } from './formatting/index.ts'

export default defineConfig({
  ...oxfmtConfig,
  ignorePatterns: ['dist/**', 'templates/**', 'node_modules/**', '.agents/**']
})
