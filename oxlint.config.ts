import { defineConfig } from 'oxlint'
import imports from './configs/imports.ts'
import typescript from './configs/typescript.ts'
import vitest from './configs/vitest.ts'

export default defineConfig({
  extends: [typescript, imports, vitest],
  options: {
    typeAware: true,
    reportUnusedDisableDirectives: 'error',
    maxWarnings: 0
  },
  ignorePatterns: ['dist/**', 'node_modules/**'],
  rules: {
    'import/no-default-export': 'off',
    'import/extensions': 'off'
  },
  overrides: [
    {
      files: ['tests/**'],
      rules: {
        'import/no-relative-parent-imports': 'off',
        'node/no-process-env': 'off'
      }
    },
    {
      files: ['plugins/*/tests/**'],
      plugins: ['vitest'],
      rules: {
        'import/no-relative-parent-imports': 'off',
        'vitest/require-hook': [
          'error',
          { allowedFunctionCalls: ['ruleTester.run'] }
        ]
      }
    }
  ]
})
