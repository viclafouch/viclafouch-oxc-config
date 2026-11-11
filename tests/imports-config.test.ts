import { rmSync } from 'node:fs'
import { createLintWorkDir, lintFile } from './lint-file'

const NO_UNASSIGNED_IMPORT = 'import(no-unassigned-import)'
const EXTENSIONS = 'import(extensions)'

describe('imports config', () => {
  let workDir: string

  beforeAll(() => {
    workDir = createLintWorkDir('imports-config', [
      "import { defineConfig } from 'oxlint'",
      "import imports from '../configs/imports.ts'",
      '',
      'export default defineConfig({ extends: [imports] })'
    ])
  })

  afterAll(() => {
    rmSync(workDir, { recursive: true, force: true })
  })

  describe('no-unassigned-import', () => {
    it('fails an unassigned import of a module outside the allow list', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_UNASSIGNED_IMPORT,
        filename: 'polyfill.ts',
        code: "import 'core-js/stable'\n\nexport const IS_READY = true\n"
      })

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({
          code: NO_UNASSIGNED_IMPORT,
          severity: 'error'
        })
      ])
    })

    it('passes the server-only marker', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_UNASSIGNED_IMPORT,
        filename: 'server-data.ts',
        code: "import 'server-only'\n\nexport const API_KEY = process.env.API_KEY\n"
      })

      expect(diagnostics).toStrictEqual([])
    })

    it('passes the client-only marker', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_UNASSIGNED_IMPORT,
        filename: 'client-storage.ts',
        code: "import 'client-only'\n\nexport const readTheme = () => window.localStorage.getItem('theme')\n"
      })

      expect(diagnostics).toStrictEqual([])
    })
  })

  describe('extensions', () => {
    it('passes a woff2 import that keeps its extension', () => {
      const diagnostics = lintFile(workDir, {
        rule: EXTENSIONS,
        filename: 'font-preload.ts',
        code: "import phonic from './fonts/phonic.woff2?url'\n\nexport const PHONIC_URL = phonic\n"
      })

      expect(diagnostics).toStrictEqual([])
    })
  })
})
