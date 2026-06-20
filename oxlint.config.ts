import { defineConfig } from 'oxlint'
import imports from './configs/imports.ts'
import typescript from './configs/typescript.ts'

export default defineConfig({
  extends: [typescript, imports],
  ignorePatterns: ['dist/**', 'templates/**', 'node_modules/**'],
  rules: {
    'import/no-default-export': 'off'
  }
})
