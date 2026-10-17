import { execFile } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { unlink, writeFile } from 'node:fs/promises'
import { resolve, basename } from 'node:path'
import { promisify } from 'node:util'
import { matchIsProcessOutput } from './lint-file'

// oxlint-disable-next-line typescript/strict-void-return -- promisify reads the custom promisified execFile, as the Node docs show
const execFileAsync = promisify(execFile)

const ROOT = resolve(import.meta.dirname, '..')
const CONFIGS_DIR = resolve(ROOT, 'configs')
const DUMMY_FILE = resolve(ROOT, 'index.ts')

const allConfigFiles = readdirSync(CONFIGS_DIR)
  .filter((file) => {
    return file.endsWith('.ts')
  })
  .map((file) => {
    return basename(file, '.ts')
  })

function toCamelCase(kebab: string): string {
  return kebab.replaceAll(/-([a-z])/gu, (_, char: string) => {
    return char.toUpperCase()
  })
}

function tmpConfigPath(name: string): string {
  return resolve(ROOT, `.oxlint.test-${name}.ts`)
}

async function validateConfig(
  name: string,
  configLines: string[]
): Promise<string> {
  const tmpPath = tmpConfigPath(name)

  await writeFile(tmpPath, configLines.join('\n'))
  try {
    await execFileAsync('oxlint', ['-c', tmpPath, DUMMY_FILE], {
      cwd: ROOT,
      encoding: 'utf8'
    })
    return ''
  } catch (error: unknown) {
    // oxlint writes config errors to stdout, not stderr
    if (!matchIsProcessOutput(error)) {
      throw error
    }
    return error.stdout === '' ? error.stderr : error.stdout
  } finally {
    await unlink(tmpPath).catch(() => {})
  }
}

function presetConfigLines(name: string): string[] {
  const varName = toCamelCase(name)

  return [
    "import { defineConfig } from 'oxlint'",
    `import ${varName} from './configs/${name}.ts'`,
    '',
    `export default defineConfig({ extends: [${varName}] })`
  ]
}

function overrideRuleConfigLines(rule: string, setting: unknown): string[] {
  return [
    "import { defineConfig } from 'oxlint'",
    '',
    'const preset = {',
    "  jsPlugins: [{ name: 'react-doctor', specifier: import.meta.resolve('oxlint-plugin-react-doctor') }, '@tanstack/eslint-plugin-query'],",
    `  overrides: [{ files: ['**/*.ts'], rules: { '${rule}': ${JSON.stringify(setting)} } }]`,
    '}',
    '',
    'export default defineConfig({ extends: [preset] })'
  ]
}

describe('configs, rules and options validated by oxlint', () => {
  it.concurrent.each(allConfigFiles)('%s', async (name) => {
    expect(await validateConfig(name, presetConfigLines(name))).toBe('')
  })
})

describe('an invalid rule or option in an override, rejected by oxlint', () => {
  it.concurrent.each([
    {
      kind: 'native-unknown-rule',
      rule: 'no-debuger',
      setting: 'error',
      error: "Rule 'no-debuger' not found in plugin 'eslint'"
    },
    {
      kind: 'js-plugin-unknown-rule',
      rule: 'react-doctor/no-such-rule',
      setting: 'error',
      error: "Rule 'no-such-rule' not found in plugin 'react-doctor'"
    },
    {
      kind: 'js-plugin-unknown-option',
      rule: '@tanstack/query/exhaustive-deps',
      setting: [
        'error',
        { allowlist: { variables: [], types: [] }, bogus: true }
      ],
      error: 'Unexpected property "bogus"'
    }
  ])('$kind', async ({ kind, rule, setting, error }) => {
    expect(
      await validateConfig(
        `invalid-${kind}`,
        overrideRuleConfigLines(rule, setting)
      )
    ).toContain(error)
  })
})

describe('presets after typescript', () => {
  const presets = allConfigFiles.filter((name) => {
    return name !== 'typescript'
  })

  it.concurrent.each(presets)(
    '%s leaves categories to typescript',
    async (name) => {
      const preset = import(`../configs/${name}.ts`)
      await expect(preset).resolves.toHaveProperty('default')
      await expect(preset).resolves.not.toHaveProperty('default.categories')
    }
  )
})
