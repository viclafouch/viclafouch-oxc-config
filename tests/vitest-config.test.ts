import { rmSync } from 'node:fs'
import { createLintWorkDir, lintFile } from './lint-file'

const PREFER_TO_BE = 'vitest(prefer-to-be)'
const REQUIRE_HOOK = 'vitest(require-hook)'

const TOP_LEVEL_CALL = "import { run } from 'node:test'\n\nrun()\n"
const LOOSE_ASSERTION =
  "import { expect, it } from 'vitest'\n\nit('adds', () => {\n  expect(1 + 1).toEqual(2)\n})\n"

describe('vitest config', () => {
  let workDir: string

  beforeAll(() => {
    workDir = createLintWorkDir('vitest-config', [
      "import { defineConfig } from 'oxlint'",
      "import vitest from '../configs/vitest.ts'",
      '',
      'export default defineConfig({ extends: [vitest] })'
    ])
  })

  afterAll(() => {
    rmSync(workDir, { recursive: true, force: true })
  })

  it.each(['sum.test.ts', 'sum.spec.tsx', 'sum.fixture.ts'])(
    'checks the test file %s',
    (filename) => {
      const diagnostics = lintFile(workDir, {
        rule: PREFER_TO_BE,
        filename,
        code: LOOSE_ASSERTION
      })

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({ code: PREFER_TO_BE, severity: 'error' })
      ])
    }
  )

  it('leaves the top-level call of a script alone', () => {
    const diagnostics = lintFile(workDir, {
      rule: REQUIRE_HOOK,
      filename: 'cli.ts',
      code: TOP_LEVEL_CALL
    })

    expect(diagnostics).toStrictEqual([])
  })

  it('fails the top-level call of a test file', () => {
    const diagnostics = lintFile(workDir, {
      rule: REQUIRE_HOOK,
      filename: 'cli.test.ts',
      code: TOP_LEVEL_CALL
    })

    expect(diagnostics).toStrictEqual([
      expect.objectContaining({ code: REQUIRE_HOOK, severity: 'error' })
    ])
  })
})
