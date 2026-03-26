import { defineConfig } from 'oxlint'
import typescript from './configs/typescript.ts'
import imports from './configs/imports.ts'

export default defineConfig({
  extends: [typescript, imports],
  ignorePatterns: ['dist/**', 'templates/**', 'node_modules/**']
})
