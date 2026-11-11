import { rmSync } from 'node:fs'
import { createLintWorkDir, lintFile } from './lint-file'

const NO_NOOP_SUBSCRIBE = 'viclafouch(no-noop-subscribe)'

describe('hooks config', () => {
  let workDir: string

  beforeAll(() => {
    workDir = createLintWorkDir('hooks-config', [
      "import { defineConfig } from 'oxlint'",
      "import hooks from '../configs/hooks.ts'",
      '',
      'export default defineConfig({ extends: [hooks] })'
    ])
  })

  afterAll(() => {
    rmSync(workDir, { recursive: true, force: true })
  })

  describe('no-op subscribe', () => {
    it('fails a useSyncExternalStore with a no-op subscribe', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_NOOP_SUBSCRIBE,
        filename: 'use-is-mac.ts',
        code: [
          "import { useSyncExternalStore } from 'react'",
          '',
          'const subscribeToNothing = () => {',
          '  return () => {}',
          '}',
          '',
          'export const useIsMac = () => {',
          '  return useSyncExternalStore(',
          '    subscribeToNothing,',
          "    () => navigator.userAgent.includes('Mac'),",
          '    () => false',
          '  )',
          '}',
          ''
        ].join('\n')
      })

      expect(diagnostics).toStrictEqual([
        expect.objectContaining({
          code: NO_NOOP_SUBSCRIBE,
          severity: 'error'
        })
      ])
    })

    it('passes a useSyncExternalStore with a subscribe that registers a listener', () => {
      const diagnostics = lintFile(workDir, {
        rule: NO_NOOP_SUBSCRIBE,
        filename: 'use-is-online.ts',
        code: [
          "import { useSyncExternalStore } from 'react'",
          '',
          'const subscribe = (onChange: () => void) => {',
          "  window.addEventListener('online', onChange)",
          "  window.addEventListener('offline', onChange)",
          '  return () => {',
          "    window.removeEventListener('online', onChange)",
          "    window.removeEventListener('offline', onChange)",
          '  }',
          '}',
          '',
          'export const useIsOnline = () => {',
          '  return useSyncExternalStore(',
          '    subscribe,',
          '    () => navigator.onLine,',
          '    () => true',
          '  )',
          '}',
          ''
        ].join('\n')
      })

      expect(diagnostics).toStrictEqual([])
    })
  })
})
