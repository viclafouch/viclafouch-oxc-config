import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['index.ts', 'formatting/index.ts'],
  format: ['esm'],
  dts: true,
  clean: true
})
