import { defineConfig } from 'oxfmt'
import { oxfmtConfig } from './formatting/index.ts'

export default defineConfig({
  ...oxfmtConfig,
  ignorePatterns: ['dist/**', 'node_modules/**', '.agents/**']
})
