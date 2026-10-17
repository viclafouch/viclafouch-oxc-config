import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: 'index.ts',
    'formatting/index': 'formatting/index.ts',
    'plugins/viclafouch/index': 'plugins/viclafouch/index.ts'
  },
  sourcemap: true,
  dts: { sourcemap: true },
  exports: true,
  publint: true,
  attw: { profile: 'esm-only' }
})
